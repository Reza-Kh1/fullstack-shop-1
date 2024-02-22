import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PaginationType, ReviewsType } from "../../types/type";
import Pagination from "../../components/Pagination/Pagination";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Option,
  Select,
} from "@material-tailwind/react";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";
import { FaCheck, FaPen, FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";
type ReplyReviewType = {
  comment: string
  reply: string | null
}
type ReviweInfo = {
  comment: string
  id: number
}
export default function Review() {
  const [allReview, setAllReview] = useState<ReviewsType[]>();
  const [paginations, setPaginations] = useState<PaginationType>();
  const { register, handleSubmit, setValue, reset } = useForm<ReplyReviewType>();
  const [pages, setpages] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [status, setStatus] = useState<string>("false");
  const [open, setOpen] = useState<boolean>(false);
  const [reviewInfo, setReviewInfo] = useState<ReviweInfo | null>(null)
  let number = 0;
  const getData = () => {
    axios
      .get(`review/admin?page=${pages}&status=${status}`)
      .then(({ data }) => {
        if (data.message && !number) {
          number++;
          toast.info(data.message);
        }
        setPaginations(data.pagination);
        setAllReview(data.rows);
        setCount(data.count);
      })
      .catch((err) => toast.error(err));
  };
  const adctionForm = (form: ReplyReviewType) => {
    if (form.reply) {
      const body = {
        comment: form.reply,
        replyId: reviewInfo?.id,
      }
      axios.post("review", body).then(() => { getData(), toast.success("کامنت ثبت شد"), reset() }).catch(() => toast.error("کامنت ثبت نشد"))
    }
    if (form.comment !== reviewInfo?.comment) {
      const body = {
        comment: form.comment,
        status: true
      }
      axios.put(`review/${reviewInfo?.id}`, body).then(() => { getData(), toast.success("کامنت کاربر به روز شد"), reset() }).catch(() => toast.error("کامنت کاربر به روز نشد"))
    }
    reset()
    setReviewInfo(null)
    setOpen(false)
  };
  const reviewEdit = (value: ReviweInfo) => {
    setOpen(true), setReviewInfo(value)
    setValue("comment", value.comment)
  }
  const deleteAction = (id: number) => {
    axios.delete("review/" + id).then(() => { getData(), toast.success("کامنت حذف شد") }).catch(() => toast.error("کامنت حذف نشد"))
  }
  const checkAction = (id: number, status: boolean) => {
    const body = {
      status: status ? "false" : "true"
    }
    axios.put("review/" + id, body).then(() => { getData(), toast.success(`کامنت ${status ? "لغو تایید" : "تایید"} شد`) }).catch(() => toast.error("کامنت به روز نشد"))
  }
  useEffect(() => {
    getData();
  }, [pages, status]);
  return (
    <>
      <div>
        <div className="bg-blue-200  py-3 px-3 rounded-md shadow-md flex justify-between items-center transition-all">
          <h3>کامنت ها {count}</h3>
        </div>
        <div className="bg-gray-800 mt-3 py-3 px-3 rounded-md shadow-md flex justify-between items-center transition-all">
          <h3 className="text-gray-50">
            فیلد انتخاب کامنت های منتشر شده و نشده
          </h3>
          <div
            className="w-1/6 flex items-end rounded-md"
            style={{ direction: "ltr" }}
          >
            <Select
              className={"text-gray-50"}
              onChange={(value: string) => { setStatus(value), setpages(1) }}
              label="وضیعت کامنت ها"
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
              value={status}
            >
              <Option value={"false"}>منتشر نشده</Option>
              <Option value={"true"}>منتشر شده</Option>
            </Select>
          </div>
        </div>
        {allReview && (
          <div className="relative flex flex-col w-full h-full overflow-x-auto rounded-md shadow-md bg-clip-border">
            <table className="w-full responsive table-auto text-sm text-left h-full rtl:text-right mt-4 text-gray-500 dark:text-gray-400 table-rounded">
              <thead className="text-xs text-gray-700 uppercase  bg-gray-900 dark:text-gray-400">
                <tr>
                  <th scope="col" className="text-center py-3 text-base">
                    نام
                  </th>
                  <th scope="col" className="text-center py-3 text-base">
                    ایمیل
                  </th>
                  <th scope="col" className="text-center py-3 text-base">
                    شماره تلفن
                  </th>
                  <th scope="col" className="text-center py-3 text-base">
                    موقعیت
                  </th>
                  <th scope="col" className="text-center py-3 text-base">
                    کامنت ها
                  </th>
                  <th scope="col" className="text-center py-3 text-base">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody>
                {allReview.map((i) => (
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
                      {i?.email}
                    </td>
                    <td
                      scope="row"
                      className="text-center py-4 font-medium whitespace-nowrap text-white"
                    >
                      {i.phone}
                    </td>
                    <td
                      scope="row"
                      className="text-center py-4 font-medium whitespace-nowrap text-white"
                    >
                      {i.product?.name ? (
                        <Link
                          to={"/admin/product/edit-product/" + i.product?.slug}
                        >
                          <Button variant="gradient" color="deep-orange">
                            {i.product.name}
                          </Button>
                        </Link>
                      )
                        : (
                          <span>پاسخ داده</span>
                        )}
                    </td>
                    <td
                      scope="row"
                      className="text-center py-4 font-medium whitespace-nowrap text-white"
                    >
                      {i.comment}
                    </td>
                    <td
                      scope="row"
                      className="text-center py-4 font-medium whitespace-nowrap text-white"
                    >
                      <div className="flex gap-2 justify-center">
                        <SubmitBtn
                          type="button"
                          value="ویرایش"
                          icon={<FaPen className="inline-block mr-2" />}
                          onClick={() => reviewEdit(i)}
                        />
                        <Button onClick={() => deleteAction(i.id)} variant="gradient" color="red"><FaTrash /></Button>
                        <Button onClick={() => checkAction(i.id, i.status)} variant="gradient" color={i.status ? "deep-orange" : "green"}>{i.status ? <IoCloseSharp /> : <FaCheck />}</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>)}
        <div>
          {paginations && (
            <Pagination
              page={pages}
              pagination={paginations}
              setPage={setpages}
            />
          )}
        </div>
      </div>
      <Dialog open={open} handler={setOpen} size="lg">
        <DialogBody>
          <div className="flex">
            <div className="w-1/2 p-2">
              <span>کامنت شخص</span>
              <textarea {...register("comment")} className="p-2 rounded-md bg-blue-gray-400 text-gray-100 shadow-md w-full" rows={8}></textarea>
            </div>
            <div className="w-1/2 p-2">
              <span>پاسخ شما</span>
              <textarea {...register("reply")} className="p-2 rounded-md bg-blue-gray-400 text-gray-100 shadow-md w-full" rows={8}></textarea>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-between">
          <Button variant="gradient" className="px-10" color="green" onClick={handleSubmit(adctionForm)}>
            <span>ثبت</span>
          </Button>
          <Button variant="gradient" className="px-10" color="red" onClick={() => setOpen(false)}>
            <span>کنسل</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
