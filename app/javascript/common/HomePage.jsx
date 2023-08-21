import React, { useState } from 'react';
import Header from '../common/header';
import '../Styles/Home.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductExplorer from './ProductDetails';
import ProductView from './Productview';


const HomePage = () => {
    const [showProduct, setShowProduct] = useState(false);

    const displayProduct = () => (
        <ProductView />
    )


    const handleAdd = () => {
        setShowProduct(!showProduct)
    }

    return (
        <>
            <Header />
            <div className="container">
                <div className="main">
                    <center>
                        <h1>Welcome to My Homepage</h1>
                        <p>This is the content of the home page.</p>
                    </center>

                    <div className="row my-4">
                        {ProductExplorer.products.slice(0, 4).map((product, index) => (
                            <div className="col-md-3" key={index}>
                                <Card>
                                    <Card.Img variant="top" src={product.image} alt={product.title} />
                                    <Card.Body>
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Text>{product.description}</Card.Text>
                                        <Link to={`/Productview?id=${product.ID}`}>
                                            <button>{ProductExplorer.products[index].buttonText}</button>
                                        </Link>


                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>

                    <div className="my-4" />
                    <div className="row my-4">
                        {ProductExplorer.products.slice(4, 8).map((product, index) => (
                            <div className="col-md-3" key={index}>
                                <Card>
                                    <Card.Img variant="top" src={product.image} alt={product.title} />
                                    <Card.Body>
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Text>{product.description}</Card.Text>
                                        <Link to="/Productview">
                                            <Button variant="primary" onClick={handleAdd}>
                                                {ProductExplorer.products[index].buttonText}
                                            </Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {showProduct && displayProduct()}
        </>
    );
};

export default HomePage;
