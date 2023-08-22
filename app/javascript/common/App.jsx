import React, { useReducer, useState } from 'react';
import { BrowserRouter, Routes, Route   } from 'react-router-dom';
import Crud from './Crud';
import ProductList from './ProductList';
import _ from 'lodash';


const ProductDetails = [];

function productReducer(state, action) {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return [...state, action.payload];

    case 'DELETE_PRODUCT':
      return state.filter(product => product.ID !== action.payload);

    case 'UPDATE_PRODUCT':
      return state.map(product =>
        product.ID === action.payload.ID ? { ...product, ...action.payload.updatedProduct } : product
      );


    default:
      return state;
  }
}

function App() {
  const [products, dispatch] = useReducer(productReducer, ProductDetails);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
  });


  const addProduct = () => {
    if (newProduct.name && newProduct.price) {
      dispatch({
        type: 'ADD_PRODUCT',
        payload: { ...newProduct, ID: Date.now() },
      });
      setNewProduct({
        name: '',
        price: '',
      });
    }
  };

  const deleteProduct = (productID) => {
    dispatch({
      type: 'DELETE_PRODUCT',
      payload: productID,
    });
  };


  const updateProduct = (product ) => {
  console.log();

    const productIndex = _.find(products, { ID: productID });
    console.log('product', productIndex)
    setNewProduct({
      name: productIndex.name,
      price: productIndex.price,

    })
  

  };
  



  // const productUpdate = (productID) => {
  //   const updatedName = prompt('Enter updated name:');
  //   const updatedPrice = prompt('Enter updated price:');

  //   if (updatedName !== null && updatedPrice !== null) {
  //     updateProduct(productID, { Name: updatedName, price: updatedPrice });
  //   }
  // };

  return (
    <BrowserRouter>
      <Routes>    
        <Route path="/" element={<Crud setNewProduct={setNewProduct} newProduct={newProduct} addProduct={addProduct}  products={products} updateProduct={updateProduct} />} />
        <Route path="/ProductList" element={<ProductList products={products}  deleteProduct={deleteProduct} updateProduct={updateProduct} />} />
      </Routes>
          </BrowserRouter>
  );
}

export default App;
