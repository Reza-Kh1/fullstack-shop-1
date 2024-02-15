import { useEffect, useState } from "react";
import { PaginationType, ProductType } from "../../types/type";
import axios from "axios";
import Pagination from "../../components/Pagination/Pagination";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import EditorPage2 from "../../components/EditorPage/EditorPage2";

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
          <span></span>
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
        <div>
          <EditorPage2 />
        </div>
      </div>
    </>
  );
}
