import axios from "axios";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
function Home() {
  const [category, setCategory] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/getallCategories")
      .then((res) => setCategory(res.data));
  }, []);
  return (
    <>
      <section
        style={{
          backgroundImage: `url("https://www.hrzone.com/sites/default/files/styles/inline_banner/public/istock-1153675389.jpg?itok=CO0fYOt6")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="w-full flex justify-center items-center h-96 bg-gray-400 
      
      "
      ></section>

      <div className="grid md:grid-cols-4">
        <main className="px-6 py-6 md:col-span-4 ">
          <p className="w-full  text-center text-5xl text-secondary ">
            خدمات رائجة
          </p>

          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4">
            {/* cards go here */}
            {category &&
              category.slice(0, 4).map((el) => (
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
        </main>
      </div>
    </>
  );
}

export default Home;
