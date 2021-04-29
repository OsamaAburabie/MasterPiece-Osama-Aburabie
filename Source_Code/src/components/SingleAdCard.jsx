import { useCallback, useState } from "react";
import "./SingleAdCard.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import ImageViewer from "react-simple-image-viewer";

function SingleAdCard({
  title,
  price,
  location,
  avatar,
  taskerName,
  categoryId,
  adId,
  desc,
  img,
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const images = [img];
  const openImageViewer = useCallback(() => {
    // setCurrentImage(img);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    // setCurrentImage(0);
    setIsViewerOpen(false);
  };
  return (
    <div dir="rtl" className="bg-secondary  shadow-sm">
      <img
        src={img}
        alt="stew"
        className=" sm:h-96 w-full object-cover cursor-pointer"
        onClick={() => openImageViewer()}
      />
      <div className="p-4 ">
        <span className="flex flex-col items-start ">
          <span className="font-bold  text-lg text-secondary ">{title}</span>
          <span className="text-md text-secondary ">
            <LocationOnIcon />
            الموقع: {location}
          </span>
          <span className="text-md text-secondary  ">
            <LocalAtmIcon />
            الأجرة/س: {price} دينار
          </span>
          <p className="text-md mt-3 text-secondary">التفاصيل:</p>
          <span className="text-md text-secondary  ">{desc}</span>
        </span>
      </div>
      {isViewerOpen && (
        <ImageViewer
          src={images}
          // currentIndex={currentImage}
          onClose={closeImageViewer}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
        />
      )}
    </div>
  );
}

export default SingleAdCard;
