import React, { useState, useEffect } from "react";

function tranformCSS() {
  let left = 0;
  let initialLeft = 0;
  let i = 0;
  let translateX = 3750;

  const moveleft = setInterval(() => {
    let images = document.querySelectorAll(".logo-container");
    let track = document.querySelector(".trackv2");
    // it gives dynamically absolute positioning images a left attribute
    images.forEach((node, i) => {
      node.style.left = initialLeft - left + "px";
      initialLeft += 250;
      if (i === 14) {
        initialLeft = 0;
      }
    });

    if (left % 250 === 1 && track.children[i]) {
      track.children[i].style.transform = `translateX(${translateX}px)`;
      i++;
      // end of images and new loop start.
      if (i === 15) {
        i = 0;
        translateX += 3750; // increment (250*15) 
      }
    }
    left += 1;
  }, 20);

  return () => clearInterval(moveleft);
}

const InfiniteBarV2 = () => {
  let [logos, setLogos] = useState([]);
  fetch(
    "https://w6jnvo997d.execute-api.eu-west-2.amazonaws.com/test/technical-test"
  )
    .then((response) => response.json())
    .then((json) => {
      setLogos(json.body.urls);
    });

  useEffect(tranformCSS, []);

  return (
    <div className="track trackv2">
      {logos.map((url, index) => {
        return (
          <div key={index} className="logo-container logo-continerV2">
            <img src={url} alt="logo" />
          </div>
        );
      })}
    </div>
  );
};

export default InfiniteBarV2;
