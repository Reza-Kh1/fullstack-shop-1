import { useFormStatus } from "react-dom";
import ButtonCustom from "./ButtonCustom";
import "./style.css";
type ButtonSubmit = {
  classs?: string;
  type?: "submit" | "reset" | "button";
  value: string;
  onClick?: (value: any) => void;
  color: "blue" | "gray" | "orange";
};
export default function SubmitButton({
  classs,
  value,
  onClick,
  color,
  type,
}: ButtonSubmit) {
  const { pending } = useFormStatus();
  const Loading = () => {
    return (
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  };
  return (
    <>
      <ButtonCustom
        type={type}
        color={color}
        onClick={onClick}
        className={classs}
      >
        {value}
      <Loading />
      </ButtonCustom>
    </>
  );
}
