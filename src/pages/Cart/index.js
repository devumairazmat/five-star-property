// React
import React, { useEffect } from 'react';
import { ArrowLeft as ArrowLeftIcon, CartCheck as CartCheckIcon, HouseDoor as HouseDoorIcon, X as XIcon } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';

// Layouts
import BaseLayout from '../../layouts/BaseLayout';

// Utils
import { apiWhatsappLink } from '../../utils/data';

// Assets
import { Residence1IMG, Residence2IMG } from '../../assets/images';

// CSS
import './index.css';

const Cart = () => {
    const navigate = useNavigate();

    const handleBuyItem = () => {
        window.open(apiWhatsappLink, '_blank');
    };

    useEffect(() => {
        if (localStorage.getItem('token') === null) navigate('/login');
    }, []);

    return (
        <BaseLayout title="Cart">
            <section id="cart">
                <div className="container">
                    <div className="row mb-4">
                        <div className="col-sm-6">
                            <h2 className="heading mb-2">My Cart</h2>
                        </div>
                        <div className="col-sm-6 d-sm-flex justify-content-end align-items-center">
                            <HouseDoorIcon />
                            <span className="ml-2">2 Items</span>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Location</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="align-middle">1.</td>
                                        <td className="align-middle">
                                            <img className="img-fluid" width="75" src={Residence1IMG} alt="residence" />
                                        </td>
                                        <td className="align-middle">Nama</td>
                                        <td className="align-middle">Lokasi</td>
                                        <td className="align-middle">Harga</td>
                                        <td className="align-middle">
                                            <button className="btn btn-primary" onClick={handleBuyItem}>
                                                <CartCheckIcon />
                                                <span className="mx-2">Buy</span>
                                            </button>
                                            <button className="btn btn-outline-primary">
                                                <XIcon />
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="align-middle">2.</td>
                                        <td className="align-middle">
                                            <img className="img-fluid" width="75" src={Residence2IMG} alt="residence" />
                                        </td>
                                        <td className="align-middle">Nama</td>
                                        <td className="align-middle">Lokasi</td>
                                        <td className="align-middle">Harga</td>
                                        <td className="align-middle">
                                            <button className="btn btn-primary" onClick={handleBuyItem}>
                                                <CartCheckIcon />
                                                <span className="mx-2">Buy</span>
                                            </button>
                                            <button className="btn btn-outline-primary">
                                                <XIcon />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-end align-items-center">
                            <Link to="/properties" className="btn btn-outline-primary">
                                <ArrowLeftIcon />
                                <span className="mx-2">Back to Properties</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </BaseLayout>
    );
};

export default Cart;
