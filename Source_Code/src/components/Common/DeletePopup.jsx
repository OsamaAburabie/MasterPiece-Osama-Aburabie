/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";
import { useHistory } from "react-router";

export default function DeletePopup({ id, handleShow }) {
  const [open, setOpen] = useState(true);
  const history = useHistory();

  const cancelButtonRef = useRef();
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
  } = useContext(AuthContext);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/users/deleteMyTask/${id}`, {
        headers: { "x-auth-token": myToken },
      })
      .then((res) => {
        setOpen(false);
        history.push("/");
        checkLoggedIn();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleShit = () => {
    setOpen(false);
    handleShow();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={handleShit}
      >
        <div className="flex items-end  justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      <div className="text-right w-full text-secondary">
                        هل انت متأكد؟
                      </div>
                    </Dialog.Title>
                    <div className="mt-2 text-right">
                      <p className="text-sm text-secondary">
                        سوف تفقد تواصلك مع العامل نهائياً .. نود التنويه انه اذا
                        تم سحب عدد 2 من المهام فسيتم توقيف حسابك نهائيا
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-primary px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleDelete()}
                >
                  سحب المهمة
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleShit()}
                  ref={cancelButtonRef}
                >
                  تراجع
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
