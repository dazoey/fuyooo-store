import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Phone, Mail, MapPin, Star, Plus, Minus, Trash2, Menu, X, CreditCard, Banknote, Smartphone } from 'lucide-react';

const AppContent = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [orderCompleted, setOrderCompleted] = useState(false);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const localProducts = [
    { id: 1, name: "Esteh Anget", price: 3500, image: "https://i.imgur.com/CT92xZA.jpeg", category: "Teh", description: "pokoknya teh" },
    { id: 2, name: "Kopsu", price: 6000, image: "https://i.imgur.com/7MvlKK9.jpeg", category: "Kopi", description: "Kopi zuzuuu" },
    { id: 3, name: "nuruk", price: 5000, image: "https://i.imgur.com/aknoB4D.jpeg", category: "Jus", description: "Nutrisari jeruk ajh" },
    { id: 4, name: "Smoothies", price: 10000, image: "https://i.imgur.com/gYodsX4.jpeg", category: "Smoothies", description: "Smoothie creamy tapi tapi tapi" },
    { id: 5, name: "Susu Goyang", price: 8000, image: "https://i.imgur.com/8FBBG1m.jpeg", category: "Milkshake", description: "Milkshake es tapi anget" },
    { id: 6, name: "Es Kelapa Young", price: 9000, image: "https://i.imgur.com/3cax3Vm.jpeg", category: "Tradisional", description: "Buah kelapa di pukul2, terus di kasih es" },
    { id: 7, name: "Thai Tea", price: 5000, image: "https://i.imgur.com/ZgGmXDm.jpeg", category: "Teh", description: "wong fei hung jago silat" },
    { id: 8, name: "RRQ Lemon Tea", price: 5000, image: "https://i.imgur.com/dfzyTAt.jpeg", category: "Teh", description: "Jendral hirohito kalo jadi minuman" }
  ];

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setProducts(localProducts);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useCallback(() => {
    if (!debouncedSearchTerm) return products;
    return products.filter(product =>
      product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [products, debouncedSearchTerm]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalPrice = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setOrderCompleted(true);
      setCart([]); 
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header getTotalItems={getTotalItems} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage products={products} addToCart={addToCart} />} />
          <Route path="/products" element={
            <ProductsPage 
              isLoading={isLoading}
              filteredProducts={filteredProducts()}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              addToCart={addToCart}
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              getTotalPrice={getTotalPrice}
            />
          } />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/payment" element={
            <PaymentPage 
              orderCompleted={orderCompleted}
              cart={cart}
              getTotalPrice={getTotalPrice}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              handlePaymentSubmit={handlePaymentSubmit}
            />
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

const KedaiFuyoooApp = () => (
  <Router>
    <AppContent />
  </Router>
);


const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
};

const Header = ({ getTotalItems }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to} onClick={() => setIsMobileMenuOpen(false)} className={`px-4 py-2 rounded-lg transition-all duration-300 ${isActive ? 'bg-white text-blue-500 shadow-md' : 'hover:bg-blue-400'}`}>
        {children}
      </Link>
    );
  };

  return (
    <header className="bg-blue-500 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-orange-400">Fuyooo</h1>
            <span className="text-sm opacity-90 hidden sm:inline">Pilihan Tongkrongan Kalian</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <NavLink to="/">Beranda</NavLink>
            <NavLink to="/products">Produk</NavLink>
            <NavLink to="/about">Tentang</NavLink>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/payment" className="relative p-2 hover:bg-blue-400 rounded-lg transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            
            <button 
              className="md:hidden p-2 hover:bg-blue-400 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}> 
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-white/20">
            <div className="flex flex-col space-y-2">
              <NavLink to="/">Beranda</NavLink>
              <NavLink to="/products">Produk</NavLink>
              <NavLink to="/about">Tentang</NavLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

const Footer = () => (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-orange-400">Fuyooo</h3>
            <p className="text-gray-400 mb-4">Toko minuman segar.</p>
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Menu Utama</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors">Beranda</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Produk</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Tentang</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Kategori</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Teh</li>
              <li>Kopi</li>
              <li>Mix</li>
              <li>Smoothies</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center space-x-2"><Phone className="w-4 h-4" /><span>089619525316</span></div>
              <div className="flex items-center space-x-2"><Mail className="w-4 h-4" /><span>ayathaarch@gmail.com</span></div>
              <div className="flex items-center space-x-2"><MapPin className="w-4 h-4" /><span>Bogor, Indonesia</span></div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Fuyooo. all rights reserved.</p>
        </div>
      </div>
    </footer>
);

const HomePage = ({ products, addToCart }) => (
  <div className="min-h-screen">
    <section className="bg-blue-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">Segarkan Harimu dengan <span className="text-blue-500">Fuyooo</span></h1>
            <p className="text-xl text-gray-600 mb-8">Belinya disini, minumnya pas nogkrong.....</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products" className="bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center">Lihat Produk</Link>
              <Link to="/about" className="border-2 border-blue-500 text-blue-500 px-8 py-4 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300 text-center">Pelajari Lebih Lanjut</Link>
            </div>
          </div>
          <div className="relative"><div className="bg-blue-400 rounded-full p-8 shadow-2xl"><img src="https://i.imgur.com/gYodsX4.jpeg" alt="Minuman Seger" className="rounded-full w-full h-full object-cover"/></div></div>
        </div>
      </div>
    </section>
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Mengapa Memilih Fuyooo?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"><div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"><Star className="w-8 h-8 text-white" /></div><h3 className="text-xl font-semibold mb-4 text-gray-800">Kualitas Premium</h3><p className="text-gray-600">Bahan-bahan berkualitas tinggi dipilih khusus untuk menghasilkan rasa terbaik</p></div>
          <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"><div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"><ShoppingCart className="w-8 h-8 text-white" /></div><h3 className="text-xl font-semibold mb-4 text-gray-800">Mudah Dipesan</h3><p className="text-gray-600">Sistem pemesanan yang mudah dan pengiriman cepat</p></div>
          <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"><div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4"><Phone className="w-8 h-8 text-white" /></div><h3 className="text-xl font-semibold mb-4 text-gray-800">Layanan 25/7</h3><p className="text-gray-600">Customer service yang siap membantu Anda kapan saja</p></div>
        </div>
      </div>
    </section>
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Produk Populer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover"/>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-500">Rp {product.price.toLocaleString()}</span>
                  <button onClick={() => addToCart(product)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 hover:shadow-lg transition-all duration-300"><Plus className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8"><Link to="/products" className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 hover:shadow-lg transition-all duration-300">Lihat Semua Produk</Link></div>
      </div>
    </section>
  </div>
);

const ProductsPage = ({ isLoading, filteredProducts, searchTerm, setSearchTerm, addToCart, cart, updateQuantity, removeFromCart, getTotalPrice }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Koleksi Minuman Kami</h1>
        
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Cari minuman favorit Anda..."  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat produk...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover"/>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{product.category}</span>
                      <div className="flex items-center space-x-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /><span className="text-sm text-gray-600">4.5</span></div>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-500">Rp {product.price.toLocaleString()}</span>
                      <button onClick={() => addToCart(product)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 hover:shadow-lg transition-all duration-300 flex items-center space-x-2"><Plus className="w-4 h-4" /><span>Tambah</span></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-12"><Search className="w-16 h-16 text-gray-400 mx-auto mb-4" /><p className="text-gray-600">Tidak ada produk yang ditemukan</p></div>
            )}
          </>
        )}

        {cart.length > 0 && (
          <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm w-full">
            <h3 className="font-semibold mb-2">Keranjang Belanja</h3>
            <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <span className="flex-1 truncate pr-2">{item.name}</span>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"><Minus className="w-3 h-3" /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"><Plus className="w-3 h-3" /></button>
                    <button onClick={() => removeFromCart(item.id)} className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200"><Trash2 className="w-3 h-3 text-red-600" /></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold"><span>Total:</span><span>Rp {getTotalPrice().toLocaleString()}</span></div>
              <button onClick={() => navigate('/payment')} className="w-full bg-blue-500 text-white py-2 rounded-lg mt-2 hover:bg-blue-600 hover:shadow-lg transition-all duration-300">Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AboutPage = () => (
  <div className="min-h-screen py-8">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Tentang Fuyooo</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Cerita Kami</h2>
            <p className="text-gray-600 mb-4">Fuyooo lahir dari bocah tongkrongan yang ngeluh mulu kalo aus, apalagi kalo puasa, Fuyooo jadi tempat mokel favorit.</p>
            <p className="text-gray-600 mb-4">Dengan tim yang kreatif ngeracik minuman segar dan selalu siap ngadepin badai.</p>
            <p className="text-gray-600">Visi kami adalah menjadi toko minuman terdepan yang memberikan pengalaman berbelanja yang menyenangkan dan produk berkualitas tinggi kepada setiap pelanggan.</p>
          </div>
          <div className="relative"><img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&h=400&fit=crop" alt="Tim Fuyooo" className="rounded-lg shadow-lg w-full h-80 object-cover"/></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-blue-50 rounded-lg"><div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"><Star className="w-8 h-8 text-white" /></div><h3 className="text-xl font-semibold mb-2 text-gray-800">Kualitas</h3><p className="text-gray-600">Mengutamakan kualitas bahan dan proses pembuatan yang higienis</p></div>
          <div className="text-center p-6 bg-green-50 rounded-lg"><div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"><ShoppingCart className="w-8 h-8 text-white" /></div><h3 className="text-xl font-semibold mb-2 text-gray-800">Pelayanan</h3><p className="text-gray-600">Memberikan pelayanan terbaik dan pengalaman berbelanja yang memuaskan</p></div>
          <div className="text-center p-6 bg-yellow-50 rounded-lg"><div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4"><Phone className="w-8 h-8 text-white" /></div><h3 className="text-xl font-semibold mb-2 text-gray-800">Inovasi</h3><p className="text-gray-600">Terus berinovasi dalam menciptakan varian minuman yang unik</p></div>
        </div>
        <div className="bg-blue-500 text-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Hubungi Customer Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center"><Phone className="w-12 h-12 mx-auto mb-4 p-2 bg-blue-400 rounded-full" /><h3 className="font-semibold mb-2">Telepon</h3><p className="text-blue-100">089619525316</p><p className="text-sm text-blue-100 mt-1">Senin - Minggu: 12:00 - 22:00</p></div>
            <div className="text-center"><Mail className="w-12 h-12 mx-auto mb-4 p-2 bg-blue-400 rounded-full" /><h3 className="font-semibold mb-2">Email</h3><p className="text-blue-100">ayathaarch@gmail.com</p><p className="text-sm text-blue-100 mt-1">Respon dalam 25 jam</p></div>
            <div className="text-center"><MapPin className="w-12 h-12 mx-auto mb-4 p-2 bg-blue-400 rounded-full" /><h3 className="font-semibold mb-2">Alamat</h3><p className="text-blue-100">Jl.tiap weeknd</p><p className="text-sm text-blue-100 mt-1">Bogor, Indonesia</p></div>
          </div>
          <div className="text-center mt-8"><button className="bg-white text-blue-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Hubungi Sekarang</button></div>
        </div>
      </div>
    </div>
  </div>
);

const PaymentPage = ({ orderCompleted, cart, getTotalPrice, paymentMethod, setPaymentMethod, handlePaymentSubmit }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (orderCompleted) {
      const timer = setTimeout(() => navigate('/'), 5000);
      return () => clearTimeout(timer);
    }
  }, [orderCompleted, navigate]);

  if (orderCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Pesanan Berhasil!</h2>
          <p className="text-gray-600 mb-6">Terima kasih telah memesan di Fuyooo. Anda akan dialihkan ke beranda.</p>
          <div className="bg-green-50 p-4 rounded-lg mb-6 text-left">
            <h3 className="font-semibold mb-2">Detail Pesanan</h3>
            <p>Metode Pembayaran: {paymentMethod === 'cash' ? 'Tunai' : paymentMethod === 'bank' ? 'Transfer Bank' : 'E-Wallet'}</p>
            <p>Total Pembayaran: <span className="font-bold">Rp {(getTotalPrice() + 5000).toLocaleString()}</span></p>
          </div>
          <button onClick={() => navigate('/')} className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors">Kembali ke Beranda Sekarang</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Pembayaran</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Ringkasan Pesanan</h2>
              <div className="max-h-96 overflow-y-auto pr-2">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between py-3 border-b">
                    <div className="flex items-center"><img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-4"/><div><h3 className="font-medium">{item.name}</h3><p className="text-gray-500 text-sm">Rp {item.price.toLocaleString()} x {item.quantity}</p></div></div>
                    <p className="font-semibold">Rp {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between mb-2"><span>Subtotal</span><span>Rp {getTotalPrice().toLocaleString()}</span></div>
                <div className="flex justify-between mb-2"><span>Biaya Pengiriman</span><span>Rp 5.000</span></div>
                <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t"><span>Total Pembayaran</span><span>Rp {(getTotalPrice() + 5000).toLocaleString()}</span></div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Detail Pengiriman</h2>
              <form onSubmit={handlePaymentSubmit}>
                <div className="mb-4"><label className="block text-gray-700 mb-2">Nama Lengkap</label><input required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/></div>
                <div className="mb-4"><label className="block text-gray-700 mb-2">Alamat Lengkap</label><textarea required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea></div>
                <div className="mb-4"><label className="block text-gray-700 mb-2">Nomor Telepon</label><input required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/></div>
                <div className="mb-6"><label className="block text-gray-700 mb-2">Catatan (Opsional)</label><textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Contoh: Tolong jangan pakai gula"></textarea></div>
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Metode Pembayaran</h2>
                <div className="space-y-3 mb-6">
                  <div onClick={() => setPaymentMethod('cash')} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'cash' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}><Banknote className="w-6 h-6 mr-3 text-blue-500" /><div><h3 className="font-medium">Bayar di Tempat (Cash)</h3><p className="text-sm text-gray-500">Bayar tunai saat minuman diterima</p></div></div>
                  <div onClick={() => setPaymentMethod('bank')} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'bank' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}><CreditCard className="w-6 h-6 mr-3 text-blue-500" /><div><h3 className="font-medium">Transfer Bank</h3><p className="text-sm text-gray-500">BCA, BNI, BRI, Mandiri</p></div></div>
                  <div onClick={() => setPaymentMethod('ewallet')} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'ewallet' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}><Smartphone className="w-6 h-6 mr-3 text-blue-500" /><div><h3 className="font-medium">E-Wallet</h3><p className="text-sm text-gray-500">Gopay, OVO, Dana, ShopeePay</p></div></div>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">Konfirmasi Pembayaran</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default KedaiFuyoooApp;