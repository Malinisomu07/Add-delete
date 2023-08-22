// ProductList


import React from 'react';
import { Link } from 'react-router-dom';

function ProductList(props) {

  const {deleteProduct, products} = props

  return (
    <div className='container'>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.ID}>
            {product.name} - {product.price}
            <button onClick={() => deleteProduct(product.ID)}>Delete</button>
            {/* <button onClick={() => productUpdate(product.ID)}>Update</button> */}
          </li>
        ))}
      </ul>
      <Link to = "/">
      <button> Go Back</button>

      </Link>
    </div>
  );
}

export default ProductList;





// Crud


import React, { useState } from 'react';
import '../Styles/crud.css';
import { Link} from 'react-router-dom';


function Crud(props) {

  const {setNewProduct, newProduct, addProduct, products, updateProduct} = props
  const [updatingProductId, setUpdatingProductId] = useState(null)
  const [updatedName, setUpdateName] = useState('');
  const [updatedPrice, setUpdatePrice] = useState('');

  const saveUpdate = (productID) => {
    if (updatedName !=='' && updatedPrice !=='') {
      updateProduct(productID, {name: updatedName, price: updatedPrice});
      setUpdatingProductId(null);
      setUpdateName('');
      setUpdatePrice('');
    }
  }
 
  return (
    <div className='container'>
      
      <div>
        <h2>Add New Product</h2>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <br />
        <br />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <br />
        <br />
        <button onClick={addProduct}>Add Product</button>
        
        <Link to={{ pathname: "/ProductList"}}>
        <button >Show Product</button>
        </Link>


      </div>

      <div>
        <h2>Update Products</h2>
        <ul>
          {products.map((product) => (
            <li key ={product.Id}>
              {product.name} - {product.price}
              {updatingProductId === product.ID} 

         <div>
        <input
          type="text"
          placeholder="Update Name"
          value={updatedName}
          onChange={(e) =>
            setUpdateName(e.target.value)
          }
        />
        <input
          type="number"
          placeholder="Update Price"
          value={updatedPrice}
          onChange={(e) =>
            setUpdatePrice(e.target.value)
          }
        />
        </div>

        <button onClick={()=> saveUpdate(product.ID)}>Save</button>

        
        </li>
        ))}
        </ul>
      </div>

    </div>
  );
}

export default Crud;





// APP


import React, { useReducer, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Crud from './components/Crud';
import ProductList from './components/ProductList';

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

    // case 'FETCH_PRODUCTS':
    //   return  action.payload
        

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

// useEffect(() =>{
//   fetch('/api/products')
//   .then(response => response.json())
//   .then(product => 
//     dispatch({type: 'FETCH_PRODUCTS', payload:product})
//   )
//   .catch(error => {
//     console.log(error)
//   });
// },[])


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

  const updateProduct = (productID, updatedProduct) => {
    dispatch({
      type: 'UPDATE_PRODUCT',
      payload: {
        ID: productID,
        updatedProduct: updatedProduct,
      },
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Crud
              setNewProduct={setNewProduct}
              newProduct={newProduct}
              addProduct={addProduct}
              products={products}
              updateProduct={updateProduct} // Pass the updateProduct function
            />} />
        <Route path="/ProductList" element={<ProductList products={products}  deleteProduct={deleteProduct} />} />
      </Routes>

      {/* <div>
        <h2>API Data</h2>
        {products.map(item =>(
          <li key ={item.id}>{item.name},{item.price}</li>
        ))}
      </div> */}
          </BrowserRouter>
  );
}

export default App;