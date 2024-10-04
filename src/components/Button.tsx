import clsx from "clsx";
import React from "react";

interface ButtonProps {
    icon?: React.ReactNode; // Optional icon
    className?: string; // Optional className
    label: string; // Label is required
    type?: "button" | "submit" | "reset"; // Optional type with specific values
    onClick?: () => void; // Optional onClick handler
    disabled?:boolean
}

const Button: React.FC<ButtonProps> = ({
    icon,
    className,
    label,
    type = "button",
    onClick = () => { },
}) => {
    return (
        <button
            type={type ||"button"}
            className={clsx("px-3 py-2 outline-none", className)}
            onClick={onClick}
        >
            <span>{label}</span>
            {icon && icon}
        </button>
    );
};

export default Button;