// React
import React from 'react';
import propTypes from 'prop-types';
import { ArchiveFill, DisplayportFill, PlusSquareDotted } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const ResidenceCard = ({ residence, isFancybox, fancyboxData }) => {
    return (
        <div className="card card-user" data-fancybox={isFancybox ? fancyboxData : ''} data-src={isFancybox ? residence.image : ''}>
            <img src={residence.image} alt="residence-img" className="card-img-top card-user" />
            <div className="card-body card-user">
                <Link to="/properties/single">
                    <h5 className="card-title card-user">{residence.name}</h5>
                </Link>
                <h6 className="card-subtitle card-user">{residence.location}</h6>
                <div className="d-flex mt-4" style={{ flexWrap: 'wrap', columnGap: '1.5rem', rowGap: '0.4rem' }}>
                    <div className="bed-icon">
                        <DisplayportFill />
                        <span className="ml-2">
                            {residence.bed} {residence.bed > 1 ? 'Beds' : 'Bed'}
                        </span>
                    </div>
                    <div className="bath-icon">
                        <ArchiveFill />
                        <span className="ml-2">
                            {residence.bath} {residence.bath > 1 ? 'Bath' : 'Baths'}
                        </span>
                    </div>
                    <div className="square-icon">
                        <PlusSquareDotted />
                        <span className="ml-2">{residence.size} m2</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

ResidenceCard.propTypes = {
    isFancybox: propTypes.bool,
};

export default ResidenceCard;
