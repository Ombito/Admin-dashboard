import React, { useState } from 'react';
import './products.css';

const Products = () => {
  const sampleProducts = [
    {
      name: 'Product 1',
      category: 'Electronics',
      description: 'Description 1',
      grouping: 'Trending',
      image_url: 'image1.jpg',
      price: 100,
      rating: 4.5
    },
    {
      name: 'Product 2',
      category: 'Phones',
      description: 'Description 2',
      grouping: 'Featured',
      image_url: 'image2.jpg',
      price: 200,
      rating: 4.0
    },
  ];

  const [products, setProducts] = useState(sampleProducts);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [groupingFilter, setGroupingFilter] = useState('All');

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
    if (groupingFilter !== 'All' && product.grouping !== groupingFilter) {
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
      <h2>Product Management</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input type="text" name="name" value={newProduct.name} placeholder="Name" onChange={handleInputChange} />
        <select name="category" value={newProduct.category} onChange={handleInputChange}>
          <option value="Electronics">Electronics</option>
          <option value="Phones">Phones</option>
          <option value="Television">Television</option>
          <option value="Radio">Radio</option>
        </select>
        <input type="text" name="description" value={newProduct.description} placeholder="Description" onChange={handleInputChange} />
        <select name="grouping" value={newProduct.grouping} onChange={handleInputChange}>
          <option value="Trending">Trending</option>
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
                <option value="Trending">Trending</option>
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
              <td>{product.image_url}</td>
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
