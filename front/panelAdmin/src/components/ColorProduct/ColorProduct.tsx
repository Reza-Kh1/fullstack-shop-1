import { useState } from "react";
import InputForm from "../InputForm/InputForm";
import { ColorType } from "../../types/type";
import { useForm } from "react-hook-form";
import EndOff from "../EndOff/EndOff";
import { Accordion, AccordionBody, AccordionHeader, Button } from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";
type ColorProductType = {
    data: ColorType[];
    id: number
}
export default function ColorProduct({ data, id }: ColorProductType) {
    const [allData, setAllData] = useState<ColorType[]>(data || [])
    const [update, setUpdate] = useState<string>("")
    const [open, setOPen] = useState<number | null>(null)
    const [endOff, setEndOff] = useState<string>("")
    const { register, handleSubmit, reset, setValue, getValues } = useForm<any>()
    const createColor = (form: ColorType) => {
        const body = {
            color: form.color,
            codeColor: form.codeColor  || null,
            price: form.price.toString().replace(/,/g, ""),
            total: form.total.toString().replace(/,/g, ""),
            discount: form.discount.toString().replace(/,/g, "") || null,
            postId: id,
            endDiscount: endOff || null
        }
        console.log(body);
        
        axios.post("color", body).then(({ data }) => {
            reset()
            toast.success("افزوده شدّ")
            setAllData([...allData, data.data])
            setEndOff("")
        }).catch((err) => {
            console.log(err)
            toast.warning("باخطا روبرو شدیم")
        })
    }
    const deleteColor = (id?: number) => {
        axios.delete(`color/${id}`).then(({ data }) => {
            if (data.success) {
                toast.success("رنگ حذف شد")
                const newData = allData.filter((i) => i.id !== id)
                setAllData(newData)
            }
            toast.warning("باخطا روبرو شدیم")
        }).catch((err) => {
            console.log(err);
            toast.warning("باخطا روبرو شدیم")
        })
    }
    const openAccordion = (id?: number) => {
        allData.filter((i) => {
            if (i.id === id) {
                setValue(`codeColor${id}`, i.codeColor)
                setValue(`discount${id}`, i.discount)
                setValue(`color${id}`, i.color)
                setValue(`price${id}`, i.price)
                setValue(`total${id}`, i.total)
                setUpdate(i.endDiscount)
            }
        })
    }
    const updateColor = (id?: number) => {
        const codeColor = getValues(`codeColor${id}`)
        const discount = getValues(`discount${id}`)
        const color = getValues(`color${id}`)
        const price = getValues(`price${id}`)
        const total = getValues(`total${id}`)
        const body = {
            codeColor,
            discount: discount.toString().replace(/,/g, "")  || null,
            color,
            price: price.toString().replace(/,/g, ""),
            total: total.toString().replace(/,/g, ""),
            endDiscount: update || null
        }
        axios.put(`color/${id}`, body)
            .then(({ data }) => {
                if (data.success) {
                    const newData = allData.map((i) => {
                        if (i.id === id) {
                            i.codeColor = codeColor
                            i.discount = discount
                            i.color = color
                            i.price = price
                            i.total = total
                            i.endDiscount = update
                        }
                        return i
                    })
                    setAllData(newData)
                    toast.success("آپدیت شد")
                }
            }).catch((err) => {
                console.log(err)
            })
    }
    return (
        <>
            <div className="w-full mt-3">
                <h3 className="bg-blue-200 py-3 px-3 rounded-md shadow-md">
                    اطلاعات رنگ محصولات خود را تکمیل کنید
                </h3>
                <form onSubmit={handleSubmit(createColor)} className="flex flex-wrap">
                    <div className="w-1/2 p-2">
                        <label className="block mb-1 mt-3 text-sm font-medium text-gray-800">
                            اسم رنگ
                        </label>
                        <InputForm
                            name="color"
                            register={register}
                            type="text"
                        />
                    </div>
                    <div className="w-1/2 p-2">
                        <label className="block mb-1 mt-3 text-sm font-medium text-gray-800">
                            تعداد
                        </label>
                        <InputForm
                            name="total"
                            classLabel=""
                            register={register}
                            type="text"
                            onInput={(e) => {
                                const value = e.target.value;
                                const comma = value.replace(/,/g, '')
                                const formattedValue = comma.replace(/[^0-9,]/g, '');
                                e.target.value = Number(formattedValue).toLocaleString("en");
                            }}
                        />
                    </div>
                    <div className="w-1/2 p-2">
                        <label className="block mb-1 mt-3 text-sm font-medium text-gray-800">
                            قیمت محصول
                        </label>
                        <InputForm
                            name="price"
                            onInput={(e) => {
                                const value = e.target.value;
                                const comma = value.replace(/,/g, '')
                                const formattedValue = comma.replace(/[^0-9,]/g, '');
                                e.target.value = Number(formattedValue).toLocaleString("en");
                            }}
                            register={register}
                            type="text"
                        />
                    </div>
                    <div className="w-1/2 p-2">
                        <label className="block mb-1 mt-3 text-sm font-medium text-gray-800">
                            تخفیف
                        </label>
                        <InputForm
                            name="discount"
                            register={register}
                            type="text"
                            onInput={(e) => {
                                const value = e.target.value;
                                const comma = value.replace(/,/g, '')
                                const formattedValue = comma.replace(/[^0-9,]/g, '');
                                e.target.value = Number(formattedValue).toLocaleString("en");
                            }}
                        />
                    </div>
                    <div className="w-1/2 p-2">
                        <label className="block mb-1 mt-3 text-sm font-medium text-gray-800">
                            زمان تخفیف
                        </label>
                        <div className="flex gap-2">
                            <div className="w-8/12">
                                <EndOff date={endOff} setDate={setEndOff} />
                            </div>
                            <Button onClick={() => setEndOff("")} color="red">پاک کردن زمان</Button>
                        </div>
                    </div>
                    <div className="w-1/2 p-2">
                        <label className="block mb-1 mt-3 text-sm font-medium text-gray-800">
                            رنگ
                        </label>
                        <input type="color" {...register("codeColor")} className="w-20 h-20 rounded-md"/>
                    </div>
                    <div className="w-full">
                        <Button type="submit" color="blue" >
                            افزودن
                        </Button>
                    </div>
                </form>
                <div className="w-full p-2 border-none mt-3">
                    {allData.map((i, index) => (
                        <Accordion className={`my-2 ${i.total === 0 ? "bg-red-200" : "bg-blue-gray-200"} rounded-e-md p-2`} open={open === index} key={index}>
                            <AccordionHeader className=" border-none p-1" onClick={() => { setOPen(index === open ? null : index), openAccordion(i?.id) }}>
                                {i.color}
                                {
                                    i.total === 0 && (
                                        <span>تمام شده !!!</span>
                                    )
                                }
                            </AccordionHeader>
                            <AccordionBody >
                                <div className="w-full flex flex-wrap">
                                    <div className="w-1/2 p-2">
                                        <label className="block mb-1 mt-3 text-sm font-medium text-gray-800">
                                            اسم رنگ
                                        </label>
                                        <InputForm
                                            name={`color${i.id}`}
                                            register={register}
                                            type="text"
                                        />
                                    </div>
                                    <div className="w-1/2 p-2">
                                        <label className="block mb-1 mt-3 text-sm font-medium text-gray-800">
                                            تعداد
                                        </label>
                                        <InputForm
                                            name={`total${i.id}`}
                                            classLabel=""
                                            register={register}
                                            type="text"
                                            onInput={(e) => {
                                                const value = e.target.value;
                                                const comma = value.replace(/,/g, '')
                                                const formattedValue = comma.replace(/[^0-9,]/g, '');
                                                e.target.value = Number(formattedValue).toLocaleString("en");
                                            }}
                                        />
                                    </div>
                                    <div className="w-1/2 p-2">
                                        <label className="block mb-1 mt-3 text-sm font-medium text-gray-800">
                                            قیمت محصول
                                        </label>
                                        <InputForm
                                            onInput={(e) => {
                                                const value = e.target.value;
                                                const comma = value.replace(/,/g, '')
                                                const formattedValue = comma.replace(/[^0-9,]/g, '');
                                                e.target.value = Number(formattedValue).toLocaleString("en");
                                            }}
                                            name={`price${i.id}`}

                                            register={register}
                                            type="text"
                                        />
                                    </div>
                                    <div className="w-1/2 p-2">
                                        <label className="block mb-1 mt-3 text-sm font-medium text-gray-800">
                                            تخفیف
                                        </label>
                                        <InputForm
                                            name={`discount${i.id}`}
                                            register={register}
                                            type="text"
                                            onInput={(e) => {
                                                const value = e.target.value;
                                                const comma = value.replace(/,/g, '')
                                                const formattedValue = comma.replace(/[^0-9,]/g, '');
                                                e.target.value = Number(formattedValue).toLocaleString("en");
                                            }}
                                        />
                                    </div>
                                    <div className="w-1/2 p-2">
                                        <label className="block mb-1 mt-3 text-sm font-medium text-gray-800">
                                            زمان تخفیف
                                        </label>
                                        <div className="flex gap-2">
                                            <div className="w-8/12">
                                                <EndOff date={update} setDate={setUpdate} />
                                            </div>
                                            <Button onClick={() => setUpdate("")} color="red">پاک کردن زمان</Button>
                                        </div>
                                    </div>
                                    <div className="w-1/2 p-2">
                                        <label className="block mb-1 mt-3 text-sm font-medium text-gray-800">
                                            رنگ
                                        </label>
                                        <input type="color" {...register(`codeColor${i.id}`)} className="w-20 h-20" />
                                    </div>
                                    <div className="w-full flex justify-between mt-3">
                                        <Button type="button" onClick={() => updateColor(i?.id)} color="green">
                                            ذخیره
                                        </Button>
                                        <Button type="button" onClick={() => deleteColor(i.id)} color="red">
                                            پاک کردن رنگ
                                        </Button>
                                    </div>

                                </div>

                            </AccordionBody>
                        </Accordion>
                    ))}
                </div>
            </div>
        </>
    )
}
