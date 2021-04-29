import { useEffect, useState, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import NotFound from "./NotFound";

import TaskerAdCard from "../components/TaskerAdCard";
function TaskerAdsUpdate() {
  const { catId } = useParams();
  const [category, setCategory] = useState();
  const [ads, setAds] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfpages] = useState(0);
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  const messageRef = useRef();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [pageNumber]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/getallCategories")
      .then((res) => setCategory(res.data));
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/users/getallfromCategory/${catId}?page=${pageNumber}`
      )
      .then((res) => {
        setAds(res.data.ads);
        setNumberOfpages(res.data.totalPages);
      });
  }, [pageNumber, catId]);

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };

  if (ads && ads.length === 0) return <NotFound />;

  if (!ads) return <div className=" bg-primary h-screen"></div>;
  return (
    // <div className="min-h-screen grid grid-cols-1 md:grid-cols-12  gap-4 p-5"></div>
    <div className="min-h-screen ">
      <div ref={messageRef}></div>
      <div className="container w-full md:w-10/12 mx-auto p-4  grid grid-cols-12">
        {/* <div className="col-span-12 h-40 bg-gray-200"></div> */}
        {/* //========================================================================================== */}
        <div className="col-span-0 hidden md:block md:col-span-5 py-3 px-7   ">
          {category &&
            category
              .filter((el) => el._id !== catId)
              .slice(0, 4)
              .map((el) => (
                <NavLink to={`/services/${el._id}`}>
                  <div key={el._id} className="card mb-3">
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
        {/* //========================================================================================== */}
        <div className="col-span-12 md:col-span-7 py-3 ">
          <div className="grid grid-cols-1 gap-3 place-items-center">
            {ads &&
              ads.map((el) => (
                <TaskerAdCard
                  key={el._id}
                  title={el.title}
                  price={el.price}
                  location={el.location}
                  avatar="https://scontent.famm10-1.fna.fbcdn.net/v/t31.18172-8/23632407_1481745538541088_4407289845242811931_o.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=f5pa2FLFEAsAX8jY3yj&_nc_ht=scontent.famm10-1.fna&oh=2675a517602d9067dae43697e59d5af8&oe=609FE6F7"
                  taskerName={el.taskerInfo.name}
                  taskerId={el.taskerInfo.uid}
                  categoryId={catId}
                  adId={el._id}
                  date={el.createdAt}
                />
              ))}
            {numberOfPages && numberOfPages > 1 && (
              <div className="flex">
                <button
                  className=" bg-btn text-btn  p-2 mr-1 text-center"
                  onClick={gotoPrevious}
                >
                  رجوع
                </button>

                {pages.map((pageIndex) => (
                  <button
                    className=" bg-btn text-btn l p-2 w-10 mr-1 text-center"
                    key={pageIndex}
                    onClick={() => setPageNumber(pageIndex)}
                  >
                    {pageIndex + 1}
                  </button>
                ))}
                <button
                  className=" bg-btn text-btn  p-2 mr-1 text-center"
                  onClick={gotoNext}
                >
                  التالي
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskerAdsUpdate;
