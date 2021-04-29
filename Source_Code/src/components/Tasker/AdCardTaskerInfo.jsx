import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";

function AdCardTaskerInfo({ taskerId, adId, handleLoading }) {
  const [tasker, setTasker] = useState({});
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);

  const getTaskerInfo = async () => {
    const res = await axios.get(
      `http://localhost:5000/users/taskerInfo/${taskerId}`
    );

    setTasker(res.data.tasker);
    setRating(res.data.tasker.rating.sum);
    setLoading(false);
    handleLoading();
  };
  useEffect(() => {
    getTaskerInfo();
  }, []);
  return (
    <div className="h-full w-54  flex justify-center items-center py-1 flex-wrap">
      <ReactPlaceholder
        type="round"
        style={{ width: "10rem", height: "10rem", display: "flex" }}
        rows={5}
        ready={!loading}
      >
        <div className="w-full flex justify-center flex-wrap  border-l">
          <img
            src={tasker?.img}
            alt="anything"
            className="w-28 h-28 md:w-24 md:h-24 object-cover rounded-full"
          />
          <div className="w-full  text-center px-2 text-secondary">
            <span className="capitalize">{tasker?.name}</span>
            <div className="w-full flex justify-center">
              <Rating name="read-only" value={rating} readOnly />
            </div>
            <NavLink
              to={`/services/${adId}/${taskerId}`}
              className="hidden bg-btn mt-1 md:block text-btn w-full p-1 rounded-md"
            >
              التفاصيل
            </NavLink>
          </div>
        </div>
      </ReactPlaceholder>
    </div>
  );
}

export default AdCardTaskerInfo;
