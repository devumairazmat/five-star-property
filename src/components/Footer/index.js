// React
import React from 'react';
import { Github, Instagram, Youtube } from 'react-bootstrap-icons';

// CSS
import './index.css';

const Footer = () => {
    return (
        <footer className="mt-3 py-4">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 mb-3 mb-lg-0 d-flex" style={{ gap: '1.5rem' }}>
                        <a href="https://www.instagram.com/" className="social-media-icon" target="_blank" rel="noreferrer">
                            <Instagram />
                        </a>
                        <a href="https://github.com/devumairazmat" className="social-media-icon" target="_blank" rel="noreferrer">
                            <Github />
                        </a>
                        <a href="https://www.youtube.com/channel/UCFbzQWPGA17_gKzotx207jQ" className="social-media-icon" target="_blank" rel="noreferrer">
                            <Youtube />
                        </a>
                    </div>
                    <div className="col-lg-4 text-lg-right">
                        <p>@Copyright 2022 Powered and Managed by Dev Uamir</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
