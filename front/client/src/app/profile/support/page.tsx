"use client";
import { fetchApi } from "@/action/fetchApi";
// import SubmitButton from "@/components/Button/SubmitButton";
import InputCustom from "@/components/InputCustom/InputCustom";
import SubmitButton from "@/components/ui/SubmitButton";
// import {
//   Accordion,
//   AccordionBody,
//   AccordionHeader,
// } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaCheck, FaInfoCircle } from "react-icons/fa";
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
        <div className="w-1/6 mt-3">
          <SubmitButton
            color="orange"
            type="submit"
            value="ثبت"
            classs="w-full"
          />
        </div>
      </form>
      <div className="w-full mt-3 p-2 rounded-md bg-bg-head-dark dark:bg-bg-head-light shadow-md mb-4">
        <h3 className="text-h1-light dark:text-h1-dark">
          تیکت هایی که قبلا ثبت کرده اید
        </h3>
      </div>
      {/* {allData?.length ? (
        allData?.map((i) => (
          <Accordion
            className="bg-custom-dark my-3 dark:bg-custom-light p-2 rounded-md"
            key={i.id}
            open={open === i.id}
            icon={
              <FaAngleDown
                className={`${
                  i.id === open ? "rotate-180" : ""
                } h-5 w-5 transition-transform`}
              />
            }
          >
            <AccordionHeader
              className="text-h1-light dark:text-h1-dark text-lg"
              onClick={() => handleOpen(i.id)}
            >
              <div className="w-full flex justify-between pl-3">
                <div className="flex gap-2">
                  <span>{i.name}</span>
                  <span>
                    ({new Date(i?.createdAt).toLocaleDateString("fa")})
                  </span>
                </div>
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
              </div>
            </AccordionHeader>
            <AccordionBody>
              <div className="w-full">
                <div className="w-8/12 bg-slate-300 dark:bg-slate-300 rounded-md shadow-md p-2 ml-auto">
                  <span className="text-h1-light dark:text-h1-dark text-lg">
                    {i.name}
                  </span>
                  <p className="text-p-light dark:text-p-dark mt-3">{i.text}</p>
                </div>
                {i.replies?.length ? (
                  <div className="w-8/12 bg-slate-300 dark:bg-slate-300 mt-3 rounded-md shadow-md p-2 mr-auto">
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
            </AccordionBody>
          </Accordion>
        ))
      ) : (
        <>
          <div className="text-center bg-deep-orange-400 dark:bg-deep-orange-300 shadow-md p-3 rounded-md">
            <span className="text-gray-900">
              هیچ تیکتی تاکنون ثبت نکرده اید
            </span>
          </div>
        </>
      )} */}
    </div>
  );
}
