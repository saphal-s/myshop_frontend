import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBanners } from "../../redux/features/bannerSlice";
import Slider from "react-slick";

console.log(process.env.REACT_APP_API_URL);

const Banner = () => {
  const { banners } = useSelector((state) => state.banner);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="banner_container">
      <Slider {...settings}>
        {banners &&
          banners.map((b) => (
            <div key={b._id}>
              <img
                src={`${process.env.REACT_APP_API_URL}/${b.image}`}
                alt="banner_image"
              />
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default Banner;
