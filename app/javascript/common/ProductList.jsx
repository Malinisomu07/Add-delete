import React from 'react';
import { Link } from 'react-router-dom';

function ProductList(props) {

  const {deleteProduct, updateProduct, products} = props

  return (
    <div className='container'>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.ID}>
            {product.name} - {product.price}
            <button onClick={() => deleteProduct(product.ID)}>Delete</button>

            <Link to={{ pathname: "/" }}>
               <button onClick={() => updateProduct(product.ID)}>Update</button>
            </Link>

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
