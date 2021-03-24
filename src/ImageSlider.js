import React, { useState } from "react";
import "./ImageSlider.css";

import { ImageSliderData } from "./ImageSliderData";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

function ImageSlider({ slides }) {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className="slider">
      <ChevronLeftIcon className="left-arrow" onClick={prevSlide} />

      <ChevronRightIcon className="right-arrow" onClick={nextSlide} />

      {ImageSliderData.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <img
                src={slide.image}
                alt="Amazon Home Banner"
                className="slider__image"
              />
            )}
          </div>
        );
      })}
    </section>
  );
}

export default ImageSlider;
