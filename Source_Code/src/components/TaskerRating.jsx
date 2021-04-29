import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import { useEffect, useState } from "react";

function TaskerRating({ taskerId, word }) {
  const [rating, setRating] = useState(0);

  const getRate = async () => {
    const res = await axios.get(
      `http://localhost:5000/users/taskerRating/${taskerId}`
    );

    setRating(res.data);
  };

  useEffect(() => {
    getRate();
  }, []);

  return (
    <div className="w-full flex justify-center">
      <Rating name="read-only" value={rating} readOnly />

      {/* {word && <p className="text-sm text-secondary">{`(${resutl} صوتاً )`}</p>} */}
    </div>
  );
}

export default TaskerRating;
