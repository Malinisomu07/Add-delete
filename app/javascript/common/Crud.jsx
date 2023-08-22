import React, { useState } from 'react';
import '../Styles/crud.css';
import { Link} from 'react-router-dom';


function Crud(props) {

  const {setNewProduct, newProduct, addProduct, products, updateProduct} = props
  const [updatedName, setUpdateName] = useState('');
  const [updatedPrice, setUpdatePrice] = useState('');

  const saveUpdate = (productID) => {
    if (updatedName !=='' && updatedPrice !=='') {
      updateProduct(productID, {name: updatedName, price: updatedPrice});
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
