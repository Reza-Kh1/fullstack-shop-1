import { useFormStatus } from "react-dom";
import ButtonCustom from "./ButtonCustom";
import "./style.css";
type ButtonSubmit = {
  classs?: string;
  type?: "submit" | "reset" | "button";
  value: string;
  onClick?: (value: any) => void;
  color: "blue" | "gray" | "orange" | "red" | "green";
};
export default function SubmitButton({
  classs,
  value,
  onClick,
  color,
  type,
}: ButtonSubmit) {
  const colors =
    color === "blue"
      ? "btn-blue "
      : color === "gray"
      ? "btn-gray "
      : color === "orange"
      ? "btn-orange "
      : color === "red"
      ? "btn-red "
      : color === "green"
      ? "btn-green "
      : "";
  const { pending } = useFormStatus();
  const Loading = () => {
    return (
      <div className="loadingio-spinner-double-ring-vk8arn8sxy mr-1 absolute left-0 top-1/2 transform translate-x-0 -translate-y-1/2">
        <div className="ldio-davsdf6mqul">
          <div></div>
          <div></div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={`items-center btn-custom flex justify-center relative ${
          colors + classs
        }`}
      >
        {value}
        {pending && <Loading />}
      </button>
    </>
  );
}
