import React from "react";
import Slider from "react-slick";

const PetList = ({ pet }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>
        <span>{pet.birth}</span>
      </div>
    </Slider>
  );
};

export default PetList;
