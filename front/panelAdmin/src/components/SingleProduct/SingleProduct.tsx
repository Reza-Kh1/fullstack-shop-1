import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateProduct from "../CreateProduct/CreateProduct";
import axios from "axios";
import { toast } from "react-toastify";

export default function SingleProduct() {
  const { id } = useParams();
  const [data, setData] = useState<any>();
  const getData = () => {
    axios
      .get("product/admin/" + id)
      .then(({ data }) => {
        setData(data.data);
      })
      .catch((err) => toast.error(err));
  };
  useEffect(() => {
    getData();
  }, []);
  return <>{data && <CreateProduct infoProduct={data}/>}</>;
}
