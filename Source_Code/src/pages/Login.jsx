import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import { useHistory } from "react-router";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { isLoggedIn, checkLoggedIn, role } = useContext(AuthContext);
  const [error, setError] = useState();
  const history = useHistory();
  //check if user is logged in already redirect to '/' and if they are admin redirect to dashboard
  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
    //eslint-disable-next-line
  }, [isLoggedIn]);

  //login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const loginData = {
        email,
        password,
      };

      const loginRes = await axios.post(
        "http://localhost:5000/users/login",
        loginData
      );
      if (loginRes.data.token) {
        localStorage.setItem("auth-token", loginRes.data.token);
        checkLoggedIn();
      }
      // history.push("/");
    } catch (err) {
      // setError(err);
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  if (!isLoggedIn) {
    return (
      <div className="h-screen flex bg-gray-bg1">
        <div
          dir="rtl"
          className="w-full max-w-md m-auto bg-secondary rounded-lg  shadow-default py-10 px-16"
        >
          <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
            تسجيل الدخول
          </h1>

          <form onSubmit={handleLogin}>
            <div>
              <label className="text-primary">البريد الالكتروني</label>
              <input
                value={email}
                type="email"
                className="w-full mb-2  border-none  p-3 rounded-md   bg-primary text-primary outline-none"
                id="email"
                placeholder="بريدك"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-primary">كلمه المرور</label>
              <input
                value={password}
                type="password"
                className="w-full mb-2  border-none  p-3 rounded-md   bg-primary text-primary outline-none"
                id="password"
                placeholder="كلمه مرورك"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-center items-center mt-6">
              <button className="bg-btn text-btn px-3 py-2 rounded-md text-sm font-medium ">
                دخول
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Login;
