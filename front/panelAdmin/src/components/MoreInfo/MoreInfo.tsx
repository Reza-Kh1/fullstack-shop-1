import { FaTrash } from "react-icons/fa6"
import { useForm } from "react-hook-form"
import { Button } from "@material-tailwind/react"
type MoreInfoType = {
    data: string[]
    setData: (value: string[]) => void
}
export default function MoreInfo({ data, setData }: MoreInfoType) {
    const { register, reset, getValues } = useForm()
    const deleteHandler = (value: string) => {
        const newData = data.filter((item) => item !== value)
        setData(newData)
    }
    const createHandler = () => {
        const value = getValues("more")
        data.push(value)
        reset()
    }
    return (
        <div className="flex flex-wrap justify-between items-center">
            <div className="w-4/12">
                <textarea

                    placeholder="وزن : 150 گرم"
                    {...register("more", { required: true })}
                    className="w-full p-2 rounded-md"

                    rows={1}
                ></textarea>
                <Button varient="gradient" color="blue" className="px-3 py-2" onClick={createHandler}>افزودن</Button>
            </div>
            <div className="flex flex-wrap w-8/12 gap-2 pr-2">
                {data.length ? (
                    <>
                        {data.map((i, index) => (
                            <div key={index} className="p-2 flex rounded items-center bg-gray-100">
                                <p className="text-xs ml-1">
                                    {i}
                                </p>
                                <i
                                    onClick={() => deleteHandler(i)}
                                    className="text-red-500 p-2 transition-all bg-[#f0f8ff3d] hover:bg-gray-900 hover:text-gray-100 rounded-md cursor-pointer"
                                >
                                    <FaTrash className="text-lg" />
                                </i>
                            </div>
                        ))}
                    </>
                ) : null}
            </div>
        </div>
    )
}
