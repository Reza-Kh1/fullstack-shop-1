import { useEffect, useState } from "react";
import { PaginationType, ProductType } from "../../types/type";
import axios from "axios";
import Pagination from "../../components/Pagination/Pagination";
import { FaPlus } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import queryString from "query-string";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Option,
  Select,
} from "@material-tailwind/react";
import InputForm from "../../components/InputForm/InputForm";
import { FaSearch } from "react-icons/fa";
import { useForm } from "react-hook-form";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";
type SearchType = {
  name: string | null;
  pricedown: string | null;
  priceup: string | null;
};
export default function Product() {
  const [search, setSearch] = useState({ order: "", status: "" });
  const { register, handleSubmit } = useForm<SearchType>();
  const location = useLocation();
  const { page }: any = queryString.parse(location.search);
  const [allProduct, setAllProduct] = useState<ProductType[]>();
  const [paginations, setPaginations] = useState<PaginationType>();
  const [count, setCount] = useState<number>();
  const [pages, setPage] = useState<number>(page || 1);
  const [open, setOpen] = useState<number>(0);
  const navigate = useNavigate()
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  const searchProduct = (form: SearchType) => {
    const body = {
      status: search.status,
      order: search.order,
      price:
        form.pricedown && form.priceup && `${form.pricedown}-${form.priceup}`,
      name: form.name,
      page: pages,
    } as any;
    const urlQuery = new URLSearchParams(body);
    const searchBody = urlQuery.toString();
    navigate("/admin/edit-product?" + searchBody)
    axios
      .get("/product/admin?" + searchBody)
      .then(({ data }) => {
        setAllProduct(data.rows);
        setCount(data.count);
        setPaginations(data.pagination);
      })
      .catch((err) => console.log(err));
  };
  const getData = () => {
    let url = `product/admin?page=${pages}`;
    axios
      .get(url)
      .then(({ data }) => {
        setAllProduct(data.rows);
        setCount(data.count);
        setPaginations(data.pagination);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, [pages]);
  function Icon({ id, open }: { id: number; open: number }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${
          id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    );
  }
  return (
    <>
      <div className="w-full">
        <div className="my-2">
          <h3 className="bg-blue-200 py-3 px-3 rounded-md shadow-md">
            افزودن محصول جدید
          </h3>
          <Link
            to={"/admin/create-product"}
            className="bg-orange-200 py-2 px-3 rounded-md shadow-md inline-block my-3"
          >
            افزودن محصول جدید
            <i>
              <FaPlus className="inline" />
            </i>
          </Link>
          <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
            <AccordionHeader
              className="bg-orange-200 p-0 rounded-md shadow-md"
              onClick={() => handleOpen(1)}
            >
              <h3 className="text-lg text-right font-medium py-3 px-3">
                سرچ باکس
                <FaSearch className="inline-block mr-2 text-sm" />
              </h3>
            </AccordionHeader>
            <AccordionBody>
              <div className="flex justify-between items-center flex-wrap mb-16">
                <div className="w-5/12">
                  <form onSubmit={handleSubmit(searchProduct)}>
                    <InputForm
                      type="text"
                      name="name"
                      register={register}
                      placeholder="جستجو کنید"
                      icon={<FaSearch />}
                    />
                  </form>
                </div>
                <div className="flex justify-between w-4/12">
                  <div
                    className="w-1/6 p-2 flex items-end"
                    style={{ direction: "ltr" }}
                  >
                    <Select
                      onChange={(value: string) =>
                        setSearch({ ...search, order: value })
                      }
                      label="مرتب سازی بر اساس"
                      animate={{
                        mount: { y: 0 },
                        unmount: { y: 25 },
                      }}
                      vlaue={search.order}
                    >
                      <Option value={"createdAt-ASC"}>جدید ترین</Option>
                      <Option value={"createdAt-DESC"}>قدیمی ترین</Option>
                      <Option value={"price-ASC"}>ارزان ترین</Option>
                      <Option value={"price-DESC"}>گران ترین</Option>
                    </Select>
                  </div>
                  <div
                    className="w-1/6 p-2 flex items-end"
                    style={{ direction: "ltr" }}
                  >
                    <Select
                      onChange={(value: string) =>
                        setSearch({ ...search, status: value })
                      }
                      label="وضعیت انتشار"
                      animate={{
                        mount: { y: 0 },
                        unmount: { y: 25 },
                      }}
                      vlaue={search.status || "false"}
                    >
                      <Option value={"false"}>منتشر نشده</Option>
                      <Option value={"true"}>منتشر شده</Option>
                    </Select>
                  </div>
                </div>
                <div className="w-full flex items-end justify-between mt-3">
                  <div className="flex flex-wrap gap-2 w-7/12">
                    <div className="w-5/12">
                      <InputForm
                        label="از قیمت :"
                        type="text"
                        name="pricedown"
                        classLabel="text-gray-900 mb-2 inline-block"
                        register={register}
                        placeholder="از قیمت"
                        onInput={(e: any) => {
                          e.target.value = e.target.value
                            .replace(/[^0-9]/g, "")
                            .slice(0, 11);
                        }}
                        icon={<FaSearch />}
                      />
                    </div>
                    <div className="w-5/12">
                      <InputForm
                        label="تا قیمت :"
                        classLabel="text-gray-900 mb-2 inline-block"
                        type="text"
                        name="priceup"
                        register={register}
                        placeholder="تا قیمت"
                        onInput={(e: any) => {
                          e.target.value = e.target.value
                            .replace(/[^0-9]/g, "")
                            .slice(0, 11);
                        }}
                        icon={<FaSearch />}
                      />
                    </div>
                  </div>
                  <SubmitBtn
                    classPlus={"w-2/12 flex justify-center"}
                    type="button"
                    value="اعمال فیلتر"
                    onClick={handleSubmit(searchProduct)}
                  />
                </div>
              </div>
            </AccordionBody>
          </Accordion>
        </div>
        <h3 className="bg-blue-200 py-3 px-3 rounded-md shadow-md">
          محصول
          {count ?  count.toLocaleString("fa") : "یافت نشد"}
        </h3>
        <div className="w-full grid grid-cols-4 gap-2 mt-4">
          {allProduct &&
            allProduct.map((item, index) => (
              <Link
                key={index}
                to={"edit-product/" + item.slug}
                className="bg-blue-gray-200 flex flex-col shadow-md p-2 rounded-md h-[450px]"
              >
                <div>
                  {item.srcImg && <ImageSlider images={item.srcImg} />}
                  <div className="flex justify-between mt-3 p-1.5 rounded-md bg-gray-200">
                    <span className="text-sm">{item?.subCategory?.name}</span>
                    <span className="text-sm">
                      {new Date(item.updatedAt).toLocaleDateString("fa")}
                    </span>
                  </div>
                  <div className="flex justify-between mt-4">
                    <div className="relative">
                      {item.price ? (
                        <span className="text-blue-700 mr-1 text-lg">
                          {item.price.toLocaleString("fa")} تومان
                        </span>
                      ) : (
                        "رایگان"
                      )}
                      {item.off && (
                        <del className="text-xs text-red-300 -top-3 right-0 absolute">
                          {item.off.toLocaleString("fa")} تخفیف
                        </del>
                      )}
                    </div>
                    <span>
                      {item.totel ? (
                        <>
                          <span className="text-xs">{item.totel} انبار</span>
                        </>
                      ) : (
                        "ناموجود"
                      )}
                    </span>
                  </div>
                </div>
                <div className="mt-3 h-full flex flex-col justify-between">
                  <span className="text-lg text-blue-300">{item.name}</span>
                  <p className="text-justify cut-line text-sm leading-6 text-gray-800">
                    {item.description}
                  </p>
                  <span className="text-xs bg-gray-200 p-1.5 rounded-sm shadow-md">
                    نویسنده {item?.user?.name}
                  </span>
                </div>
              </Link>
            ))}
        </div>
        <div>
          <div className="my-5">
            {paginations && (
              <Pagination
                pagination={paginations}
                setPage={setPage}
                page={pages}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
