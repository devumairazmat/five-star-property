// React
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  ArchiveFill,
  ArrowLeft as ArrowLeftIcon,
  Bag as BagIcon,
  Cart as CartIcon,
  DisplayportFill,
  PlusSquareDotted,
} from "react-bootstrap-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { useLocation } from "react-router-dom";

// Layouts
import BaseLayout from "../../../layouts/BaseLayout";

// Components
import ReviewBody from "../../../components/ReviewBody";
import Fancybox from "../../../components/Fancybox";

// Utils
import { apiWhatsappLink } from "../../../utils/data";

// Assets
import {
  Residence1IMG,
  Residence2IMG,
  Residence3IMG,
} from "../../../assets/images";

// CSS
import "swiper/css";
import "./index.css";

const Property = () => {
  const navigate = useNavigate();
  const [property, setProperty] = useState([]);
  const id = useLocation().state;
  const handleAddToCart = () => {
    navigate("/carts");
  };
  const apiUrl = process.env.REACT_APP_API_URL + "api/properties/get";

  useEffect(() => {
    const unsub = async () => {
      try {
        const res = await axios.post(apiUrl, {
          find: { _id: id },
          limit: "1",
        });
        if (res.status === 200) {
          setProperty(res.data.properties[0]);
        } else {
          console.log(res.data);
        }
        console.log(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    unsub();
  }, [id]);

  return (
    <BaseLayout title="Property">
      <section id="property">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <Link to="/properties" className="btn btn-outline-primary">
                <ArrowLeftIcon />
                <span className="mx-2">Back to Properties</span>
              </Link>
            </div>
          </div>
          <div className="row">
            <Fancybox options={{ infinite: false }}>
              <div className="residence-thumbnail col-lg-6">
                <img
                  className="img-fluid"
                  src={Residence1IMG}
                  alt="residence"
                  data-fancybox="residence-thumb"
                  data-src={Residence1IMG}
                />
                <div className="residence-thumbs">
                  <img src={property.image} width={500} height={350} alt="" />
                </div>
              </div>
            </Fancybox>
            <div className="col-lg-6 mt-5 pt-3 mt-lg-0">
              <div className="card card-user">
                <div className="card-body card-user">
                  <h5 className="card-title card-user">{property.title}</h5>
                  <h6 className="card-subtitle card-user">
                    {property.location}
                  </h6>
                  <div
                    className="d-flex mt-4"
                    style={{
                      flexWrap: "wrap",
                      columnGap: "1.5rem",
                      rowGap: "0.4rem",
                    }}
                  >
                    <div className="bed-icon">
                      <DisplayportFill />
                      <span className="ml-2">{property.beds} Beds</span>
                    </div>
                    <div className="bath-icon">
                      <ArchiveFill />
                      <span className="ml-2">{property.baths} Bath</span>
                    </div>
                    <div className="square-icon">
                      <PlusSquareDotted />
                      <span className="ml-2">{property.area} m2</span>
                    </div>
                  </div>
                  <div
                    className="d-flex my-4"
                    style={{ flexWrap: "wrap", gap: "1rem" }}
                  >
                    <button
                      className="btn btn-outline-primary"
                      onClick={handleAddToCart}
                    >
                      <CartIcon />
                      <span className="mx-2">Add to Cart</span>
                    </button>
                    <a
                      href="https://wa.me/message/BPOLGRDUPQKWG1"
                      className="btn btn-primary"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <BagIcon />
                      <span className="mx-2">Buy Now</span>
                    </a>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3 mt-lg-5 pt-lg-5">
            <div className="col-md-8 col-12">
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item mb-2" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-description-tab"
                    data-toggle="pill"
                    data-target="#pills-description"
                    type="button"
                    role="tab"
                    aria-controls="pills-description"
                    aria-selected="true"
                  >
                    Description
                  </button>
                </li>
                <li className="nav-item ml-2" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-reviews-tab"
                    data-toggle="pill"
                    data-target="#pills-reviews"
                    type="button"
                    role="tab"
                    aria-controls="pills-reviews"
                    aria-selected="false"
                  >
                    Reviews
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-description"
                  role="tabpanel"
                  aria-labelledby="pills-description-tab"
                >
                  <p>{property.description}</p>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-reviews"
                  role="tabpanel"
                  aria-labelledby="pills-reviews-tab"
                >
                  <ReviewBody
                    name="Muhammad Zachrie Kurniawan"
                    username="zachriek"
                    image="https://avatars.githubusercontent.com/u/82297739?v=4"
                    body="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos dicta molestiae inventore temporibus minus fugiat! Odit dolore nihil obcaecati eaque rem repellendus labore, magnam nobis eius repudiandae placeat culpa aut."
                  />
                  <ReviewBody
                    name="Muhammad Zachrie Kurniawan"
                    username="zachriek"
                    image="https://avatars.githubusercontent.com/u/82297739?v=4"
                    body="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos dicta molestiae inventore temporibus minus fugiat! Odit dolore nihil obcaecati eaque rem repellendus labore, magnam nobis eius repudiandae placeat culpa aut."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
};

export default Property;
