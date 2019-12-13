import * as React from "react";
import { Carousel } from "antd";
import "../landing.css";

class HomeCarousel extends React.Component<any, any> {
  render() {
    return (
      <Carousel autoplay>
        <img
          className="d-block w-100"
          src="https://firebasestorage.googleapis.com/v0/b/my-guitar-shop.appspot.com/o/carousel%2Fcarousel_guitars.jpg?alt=media&token=3492b47a-c62c-4c3e-ac3a-1e0e0f99d420"
        />
        <img
          className="d-block w-100"
          src="https://firebasestorage.googleapis.com/v0/b/my-guitar-shop.appspot.com/o/carousel%2Fcarousel_amps.jpg?alt=media&token=9628859c-f8f2-43f6-b93d-b3e64916e3bd"
        />
        <img
          className="d-block w-100"
          src="https://firebasestorage.googleapis.com/v0/b/my-guitar-shop.appspot.com/o/carousel%2Fcarousel_amp_cords.jpg?alt=media&token=f812b5ad-9f4a-40b3-86b6-0e86e0d1b709"
        />
      </Carousel>
    );
  }
}

export default HomeCarousel;
