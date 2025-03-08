import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Mantra.css";

const Mantra = () => {
  const mantras = [
    "“The best fertilizer is the farmer's shadow.”",
    "“Agriculture is the foundation of civilization.”",
    "“The earth is what we all have in common.”",
    "“Farming is a profession of hope.”",
    "“Without agriculture, life is impossible.”",
    "“Sowing seeds of knowledge for the future.”",
    "“A farm is a reflection of the farmer's work.”",
    "“Farmers are the backbone of a nation.”",
    "“The farmer is the one who feeds the world.”",
    "“In every grain of rice, there's a farmer's care.”"
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="mantra-carousel">
      <Slider {...settings}>
        {mantras.map((quote, index) => (
          <div key={index} className="mantra-slide">
            <p>{quote}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Mantra;
