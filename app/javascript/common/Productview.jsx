import React from 'react';
import ProductExplorer from './ProductDetails';
import { useLocation } from 'react-router-dom';

function ProductView() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get('id');

  const product = ProductExplorer.products.find(product => product.ID === parseInt(productId));

  return (
    <div>
      <h1>This is the product view page</h1>
      {product && (
        <div>
          <h2>Product Model: {product.model}</h2>
          <h3>Product Price: {product.price}</h3>
        </div>
      )}
    </div>
  );
}

export default ProductView;
