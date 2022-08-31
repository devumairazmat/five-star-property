// React
import React from 'react';
import { Github, Globe, Instagram, Linkedin } from 'react-bootstrap-icons';

// CSS
import './index.css';

const Footer = () => {
    return (
        <footer className="mt-3 py-4">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 mb-3 mb-lg-0 d-flex" style={{ gap: '1.5rem' }}>
                        <a href="https://dev-devumairazmat.pantheonsite.io" className="social-media-icon" target="_blank" rel="noreferrer">
                            <Globe />
                        </a>
                        <a href="https://github.com/devumairazmat" className="social-media-icon" target="_blank" rel="noreferrer">
                            <Github />
                        </a>
                        <a href="https://www.linkedin.com/in/umair-azmat-364a5a1a5/" className="social-media-icon" target="_blank" rel="noreferrer">
                            <Linkedin />
                        </a>
                    </div>
                    <div className="col-lg-6 text-lg-right">
                        <p>@Copyright 2022 Powered and Managed by <a href="https://dev-devumairazmat.pantheonsite.io/"> Dev Umair</a></p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
