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
        product.ID === action.payload.ID ? { ...product, ...action.payload } : product
      );


    default:
      return state;
  }
}

function App() {
  const [products, dispatch] = useReducer(productReducer, ProductDetails);
  const [newProduct, setNewProduct] = useState({
    ID : '',
    name: '',
    price: '',
  });


  const addProduct = () => {

    if (newProduct.name && newProduct.price) {

      console.log('update',newProduct.name);

      if (newProduct.ID){
        dispatch({
          type:'UPDATE_PRODUCT', 
          payload:{
            
            ID:newProduct.ID,
            name:newProduct.name,
            price:newProduct.price,
          }
        })
      }else{

        console.log('adding', newProduct)
        
      dispatch({
        type: 'ADD_PRODUCT',
        payload: { ...newProduct, ID: Date.now() },
      });
    }
      setNewProduct({
        name: '',
        price: '',
      });
    }
  };

  const deleteProduct = (productID) => {
    console.log('deleted',productID);
    dispatch({
      type: 'DELETE_PRODUCT',
      payload: productID,
    });
  };


  
  const updateProduct = (product ) => {
    console.log('new',product);
  
//       const productIndex = products.findIndex(p => p.ID ===product.ID);
//       console.log('oldmmm', productIndex);

//       if (productIndex !== -1){
//         const updatedProduct = products[productIndex];
// console.log('newmmm', updatedProduct);
        setNewProduct({
          ID: product.ID,
          name: product.name,
          price: product.price,
    
        })

      // }

      
    
    };
  

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