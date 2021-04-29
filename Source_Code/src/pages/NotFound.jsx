import { useHistory } from "react-router-dom";

function NotFound({ taskDone }) {
  const history = useHistory();
  return (
    <div className=" bg-primary h-screen grid place-items-center text-center">
      <div>
        <p className="text-3xl text-secondary mb-1">هذه الصفحة غير موجودة</p>
        {taskDone && (
          <p className="text-1xl text-secondary">
            أو ان المهمة قد تم انجازها بالفعل
          </p>
        )}
        <button
          onClick={() => history.push("/")}
          className="bg-btn text-btn p-2 mt-1 rounded-md"
        >
          العودة الى الرئيسية
        </button>
      </div>
    </div>
  );
}

export default NotFound;
