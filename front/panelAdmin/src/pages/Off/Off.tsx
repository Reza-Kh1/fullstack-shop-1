import { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";

import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_en from "react-date-object/locales/persian_en";
import { Button } from "@material-tailwind/react";
export default function Off() {
  const [value, setValue] = useState(new Date());
  const handleOnchange = () => {
    const gog = value.toString().split(",");
    const date = new DateObject({
      date: "۱۴۰۲/۱۲/۰۲ ۲۱:۳۶:۰۰",
      format: "YYYY/MM/DD HH:mm:ss",
      calendar: persian,
      locale: persian_fa,
    });
    date.convert(gregorian, persian_en);
    console.log();
    const lastTime = new Date(date.format())
    const now = new Date()
    console.log(new Date(now-lastTime).toLocaleDateString("fa"))
  };
  return (
    <>
      <div className="flex w-full">
        <h2 className="block">تقویم شمسی</h2>
        <div className="w-6/12">
          <DatePicker
            value={value}
            className="w-full p-2 rounded-md bg-blue-gray-100"
            format="YYYY/MM/DD HH:mm:ss"
            plugins={[
              <TimePicker position="bottom" />,
              <DatePanel position="left" />,
            ]}
            onChange={setValue}
            range
            dateSeparator=" تا "
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            multiple
          />
        </div>
        <Button variant="gradient" onClick={handleOnchange} color="blue">
          ثبت تاریخ
        </Button>
      </div>
    </>
  );
}
