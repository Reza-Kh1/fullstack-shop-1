import { useEffect, useState } from "react";
import { FaPhone, FaKey } from "react-icons/fa";
import InputForm from "../../components/InputForm/InputForm";
import { useForm } from "react-hook-form";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../utils/slices/user";
import { IoMail } from "react-icons/io5";
import { MdTitle } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import "./style.css";
type signUpType = {
  name: string;
  email: string;
  phone: string;
  password: string;
};
type loginType = {
  name: string;
  email: string;
  phone: string;
  password: string;
};
export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectUser = useSelector((state: any) => state.user);
  const signUpAction = (form: signUpType) => {
    const body = {
      name: form.name,
      email: form.email,
      password: form.password,
      phone: form.phone,
    };
    axios
      .post("user", body)
      .then(({ data }) => {
        dispatch(loginUser(data.data.body));
        toast.success("خوش امدید");
      })
      .catch((err) => {
        const error = err?.response?.data?.message;
        if (error) {
          toast.error(error);
        } else {
          toast.error("عملیات با خطا روبرو شد دوباره تلاش کنید");
        }
      });
  };
  const loginAction = (form: loginType) => {
    const body = {
      phone: form.phone,
      password: form.password,
      email: form.email,
    };
    axios
      .post("user/login", body)
      .then(({ data }) => {
        dispatch(loginUser(data.data.body));
        toast.success("خوش امدید");
      })
      .catch((err) => {
        const error = err.response?.data?.message;
        if (error) {
          toast.error(error);
        } else {
          toast.error("عملیات با خطا روبرو شد دوباره تلاش کنید");
        }
      });
  };
  const {
    register: signUpFrom,
    handleSubmit: handleSignUpForm,
    formState: { errors: errorSignUp },
  } = useForm<signUpType>();
  const {
    register: loginForm,
    handleSubmit: handleLoginForm,
    formState: { errors: errorLogin },
  } = useForm<loginType>();
  useEffect(() => {
    if (selectUser.isLoggin) {
      navigate("/admin/dashboard");
    }
  }, [selectUser.isLoggin]);
  return (
    <>
      <div className="signup-page w-full h-screen flex items-center justify-center">
        <div className="w-4/12 mx-auto z-10 my-auto">
          <div className="flex justify-around text-white mb-52 p-3 customize-shadow">
            <span
              onClick={() => {
                setIsLogin(false);
              }}
              className={`btn-signUp cursor-pointer transition-all ${
                !isLogin ? "after:h-[1px] before:h-[1px]" : ""
              }`}
            >
              ورود
            </span>
            <span
              onClick={() => {
                setIsLogin(true);
              }}
              className={`btn-signUp cursor-pointer transition-all ${
                isLogin ? "after:h-[1px] before:h-[1px]" : ""
              }`}
            >
              ثبت نام
            </span>
          </div>
          <div>
            <div className={`container ${isLogin ? "log-in" : ""}`}>
              <div className="box"></div>
              <div className="container-forms">
                <div className="container-info">
                  <div className="info-item">
                    <div className="table">
                      <div className="table-cell text-right">
                        {isLogin && (
                          <div
                            className="btn text-gray-50 mr-2 cursor-pointer p-2 bg-orange-400 px-4 rounded-md inline"
                            onClick={() => setIsLogin(false)}
                          >
                            ورود
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="table">
                      <div className="table-cell text-left">
                        {!isLogin && (
                          <div
                            className="btn text-gray-50 ml-2 cursor-pointer p-2 bg-orange-400 px-4 rounded-md inline"
                            onClick={() => setIsLogin(true)}
                          >
                            ثبت نام
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container-form">
                  <div className="form-item log-in p-5">
                    <h3 className="text-gray-200 text-center">وارد شوید</h3>
                    <div className="table">
                      <div className="table-cell">
                        <form onSubmit={handleLoginForm(loginAction)}>
                          <InputForm
                            register={loginForm}
                            name="phone"
                            onInput={(e) => {
                              e.target.value = e.target.value
                                .replace(/[^0-9]/g, "")
                                .slice(0, 11);
                            }}
                            icon={<FaPhone />}
                            type={"text"}
                            id={"phone"}
                            placeholder={"مانند : 09121231212"}
                            label={"شماره تلفن خود را وارد کنید"}
                          />
                          <InputForm
                            register={loginForm}
                            name="email"
                            icon={<IoMail />}
                            type={"text"}
                            id={"email"}
                            placeholder={"اختیاری"}
                            label={"ایمیل خود را وارد کنید"}
                          />
                          <InputForm
                            register={loginForm}
                            name="password"
                            required
                            icon={<FaKey />}
                            type={"password"}
                            id={"password"}
                            placeholder={"*******"}
                            label={"پسورد خود را وارد نمایید"}
                          />
                          <SubmitBtn
                            value="وارد شوید"
                            type="submit"
                            classPlus={"w-full mt-3"}
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="form-item sign-up p-5">
                    <h3 className="text-gray-200 text-center">ثبت نام کنید</h3>
                    <div className="table">
                      <div className="table-cell">
                        <form onSubmit={handleSignUpForm(signUpAction)}>
                          <InputForm
                            register={signUpFrom}
                            name="phone"
                            required
                            label="شماره تلفن خود را وارد نمایید"
                            id="phone-signup"
                            icon={<FaPhone />}
                            onInput={(e: any) => {
                              e.target.value = e.target.value
                                .replace(/[^0-9]/g, "")
                                .slice(0, 11);
                            }}
                            type="text"
                            placeholder="مانند : 09121231212"
                          />
                          <InputForm
                            register={signUpFrom}
                            name="email"
                            required
                            label="ایمیل خود را وارد نمایید"
                            id="sign-email"
                            placeholder="ایمیل معتبر وارد کنید"
                            icon={<IoMail />}
                            type="email"
                          />
                          <InputForm
                            register={signUpFrom}
                            name="name"
                            required
                            label="نام کاربری خود را وارد نمایید"
                            id="name"
                            icon={<MdTitle />}
                            type="text"
                          />
                          <InputForm
                            register={signUpFrom}
                            name="password"
                            required
                            label="در رمز خود از اعداد و علامت های (%,#,...) استفاده کنید"
                            id="password-signup"
                            placeholder="انگلیسی وارد کنید"
                            type="password"
                            icon={<FaKey />}
                          />
                          <SubmitBtn
                            value="ثبت نام کنید"
                            classPlus={"w-full mt-5"}
                            type="submit"
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
