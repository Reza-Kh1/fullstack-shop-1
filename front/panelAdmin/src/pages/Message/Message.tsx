import axios from "axios";
import { useEffect, useState } from "react";
import { PaginationType } from "../../types/type";
import Pagination from "../../components/Pagination/Pagination";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Option,
  Select,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { FaPen } from "react-icons/fa6";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";
import { useForm } from "react-hook-form";
type MessageType = {
  id: number;
  name: string;
  userId: string;
  text: string;
  status: boolean;
  createdAt: Date;
  replyId: number;
};
export default function Message() {
  const [status, setStatus] = useState<string>("false");
  const [page, setPage] = useState<number>(1);
  const [paginations, setPaginations] = useState<PaginationType>();
  const [allData, setAllData] = useState<MessageType[]>();
  const [idInfo, setIdInfo] = useState<MessageType>();
  const [open, setOpen] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<{ reply: string }>();
  let number = 0;
  const getData = () => {
    axios
      .get(`message/admin?page=${page}&status=${status}`)
      .then(({ data }) => {
        if (data.rows.length) {
          number++;
          toast.success("هیچ تیکتی دریافت نکرده اید");
        }
        setPaginations(data.pagination);
        setAllData(data.rows);
      })
      .catch((err) => toast.error(err));
  };
  const responseMessage = (form: { reply: string }) => {
    if (!form.reply) return;
    const body = {
      text: form.reply,
    };
    axios
      .post(`message/${idInfo?.id}`, body)
      .then(() => {
        reset();
        setOpen(false);
        getData();
        toast.success("پاسخ تیکت ثبت شد");
      })
      .catch((err) => toast.error(err));
  };
  const openDialog = (value: MessageType) => {
    setOpen(true);
    setIdInfo(value);
  };
  useEffect(() => {
    getData();
  }, [status, page]);
  return (
    <>
      <div className="w-full">
        <h3 className="bg-blue-200 py-3 px-3 rounded-md shadow-md">
          دسته اصلی
        </h3>
        <div className="bg-gray-800 mt-3 py-3 px-3 rounded-md shadow-md flex justify-between items-center transition-all">
          <h3 className="text-gray-50">
            فیلد انتخاب تیکت های پاسخ داده شده و نشده
          </h3>
          <div
            className="w-1/6 flex items-end rounded-md"
            style={{ direction: "ltr" }}
          >
            <Select
              className={"text-gray-50"}
              onChange={(value: string) => {
                setStatus(value), setPage(1);
              }}
              label="وضیعت کامنت ها"
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
              value={status}
            >
              <Option value={"false"}>پاسخ داده نشده</Option>
              <Option value={"true"}>پاسخ داده شده</Option>
            </Select>
          </div>
        </div>
        {allData?.length && (
          <div className="relative flex flex-col w-full h-full overflow-x-auto rounded-md shadow-md bg-clip-border">
            <table className="w-full responsive table-auto text-sm text-left h-full rtl:text-right mt-4 text-gray-500 dark:text-gray-400 table-rounded">
              <thead className="text-xs text-gray-700 uppercase  bg-gray-900 dark:text-gray-400">
                <tr>
                  <th scope="col" className="text-center py-3 text-base">
                    موضوع
                  </th>
                  <th scope="col" className="text-center py-3 text-base">
                    پیام تیکت
                  </th>
                  <th scope="col" className="text-center py-3 text-base">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody>
                {allData.map((i) => (
                  <tr
                    key={i.id}
                    className="border-b bg-gray-800 border-gray-700  hover:bg-[#383939]"
                  >
                    <td
                      scope="row"
                      className="text-center py-4 font-medium whitespace-nowrap text-white"
                    >
                      {i.name}
                    </td>
                    <td
                      scope="row"
                      className="text-center py-4 font-medium whitespace-nowrap text-white"
                    >
                      {i.text}
                    </td>
                    <td
                      scope="row"
                      className="text-center py-4 font-medium whitespace-nowrap text-white"
                    >
                      <div className="flex gap-2 justify-center">
                        <SubmitBtn
                          type="button"
                          value="پاسخ"
                          icon={<FaPen className="inline-block mr-2" />}
                          onClick={() => openDialog(i)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pagination page={page} pagination={paginations} setPage={setPage} />
      </div>
      <Dialog open={open} handler={setOpen} size="lg">
        <DialogBody>
          <div className="flex flex-wrap">
            <div className="w-full p-2">
              <span>موضوع تیکت</span>
              <p className="p-2 rounded-md mt-2 mb-3 bg-blue-gray-200 shadow-md text-gray-900">
                {idInfo?.name}
              </p>
              <span>پیام تیکت</span>
              <p className="p-2 rounded-md mt-2 bg-blue-gray-200 shadow-md text-gray-900">
                {idInfo?.text}
              </p>
            </div>
            <div className="w-full p-2">
              <span>پاسخ شما</span>
              <textarea
                {...register("reply")}
                className="p-2 rounded-md bg-blue-gray-200 text-gray-900 shadow-md w-full"
                rows={8}
              ></textarea>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-between">
          <Button
            variant="gradient"
            className="px-10"
            color="green"
            onClick={handleSubmit(responseMessage)}
          >
            <span>ثبت</span>
          </Button>
          <Button
            variant="gradient"
            className="px-10"
            color="red"
            onClick={() => setOpen(false)}
          >
            <span>کنسل</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
