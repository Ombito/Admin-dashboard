import React, { useState, useEffect } from 'react';
import './products.css';
import user from "../../Assets/user.jpg";
import data from '../data.json';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [groupingFilter, setGroupingFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Electronics',
    description: '',
    grouping: 'Trending',
    image_url: '',
    price: '',
    quantity: '1'
  });

  useEffect(() => {
    // const apiUrl = `http://127.0.0.1:5555/products`;
    // fetch(apiUrl)
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(`Network response was not ok: ${response.status}`);
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log('Fetched products:', data); 
    //     setProducts(data);
    //     setLoading(false);
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching data:', error);
    //     setLoading(false);
    //   });
    setProducts(data.products);
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleGroupingFilterChange = (e) => {
    setGroupingFilter(e.target.value);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter(product => {
    if (categoryFilter !== 'All' && product.category !== categoryFilter) {
      return false;
    }
    if (groupingFilter !== 'All' && product.grouping !== groupingFilter) {
      return false;
    }
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.description && newProduct.image_url && newProduct.price) {
      try {
        const response = await fetch('http://127.0.0.1:5555/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });
    
        if (response.ok) {
          const data = await response.json();
        } else {
          console.log("Login failed!")
        }
      } catch (error) {
        console.error('Login failed: ', error);
      }
      setNewProduct({
        name: '',
        category: '',
        description: '',
        grouping: '',
        image_url: '',
        price: '',
        quantity: '1'
      });
    }
    console.log('Form submitted!');
    handleCloseModal();
  };


  return (
    <div className="product-container">
      <div className="navbar-div">
        <div className="navbar-div-hero-section">
          <h2>Products</h2>
        </div>
        <div className='sidebar-username'>
          <div className="admin-profile">
            <img src={user} alt="avatar" />
          </div>
        </div>
      </div>
      <div className='products-hero-container'>
        <div>
          <button onClick={handleOpenModal}>Add Product</button>
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={handleCloseModal}>&times;</span>
                <form onSubmit={handleSubmit} className="product-form">
                  <input type="text" name="name" value={newProduct.name} placeholder="Name" onChange={handleInputChange} />
                  <select name="category" value={newProduct.category} onChange={handleInputChange}>
                    <option value="Dairy Products">Dairy Products</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Meat & Poultry">Meat & Poultry</option>
                    <option value="Grains">Grains</option>
                    <option value="Fresh Vegetabless">Fresh Vegetables</option>
                    <option value="Fish & Seafood">TFish & Seafood</option>
                    <option value="Honey Products">Honey Products</option>
                    <option value="Sugarcane Products">Sugarcane Products</option>
                    <option value="Nuts & Seeds">Nuts & Seeds</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Other Produce">Other Produce</option>
                  </select>
                  <input type="text" name="description" value={newProduct.description} placeholder="Description" onChange={handleInputChange} />
                  <select name="grouping" value={newProduct.grouping} onChange={handleInputChange}>
                    <option value="trending">Trending</option>
                    <option value="Featured">Featured</option>
                    <option value="Flash Sales">Flash Sales</option>
                  </select>
                  <input type="text" name="image_url" value={newProduct.image_url} placeholder="Image URL" onChange={handleInputChange} />
                  <input type="number" name="price" value={newProduct.price} placeholder="Price" onChange={handleInputChange} />
                  <select name="rating" value={newProduct.rating} onChange={handleInputChange}>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                  <button type="submit">Add Product</button>
                </form>
                </div>
              </div>
            )}
            <div className="search-bar">
              <input
                className="search-input"
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            </div>
        </div>
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>
                Category: 
                <select value={categoryFilter} onChange={handleCategoryFilterChange}>
                  <option value="All">All</option>
                  <option value="Dairy Products">Dairy Products</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Meat & Poultry">Meat & Poultry</option>
                  <option value="Grains">Grains</option>
                  <option value="Fresh Vegetabless">Fresh Vegetables</option>
                  <option value="Fish & Seafood">Fish & Seafood</option>
                  <option value="Honey Products">Honey Products</option>
                  <option value="Sugarcane Products">Sugarcane Products</option>
                  <option value="Nuts & Seeds">Nuts & Seeds</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Other Produce">Other Produce</option>
                </select>
              </th>
              <th>Description</th>
              <th>
                Grouping: 
                <select value={groupingFilter} onChange={handleGroupingFilterChange}>
                  <option value="All">All</option>
                  <option value="trending">Trending</option>
                  <option value="featured">Featured</option>
                  <option value="Flash Sales">Flash Sales</option>
                </select>
              </th>
              <th>Image URL</th>
              <th>Price</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.description}</td>
                <td>{product.grouping}</td>
                <td><img src={product.image_url} alt="Product" height="50" /></td>
                <td>{product.price}</td>
                <td>{product.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
