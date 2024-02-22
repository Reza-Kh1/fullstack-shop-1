import { useForm } from "react-hook-form";
import InputForm from "../InputForm/InputForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Editor from "../EditorPage/EditorPage";
import { Accordion, Button, Option, Select } from "@material-tailwind/react";
import { AccordionHeader } from "@material-tailwind/react";
import { AccordionBody } from "@material-tailwind/react";
import DialogImage from "../DialogImage/DialogImage";
import { FaTrash } from "react-icons/fa6";
import SubmitBtn from "../SubmitBtn/SubmitBtn";
import { MdTitle } from "react-icons/md";
import { ProductDetailType } from "../../types/type";
type SlillType = {
  name: string;
  skills: { name: string; text: string }[];
};
type DetailProductType = {
  detail?: ProductDetailType;
  id?: number | undefined | null;
};
export default function DetailProduct({ id, detail }: DetailProductType) {
  const { register, handleSubmit, resetField, setValue } = useForm();
  const [showImage, setShowImage] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [allImage, setAllImage] = useState<string[]>([]);
  const [editor, setEditor] = useState("");
  const [open, setOpen] = useState<number>();
  const [keyword, setKeyword] = useState<string[]>([]);
  const [skill, setSkill] = useState<SlillType[]>([]);
  const [skillCategory, setSkillCategory] = useState<string>("");
  const createAction = (form: any) => {
    if (!form.title) return toast.error("سربرگ رو بنویسید");
    const body = {
      title: form.title,
      keyward: keyword,
      srcImg: allImage,
      skillProduct: skill,
      text: editor,
    };
    if (detail?.id) {
      axios
        .put(`product/detail/${detail?.id}`, body)
        .then(() => {
          toast.success("تنظیمات ثبت شد");
        })
        .catch(() => {
          toast.error(401);
        });
    } else {
      axios
        .post(`product/detail/${id}`, body)
        .then(() => {
          toast.success("تنظیمات ثبت شد");
        })
        .catch(() => {
          toast.error(401);
        });
    }
  };
  const createSkill = (form: any) => {
    if (!form.skillname || !form.skilltext) return;
    if (form.categoryskill) {
      const body = {
        name: form.categoryskill,
        skills: [{ name: form.skillname, text: form.skilltext }],
      };
      setSkill([...skill, body]);
    } else {
      skill?.some((i) => {
        if (i.name === skillCategory) {
          return (i.skills = [
            ...i.skills,
            { name: form.skillname, text: form.skilltext },
          ]);
        }
      });
    }
    resetField("categoryskill");
    resetField("skillname");
    resetField("skilltext");
  };
  const deleteSkill = (text: string, name: string) => {
    const newSkill: SlillType[] = skill?.map((i) => {
      if (i.name === name) {
        i.skills = i.skills.filter((skill) => skill.text !== text);
      }
      return i;
    });
    setSkill(newSkill);
  };
  const createKeyword = (form: any) => {
    if (!form.keyword) return;
    setKeyword([...keyword, form.keyword]);
    resetField("keyword");
  };
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  const addImage = () => {
    if (imageUrl) {
      allImage?.push(imageUrl);
    }
  };
  const deleteImage = (i: string) => {
    const newImg = allImage.filter((id) => id !== i);
    setAllImage(newImg);
  };
  useEffect(() => {
    if (imageUrl) {
      setShowImage(false);
      addImage();
    }
    if (detail) {
      setAllImage(detail?.srcImg || []);
      setSkill(detail?.skillProduct || []);
      setEditor(detail?.text || "");
      setKeyword(detail?.keyward || []);
      setValue("title", detail?.title || "");
    }
  }, [imageUrl]);
  return (
    <div className="w-full mt-3">
      <h3 className="bg-blue-200 py-3 px-3 rounded-md shadow-md">
        اطلاعات محصول خود را تکمیل کنید
      </h3>
      <div className="flex flex-wrap">
        <div className="w-1/2 p-2">
          <label className="block mb-1 mt-3 text-sm font-medium text-gray-800">
            سر برگ محصول
          </label>
          <InputForm
            icon={<MdTitle />}
            name="title"
            placeholder="اجباری"
            register={register}
            type="text"
          />
        </div>
        <div className="w-full p-2 bg-blue-gray-100">
          <Accordion open={open === 3}>
            <AccordionHeader onClick={() => handleOpen(3)}>
              افزودن عکس
            </AccordionHeader>
            <AccordionBody>
              <Button
                onClick={() => setShowImage(true)}
                varient="gradiant"
                color="blue"
              >
                انتخاب عکس
              </Button>
              <div className="grid grid-cols-4 gap-2 mt-3 w-full">
                {allImage &&
                  allImage.map((i, index) => (
                    <figure
                      key={index}
                      className="w-full relative h-32 bg-blue-gray-800 rounded-md"
                    >
                      <img
                        src={i}
                        className="w-full rounded-md shadow-md h-full object-cover"
                        alt=""
                      />
                      <i
                        onClick={() => deleteImage(i)}
                        className="absolute bottom-2 left-2 text-red-500 p-2 transition-all bg-[#f0f8ff3d] hover:bg-gray-900 hover:text-gray-100 rounded-md cursor-pointer"
                      >
                        <FaTrash className="text-lg" />
                      </i>
                    </figure>
                  ))}
              </div>
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)}>
              ویژگی محصول
            </AccordionHeader>
            <AccordionBody>
              <div className="w-full flex">
                <div className="w-6/12 flex flex-wrap p-2">
                  <div className="w-full grid gap-2 items-center grid-cols-2 mb-3">
                    <InputForm
                      name="categoryskill"
                      register={register}
                      type="text"
                      placeholder="نام دسته"
                      icon={<MdTitle />}
                    />

                    <div
                      style={{ direction: "ltr" }}
                      className="flex items-center w-full"
                    >
                      <Select
                        onChange={(value: string) => setSkillCategory(value)}
                        label="انتخاب دسته"
                      >
                        {skill &&
                          skill.map((i, index) => (
                            <Option value={"op"} key={index}>
                              {i.name}
                            </Option>
                          ))}
                      </Select>
                    </div>
                  </div>
                  <div className="w-full grid gap-2 grid-cols-2">
                    <textarea
                      rows={6}
                      {...register("skillname")}
                      className="w-full rounded-md p-1 shadow-md bg-blue-gray-200 text-gray-900"
                    ></textarea>
                    <textarea
                      {...register("skilltext")}
                      rows={6}
                      className="w-full rounded-md p-1 shadow-md bg-blue-gray-200 text-gray-900"
                    ></textarea>
                  </div>
                  <div className="w-3/12 mt-3">
                    <SubmitBtn
                      type="button"
                      value="افزودن"
                      classPlus="w-full flex justify-center"
                      onClick={handleSubmit(createSkill)}
                    />
                  </div>
                </div>
                <div className="w-6/12 p-2">
                  {skill.length &&
                    skill.map((i, index) => (
                      <div
                        key={index}
                        className="my-2 bg-blue-gray-400 p-2 rounded-md"
                      >
                        <span className="text-gray-100">
                          {i.name}
                          <FaTrash
                            className="inline text-red-400 mr-1 cursor-pointer"
                            onClick={() => {
                              const news = skill.filter(
                                (id) => id.name !== i.name
                              );
                              setSkill(news);
                            }}
                          />
                        </span>
                        {i.skills.map((id, index) => (
                          <div
                            key={index}
                            className="flex justify-between p-2 rounded-md bg-blue-gray-50 my-1 flex-wrap"
                          >
                            <p className="w-[40%] border ml-1 border-l-gray-900">
                              {id.name}
                            </p>
                            <p className="w-[58%]">
                              {id.text}
                              <FaTrash
                                className="inline text-red-400 mr-1 cursor-pointer"
                                onClick={() => deleteSkill(id.text, i.name)}
                              />
                            </p>
                          </div>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 4}>
            <AccordionHeader onClick={() => handleOpen(4)}>
              کلمات کلیدی (سئو)
            </AccordionHeader>
            <AccordionBody className="flex">
              <div className="w-4/12 flex items-center justify-between">
                <div className="w-8/12">
                  <InputForm
                    name="keyword"
                    register={register}
                    type="text"
                    icon={<MdTitle />}
                  />
                </div>
                <div className="w-4/12 pr-2">
                  <SubmitBtn
                    type="button"
                    value="افزودن"
                    classPlus="w-full flex justify-center"
                    onClick={handleSubmit(createKeyword)}
                  />
                </div>
              </div>
              <div className="w-8/12 flex flex-wrap gap-3 p-2">
                {keyword &&
                  keyword?.map((i, index) => (
                    <div
                      key={index}
                      className="rounded-md shadow-md px-3 py-1 text-gray-50 bg-blue-400"
                    >
                      <span>{i}</span>
                      <i
                        className="cursor-pointer text-orange-500"
                        onClick={() => {
                          const newKey = keyword.filter((id) => id !== i);
                          setKeyword(newKey);
                        }}
                      >
                        <FaTrash className="inline mr-2" />
                      </i>
                    </div>
                  ))}
              </div>
            </AccordionBody>
          </Accordion>
          <div className="mt-2 pb-3">
            <span
              className="font-semibold text-xl block hover:text-gray-900 cursor-pointer mb-3 text-blue-gray-700"
              onClick={() => setOpen(open === 5 ? 0 : 5)}
            >
              توضیحات تکمیلی
            </span>
            <div className={`${open === 5 ? "block" : "hidden"} `}>
              <Editor setEditor={setEditor} editor={editor} />
            </div>
          </div>
        </div>
        <div className="w-1/2 p-2">
          <SubmitBtn
            type="button"
            onClick={handleSubmit(createAction)}
            value="ذخیره کردن اطلاعات"
          />
        </div>
      </div>
      <DialogImage
        open={showImage}
        setUrl={setImageUrl}
        setOpen={setShowImage}
      />
    </div>
  );
}
