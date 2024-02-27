"use client";
import { useState } from "react";
import { FaPhone, FaKey } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { IoMail } from "react-icons/io5";
import { toast } from "react-toastify";
import "./style.css";
import { Button, Input } from "@material-tailwind/react";
type LoginType = {
  name: string;
  email: string;
  phone: string;
  password: string;
};
export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const { register, handleSubmit } = useForm<LoginType>();
  const loginHandler = (form: any) => {
    const passwordReply = form.get("email");
    const password = form.get("password");
    console.log("oll");

    console.log(passwordReply);
    console.log(password);
  };
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
                        <form
                          action={loginHandler}
                          className="h-full flex flex-col justify-evenly"
                        >
                          <input
                            type="text"
                            name="email"
                            className="text-gray-50"
                          />
                          <input
                            type="text"
                            name="password"
                            className="text-gray-50"
                          />
                          <div>
                            <Input
                              variant="static"
                              label="شماره تلفن خود را وارد کنید :"
                              color="blue"
                              type="text"
                              name="phone"
                              className="text-gray-50"
                              placeholder="مثال : 09390199977"
                              icon={<FaPhone />}
                              onChange={(e) => {
                                e.target.value = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                );
                              }}
                            />
                          </div>
                          <div>
                            <Input
                              variant="static"
                              color="blue"
                              label="ایمیل خود را وارد کنید :"
                              name="email"
                              type="text"
                              placeholder="google@gmail.com"
                              icon={<IoMail />}
                              className="text-gray-50"
                            />
                          </div>
                          <div>
                            <Input
                              variant="static"
                              color="blue"
                              type="text"
                              placeholder="****"
                              label="پسورد خود را وارد کنید :"
                              icon={<FaKey />}
                              name="password"
                              className="text-gray-50"
                            />
                          </div>
                          <Button className="w-full mt-3" color="deep-orange">
                            وارد شوید
                          </Button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="form-item sign-up p-5">
                    <h3 className="text-gray-200 text-center">ثبت نام کنید</h3>
                    <div className="table">
                      <div className="table-cell">
                        <form onSubmit={handleSubmit(loginHandler)}>
                          <Input
                            label="شماره تلفن خود را وارد نمایید"
                            {...register("password", {
                              required: true,
                              pattern: /\d+/,
                            })}
                            icon={<FaPhone />}
                          />
                          <Input
                            label="ایمیل خود را وارد کنید"
                            {...register("email")}
                            icon={<IoMail />}
                          />
                          <Input
                            label="پسورد خود را وارد کنید"
                            {...register("password", {
                              required: true,
                            })}
                            icon={<FaKey />}
                          />
                          <Button
                            type="submit"
                            className="w-full"
                            color="deep-orange"
                          >
                            ثبت نام کنید
                          </Button>
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
