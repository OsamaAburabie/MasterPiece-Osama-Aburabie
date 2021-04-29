import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";

function SendRate({ taskId, id }) {
  const [value, setValue] = useState(0);
  const [rateobj, setRateobj] = useState();
  const { myToken, setNotification, notification } = useContext(AuthContext);

  const handlerate = (event, newValue) => {
    setValue(newValue);
    // setRateobj({ rate: newValue });
    axios
      .post(
        `http://localhost:5000/users/rate/${taskId}/${id}`,
        { rate: newValue },
        {
          headers: { "x-auth-token": myToken },
        }
      )
      .then((res) =>
        setNotification(notification.filter((el) => el._id !== id))
      );
  };

  return (
    <div dir="ltr" className="flex justify-end">
      <Rating name="simple-controlled" value={value} onChange={handlerate} />
    </div>
  );
}

export default SendRate;
