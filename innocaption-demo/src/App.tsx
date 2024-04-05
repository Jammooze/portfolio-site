import React, { useState, useEffect } from "react";
import Navbar from "./navbar/Navbar";
import "./App.css";
import RatingStars from "./RatingStars";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  category: string;
  thumbnail: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");


  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });

    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(categories => {
        setCategories(categories);
      })
      .catch(error => {
        console.error('Error fetching categories: ', error);
      });
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "" || product.category === selectedCategory)
  );

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setShowDropdown(false);
  };

  const addToCart = (product: Product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    const updatedTotal = total + product.price;
    setTotal(updatedTotal);
    showPopupMessage(`${product.title} has been added to cart`);
  };
  

  const removeFromCart = (product: Product) => {
    const updatedCart = cart.filter(item => item.id !== product.id);
    setCart(updatedCart);
    const updatedTotal = total - product.price;
    setTotal(updatedTotal);
  };

  const showPopupMessage = (message: string) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000); //milliseconds
  };
  
  

  return (
    <div>
      <Navbar/>

      <div className="pageContents">
      
      <div className="searchBar">
        <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ marginRight: "20px" }} // Margin for Filter SVG
        />
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-funnel" viewBox="0 0 16 16" onClick={() => setShowDropdown(!showDropdown)} style={{ cursor: "pointer" }}> 
          <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"/>
        </svg>
        
      </div>

        {showDropdown && (
              <div className="dropdown-menu">
                {categories.map(category => (
                  <button key={category} onClick={() => handleCategoryClick(category)}>{category}</button>
                ))}
              </div>
            )}

        <h1>Products</h1>
        
        <div>
          <ul className="productItem">
            {filteredProducts.map(product => (
              <div className="itemBox" key={product.id}>
                <ul>
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <ul className="productInfo">
                    <img className="thumbnail" src={product.thumbnail} alt={product.title} />
                    <RatingStars rating={product.rating} />
                    <h2>${product.price}</h2>
                    <p>{product.stock} avaliable</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16" onClick={() => addToCart(product)} style={{ cursor: "pointer" }}> 
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                  </ul>
                </ul>
              </div>
            ))}
          </ul>
        </div>

        

        <div className="shoppingCart">
          <h2>Shopping Cart</h2>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.title} - ${item.price}
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-trash" viewBox="0 0 16 16" onClick={() => removeFromCart(item)}>
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
              </li>
            ))}
          </ul>
          <h2>Total: ${total}</h2>
        </div>

        {showPopup && (
          <div className="popup">
            <p>{popupMessage}</p>
          </div>
        )}

        
      </div>

    </div>
  );
}

export default App;