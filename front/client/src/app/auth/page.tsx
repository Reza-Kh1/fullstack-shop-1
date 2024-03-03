"use client";
import { useState } from "react";
import { FaPhone, FaKey } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { toast } from "react-toastify";
import { MdTitle } from "react-icons/md";
import { signIn } from "next-auth/react";
import "./style.css";
import { useRouter } from "next/navigation";
import InputCustom from "@/components/InputCustom/InputCustom";
import SubmitButton from "@/components/ui/SubmitButton";
export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const route = useRouter();
  const loginHandler = async (form: any) => {
    const name = form.get("name");
    const email = form.get("email");
    const phone = form.get("phone");
    const password = form.get("password");
    if ((!email && !phone) || !password)
      return toast.warning("تمام فیلدهارو پر کنید");
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
        toast.warning("شماره تلفن یا ایمیل در سیستم ثبت شده است");
      } else {
        route.push("/");
        toast.success("خوش آمدید.");
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
      console.log(res);
      
      if (res?.error) {
        toast.warning("رمز وارد شده اشتباه است");
      } else {
        route.push("/profile");
        toast.success("خوش آمدید.");
      }
    }
  };
  return (
    <>
      <div className="signup-page mb-24 w-full flex items-center justify-center">
        <div className="w-4/12 mx-auto z-10 my-auto">
          <div className="flex justify-around text-h1-light dark:text-h1-dark shadow-[#474646] shadow-lg dark:shadow-[#aea9a9] bg-[#262e35] dark:bg-white mb-52 p-3 customize-shadow">
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
            <div
              className={`container shadow-[#474646] shadow-lg dark:shadow-[#aea9a9] bg-[#262e35] dark:bg-white ${
                isLogin ? "log-in" : ""
              }`}
            >
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
                    <h3 className=" text-center mb-2 text-span-light dark:text-span-dark">
                      وارد شوید
                    </h3>
                    <span className="text-xs text-span-light dark:text-span-dark">
                      برای ورود به حساب کاربری میتوانید یکی از فیلدهای شماره
                      تلفن یا ایمیل را پر کنید و به حساب خود وارد شوید .
                    </span>
                    <div className="table">
                      <div className="table-cell">
                        <form
                          action={loginHandler}
                          className="h-full gap-3 mt-10 flex flex-col"
                        >
                          <div>
                            <InputCustom
                              name="phone"
                              placeholder="09390199977"
                              required
                              onChange={(e) => {
                                e.target.value = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                );
                              }}
                              className="text-sm"
                              classSpan="text-sm"
                              value="شماره تلفن خود را وارد نمایید :"
                              icon={<FaPhone />}
                            />
                          </div>
                          <div>
                            <InputCustom
                              value="ایمیل خود را وارد کنید :"
                              name="email"
                              icon={<IoMail />}
                              className="text-sm"
                              classSpan="text-sm"
                              placeholder="اختیاری"
                            />
                          </div>
                          <div>
                            <InputCustom
                              name="password"
                              icon={<FaKey />}
                              placeholder="*****"
                              required
                              type="password"
                              className="text-sm"
                              classSpan="text-sm"
                              value="پسورد خود را وارد کنید :"
                            />
                          </div>
                          <SubmitButton
                            value="وارد شوید"
                            type="submit"
                            classs="w-full mt-3 flex justify-center"
                            color="blue"
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="form-item sign-up p-5">
                    <h3 className="text-h1-light dark:text-h1-dark text-center">
                      ثبت نام کنید
                    </h3>
                    <div className="table">
                      <div className="table-cell">
                        <form
                          action={loginHandler}
                          className="flex flex-col justify-evenly"
                        >
                          <div className="div-signup">
                            <InputCustom
                              name="name"
                              icon={<MdTitle />}
                              required
                              type="text"
                              value="نام کاربری :"
                              className="text-sm"
                              classSpan="text-sm mt-1"
                            />
                          </div>
                          <div className="div-signup">
                            <InputCustom
                              name="phone"
                              icon={<FaPhone />}
                              className="text-sm"
                              classSpan="text-sm mt-1"
                              required
                              type="text"
                              placeholder="09390199977"
                              onChange={(e) => {
                                e.target.value = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                );
                              }}
                              value="شماره تلفن خود را وارد نمایید:"
                            />
                          </div>
                          <div className="div-signup">
                            <InputCustom
                              name="email"
                              icon={<IoMail />}
                              className="text-sm"
                              classSpan="text-sm mt-1"
                              placeholder="google@gmail.com"
                              required
                              type="email"
                              value="ایمیل خود را وارد کنید:"
                            />
                          </div>
                          <div className="div-signup">
                            <InputCustom
                              name="password"
                              icon={<FaKey />}
                              className="text-sm"
                              classSpan="text-sm mt-1"
                              placeholder="********"
                              required
                              type="password"
                              value="پسورد خود را وارد کنید:"
                            />
                          </div>
                          <SubmitButton
                            value="ثبت نام کنید"
                            type="submit"
                            color="blue"
                            classs="w-full mt-3 flex justify-center"
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
