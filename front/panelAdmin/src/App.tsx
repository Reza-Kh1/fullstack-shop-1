import {
  useLocation,
  useNavigate,
  useParams,
  useRoutes,
} from "react-router-dom";
import routes from "./routes/routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./utils/slices/user";
import { SelectUserType } from "./types/type";
axios.defaults.baseURL = import.meta.env.VITE_PUBLIC_API;
axios.defaults.withCredentials = true;

function App() {
  const route = useRoutes(routes);
  const navigate = useNavigate();
  const selectUser = useSelector((state: SelectUserType) => state.user);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  let number = 0;
  useEffect(() => {
    if (pathname === "/") {
      return;
    }
    if (!selectUser.isLoggin) {
      axios
        .get("user/admin")
        .then(({ data }) => {
          if (!number) {
            number++;
            toast.success(data.message);
          }
          dispatch(loginUser(data.data));
        })
        .catch((err) => {
          navigate("/");
          if (!number) {
            number++;
            toast.error("لطفا وارد حساب کاربری خود شوید");
          }
        });
    }
  }, []);
  return (
    <>
      <div>{route}</div>
      <ToastContainer style={{ zIndex: 10000 }} autoClose={1400}/>
    </>
  );
}
export default App;
