/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Moment from "react-moment";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

export default function Popup({ disable, taskerId, success }) {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef();

  const {
    myToken,
    isLoggedIn,
    role,
    connections,
    pendingCon,
    setPendingCon,
  } = useContext(AuthContext);

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

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-secondary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-secondary px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 font-medium text-gray-900"
                >
                  <div dir="rtl" className="text-right mb-2 text-secondary">
                    <p>
                      لديك مهام جديده
                      <NotificationsIcon />
                    </p>
                  </div>
                </Dialog.Title>
                <div className="sm:flex sm:items-start">
                  <div className=" flex justify-center items-center w-full">
                    <div className="flex flex-wrap md:w-full w-96">
                      {pendingCon &&
                        pendingCon.map((el) => (
                          <div className="w-full relative p-2 bg-primary text-right shadow-md rounded-md flex flex-wrap items-center m-2">
                            <div
                              dir="auto"
                              className=" px-2 w-full mb-2 text-secondary"
                            >
                              <p>الاسم: {el.name}</p>
                              <p>المهمة: {el.taskTitle}</p>
                              <p>الموقع: {el.taskLocation}</p>
                            </div>
                            <div className="absolute top-0  p-2 text-secondary left-0 outline-none focus:outline-none ">
                              <AccessTimeIcon className="ml-2" />
                              <Moment locale="ar" fromNow>
                                {el?.createdAt}
                              </Moment>
                            </div>
                            <div className="px-2 w-full">
                              <button
                                onClick={() => acceptCon(el.uid, el.taskId)}
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 mb-2 md:mb-0 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm"
                              >
                                موافق
                              </button>
                              <button
                                onClick={() => rejectCon(el.uid, el.taskId)}
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm"
                              >
                                رفض
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-primary px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  خروج
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
