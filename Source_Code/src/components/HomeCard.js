import React from "react";
import { NavLink } from "react-router-dom";

function HomeCard({ title, img, min, high, link }) {
  return (
    // <div className="flex w-full">
    <NavLink className="flex w-full" to={`/services/${link}`}>
      <div
        dir="rtl"
        className="bg-gray-100 w-full md:h-72 h-36 m-4 md:m-8  rounded-md shadow-md "
        style={{
          backgroundImage: `url(${img})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-row items-end h-full w-full ">
          <div className="flex flex-col w-full pb-3 pt-10 px-3 bg-gradient-to-t from-black text-gray-200">
            <h3 className="text-base font-bold leading-5 uppercase">{title}</h3>
            <div className="inline-flex items-center">
              <span className="capitalize font-base text-xs my-1 m-1">
                معدل الأجر {min}$-{high}$
              </span>
              <i className="fas fa-tags"></i>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </NavLink>
  );
}

export default HomeCard;
