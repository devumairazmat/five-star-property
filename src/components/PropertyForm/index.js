// React
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/slices/Auth";

// Layouts
import BaseLayout from "../../layouts/BaseLayout/index";

// Utils
import { baseApiUrl } from "../../utils/fetchApi";

const PropertyForm = () => {
  const dispatch = useDispatch();
  const [propertyData, setpropertyData] = useState({
    img: "",
    title: "",
    status: "",
    price: "",
    area: "",
    beds: "",
    baths: "",
    garages: "",
  });
  console.log(propertyData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setpropertyData({
      ...propertyData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <BaseLayout title="Register">
      <div className="container mt-4 mb-4 p-4">
        <div className="card card-user">
          <div className="card-body card-user p-4">
            <h1>Add Property Data To Submit</h1>
            <form method="POST" onSubmit="">
              {/* Image*/}
              <div className="form-group">
                <label htmlFor="image" className="form-label">
                  Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="img"
                  value={propertyData.img}
                  onChange={handleChange}
                  placeholder="img.."
                  alt="Submit"
                  width="48"
                  height="48"
                  required
                />
              </div>
              {/* title */}
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={propertyData.title}
                  onChange={handleChange}
                  placeholder="Title....."
                  required
                />
              </div>
              {/* status */}
              <div className="form-group">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="status"
                  name="status"
                  value={propertyData.status}
                  onChange={handleChange}
                  placeholder="status..."
                  required
                />
              </div>
              {/* price */}
              <div className="form-group">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  name="price"
                  value={propertyData.price}
                  onChange={handleChange}
                  placeholder="price..."
                  required
                />
              </div>
              {/* area */}
              <div className="form-group">
                <label htmlFor="area" className="form-label">
                  Area
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="area"
                  name="area"
                  value={propertyData.area}
                  onChange={handleChange}
                  placeholder="area..."
                  required
                />
              </div>
              {/* Beds */}
              <div className="form-group">
                <label htmlFor="beds" className="form-label">
                  Beds
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="beds"
                  name="beds"
                  value={propertyData.beds}
                  onChange={handleChange}
                  placeholder="beds..."
                  required
                />
              </div>
              {/* baths */}
              <div className="form-group">
                <label htmlFor="baths" className="form-label">
                  Baths
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="baths"
                  name="baths"
                  value={propertyData.baths}
                  onChange={handleChange}
                  placeholder="baths..."
                  required
                />
              </div>
              {/* garages */}
              <div className="form-group">
                <label htmlFor="garages" className="form-label">
                  Garages
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="garages"
                  name="garages"
                  value={propertyData.garages}
                  onChange={handleChange}
                  placeholder="garages..."
                  required
                />
              </div>
              <button type="submit" className="btn btn-block btn-primary mt-5">
                Submit Property
              </button>
            </form>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default PropertyForm;
