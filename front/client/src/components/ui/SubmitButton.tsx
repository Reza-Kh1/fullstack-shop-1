import { useFormStatus } from "react-dom";
import ButtonCustom from "./ButtonCustom";
type ButtonSubmit = {
  classs?: string;
  types?: "submit" | "reset" | "button" | undefined;
  value: string;
  onClick?: (value: any) => void;
};
export default function SubmitButton({
  classs,
  types,
  value,
  onClick,
}: ButtonSubmit) {
  const { pending } = useFormStatus();
  return (
    <>
      <ButtonCustom color={"blue"} onClick={onClick} className={classs}>
        {value}
      </ButtonCustom>
    </>
  );
}
