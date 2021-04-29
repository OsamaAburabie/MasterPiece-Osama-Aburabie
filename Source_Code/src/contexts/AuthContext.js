import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
function AuthContextProvider(props) {
  const [isLoggedIn, setLoggedIn] = useState();
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState(null);
  const [img, setImg] = useState(null);
  const [pendingCon, setPendingCon] = useState(null);
  const [connections, setConnections] = useState(null);
  const [notification, setNotification] = useState(null);
  const [myToken, setMyToken] = useState(null);
  const [myId, setMyId] = useState(null);

  //get the tokey frrom local storage and send to the checking end point to check if its a valid token.
  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
    } else setMyToken(token);

    const tokenRes = await axios.post(
      "http://localhost:5000/check/isLoggedIn",
      null,
      {
        headers: { "x-auth-token": token },
      }
    );
    if (tokenRes.data.valid === true) {
      setUsername(tokenRes.data.displayName);
      setRole(tokenRes.data.role);
      setEmail(tokenRes.data.email);
      setImg(tokenRes.data.img);
      setPendingCon(tokenRes.data.pendingConnections);
      setConnections(tokenRes.data.connections);
      setNotification(tokenRes.data.notifications);
      setMyId(tokenRes.data.id);
      setLoggedIn(true);

      //==============================
      axios.put("http://localhost:5000/users/lastLogin", null, {
        headers: { "x-auth-token": token },
      });
    } else {
      setLoggedIn(false);
    }
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setLoggedIn,
        username,
        role,
        img,
        email,
        checkLoggedIn,
        myToken,
        connections,
        pendingCon,
        setPendingCon,
        notification,
        setNotification,
        myId,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
