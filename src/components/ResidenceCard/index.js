// React
import React from "react";
import propTypes from "prop-types";
import {
  ArchiveFill,
  DisplayportFill,
  PlusSquareDotted,
} from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";

const ResidenceCard = ({ residence, isFancybox, fancyboxData }) => {
  const navigate = useNavigate();
  const redirect = (id) => {
    navigate("/properties/single", { state: id });
  };
  return (
    <div
      className="card card-user"
      data-fancybox={isFancybox ? fancyboxData : ""}
      data-src={isFancybox ? residence.image : ""}
    >
      <img
        src={residence.image}
        alt="residence-img"
        className="card-img-top card-user"
      />
      <div className="card-body card-user">
        <span onClick={() => redirect(residence._id)}>
          <h5 className="card-title card-user">{residence.title}</h5>
        </span>
        <h6 className="card-subtitle card-user">{residence.location}</h6>
        <div
          className="d-flex mt-4"
          style={{ flexWrap: "wrap", columnGap: "1.5rem", rowGap: "0.4rem" }}
        >
          <div className="bed-icon">
            <DisplayportFill />
            <span className="ml-2">
              {residence.beds} {residence.beds > 1 ? "Beds" : "Bed"}
            </span>
          </div>
          <div className="bath-icon">
            <ArchiveFill />
            <span className="ml-2">
              {residence.baths} {residence.baths > 1 ? "Bath" : "Baths"}
            </span>
          </div>
          <div className="square-icon">
            <PlusSquareDotted />
            <span className="ml-2">{residence.area} m2</span>
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
