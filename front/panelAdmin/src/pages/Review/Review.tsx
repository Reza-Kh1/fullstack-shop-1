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
  DialogHeader,
  Option,
  Select,
} from "@material-tailwind/react";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";
import { FaPen } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Review() {
  const [allReview, setAllReview] = useState<ReviewsType[]>();
  const [paginations, setPaginations] = useState<PaginationType>();
  const { register, handleSubmit } = useForm();
  const [pages, setpages] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [status, setStatus] = useState<string>("false");
  const [open, setOpen] = useState<boolean>(false);
  const [replyComment,setReplyComment]=useState()
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
        console.log(data);
      })
      .catch((err) => toast.error(err));
  };
  const adctionForm = (form) => {};
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
              onChange={(value: string) => setStatus(value)}
              label="وضیعت کامنت ها"
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
              vlaue={status}
            >
              <Option value={"false"}>منتشر نشده</Option>
              <Option value={"true"}>منتشر شده</Option>
            </Select>
          </div>
        </div>
        <table className="w-full responsive text-sm text-left rtl:text-right mt-4 text-gray-500 dark:text-gray-400 table-rounded">
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
                محصول
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
            {allReview &&
              allReview.map((i) => (
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
                    {i.product?.name && (
                      <Link
                        to={"/admin/product/edit-product/" + i.product?.slug}
                      >
                        <Button variant="gradient" color="deep-orange">
                          {i.product.name}
                        </Button>
                      </Link>
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
                    <SubmitBtn
                      classPlus={"mx-auto"}
                      type="button"
                      value="ویرایش"
                      icon={<FaPen className="inline-block mr-2" />}
                      onClick={() => console.log(i.id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
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
      {/* <Dialog open={open} handler={setOpen} size="lg">
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit(adctionForm)}>
            <textarea {...register("comment")} cols={8} defaultValue={}></textarea>
            <textarea {...register("reply")} cols={8}></textarea>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={setOpen} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={setOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog> */}
    </>
  );
}
