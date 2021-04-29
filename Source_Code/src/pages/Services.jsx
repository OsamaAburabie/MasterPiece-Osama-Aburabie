import React, { useEffect, useState } from "react";
import HomeCard from "../components/HomeCard";
import axios from "axios";
import { NavLink } from "react-router-dom";
function Services() {
  const [category, setCategory] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/getallCategories")
      .then((res) => setCategory(res.data));
  }, []);
  return (
    <div className="  p-4 ">
      <div className=" grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4">
        {/* cards go here */}
        {category &&
          category.map((el) => (
            <NavLink to={`/services/${el._id}`}>
              <div key={el._id} className="card">
                <img
                  src={el.picture}
                  alt="stew"
                  className="h-32 sm:h-48 w-full object-cover"
                />
                <div dir="rtl" className="m-4">
                  <span className="font-bold">{el.name}</span>
                  <span className="block  text-sm">
                    <i className="fas fa-tags ml-1"></i>
                    معدل الأجر ({el.min}-{el.high}) دينار
                  </span>
                </div>
              </div>
            </NavLink>
          ))}
      </div>
    </div>
  );
}

export default Services;
