import  { forwardRef } from "react";
import clsx from "clsx";
import { UseFormRegisterReturn } from "react-hook-form";

// Define the prop types using an interface
interface TextboxProps {
    type: string;
    placeholder: string;
    label?: string;
    className?: string;
    register: UseFormRegisterReturn;
    name: string;
    error?: string;
    value?:string
}
const Textbox = forwardRef<HTMLInputElement, TextboxProps>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ type, placeholder, label, className, register, name,value, error }) => {
        return (
            <div className="w-full flex flex-col gap-1">
                {label && (
                    <label htmlFor={name} className="text-slate-800">
                        {label}
                    </label>
                )}

                <div>
                    <input
                        type={type}
                        placeholder={placeholder}
                        {...register} 
                        aria-invalid={error ? "true" : "false"}
                        value={value}
                        className={clsx(
                            "bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300",
                            className
                        )}
                    />
                </div>
                {error && (
                    <span className="text-xs text-[#f64949fe] mt-0.5">{error}</span>
                )}
            </div>
        );
    }
);
Textbox.displayName = "Textbox";

export default Textbox;