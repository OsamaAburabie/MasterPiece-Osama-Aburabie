import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import { useHistory } from "react-router";
import Background from "../images/registerBackground.jpg";
const Register = () => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const { isLoggedIn, checkLoggedIn, role } = useContext(AuthContext);
  const [error, setError] = useState();
  const history = useHistory();
  const [file, setFile] = useState();
  const [regRole, setRegRole] = useState(1);

  //check if user is logged in already redirect to '/' and if they are admin redirect to dashboard

  async function register({
    image,
    email,
    password,
    passwordCheck,
    displayName,
  }) {
    try {
      const formData = new FormData();
      formData.append("img", image);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("passwordCheck", passwordCheck);
      formData.append("displayName", displayName);
      formData.append("isTasker", regRole);

      const loginRes = await axios.post(
        "http://localhost:5000/api/register",
        formData
      );
      if (loginRes.data.token) {
        localStorage.setItem("auth-token", loginRes.data.token);
        checkLoggedIn();
      }
      history.push("/");
    } catch (error) {
      if (error) {
        setError(error.response.data.msg);
      }
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
    //eslint-disable-next-line
  }, [isLoggedIn]);

  const handleRegister = (e) => {
    e.preventDefault();
    register({
      image: file,
      email,
      password,
      passwordCheck,
      displayName,
    });
  };

  //============================================================================================
  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  if (!isLoggedIn) {
    return (
      <div
        dir="rtl"
        className="h-screen grid place-items-center"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <form
          onSubmit={handleRegister}
          className="flex flex-wrap m-3 md:w-96 bg-secondary px-7 py-3 rounded-lg"
        >
          <label className="mb-7 text-center w-full text-2xl font-bold text-primary">
            تسجيل حساب جديد
          </label>
          {error && (
            <label className="mb-7 text-center w-full text-red-600">
              {error}
            </label>
          )}
          <input
            value={displayName}
            className="w-full mb-3 border-none  p-3 rounded-md   bg-primary text-primary outline-none"
            type="text"
            placeholder="اسمك"
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <input
            value={email}
            className="w-full mb-3 border-none  p-3 rounded-md   bg-primary text-primary outline-none"
            type="email"
            placeholder="بريدك"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="mb-1 text-primary">إدراج صورة (اختياري)</label>
          <input
            className="w-full mb-3 border-none   rounded-md   text-primary outline-none"
            onChange={fileSelected}
            type="file"
            accept="image/*"
          ></input>
          <input
            value={password}
            className="w-full mb-3 border-none  p-3 rounded-md   bg-primary text-primary outline-none"
            type="password"
            placeholder="كلمه المرور"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            value={passwordCheck}
            className="w-full mb-3 border-none  p-3 rounded-md   bg-primary text-primary outline-none"
            type="password"
            placeholder="اعد كتابه كلمة المرور"
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
          <label className="text-primary mb-1">التسجيل ک</label>
          <select
            onChange={(e) => {
              setRegRole(e.target.value);
            }}
            value={regRole}
            className="w-full mb-3 border-none  p-3 rounded-md   bg-primary text-primary outline-none"
          >
            <option value={1}>زبون</option>
            <option value={2}>عامل</option>
          </select>

          <button
            type="submit"
            className=" book__btn w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-btn text-base font-medium text-btn  focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm"
          >
            التسجيل
          </button>
        </form>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Register;
