import { useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

////////////////
const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 -right-0 -translate-y-1/2 z-10 text-2xl   text-violet-600 p-2 rounded-full font-bold"
    style={{ display: "block" }}
  >
    &gt;
  </button>
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 -left-0 -translate-y-1/2 z-10 text-2xl  text-violet-600 p-2 rounded-full font-bold"
    style={{ display: "block" }}
  >
    &lt;
  </button>
);
////////////////////////

///////////////////////

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  rtl: true,
};
/////////

export default function MainSlider() {
  const sliderRef = useRef<Slider>(null);

  return (
    <div className="w-full ">
      <Slider className="" ref={sliderRef} {...sliderSettings}>
        
        <div className="w-full">
          <div className="flex w-full">
            <img
              className="h-96 w-full"
              src="../../public/colors-mascara.jpg"
              alt=""
            />
            <img
              className="h-96 w-full"
              src="../../public/colors-mascara.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="w-full">
          <div className="flex w-full">
            <img
              className="h-96 w-full"
              src="../../public/colors-mascara.jpg"
              alt=""
            />
            <img
              className="h-96 w-full"
              src="../../public/colors-mascara.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="w-full">
          <div className="flex w-full">
            <img
              className="h-96 w-full"
              src="../../public/colors-mascara.jpg"
              alt=""
            />
            <img
              className="h-96 w-full"
              src="../../public/colors-mascara.jpg"
              alt=""
            />
          </div>
        </div>
      </Slider>
    </div>
  );
}
