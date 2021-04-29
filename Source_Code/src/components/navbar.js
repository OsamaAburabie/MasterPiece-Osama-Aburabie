import React, { useRef, useState, useContext } from "react";
import Toggle from "../components/toggle";
import useOnClickOutside from "../hooks/useOnClickOutside";
import Logo from "../images/maham.png";
import LogoDark from "../images/mahamDark.png";
import { NavLink, useHistory } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { Badge, IconButton } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import SendRate from "./SendRate";
import Moment from "react-moment";
import "moment/locale/ar";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import NewAdPopup from "../components/Tasker/NewAdPopup";
import WorkIcon from "@material-ui/icons/Work";
import { ThemeContext } from "../contexts/themeContext";
import PersonIcon from "@material-ui/icons/Person";

const Navbar = () => {
  const ref = useRef();
  const [profileMenueOpen, setProfileMenueOpen] = useState(false);
  const [pendingMenue, setPendingMenue] = useState(false);
  const [mobuleMenue, setMobileMenue] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const history = useHistory();

  const handleShow = () => {
    setShowPopup(!showPopup);
  };

  const {
    isLoggedIn,
    role,
    img,
    username,
    pendingCon,
    checkLoggedIn,
    setPendingCon,
    myToken,
    notification,
    setNotification,
    setLoggedIn,
  } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const logout = async () => {
    localStorage.setItem("auth-token", "");
    checkLoggedIn();
    setLoggedIn(undefined);
    history.push("/");
  };

  useOnClickOutside(ref, () => setProfileMenueOpen(false));
  useOnClickOutside(ref, () => setPendingMenue(false));
  useOnClickOutside(ref, () => setMobileMenue(false));

  //connection accept and reject
  const acceptCon = (id, taskId) => {
    let data = {
      uid: id,
      taskId,
    };
    axios
      .post("http://localhost:5000/users/acceptConnection", data, {
        headers: { "x-auth-token": myToken },
      })
      .then((res) => setPendingCon(pendingCon.filter((el) => el.uid !== id)))
      .catch((err) => console.log(err));
  };
  const rejectCon = (id, taskId) => {
    let data = {
      uid: id,
      taskId,
    };
    axios
      .post("http://localhost:5000/users/rejectConnection", data, {
        headers: { "x-auth-token": myToken },
      })
      .then((res) => setPendingCon(pendingCon.filter((el) => el.uid !== id)))
      .catch((err) => console.log(err));
  };

  //=================================================================================== set seen on mouse over
  const handleMouseOver = (id, seen) => {
    if (seen === 0) {
      axios.put(`http://localhost:5000/users/updateNotification/${id}`, null, {
        headers: { "x-auth-token": myToken },
      });
    }
  };
  const handleDelNotification = (id) => {
    axios
      .post(`http://localhost:5000/users/deleteNotification/${id}`, null, {
        headers: { "x-auth-token": myToken },
      })
      .then(setNotification(notification.filter((el) => el._id !== id)));
  };

  return (
    <>
      {/* This example requires Tailwind CSS v2.0+ */}
      <nav dir="rtl" className="bg-secondary shadow-md">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute  inset-y-0 left-0 flex items-center md:hidden">
              {/* Mobile menu button*/}
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="block lg:hidden h-12 w-auto ml-5"
                  src={theme === "dark" ? LogoDark : Logo}
                  alt="Workflow"
                />
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-primary outline-none focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setMobileMenue(!mobuleMenue)}
              >
                <span className="sr-only">Open main menu</span>
                {/*
      Icon when menu is closed.

      Heroicon name: outline/menu

      Menu open: "hidden", Menu closed: "block"
    */}
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/*
      Icon when menu is open.

      Heroicon name: outline/x

      Menu open: "block", Menu closed: "hidden"
    */}
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center md:items-stretch md:justify-start">
              <div className="flex-shrink-0 flex items-center ml-3">
                {/* <img
                  className="block lg:hidden h-16 w-auto"
                  src={theme === "dark" ? LogoDark : Logo}
                  alt="Workflow"
                /> */}
                <img
                  className="hidden lg:block h-16 w-auto"
                  src={theme === "dark" ? LogoDark : Logo}
                  alt="Workflow"
                />
              </div>
              <div className="hidden md:flex items-center md:ml-6">
                <div className="flex space-x-4">
                  {/* Current: "bg-primary text-primary", Default: "text-secondary hover:bg-primary hover:text-primary" */}
                  <NavLink
                    to="/"
                    className=" text-primary hover:bg-primary hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                    aria-current="page"
                    // activeClassName="bg-primary"
                  >
                    الرئيسية
                  </NavLink>
                  <NavLink
                    to="/services"
                    className="text-secondary hover:bg-primary hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                    activeClassName="bg-primary"
                  >
                    الخدمات
                  </NavLink>

                  <NavLink
                    to="/Calendar"
                    className="text-secondary hover:bg-primary hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                    activeClassName="bg-primary"
                  >
                    حول
                  </NavLink>

                  {isLoggedIn && role === "tasker" && (
                    <NavLink
                      to="/manageTasks"
                      className="text-white focus:outline-none bg-btn  px-3 py-2 rounded-md text-sm font-medium"
                    >
                      مهامي
                    </NavLink>
                  )}

                  {isLoggedIn && role === "tasker" && (
                    <button
                      onClick={() => setShowPopup(true)}
                      className="text-white focus:outline-none bg-red-600  px-3 py-2 rounded-md text-sm font-medium"
                    >
                      اعلان جديد
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
              <Toggle />
              {isLoggedIn === false && (
                <div className="hidden md:block sm:ml-6">
                  <div className="flex space-x-4">
                    <NavLink
                      to="/register"
                      className="text-secondary hover:bg-primary hover:text-primary px-3 py-2 rounded-md text-sm font-medium mr-3"
                    >
                      التسجيل
                    </NavLink>
                    <NavLink
                      to="/login"
                      className="text-secondary hover:bg-primary hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                    >
                      الدخول
                    </NavLink>
                  </div>
                </div>
              )}
              {/* Profile dropdown */}
              {isLoggedIn && role === "tasker" && (
                <div className="mr-3 relative">
                  <div>
                    <button
                      type="button"
                      id="user-menu"
                      aria-expanded="false"
                      aria-haspopup="true"
                      className="rounded-full focus:outline-none"
                      onClick={() => {
                        setPendingMenue(true);
                      }}
                    >
                      <Badge badgeContent={pendingCon.length} color="secondary">
                        <WorkIcon className="text-primary" />
                      </Badge>
                    </button>
                  </div>
                  {pendingMenue && (
                    <div
                      dir="rtl"
                      ref={ref}
                      className="absolute z-10 md:left-0 mt-2 flex flex-wrap rounded-md shadow-lg py-1 bg-primary  text-secondary  focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                      // onClick={() => setPendingMenue(false)}
                    >
                      {pendingCon &&
                        pendingCon
                          .map((el) => (
                            <div className="w-96 mb-2 p-2 bg-secondar text-right shadow-md rounded-md flex flex-wrap items-center m-2">
                              <div dir="auto" className=" px-2 w-full mb-2">
                                <p>الاسم: {el.name}</p>
                                <p>المهمة: {el.taskTitle}</p>
                                <p>الموقع: {el.taskLocation}</p>
                              </div>

                              <div className="absolute top-0  p-3 left-0 outline-none focus:outline-none ">
                                <AccessTimeIcon className="ml-2" />
                                <Moment locale="ar" fromNow>
                                  {el?.createdAt}
                                </Moment>
                              </div>
                              <div className="px-2 w-full">
                                <button
                                  onClick={() => acceptCon(el.uid, el.taskId)}
                                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 mb-2 md:mb-0 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                  موافق
                                </button>
                                <button
                                  onClick={() => rejectCon(el.uid, el.taskId)}
                                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                  رفض
                                </button>
                              </div>
                            </div>
                          ))
                          .reverse()}
                    </div>
                  )}
                </div>
              )}

              {/* //=============================================================================================================================================== */}

              {isLoggedIn && role === "customer" && (
                <div className="mr-3 relative z-10">
                  <div>
                    <button
                      type="button"
                      id="user-menu"
                      aria-expanded="false"
                      aria-haspopup="true"
                      className="rounded-full focus:outline-none"
                      onClick={() => {
                        setPendingMenue(true);
                      }}
                    >
                      <Badge
                        badgeContent={
                          notification?.filter((el) => el.seen !== 1).length
                        }
                        color="secondary"
                      >
                        <NotificationsIcon className="text-primary" />
                      </Badge>
                    </button>
                  </div>
                  {pendingMenue && (
                    <div
                      dir="rtl"
                      dir="rtl"
                      ref={ref}
                      className="absolute z-10  md:left-0 mt-2 flex flex-wrap rounded-md shadow-lg py-1 bg-primary  text-secondary  focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                      // onClick={() => setPendingMenue(false)}
                    >
                      {notification &&
                        notification
                          .map((el) => (
                            <div
                              key={el._id}
                              onMouseOver={() =>
                                handleMouseOver(el.notifId, el.seen)
                              }
                              className=" relative w-96 p-2 bg-secondar text-right  rounded-md flex flex-wrap items-center m-2"
                            >
                              <div dir="auto" className=" px-2 w-full mb-2">
                                {el.type === "connection" ? (
                                  <NavLink to={`/tasker/${el.taskerId}`}>
                                    {el.text}
                                  </NavLink>
                                ) : (
                                  <p>{el.text}</p>
                                )}
                              </div>
                              {el.type === "rate" && (
                                <div className="mb-2">
                                  <SendRate taskId={el.taskId} id={el._id} />
                                </div>
                              )}
                              <div className=" px-2 w-full">
                                <button
                                  onClick={() => handleDelNotification(el._id)}
                                  className="absolute top-0 left-0  outline-none focus:outline-none"
                                >
                                  <CloseIcon />
                                </button>
                                <div className="text-sm ">
                                  <AccessTimeIcon className="ml-2" />
                                  <Moment locale="ar" fromNow>
                                    {el?.createdAt}
                                  </Moment>
                                </div>
                              </div>
                            </div>
                          ))
                          .reverse()}
                    </div>
                  )}
                </div>
              )}
              {isLoggedIn !== false && (
                <div className="mr-3 relative">
                  <div>
                    <button
                      type="button"
                      className="bg-gray-800 flex text-sm rounded-full focus:outline-none"
                      id="user-menu"
                      aria-expanded="false"
                      aria-haspopup="true"
                      onClick={() => setProfileMenueOpen(true)}
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={img}
                        alt="logo"
                      />
                    </button>
                  </div>

                  {/*
      Dropdown menu, show/hide based on menu state.

      Entering: "transition ease-out duration-100"
        From: "transform opacity-0 scale-95"
        To: "transform opacity-100 scale-100"
      Leaving: "transition ease-in duration-75"
        From: "transform opacity-100 scale-100"
        To: "transform opacity-0 scale-95"
    */}
                  {profileMenueOpen && (
                    <div
                      ref={ref}
                      className="origin-top-right z-50 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1  bg-secondary text-secondary focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                      onClick={() => setProfileMenueOpen(false)}
                    >
                      <NavLink
                        to="/"
                        className="block px-4 py-2 text-sm hover:bg-primary text-secondary"
                        role="menuitem"
                      >
                        <PersonIcon />

                        {username}
                      </NavLink>

                      <div
                        onClick={logout}
                        className="block px-4 py-2 text-sm hover:bg-primary  text-secondary cursor-pointer"
                        role="menuitem"
                      >
                        تسجيل الخروج
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* notifications */}
            </div>
          </div>
        </div>
        {/* Mobile menu, show/hide based on menu state. */}
        {mobuleMenue && (
          <div ref={ref} className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Current: "bg-primary text-primary", Default: "text-secondary hover:bg-primary hover:text-primary" */}
              <NavLink
                to="/Dashboard"
                className=" text-primary hover:bg-primary hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                aria-current="page"
                activeClassName="bg-primary"
              >
                ألرئيسية
              </NavLink>
              <NavLink
                to="/Team"
                className="text-secondary hover:bg-primary hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                activeClassName="bg-primary"
              >
                الخدمات
              </NavLink>

              <NavLink
                to="/Calendar"
                className="text-secondary hover:bg-primary hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                activeClassName="bg-primary"
              >
                حول
              </NavLink>
            </div>
          </div>
        )}
      </nav>
      {showPopup && <NewAdPopup handleShow={handleShow} />}
    </>
  );
};

export default Navbar;
