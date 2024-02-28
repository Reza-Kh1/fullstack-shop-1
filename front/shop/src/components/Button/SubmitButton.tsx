import { Button } from "@material-tailwind/react";
import { color } from "@material-tailwind/react/types/components/button";
import { useFormStatus } from "react-dom";
type ButtonSubmit = {
    classs?: string;
    types?: "submit" | "reset" | "button" | undefined;
    value: string;
    color: color
    onClick?: (value: any) => void
};
export default function SubmitButton({ classs, types, value, color, onClick }: ButtonSubmit) {
    const { pending } = useFormStatus();
    return (
        <>
            <Button style={{ direction: "ltr" }} variant="gradient" color={color} onClick={onClick} className={classs} loading={pending} type={types}>
                {value}
            </Button>
        </>
    );
}