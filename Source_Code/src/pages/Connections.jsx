import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import AuthContext from "../contexts/AuthContext";
import "./Connections.css";
function Connections() {
  const {
    isLoggedIn,
    role,
    username,
    pendingCon,
    connections,
    checkLoggedIn,
    setPendingCon,
    myToken,
  } = useContext(AuthContext);

  const history = useHistory();

  //check if user is logged in already redirect to '/' and if they are admin redirect to dashboard
  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/");
    }
    //eslint-disable-next-line
  }, [isLoggedIn]);

  if (!isLoggedIn) return <></>;

  return (
    <div className="Connection__container p-10">
      {connections &&
        connections.map((el) => (
          <div className="Connection__card bg-secondary shadow-md">
            <div dir="rtl" className="Connection__card__content">
              <p className="text-primary">الاسم: {el.name}</p>

              <div className="action__buttons ">
                <button className="bg-red-600 p-2 text-white rounded-md">
                  حذف
                </button>
              </div>
            </div>
            <img
              src="https://www.nacdnet.org/wp-content/uploads/2016/06/person-placeholder.jpg"
              alt=""
            />
          </div>
        ))}
    </div>
  );
}

export default Connections;
