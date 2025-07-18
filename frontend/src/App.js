import React, { useState, useEffect } from "react";
import "./App.css";
import emailjs from '@emailjs/browser';


const ClothingLandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedColors, setSelectedColors] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [email, setEmail] = useState('');

const handleNewsletterSubmit = (e) => {
  e.preventDefault(); // ✅ Prevent page refresh

  if (!email) {
    alert("Please enter an email address.");
    return;
  }

  const templateParams = {
    user_email: email,
  };

  emailjs
    .send(
      "service_wd0qu0o",           // Your service ID
      "template_vhs08na",          // Your template ID
      templateParams,
      "gNUV64N3DB0k-nd0q"          // Your public key
    )
    .then(
      (response) => {
        console.log("Email sent successfully!", response.status, response.text);
        alert("Thanks for subscribing!");
        setEmail(""); // Reset the form
      },
      (error) => {
        console.error("Failed to send email:", error);
        alert("Something went wrong. Please try again.");
      }
    );
};

const removeFromCart = (productId, size, color) => {
  setCartItems(prev =>
    prev.filter(item => !(item.id === productId && item.size === size && item.color === color))
  );
};




 // Load from localStorage on mount
useEffect(() => {
  const storedCart = localStorage.getItem('cartItems');
  if (storedCart) {
    setCartItems(JSON.parse(storedCart));
  }
}, []);

// Save to localStorage when cartItems change
useEffect(() => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}, [cartItems]);

// Handle scroll event (your existing code)
useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);


  const products = [
    {
      id: 1,
      name: "Cashmere Blend Coat",
      originalPrice: "$459",
      salePrice: "$299",
      discount: "35% OFF",
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxjbG90aGluZ3xlbnwwfHx8fDE3NTIzMDcxMzV8MA&ixlib=rb-4.1.0&q=85",
      description: "Luxurious cashmere blend outerwear with Italian craftsmanship",
      materials: "60% Cashmere, 40% Wool",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Camel", "Navy", "Black"],
      stock: 8,
      bestSeller: true
    },
    {
      id: 2,
      name: "Premium Cotton Shirt",
      originalPrice: "$129",
      salePrice: "$89",
      discount: "31% OFF",
      rating: 4.9,
      reviews: 243,
      image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwzfHxjbG90aGluZ3xlbnwwfHx8fDE3NTIzMDcxMzV8MA&ixlib=rb-4.1.0&q=85",
      description: "Perfectly tailored dress shirt in premium Egyptian cotton",
      materials: "100% Egyptian Cotton",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["White", "Blue", "Light Gray"],
      stock: 15,
      newArrival: true
    },
    {
      id: 3,
      name: "Athleisure Collection",
      originalPrice: "$199",
      salePrice: "$149",
      discount: "25% OFF",
      rating: 4.7,
      reviews: 89,
      image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg",
      description: "Comfortable yet sophisticated pieces for modern lifestyle",
      materials: "Organic Cotton Blend",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Charcoal", "Sage", "Cream"],
      stock: 12,
      sustainable: true
    },
    {
      id: 4,
      name: "Artisan Leather Jacket",
      originalPrice: "$399",
      salePrice: "$299",
      discount: "25% OFF",
      rating: 4.9,
      reviews: 67,
      image: "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg",
      description: "Handcrafted leather jacket with attention to every detail",
      materials: "100% Genuine Leather",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Brown", "Cognac"],
      stock: 5,
      limited: true
    },
    {
      id: 5,
      name: "Signature Silk Dress",
      originalPrice: "$499",
      salePrice: "$359",
      discount: "28% OFF",
      rating: 4.8,
      reviews: 134,
      image: "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg",
      description: "Exclusive silk dress design for discerning taste",
      materials: "100% Mulberry Silk",
      sizes: ["XS", "S", "M", "L"],
      colors: ["Midnight", "Emerald", "Champagne"],
      stock: 3,
      exclusive: true
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Mitchell",
      role: "Fashion Director",
      image: "https://images.unsplash.com/photo-1567777301743-3b7ef158aadf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwbW9kZWx8ZW58MHx8fHwxNzUyNDE3NjUzfDA&ixlib=rb-4.1.0&q=85",
      text: "The quality and craftsmanship of LUXE pieces are unmatched. Every item I've purchased has become a staple in my wardrobe.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Business Executive",
      image: "https://images.unsplash.com/photo-1752118464988-2914fb27d0f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHxjdXN0b21lciUyMHRlc3RpbW9uaWFsc3xlbnwwfHx8fDE3NTI0MTc2Mzl8MA&ixlib=rb-4.1.0&q=85",
      text: "Outstanding customer service and premium quality. The attention to detail in every piece is remarkable.",
      rating: 5
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1622080157653-830e675f14c3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBmYXNoaW9uJTIwbW9kZWx8ZW58MHx8fHwxNzUyNDE3NjUzfDA&ixlib=rb-4.1.0&q=85",
      text: "LUXE understands modern elegance. Their designs are timeless yet contemporary, perfect for my lifestyle.",
      rating: 5
    }
  ];

const handleCheckout = async () => {
  console.log("Checkout button clicked");

  try {
    const response = await fetch('/.netlify/functions/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cartItems }),
    });

    const data = await response.json();
    console.log("Stripe session:", data);

    if (data.id) {
      // Redirect to Stripe Checkout page
      window.location.href = `https://checkout.stripe.com/pay/${data.id}`;
    } else {
      alert("Stripe session failed.");
    }
  } catch (error) {
    console.error("Checkout error:", error);
    alert("Something went wrong during checkout.");
  }
};


 const addToCart = (product) => {
  const size = selectedSizes[product.id] || product.sizes[0];
  const color = selectedColors[product.id] || product.colors[0];

 setCartItems(prev => {
  const existingItem = prev.find(item =>
    item.id === product.id &&
    item.size === size &&
    item.color === color
  );

  const newItem = {
    ...product,
    size,
    color,
    quantity: 1,
    salePrice: product.salePrice || product.price || '0', // <-- Make sure this line is present
  };

  if (existingItem) {
    return prev.map(item =>
      item.id === product.id &&
      item.size === size &&
      item.color === color
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    return [...prev, newItem];
  }
});

};


  const addToWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
  const price = parseFloat(
  (item.salePrice || item.price || '0').replace('$', '')
);


      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };


  const scrollToShop = () => {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              LUXE
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="hover:text-gray-300 transition-colors">Home</a>
              <a href="#products" className="hover:text-gray-300 transition-colors">Products</a>
              <a href="#about" className="hover:text-gray-300 transition-colors">About</a>
              <a href="#testimonials" className="hover:text-gray-300 transition-colors">Reviews</a>
              <a href="#contact" className="hover:text-gray-300 transition-colors">Contact</a>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowCart(!showCart)}
                className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.68 8.4a2 2 0 002 2.6h9.36a2 2 0 002-2.6L16 13M9 19v2m6-2v2" />
                </svg>
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Shopping Cart Slide-out */}
      {showCart && (
        <div className="fixed right-0 top-0 h-full w-96 bg-black/95 backdrop-blur-md z-50 transform transition-transform p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Shopping Cart</h3>
            <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {cartItems.length === 0 ? (
            <p className="text-gray-400 text-center mt-8">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-400">{item.size} | {item.color}</p>
                    <p className="text-sm font-bold text-amber-400">{item.salePrice}</p>
                  </div>
                 <div className="text-right space-y-2">
  <p className="text-sm">Qty: {item.quantity}</p>
  <button
    onClick={() => removeFromCart(item.id, item.size, item.color)}
    className="text-xs text-red-400 hover:text-red-200 underline"
  >
    Remove
  </button>
</div>

                </div>
              ))}
              
              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-lg font-bold text-amber-400">${getTotalPrice()}</span>
                </div>
               <button
  onClick={handleCheckout}
  className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 rounded-lg transition-colors"
>
  Checkout
</button>

              </div>
            </div>
          )}
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1571513800374-df1bbe650e56?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwzfHxmYXNoaW9ufGVufDB8fHx8MTc1MjQxNzM0OHww&ixlib=rb-4.1.0&q=85')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="mb-4">
            <span className="inline-block bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full text-sm font-medium">
              New Collection Available
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-light mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent animate-fade-in">
            Redefining
            <span className="block font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Elegance
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light text-gray-300 max-w-2xl mx-auto">
            Discover premium fashion that speaks to your sophistication. Every piece tells a story of craftsmanship and timeless style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={scrollToShop}
              className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-medium text-black bg-white rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <span className="mr-3">Shop Now</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </button>
            <button 
              onClick={() => setShowNewsletter(true)}
              className="inline-flex items-center justify-center px-12 py-4 text-lg font-medium text-white border-2 border-white/30 rounded-full hover:border-white hover:bg-white/10 transition-all duration-300"
            >
              Subscribe for 15% Off
            </button>
          </div>
          
          <div className="mt-12 flex justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>Free Shipping Over $200</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>30-Day Returns</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>Lifetime Warranty</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Featured Collection
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Meticulously curated pieces that embody our commitment to quality, innovation, and timeless design
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {products.map((product) => (
              <div 
                key={product.id}
                className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-white/10"
              >
                {/* Product Labels */}
                <div className="absolute top-4 left-4 z-10 space-y-2">
                  {product.discount && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {product.discount}
                    </span>
                  )}
                  {product.bestSeller && (
                    <span className="bg-amber-500 text-black px-2 py-1 rounded-full text-xs font-medium">
                      Best Seller
                    </span>
                  )}
                  {product.newArrival && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      New
                    </span>
                  )}
                  {product.limited && (
                    <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Limited
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => addToWishlist(product)}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                >
                  <svg className={`w-4 h-4 ${wishlistItems.find(item => item.id === product.id) ? 'text-red-500' : 'text-white'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                  </svg>
                </button>

                <div className="aspect-square mb-6 overflow-hidden rounded-2xl">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    {renderStars(product.rating)}
                    <span className="text-xs text-gray-400 ml-2">({product.reviews})</span>
                  </div>
                  
                  <h3 className="text-xl font-medium mb-2 text-white">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {product.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex justify-center items-center space-x-2 mb-2">
                      <span className="text-2xl font-bold text-amber-400">
                        {product.salePrice}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        {product.originalPrice}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{product.materials}</p>
                  </div>

                  {/* Size Selection */}
                  <div className="mb-4">
                    <label className="block text-xs text-gray-400 mb-2">Size</label>
                    <div className="flex justify-center space-x-1">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSizes(prev => ({ ...prev, [product.id]: size }))}
                          className={`px-3 py-1 text-xs rounded border transition-colors ${
                            selectedSizes[product.id] === size || (!selectedSizes[product.id] && size === product.sizes[0])
                              ? 'bg-white text-black border-white'
                              : 'bg-transparent text-gray-400 border-gray-600 hover:border-gray-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Selection */}
                  <div className="mb-4">
                    <label className="block text-xs text-gray-400 mb-2">Color</label>
                    <div className="flex justify-center space-x-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColors(prev => ({ ...prev, [product.id]: color }))}
                          className={`w-6 h-6 rounded-full border-2 transition-all ${
                            selectedColors[product.id] === color || (!selectedColors[product.id] && color === product.colors[0])
                              ? 'border-white scale-110'
                              : 'border-gray-600 hover:border-gray-400'
                          }`}
                          style={{
                            backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' : 
                                           color.toLowerCase() === 'black' ? '#000000' :
                                           color.toLowerCase() === 'navy' ? '#1e3a8a' :
                                           color.toLowerCase() === 'camel' ? '#c19a6b' :
                                           color.toLowerCase() === 'blue' ? '#3b82f6' :
                                           color.toLowerCase() === 'charcoal' ? '#374151' :
                                           color.toLowerCase() === 'sage' ? '#9ca3af' :
                                           color.toLowerCase() === 'cream' ? '#fef3c7' :
                                           color.toLowerCase() === 'brown' ? '#8b5a2b' :
                                           color.toLowerCase() === 'cognac' ? '#b8732d' :
                                           color.toLowerCase() === 'midnight' ? '#1e1b4b' :
                                           color.toLowerCase() === 'emerald' ? '#10b981' :
                                           color.toLowerCase() === 'champagne' ? '#f7e7ce' :
                                           '#6b7280'
                          }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs text-gray-400">
                      {product.stock < 10 ? `Only ${product.stock} left` : 'In Stock'}
                    </span>
                  </div>

                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Join thousands of satisfied customers who trust LUXE for their premium fashion needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className="flex justify-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-medium text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-light mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Crafted with Passion
              </h2>
              <div className="space-y-6 text-lg text-gray-300">
                <p>
                  Founded in 2014 by renowned designer Isabella Montenegro, LUXE emerged from a vision to create timeless fashion pieces that transcend seasonal trends while maintaining the highest standards of craftsmanship.
                </p>
                <p>
                  Our atelier in Milan works with master artisans who have perfected their craft over generations. Every piece is meticulously constructed using premium materials sourced from the finest mills in Italy, Scotland, and Japan.
                </p>
                <p>
                  We believe that true luxury lies not in logos or labels, but in the quality of materials, the precision of construction, and the timeless nature of design. Each LUXE piece is created to become a cherished part of your wardrobe for decades to come.
                </p>
              </div>
              
              <div className="mt-12 grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-400 mb-2">11</div>
                  <div className="text-gray-400">Years of Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-400 mb-2">87k</div>
                  <div className="text-gray-400">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-400 mb-2">98%</div>
                  <div className="text-gray-400">Satisfaction Rate</div>
                </div>
              </div>

              <div className="mt-8 flex items-center space-x-4">
                <img 
                  src="https://images.unsplash.com/photo-1732933480695-90e4aba25eb4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZm91bmRlcnxlbnwwfHx8fDE3NTI0MTc2NDd8MA&ixlib=rb-4.1.0&q=85"
                  alt="Isabella Montenegro"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-white">Isabella Montenegro</h4>
                  <p className="text-sm text-gray-400">Founder & Creative Director</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxjbG90aGluZ3xlbnwwfHx8fDE3NTIzMDcxMzV8MA&ixlib=rb-4.1.0&q=85"
                  alt="LUXE atelier"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Modal */}
      {showNewsletter && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-md w-full border border-white/20">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Get 15% Off Your First Order</h3>
              <p className="text-gray-400">Subscribe to our newsletter for exclusive offers and updates</p>
            </div>
        <form onSubmit={handleNewsletterSubmit} className="space-y-4">
<input
  type="email"
  name="email"
  placeholder="Enter your email"
  required
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full p-3 bg-white/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
/>
  <div className="flex space-x-4">
  <button
  type="submit"
  className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 rounded-lg transition-colors"
>
  Subscribe
</button>


    <button
      type="button"
      onClick={() => setShowNewsletter(false)}
      className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-lg transition-colors"
    >
      Cancel
    </button>
  </div>
</form>

          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-amber-600/20 to-orange-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-light mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Experience Luxury Fashion
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of discerning customers who have made LUXE their destination for premium fashion. Free shipping on orders over $200.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={scrollToShop}
              className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-medium text-black bg-white rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <span className="mr-3">Shop Collection</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </button>
            <button className="inline-flex items-center justify-center px-12 py-4 text-lg font-medium text-white border-2 border-white/30 rounded-full hover:border-white hover:bg-white/10 transition-all duration-300">
              View Size Guide
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-md py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
                LUXE
              </div>
              <p className="text-gray-400 mb-4">
                Redefining elegance through exceptional craftsmanship and timeless design. Every piece tells a story of passion, precision, and Italian artistry.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Women's</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Men's</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sale</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Customer Care</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About LUXE</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Stores</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                &copy; 2025 LUXE. All rights reserved. | Privacy Policy | Terms of Service
              </p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <img src="https://images.unsplash.com/photo-1704118548893-57b02834a376?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwcGFja2FnaW5nfGVufDB8fHx8MTc1MjQxNzY2N3ww&ixlib=rb-4.1.0&q=85" alt="Premium packaging" className="w-8 h-8 rounded opacity-50" />
                <span className="text-xs text-gray-500">Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return <ClothingLandingPage />;
}

export default App;