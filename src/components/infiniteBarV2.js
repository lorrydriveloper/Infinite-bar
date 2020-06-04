import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const InfiniteBarV2 = () => {
  let [logos, setLogos] = useState([]);
  fetch(
    "https://w6jnvo997d.execute-api.eu-west-2.amazonaws.com/test/technical-test"
  )
    .then((response) => response.json())
    .then((json) => {
      setLogos(json.body.urls);
    });

  useEffect(() => {
    let left = 0;
    let initialLeft = 0;
    let i = 0;
    let translateX = 0;

    const moveleft = setInterval(() => {
      let images = document.querySelectorAll(".logo-container");
      let track = document.querySelector(".trackv2");
      // it gives dynamically absolute positioning images a left attribute
      images.forEach((node, i) => {
        node.style.left = initialLeft - left + "px";
        initialLeft += node.getBoundingClientRect().width;
        if (i === images.length - 1) {
          initialLeft = 0;
        }
      });

      if (track.children[i]) {
        let element = track.children[i].getBoundingClientRect();
        if (element.x + element.width < 0) {
          const totalWidth = Array.from(images).reduce((sum, image) => {
            return image.getBoundingClientRect().width + sum;
          }, 0);
          translateX = translateX >= totalWidth ? translateX : totalWidth;
          track.children[i].style.transform = `translateX(${translateX}px)`;
          i++;
          // end of images and new loop start.
          if (i === images.length) {
            i = 0;
            translateX += totalWidth;
          }
        }
      }

      left += 1;
    }, 5);

    return () => clearInterval(moveleft);
  }, []);

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
