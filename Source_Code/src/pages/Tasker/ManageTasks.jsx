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
import ChatPopup from "../../components/Tasker/ChatPopup";
// import NotificationsIcon from "@material-ui/icons/Notifications";
import EmailIcon from "@material-ui/icons/Email";
import { Badge } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import NotFound from "../NotFound";

function ManageTasks() {
  const { taskerId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [myTask, setMyTask] = useState();
  const [tasker, setTasker] = useState({});
  const [rating, setRating] = useState(0);
  const [show, setShow] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedTask, setSelctedTask] = useState("");

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
      `http://localhost:5000/users/taskerInfo/${myId}`
    );
    setTasker(res.data.tasker);
    setRating(res.data.tasker.rating.sum);
  };
  const fetchTasks = () => {
    axios
      .get(`http://localhost:5000/users/myTasks`, {
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
  };
  useEffect(() => {
    fetchTasks();
    getTaskerInfo();
  }, []);

  const handleShow = () => {
    setShow(!show);
  };

  const handleShowChat = () => {
    setShowChat(!showChat);
  };

  const handleTaskPopup = (id) => {
    setSelctedTask(id);
    setShowChat(true);
  };

  if (loading) return <div className=" bg-primary h-screen"></div>;
  if (loadingError) return <NotFound />;

  return (
    <>
      <div className=" min-h-screen   ">
        <div className="w-full h-72 p-4 bg-secondary text-secondary grid place-items-center text-center">
          <div>
            <img
              src={tasker?.img}
              alt="anything"
              className="w-28 h-28 mb-3 md:w-40 md:h-40 object-cover rounded-full"
            />
            <p className="text-2xl">{tasker?.name}</p>
            <Rating name="read-only" value={rating} readOnly />
          </div>
        </div>
        <p className="py-10 text-center text-secondary text-3xl md:text-5xl">
          جدول مهامك
        </p>
        <div className="w-full flex  justify-center mb-10">
          <div className=" w-full md:w-9/12 grid place-items-center  bg-secondary p-3 ">
            <div
              className={`w-full  grid grid-cols-1 ${
                tasks && tasks.length > 0 ? "md:grid-cols-2" : "md:grid-cols-1"
              } gap-3`}
            >
              {tasks && tasks.length > 0 ? (
                tasks.map((el) => (
                  <div
                    onClick={() => handleTaskPopup(el._id)}
                    dir="rtl"
                    key={el._id}
                    className={`${
                      el?._id === myTask?._id ? "bg-btn text-btn" : "bg-primary"
                    }  relative col-span-1  flex justify-center items-center flex-wrap h-32   text-primary shadow-sm cursor-pointer hover:bg-btn hover:text-btn transition duration-300 ease-in-out	`}
                  >
                    {el.working === 2 && (
                      <div className="absolute -top-5 left-0 p-2 bg-green-600 text-white shadow-md">
                        <p> جار العمل</p>
                      </div>
                    )}
                    {el.working === 3 && (
                      <div className="absolute -top-5 left-0 p-2 bg-yellow-600 text-white shadow-md">
                        <p> في الطريق</p>
                      </div>
                    )}
                    {el.working === 1 && (
                      <div className="absolute -top-5 left-0 p-2 bg-red-600 text-white shadow-md">
                        <p>معلق</p>
                      </div>
                    )}
                    {el.notification === 1 && (
                      <div className="absolute -top-5 right-0 p-2   ">
                        <Badge badgeContent="جديد" color="secondary">
                          <EmailIcon
                            fontSize="large"
                            className="text-primary"
                          />
                        </Badge>
                      </div>
                    )}

                    <div className="text-xl">
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
                ))
              ) : (
                <div className="w-full p-10">
                  <p className="text-center text-2xl text-secondary">
                    لايوجد لديك مهام في الوقت الحالي.. ربما تحتاج الى{" "}
                    <NavLink to="/manageTasks" className="text-blue-600">
                      نشر اعلان جديد
                    </NavLink>
                    <span> لزيادة فرصك في الحصول على مهام </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {show && <DeletePopup handleShow={handleShow} id={myTask?._id} />}
      {showChat && (
        <ChatPopup
          handleShow={handleShowChat}
          taskId={selectedTask}
          fetching={fetchTasks}
        />
      )}
    </>
  );
}

export default ManageTasks;
