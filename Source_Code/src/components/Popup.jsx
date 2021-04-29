/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import AuthContext from "../contexts/AuthContext";
import axios from "axios";
export default function Popup({ disable, taskerId, success }) {
  const [open, setOpen] = useState(true);
  const [error, setError] = useState("");
  const cancelButtonRef = useRef();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");

  const { myToken, isLoggedIn, role, connections, pendingCon } = useContext(
    AuthContext
  );

  const book = () => {
    const data = {
      title,
      location,
      desc,
    };
    axios
      .post(`http://localhost:5000/users/addConnection/${taskerId}`, data, {
        headers: { "x-auth-token": myToken },
      })
      .then((res) => {
        success();
        disable();
        setOpen(false);
      })
      .catch((err) => err.response.data.msg && setError(err.response.data.msg));
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
            <div
              dir="rtl"
              className="inline-block align-bottom bg-secondary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              <div className="bg-secondary px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {error && (
                  <div className="w-full text-center pb-2 text-red-600">
                    <label>{error}</label>
                  </div>
                )}
                <div className="sm:flex sm:items-start">
                  <div className=" flex justify-center items-center w-full">
                    <form onSubmit={book} className="flex flex-wrap w-96">
                      <input
                        className="w-full mb-3 hover:border-none  p-3 rounded-md   bg-primary text-primary outline-none"
                        type="text"
                        placeholder="ماذا تريد تحديدا؟"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <input
                        className="w-full mb-3 border-none  p-3 rounded-md   bg-primary text-primary  outline-none"
                        type="text"
                        placeholder="الموقع"
                        onChange={(e) => setLocation(e.target.value)}
                      />
                      <textarea
                        className="w-full border-none  p-3 rounded-md   bg-primary text-primary outline-none"
                        placeholder="التفاصيل (اختياري)"
                        cols="30"
                        rows="5"
                        onChange={(e) => setDesc(e.target.value)}
                      ></textarea>
                    </form>
                  </div>
                </div>
              </div>
              <div className="bg-primary px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse flex justify-center ">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-btn text-base font-medium text-btn  focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    // setOpen(false);
                    // disable();
                    book();
                  }}
                >
                  ارسال طلب
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
