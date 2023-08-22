import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Crud(props) {
  const location = useLocation();
  const { setNewProduct, newProduct, addProduct } = props;

  // Check if there's a productToUpdate in the location state
  const selectedProduct = location.state?.productToUpdate || null;

  // Set newProduct to the selected product details if available
  useEffect(() => {
    if (selectedProduct) {
      setNewProduct(selectedProduct);
    }
  }, [selectedProduct, setNewProduct]);

  const handleNameChange = (e) => {
    setNewProduct({ ...newProduct, name: e.target.value });
  };

  const handlePriceChange = (e) => {
    setNewProduct({ ...newProduct, price: e.target.value });
  };

  const handleUpdate = () => {
    // Implement your update logic here using the newProduct state
    // For example, you can call an updateProduct function
    updateProduct(selectedProduct.ID, newProduct);
  };

  return (
    <div className='container'>
      <div>
        <h2>Edit Product</h2>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={handleNameChange}
        />
        <br />
        <br />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={handlePriceChange}
        />
        <br />
        <br />
        <button onClick={handleUpdate}>Update Product</button>

        <Link to={{ pathname: "/ProductList" }}>
          <button>Back to Product List</button>
        </Link>
      </div>
    </div>
  );
}

export default Crud;
