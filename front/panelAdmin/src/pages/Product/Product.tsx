import { useEffect, useState } from "react";
import { PaginationType, ProductType } from "../../types/type";
import axios from "axios";
import Pagination from "../../components/Pagination/Pagination";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
export default function Product() {
  const [allProduct, setAllProduct] = useState<ProductType[]>();
  const [paginations, setPaginations] = useState<PaginationType>();
  const [count, setCount] = useState<number>();
  const [page, setPage] = useState<number>(1);
  const getData = () => {
    let url = `product/admin?page=${page}`;
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
  }, [page]);
  return (
    <>
      {console.log(allProduct)}
      <div className="w-full">
        <div className="my-2">
          <Link
            to={"/admin/create-product"}
            className="bg-orange-200 py-2 px-3 rounded-md shadow-md"
          >
            افزودن محصول جدید
            <i>
              <FaPlus className="inline" />
            </i>
          </Link>
        </div>
        <div className="w-full grid grid-cols-4 gap-2 mt-4">
          {allProduct &&
            allProduct.map((item, index) => (
              <Link
                key={index}
                to={"admin/" + item.slug}
                className="bg-blue-gray-200 shadow-md p-2 rounded-md"
              >
                <figure>
                 
                  {item.srcImg &&
                    item.srcImg.map((src, index) => (
                      <img key={index} src={src} alt={item.altImg || ""} />
                    ))}
                </figure>
                <div className="flex justify-between">
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
                <div className="mt-3">
                  <span className="text-lg">{item.name}</span>
                  <p className="">{item.description}</p>
                  <span className="text-xs">نویسنده {item?.user?.name}</span>
                </div>
              </Link>
            ))}
        </div>
        <div>
          <div className="my-5">
            <h3 className="bg-blue-200 py-3 px-3 rounded-md shadow-md">
              {count?.toLocaleString("fa")} محصول
            </h3>
            {paginations && (
              <Pagination
                pagination={paginations}
                setPage={setPage}
                page={page}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
