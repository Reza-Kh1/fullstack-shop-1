"use client";
import { fetchApi } from "@/action/fetchApi";
import InputCustom from "@/components/InputCustom/InputCustom";
import SubmitButton from "@/components/ui/SubmitButton";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaCheck } from "react-icons/fa";
import { FaInfo } from "react-icons/fa6";
import { toast } from "react-toastify";
type MessageType = {
  createdAt: Date;
  id: number;
  name: string;
  status: boolean;
  text: string;
  replies?: {
    text?: string;
  }[];
};
export default function Page() {
  const { data }: any = useSession();
  const [allData, setAllData] = useState<MessageType[]>();
  const [open, setOpen] = React.useState(0);
  const ref = useRef<HTMLFormElement>(null);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  const createTicket = async (form: FormData) => {
    const subject = form.get("subject") as string;
    const text = form.get("text") as string;
    const body = {
      name: subject,
      text,
    };
    const token = data?.user?.token;
    if (token) {
      const res = await fetchApi({
        url: "message",
        token,
        body,
        method: "POST",
      });
      if (res.error) {
        toast.warning(res.error);
      } else {
        ref.current?.reset();
        showTicket();
        toast.success(res.message || "تیکت شما ثبت شد");
      }
    }
  };
  const showTicket = async () => {
    const token = data?.user?.token;
    if (token) {
      const res = await fetchApi({ url: "message", token });
      if (res.error) {
        toast.warning(res.error);
      } else {
        setAllData(res);
      }
    }
  };
  useEffect(() => {
    showTicket();
  }, []);
  return (
    <div className="w-full">
      <div className="w-full mt-3 p-2 rounded-md bg-bg-head-dark dark:bg-bg-head-light shadow-md mb-4">
        <h3 className="text-h1-light dark:text-h1-dark">تیکت جدید ثبت کنید</h3>
      </div>
      <form ref={ref} action={createTicket}>
        <div className="w-1/2">
          <InputCustom
            required={true}
            value="موضوع تیکت :"
            placeholder="پیگیری سفارش..."
            name="subject"
          />
        </div>
        <div className="mt-3">
          <InputCustom
            required={true}
            textarea
            name="text"
            value="موضوع تیکت :"
            rows={6}
          />
        </div>
        <div className="w-2/12 mt-3">
          <SubmitButton
            color="orange"
            type="submit"
            value="ثبت"
            classs="px-5 py-1 w-full"
          />
        </div>
      </form>
      <div className="w-full mt-3 p-2 rounded-md bg-bg-head-dark dark:bg-bg-head-light shadow-md mb-4">
        <h3 className="text-h1-light dark:text-h1-dark">
          تیکت هایی که قبلا ثبت کرده اید
        </h3>
      </div>
      <div>
        {allData?.length ? (
          allData.map((i, index) => (
            <div
              key={index}
              className="dark:bg-gray-200 my-3 bg-slate-800 p-2 rounded-md"
            >
              <div
                className="w-full flex justify-between py-1 cursor-pointer items-center"
                onClick={() => handleOpen(i.id)}
              >
                <div className="flex gap-2">
                  <span className="text-span-light dark:text-span-dark">
                    {i.name}
                  </span>
                  <span className="text-span-light dark:text-span-dark">
                    ({new Date(i?.createdAt).toLocaleDateString("fa")})
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  {i.status ? (
                    <>
                      <div className="bg-green-300 text-gray-900 px-3 py-2 rounded-md text-sm">
                        <span>پاسخ داد شده</span>
                        <FaCheck className="inline mr-2" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-red-300 px-3 py-2 text-gray-900 rounded-md text-sm">
                        <span>پاسخ داد نشده</span>
                        <FaInfo className="inline mr-2" />
                      </div>
                    </>
                  )}
                  <span>
                    <FaAngleDown
                      className={`transition-all text-span-light dark:text-span-dark ${
                        open === i.id ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </div>
              </div>
              <div
                className={`${open === i.id ? "inline-block" : "hidden"} mt-3`}
              >
                <div className="w-full">
                  <div className="w-8/12 bg-slate-900 dark:bg-slate-300 rounded-md shadow-md p-2 ml-auto">
                    <span className="text-h1-light dark:text-h1-dark text-lg">
                      {i.name}
                    </span>
                    <p className="text-p-light dark:text-p-dark mt-3">
                      {i.text}
                    </p>
                  </div>
                  {i.replies?.length ? (
                    <div className="w-8/12  bg-slate-900 dark:bg-slate-300 mt-3 rounded-md shadow-md p-2 mr-auto">
                      <span className="text-h1-light dark:text-h1-dark text-lg">
                        پاسخ ادمین
                      </span>
                      <p className="text-p-light dark:text-p-dark mt-3">
                        {i.replies?.map((respown, index) => (
                          <p key={index}>{respown.text}</p>
                        ))}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            <div className="text-center bg-deep-orange-400 dark:bg-deep-orange-300 shadow-md p-3 rounded-md">
              <span className="text-gray-900">
                هیچ تیکتی تاکنون ثبت نکرده اید
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
