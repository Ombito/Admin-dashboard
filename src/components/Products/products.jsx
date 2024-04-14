import React, { useState, useEffect } from 'react';
import './products.css';
import user from "../../Assets/user.jpg";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [groupingFilter, setGroupingFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = `http://127.0.0.1:5555/products`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched products:', data); 
        setProducts(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);



  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleGroupingFilterChange = (e) => {
    setGroupingFilter(e.target.value);
  };


  const filteredProducts = products.filter(product => {
    if (categoryFilter !== 'All' && product.category !== categoryFilter) {
      return false;
    }
    if (groupingFilter !== 'All' && product.category !== groupingFilter) {
      return false;
    }
    return true;
  });

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Electronics',
    description: '',
    grouping: 'Trending',
    image_url: '',
    price: '',
    rating: '1'
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.description && newProduct.image_url && newProduct.price) {
      setProducts([...products, newProduct]);
      setNewProduct({
        name: '',
        category: 'Electronics',
        description: '',
        grouping: 'Trending',
        image_url: '',
        price: '',
        rating: '1'
      });
    }
  };


  return (
    <div className="product-container">
      <div>
        <h2>Product Management</h2>
        <div className='sidebar-username'>
          <img src={user} alt="avatar" />
          <h4>Administrator</h4>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="product-form">
        <input type="text" name="name" value={newProduct.name} placeholder="Name" onChange={handleInputChange} />
        <select name="category" value={newProduct.category} onChange={handleInputChange}>
          <option value="Electronics">Electronics</option>
          <option value="Phones">Phones</option>
          <option value="Television">Television</option>
          <option value="Radio">Radio</option>
        </select>
        <input type="text" name="description" value={newProduct.description} placeholder="Description" onChange={handleInputChange} />
        <select name="grouping" value={newProduct.category} onChange={handleInputChange}>
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
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>
              Category: 
              <select value={categoryFilter} onChange={handleCategoryFilterChange}>
                <option value="All">All</option>
                <option value="Electronics">Electronics</option>
                <option value="Phones">Phones</option>
                <option value="Television">Television</option>
                <option value="Radio">Radio</option>
              </select>
            </th>
            <th>Description</th>
            <th>
              Grouping: 
              <select value={groupingFilter} onChange={handleGroupingFilterChange}>
                <option value="All">All</option>
                <option value="trending">Trending</option>
                <option value="Featured">Featured</option>
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
  );
};

export default Products;
