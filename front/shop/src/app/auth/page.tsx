"use client";
import { useState } from "react";
import { FaPhone, FaKey } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { toast } from "react-toastify";
import { Button, Input } from "@material-tailwind/react";
import { MdTitle } from "react-icons/md";
import { signIn } from "next-auth/react";
import "./style.css";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/Button/SubmitButton";
export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const route = useRouter()
  const loginHandler = async (form: any) => {
    const name = form.get("name");
    const email = form.get("email");
    const phone = form.get("phone");
    const password = form.get("password");
    if (!email && !phone || !password) return toast.warning("تمام فیلدهارو پر کنید")
    if (name) {
      const res = await signIn("credentials", {
        name,
        email,
        password,
        phone,
        redirect: false,
        login: "false",
      });
      if (res?.error) {
        toast.warning("شماره تلفن یا ایمیل در سیستم ثبت شده است")
      } else {
        route.push("/")
        toast.success("خوش آمدید.")
      }
    } else {
      const res = await signIn("credentials", {
        redirect: false,
        login: "true",
        name,
        email,
        password,
        phone,
      });
      if (res?.error) {
        toast.warning("رمز وارد شده اشتباه است")
      } else {
        route.push("profile/setting")
        toast.success("خوش آمدید.")
      }
    }
  };
  return (
    <>
      <div className="signup-page mb-24 w-full h-screen flex items-center justify-center">
        <div className="w-4/12 mx-auto z-10 my-auto">
          <div className="flex justify-around text-h1-light dark:text-h1-dark shadow-[#474646] shadow-lg dark:shadow-[#aea9a9] bg-[#262e35] dark:bg-white mb-52 p-3 customize-shadow">
            <span
              onClick={() => {
                setIsLogin(false);
              }}
              className={`btn-signUp cursor-pointer transition-all ${!isLogin ? "after:h-[1px] before:h-[1px]" : ""
                }`}
            >
              ورود
            </span>
            <span
              onClick={() => {
                setIsLogin(true);
              }}
              className={`btn-signUp cursor-pointer transition-all ${isLogin ? "after:h-[1px] before:h-[1px]" : ""
                }`}
            >
              ثبت نام
            </span>
          </div>
          <div>
            <div className={`container shadow-[#474646] shadow-lg dark:shadow-[#aea9a9] bg-[#262e35] dark:bg-white ${isLogin ? "log-in" : ""}`}>
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
                <div className="container-form bg-[#323232bd] dark:bg-[#ffffffb8]">
                  <div className="form-item log-in p-5">
                    <h3 className=" text-center mb-2 text-span-light dark:text-span-dark">وارد شوید</h3>
                    <span className="text-xs text-span-light dark:text-span-dark">برای ورود به حساب کاربری میتوانید یکی از فیلدهای شماره تلفن یا ایمیل را پر کنید و به حساب خود وارد شوید .</span>
                    <div className="table">
                      <div className="table-cell">
                        <form action={loginHandler} className="h-full gap-3 mt-10 flex flex-col">
                          <div>
                            <span className="text-sm text-h1-light dark:text-h1-dark">شماره تلفن خود را وارد نمایید :</span>
                            <Input
                              placeholder="09390199977"
                              color="black"
                              name="phone"
                              variant="static"
                              className="text-gray-200 dark:text-gray-700 dark:placeholder:text-gray-500 placeholder:text-gray-600"
                              onChange={(e) => {
                                e.target.value = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                );
                              }}
                              icon={<FaPhone className="text-gray-200 dark:text-gray-900" />}
                            />
                          </div>
                          <div>
                            <span className="text-sm text-h1-light dark:text-h1-dark">ایمیل خود را وارد کنید :</span>
                            <Input
                              placeholder="اختیاری"
                              color="black"
                              name="email"
                              variant="static"
                              type="email"
                              className="text-gray-200 dark:text-gray-700 dark:placeholder:text-gray-500 placeholder:text-gray-600"
                              icon={<IoMail className="text-gray-200 dark:text-gray-900" />}
                            />
                          </div>
                          <div>
                            <span className="text-sm text-h1-light dark:text-h1-dark">پسورد خود را وارد کنید :</span>
                            <Input
                              placeholder="*****"
                              color="black"
                              name="password"
                              variant="static"
                              className="text-gray-200 bg-blue-gray-100 dark:text-gray-700 dark:placeholder:text-gray-500 placeholder:text-gray-600"
                              icon={<FaKey className="text-gray-200 dark:text-gray-900" />}
                              type="password"
                            />
                          </div>
                          <SubmitButton value="وارد شوید" types="submit" classs="w-full mt-3 flex justify-center" color="deep-orange" />
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="form-item sign-up p-5">
                    <h3 className="text-h1-light dark:text-h1-dark text-center">ثبت نام کنید</h3>
                    <div className="table">
                      <div className="table-cell">
                        <form action={loginHandler} className="flex flex-col justify-evenly gap-5">
                          <div className="div-signup">
                            <Input
                              label="نام کاربری "
                              color="black"
                              name="name"
                              variant="static"
                              className="text-gray-200 bg-blue-gray-100 dark:text-gray-700 dark:placeholder:text-gray-500 placeholder:text-gray-600"
                              required
                              icon={<MdTitle className="text-gray-200 dark:text-gray-900" />}
                            />
                          </div>
                          <div className="div-signup">
                            <Input
                              label="شماره تلفن خود را وارد نمایید "
                              placeholder="09390199977"
                              color="black"
                              name="phone"
                              variant="static"
                              required
                              className="text-gray-200 bg-blue-gray-100 dark:text-gray-700 dark:placeholder:text-gray-500 placeholder:text-gray-600"
                              onChange={(e) => {
                                e.target.value = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                );
                              }}
                              icon={<FaPhone className="text-gray-200 dark:text-gray-900" />}
                            />
                          </div>
                          <div className="div-signup">
                            <Input
                              label="ایمیل خود را وارد کنید "
                              placeholder="google@gmail.com"
                              color="black"
                              name="email"
                              type="email"
                              variant="static"
                              required
                              className="text-gray-200 bg-blue-gray-100 dark:text-gray-700 dark:placeholder:text-gray-500 placeholder:text-gray-600"
                              icon={<IoMail className="text-gray-200 dark:text-gray-900" />}
                            />
                          </div>
                          <div className="div-signup">
                            <Input
                              label="پسورد خود را وارد کنید "
                              placeholder="*****"
                              color="black"
                              name="password"
                              variant="static"
                              required
                              className="text-gray-200 bg-blue-gray-100 dark:text-gray-700 dark:placeholder:text-gray-500 placeholder:text-gray-600"
                              icon={<FaKey className="text-gray-200 dark:text-gray-900" />}
                            />
                          </div>
                          <SubmitButton value="ثبت نام کنید" types="submit" color="deep-orange" classs="w-full mt-3 flex justify-center" />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >
    </>
  );
}
