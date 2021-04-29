import { IconButton } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import AuthContext from "../../contexts/AuthContext";
import Messages from "../../components/Customer/Messages";
import axios from "axios";
import Moment from "react-moment";
import Rating from "@material-ui/lab/Rating";
import WorkIcon from "@material-ui/icons/Work";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import DeletePopup from "../../components/Common/DeletePopup";
import CloseIcon from "@material-ui/icons/Close";
import NotFound from "../NotFound";

function TaskTrack() {
  const { taskerId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [myTask, setMyTask] = useState();
  const [tasker, setTasker] = useState({});
  const [rating, setRating] = useState(0);
  const [show, setShow] = useState(false);

  const {
    isLoggedIn,
    role,
    username,
    pendingCon,
    checkLoggedIn,
    setPendingCon,
    myToken,
    notification,
    setNotification,
    setLoggedIn,
    myId,
  } = useContext(AuthContext);

  const [loadingError, setLoadingError] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const getTaskerInfo = async () => {
    const res = await axios.get(
      `http://localhost:5000/users/taskerInfo/${taskerId}`
    );
    setTasker(res.data.tasker);
    setRating(res.data.tasker.rating.sum);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/getTaskerTodos/${taskerId}`, {
        headers: {
          "x-auth-token": myToken,
        },
      })
      .then((res) => {
        setLoading(false);
        setTasks(res.data);
        setMyTask(...res.data.filter((el) => el.CustomerId === myId));
      })
      .catch((err) => {
        setLoading(false);
        setLoadingError(true);
      });
    getTaskerInfo();
  }, []);

  const handleShow = () => {
    setShow(!show);
  };
  if (loading) return <div className=" bg-primary h-screen"></div>;
  if (loadingError) return <NotFound taskDone />;

  return (
    <>
      <div className=" w-screen  flex justify-center flex-wrap ">
        <div className="w-full h-72  bg-secondary text-secondary grid place-items-center text-center">
          <div>
            <div className="w-full grid place-items-center">
              <img
                src={tasker?.img}
                alt="anything"
                className="w-28 h-28 md:w-40 md:h-40 object-cover rounded-full"
              />
            </div>
            <p className="text-2xl ">{tasker?.name}</p>
            <Rating name="read-only" value={rating} readOnly />
            <div>
              <p className="text-lg">
                نشط
                <span className="mr-1">
                  (
                  <Moment locale="ar" fromNow>
                    {tasker?.lastLogin}
                  </Moment>
                  )
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center my-10">
          <div className=" w-full md:w-9/12  grid grid-cols-2 md:grid-cols-3 gap-3 ">
            {tasks &&
              tasks.map((el) => (
                <div
                  dir="rtl"
                  key={el._id}
                  className={`${
                    el?._id === myTask?._id ? "bg-btn text-btn" : "bg-secondary"
                  }  relative col-span-1 p-3 flex justify-center items-center flex-wrap h-32  text-secondary shadow-sm`}
                >
                  {el.working === 3 && (
                    <div className="absolute -top-5 left-0 p-2 bg-yellow-600 text-white shadow-md">
                      <p>في الطريق</p>
                    </div>
                  )}
                  {el.working === 2 && (
                    <div className="absolute -top-5 left-0 p-2 bg-green-600 text-white shadow-md">
                      <p> جار العمل</p>
                    </div>
                  )}
                  {el.working === 1 && (
                    <div className="absolute -top-5 left-0 p-2 bg-red-600 text-white shadow-md">
                      <p>معلق</p>
                    </div>
                  )}
                  {el?._id === myTask?._id && (
                    <button
                      onClick={() => setShow(!show)}
                      className="absolute top-0 right-0 p-2 focus:outline-none"
                    >
                      <CloseIcon />
                    </button>
                  )}
                  <div>
                    <p>
                      <WorkIcon />
                      المهمة:<span className="mr-1">{el.title}</span>
                    </p>
                    <p>
                      <LocationOnIcon />
                      الموقع:
                      <span className="mr-1">{el.location}</span>
                    </p>

                    {el.estimatedTime && (
                      <p>
                        <WatchLaterIcon />
                        <span> ينتهي </span>
                        <span className="">
                          <Moment locale="ar" fromNow>
                            {el.estimatedTime}
                          </Moment>
                        </span>
                        <span> تقريباً</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <Messages
          messages={myTask && myTask?.messages}
          taskId={myTask && myTask?._id}
          taskerId={taskerId}
        />
      </div>
      {show && <DeletePopup handleShow={handleShow} id={myTask?._id} />}
    </>
  );
}

export default TaskTrack;
