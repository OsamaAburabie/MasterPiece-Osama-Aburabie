import { useContext, useEffect, useState } from "react";
import Moment from "react-moment";
import ScrollableFeed from "react-scrollable-feed";
import AuthContext from "../../contexts/AuthContext";
import SendIcon from "@material-ui/icons/Send";
import axios from "axios";
import io from "socket.io-client";
import "../Customer/messages.css";
function PopupMessages({ messages, taskId, setSeen, fetch }) {
  const [myMessage, setMyMessages] = useState([]);
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

    socket.emit("get-task", myId);
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
      .post(`http://localhost:5000/users/sendMessage/${taskId}/${myId}`, data, {
        headers: {
          "x-auth-token": myToken,
        },
      })
      .then((res) => {
        setMyMessages((prev) => [...prev, res.data]);
        setText("");
        socket.emit("send-message", res.data);
      });

    axios.put(`http://localhost:5000/users/updateMessage/${taskId}`, null, {
      headers: { "x-auth-token": myToken },
    });
  };

  return (
    <>
      <div className="h-72 text-secondary">
        <ScrollableFeed className="w-full scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent overflow-y-auto">
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
                  <div className="bg-secondary zft text-right  flex flex-wrap p-3 overflow-ellipsis  rounded-2xl shadow-sm">
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
      <div className="w-full bg-primary pt-2 ">
        <form onSubmit={handleSubmit} className="w-full flex">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text "
            placeholder="ارسل رساله"
            className="w-full  border-none  p-3 rounded-md   bg-secondary text-secondary outline-none"
          />
          <button className="p-2  text-secondary w-11 " type="submit">
            <SendIcon className="transform rotate-180" />
          </button>
        </form>
      </div>
    </>
  );
}

export default PopupMessages;
