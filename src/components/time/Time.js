import React from "react";
import { useState, useEffect } from "react";
function Time() {
  const [time, setTime] = useState(new Date().toString());

  useEffect(() => {
    console.log("Time Updated");
    const interval = setInterval(showTime, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [time]);

  function showTime() {
    setTime(new Date().toString());
  }
  return <p>{time}</p>;
}
export default Time;
