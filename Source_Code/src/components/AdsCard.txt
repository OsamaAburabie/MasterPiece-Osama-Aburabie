import { Avatar } from "@material-ui/core";
import { NavLink } from "react-router-dom";

function AdsCard({
  title,
  price,
  location,
  avatar,
  taskerName,
  taskerId,
  categoryId,
  adId,
}) {
  return (
    <div className="flex w-full h-40 m-3 mt-0 ">
      <div
        dir="rtl"
        className="h-full text-left px-4 py-4 bg-secondary shadow-md rounded-md w-full justify-end  "
      >
        <div to="jobdet" className="flex items-center flex-wrap h-20">
          <img
            alt="testimonial"
            className="inline-block object-cover object-center w-20 h-20 mb-4 bg-gray-100 rounded"
            src="https://dummyimage.com/302x302/94a3b8/ffffff"
          />
          <span className="flex flex-col items-start pr-4">
            <span className="font-bold text-lg text-secondary -mt-4">
              {title}
            </span>
            <span className="text-sm text-gray-500 uppercase font-bold">
              الموقع: {location}
            </span>
            <span className="text-sm text-gray-500 uppercase font-bold">
              الأجرة/س: {price} دينار
            </span>
          </span>
        </div>
        <div className="flex items-center justify-between flex-wrap  ">
          <NavLink
            to={`/services/${adId}/${taskerId}`}
            className="bg-btn text-btn px-3 py-2 rounded-md text-sm font-medium "
          >
            إحجز
          </NavLink>
          <div className="flex flex-wrap justify-center text-center">
            {avatar && (
              <Avatar className="headerOption__icon" src={avatar}>
                {taskerName[0]}
              </Avatar>
            )}
            <span className="text-sm block w-full text-secondary font-bold">
              {taskerName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdsCard;
