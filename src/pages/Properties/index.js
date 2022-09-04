// React
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

// Layout
import BaseLayout from "../../layouts/BaseLayout";
import { residencesData } from "../../utils/data";

// Components
import ResidenceCard from "../../components/ResidenceCard";
import Fancybox from "../../components/Fancybox";

// CSS
import "./index.css";

const Properties = () => {
  const [properties, setProperties] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL + "api/properties/get";

  useEffect(() => {
    const unsub = async () => {
      try {
        const res = await axios.post(apiUrl, {
          sort: "descending",
        });
        if (res.status === 200) {
          setProperties(res.data.properties);
        } else {
          console.log(res.data);
        }
        console.log(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    unsub();
  }, []);
  return (
    <BaseLayout title="Properties">
      <section id="properties">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-6">
              <h2 className="heading">Properties</h2>
            </div>
            <div className="col-lg-6">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search here..."
                  style={{ padding: "1.4rem" }}
                />
                <div className="input-group-append">
                  <button type="button" className="btn btn-primary">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <Fancybox options={{ infinite: false }}>
              {properties?.map((residence, index) => (
                <div className="col-lg-4 col-md-6 col-12 mb-4" key={index}>
                  <ResidenceCard
                    residence={residence}
                    isFancybox
                    fancyboxData="residence-2"
                  />
                </div>
              ))}
            </Fancybox>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
};

export default Properties;
