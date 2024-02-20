import { useEffect, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import "react-multi-date-picker/styles/colors/purple.css"
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_en from "react-date-object/locales/persian_en";
import { Button } from "@material-tailwind/react";
import InputForm from "../../components/InputForm/InputForm";
import { useForm } from "react-hook-form";
import { MdNumbers, MdTitle } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { OffType } from "../../types/type";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";
import { FaExclamation } from "react-icons/fa6";
type FormDiscountType = {
  code: string
  discount: number
  limitdiscount: number
  total: number
}
export default function Off() {
  const [datePicker, setDatepicker] = useState<any>(new Date());
  const { register, reset, handleSubmit, setValue } = useForm<FormDiscountType>()
  const [isUpdate, setIsUpdate] = useState<number | null>(null)
  const [allData, setAllData] = useState<OffType[]>([])
  let numberInfo = 0
  // const calculateTimeLeft = (endTime: Date) => {
  //   const now = new Date();
  //   const end = new Date(endTime);
  //   const diff = end.getTime() - now.getTime();
  //   if (diff < 0) return null
  //   const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  //   const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  //   const minutes = Math.floor((diff / 1000 / 60) % 60);
  //   const seconds = Math.floor((diff / 1000) % 60);
  //   return { days, hours, minutes, seconds };
  // }
  const editDiscount = (value: OffType) => {
    setValue("code", value.name)
    setValue("discount", value.offer)
    setValue("limitdiscount", value.filterCount)
    setValue("total", value.total)
    setIsUpdate(value.id)
  }
  const deleteDiscount = (id: number) => {
    axios.delete("off/" + id).then(() => { toast.success("تخفیف حذف شد"), getAllDiscount() }).catch(() => toast.warning("تخفیف حذف نشد"))
  }
  const termOff = (endTime: Date) => {
    const now = new Date();
    return now < new Date(endTime);
  }
  const createDiscount = (form: FormDiscountType) => {
    const arrayTime = datePicker.toString().split(",");
    const timer = arrayTime.map((i: string) => {
      const date = new DateObject({
        date: i,
        format: "YYYY/MM/DD HH:mm:ss",
        calendar: persian,
        locale: persian_fa,
      });
      date.convert(gregorian, persian_en);
      const lastTime = new Date(date.format())
      return lastTime
    })
    if (!termOff(timer[1])) return toast.warning("زمان تخفیف درست نمی باشد")
    const body = {
      name: form.code,
      offer: form.discount,
      filterCount: form.limitdiscount,
      start: timer[0],
      end: timer[1],
      total: form.total
    }
    if (isUpdate) {
      axios.put(`off/${isUpdate}`, body).then(() => { toast.success("کد تخفیف به روز شد"), reset(), getAllDiscount() }).catch((err) => {
        toast.warning("کد تخفیف به روز نشد")
      })
    } else {
      axios.post("off", body).then(() => { toast.success("کد تخفیف ثبت شد"), reset(), getAllDiscount() }).catch((err) => {
        toast.warning("کد تخفیف ثبت نشد")
      })
    }
  }
  const getAllDiscount = () => {
    axios.get("off").then(({ data }) => {
      setAllData(data)

      if (!data.length && !numberInfo) {
        numberInfo++
        toast.info("هیچ کد تخفیفی ثبت نشده است")
      }
    }).catch((err) => console.log(err))
  }
  useEffect(() => {
    getAllDiscount()
  }, [])
  return (
    <>
      <div className="w-full">
        <h3 className="bg-blue-200 mb-3 block py-3 px-3 rounded-md shadow-md">
          افزودن محصول جدید
        </h3>
        <form onSubmit={handleSubmit(createDiscount)} className="flex flex-wrap items-center justify-evenly gap-3">
          <div className="w-4/12">
            <InputForm register={register} name="code" type="text" icon={<MdTitle />} label="کد تخفیف" classLabel="text-gray-900" placeholder="حساس به حروف بزرگ و کوچک" required />
          </div>
          <div className="w-3/12">
            <InputForm register={register}
              onInput={(e) => {
                e.target.value = e.target.value
                  .replace(/[^0-9]/g, "")
              }}
              name="discount" type="text" icon={<MdNumbers />} label="مبلغ تخفیف" classLabel="text-gray-900" placeholder="به تومان وارد شود" required />
          </div>
          <div className="w-3/12">
            <InputForm register={register}
              onInput={(e) => {
                e.target.value = e.target.value
                  .replace(/[^0-9]/g, "")
              }}
              name="limitdiscount" type="text" icon={<MdNumbers />} label="حداقل مبلغ کالا برای تخفیف" classLabel="text-gray-900" placeholder="به تومان وارد شود" required />
          </div>
          <div className="w-3/12">
            <InputForm register={register}
              onInput={(e) => {
                e.target.value = e.target.value
                  .replace(/[^0-9]/g, "")
              }}
              name="total" type="text" icon={<MdNumbers />} label="تعداد دفعات" classLabel="text-gray-900" placeholder="اجباری" required />
          </div>
          <div className="w-3/12">
            <span>انتخاب زمان تخفیف</span>
            <DatePicker
              value={datePicker}
              format="YYYY/MM/DD HH:mm:ss"
              plugins={[
                <TimePicker position="bottom" />,
                <DatePanel position="left" />,
              ]}
              onChange={setDatepicker}
              range
              dateSeparator=" تا "
              calendar={persian}
              className="teal"
              locale={persian_fa}
              calendarPosition="bottom-right"
            />
          </div>
          <div className="w-full">
            <Button variant="gradient" type="submit" className="w-2/12" color="blue">
              ثبت تخفیف
            </Button>
          </div>
        </form>
        {allData.length ? (
          <div className="relative flex flex-col w-full h-full overflow-x-auto rounded-md shadow-md bg-clip-border">
            <table className="w-full responsive table-auto text-sm text-left h-full rtl:text-right mt-4 text-gray-500 dark:text-gray-400 table-rounded">
              <thead className="text-xs text-gray-700 uppercase  bg-gray-900 dark:text-gray-400">
                <tr>
                  <th scope="col" className="text-center py-3 px-2 text-base">
                    #
                  </th>
                  <th scope="col" className="text-center py-3 px-2 text-base">
                    کد تخفیف
                  </th>
                  <th scope="col" className="text-center py-3 px-2 text-base">
                    مبلغ تخفیف
                  </th>
                  <th scope="col" className="text-center py-3 px-2 text-base">
                    تعداد باقی مانده
                  </th>
                  <th scope="col" className="text-center py-3 px-2 text-base">
                    حداقل قیمت کالا
                  </th>
                  <th scope="col" className="text-center py-3 px-2 text-base">
                    تاریخ شروع
                  </th>
                  <th scope="col" className="text-center py-3 px-2 text-base">
                    تاریخ پایان
                  </th>
                  <th scope="col" className="text-center py-3 px-2 text-base">
                    نام ثبت کننده
                  </th>
                  <th scope="col" className="text-center py-3 px-2 text-base">
                    تاریخ ثبت
                  </th>
                  <th scope="col" className="text-center py-3 px-2 text-base">
                    ویرایش
                  </th>
                  <th scope="col" className="text-center py-3 px-2 pl-3 text-base">
                    حذف
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  allData.map((i, index) => (
                    <tr
                      key={index}
                      className="border-b bg-gray-800 border-gray-700  hover:bg-[#383939]"
                    >
                      <td
                        scope="row"
                        className="text-center py-4 px-2 font-medium whitespace-nowrap text-white"
                      >
                        {index + 1}
                      </td>
                      <td
                        scope="row"
                        className="text-center py-4 px-2 font-medium whitespace-nowrap text-white"
                      >
                        {i?.name}
                      </td>
                      <td
                        scope="row"
                        className="text-center py-4 px-2 font-medium whitespace-nowrap text-white"
                      >
                        {i?.offer}
                      </td>
                      <td
                        scope="row"
                        className="text-center py-4 px-2 font-medium whitespace-nowrap text-white"
                      >
                        {i.total}
                      </td>
                      <td
                        scope="row"
                        className="text-center py-4 px-2 font-medium whitespace-nowrap text-white"
                      >
                        {i.filterCount}
                      </td>
                      <td
                        scope="row"
                        className="text-center py-4 px-2 font-medium whitespace-nowrap text-white"
                      >
                        {new Date(i.start).toLocaleString("fa")}
                      </td>
                      <td
                        scope="row"
                        className="text-center py-4 px-2 font-medium whitespace-nowrap text-white"
                      >
                        {new Date(i.end).toLocaleString("fa")}
                      </td>
                      <td
                        scope="row"
                        className="text-center py-4 px-2 font-medium whitespace-nowrap text-white"
                      >
                        {i.user.name}
                      </td>
                      <td
                        scope="row"
                        className="text-center py-4 px-2 font-medium whitespace-nowrap text-white"
                      >
                        {new Date(i.updatedAt).toLocaleDateString("fa")}
                      </td>
                      <td className="py-4 px-2">
                        <SubmitBtn
                          type="button"
                          value="ویرایش"
                          onClick={() => editDiscount(i)}
                          classPlus={"mx-auto"}
                          icon={
                            <FaExclamation className="inline text-gray-50 mr-1" />
                          }
                        />
                      </td>
                      <td className="py-4 px-2">
                        <SubmitBtn
                          type="button"
                          value="حذف"
                          onClick={() => deleteDiscount(i.id)}
                          classPlus={
                            "to-[#7b0015] from-[#6c3d3d] hover:from-[#3c2223] hover:to-[#6c0718] mx-auto"
                          }
                          icon={
                            <FaExclamation className="inline text-gray-50 mr-1" />
                          }
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </>
  );
}
