// React
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProperty } from "../../redux/slices/Property";

// Layouts
import BaseLayout from "../../layouts/BaseLayout/index";

// Utils
import { baseApiUrl } from "../../utils/fetchApi";

const PropertyForm = () => {
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState();
  const [propertyData, setpropertyData] = useState({
    location: "",
    title: "",
    description: "",
    status: "",
    price: "",
    area: "",
    beds: "",
    baths: "",
  });
  console.log(propertyData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setpropertyData({
      ...propertyData,
      [e.target.name]: e.target.value,
    });
  };

  const submit = () => {
    dispatch(
      addProperty({
        propertyData,
        photo,
      })
    );
  };

  return (
    <BaseLayout title="Register">
      <div className="container mt-4 mb-4 p-4">
        <div className="card card-user">
          <div className="card-body card-user p-4">
            <h1>Add Property Data To Submit</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
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
                  onChange={(e) => setPhoto(e.target.files[0])}
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
              {/* Location */}
              <div className="form-group">
                <label htmlFor="location" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  name="location"
                  value={propertyData.location}
                  onChange={handleChange}
                  placeholder="Location....."
                  required
                />
              </div>
              {/* description */}
              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={propertyData.description}
                  onChange={handleChange}
                  placeholder="Description....."
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
