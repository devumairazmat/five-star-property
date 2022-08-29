import React from "react";
import Time from "../../components/time/Time";
import { useState } from "react";

function Development() {
  const [flag, setFlag] = useState(true);
  const toogle = () => {
    console.log("Toogle Clicked");
    setFlag(!flag);
  };

  return (
    <>
      <h1> In Development Mode </h1>
      <h3> Eanable or Disable Date and Time</h3>
      <h5>
        <button onClick={toogle}>Toogle Time & Date</button>
        {flag ? <Time /> : "Date and Time Disabled"}
      </h5>
      <h3>Five Star Property Coming Soon. Thanks For Your Patience</h3>
      <a href="https://dev-devumairazmat.pantheonsite.io/">Dev Umair Azmat</a>
    </>
  );
}

export default Development;
