import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";
import SendIcon from "@material-ui/icons/Send";
import Moment from "react-moment";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ChatIcon from "@material-ui/icons/Chat";
import ScrollableFeed from "react-scrollable-feed";
import io from "socket.io-client";
import "./messages.css";

function Messages({ messages, taskerId, taskId }) {
  const [myMessage, setMyMessages] = useState();
  const [text, setText] = useState("");
  const [socket, setSocket] = useState();

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

  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-message", (message) => {
      setMyMessages((prev) => [...prev, message]);
    });
  }, [socket]);

  useEffect(() => {
    const s = io(`http://localhost:8000`);
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null) return;

    socket.emit("get-task", taskerId);
  }, [socket]);

  useEffect(() => {
    setMyMessages(messages);
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      text,
    };

    axios
      .post(
        `http://localhost:5000/users/sendMessage/${taskId}/${taskerId}`,
        data,
        {
          headers: {
            "x-auth-token": myToken,
          },
        }
      )
      .then((res) => {
        setMyMessages((prev) => [...prev, res.data]);
        setText("");
        socket.emit("send-message", res.data);
      });
  };

  return (
    <div
      dir="rtl"
      className=" w-full md:w-9/12 px-10 pb-10 bg-secondary text-secondary shadow-md rounded-lg mb-10"
    >
      <div className="w-full text-center p-5 ">
        <p className="text-4xl">
          الدردشة
          <ChatIcon fontSize="large" className="mr-1" />
        </p>
      </div>

      <div className=" mb-3">
        <div className=" h-80 relative">
          <ScrollableFeed className="w-full  scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent overflow-y-auto">
            {myMessage &&
              myMessage.map((el) => (
                <div
                  key={el._id}
                  className={`w-full grid  ${
                    el.username === username
                      ? "place-items-start"
                      : "place-items-end"
                  }`}
                >
                  <div key={el._id} className=" mb-2 md:w-2/5 w-8/12   ">
                    <div className="zft bg-primary flex flex-wrap p-3  rounded-2xl shadow-sm">
                      <div className="w-full">
                        <span className="font-bold">{el.username}</span>
                        <p>{el.text}</p>
                      </div>
                      {/* <AccessTimeIcon className="ml-2" /> */}
                      <div dir="ltr" className="w-full">
                        <Moment locale="en" format="LT ">
                          {el?.createdAt}
                        </Moment>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </ScrollableFeed>
        </div>
      </div>
      <div dir="rtl" className="w-full flex flex-wrap ">
        <form onSubmit={handleSubmit} dir="rtl" className="w-full flex ">
          <input
            value={text}
            type="text"
            placeholder="ارسل رساله"
            className="p-3 w-full text-primary bg-primary focus:outline-none border-none ml-2"
            onChange={(e) => setText(e.target.value)}
          />
          <button className="p-2 bg w-11 ">
            <SendIcon className="transform rotate-180" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Messages;
