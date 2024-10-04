import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { FaQuestion } from "react-icons/fa";
import Button from "./Button";
import ModalWrapper from "./ModelWrapper";

// Define the props interface for ConfirmatioDialog
interface ConfirmatioDialogProps {
    open: boolean; // Dialog visibility state
    setOpen: (open: boolean) => void; // Function to set dialog visibility
    msg?: string | null; // Optional message to display in the dialog
    setMsg?: (msg: string | null) => void; // Function to set the message
    onClick: () => void; // Function to call on confirm action
    type?: "delete" | "restore" | "restoreAll"; // Type of action
    setType?: (type: "delete" | "restore" | "restoreAll") => void; // Function to set action type
}

export default function ConfirmatioDialog({
    open,
    setOpen,
    msg,
    setMsg = () => { },
    onClick,
    type = "delete",
    setType = () => { },
}: ConfirmatioDialogProps) {
    const closeDialog = () => {
        setType("delete");
        setMsg(null);
        setOpen(false);
    };

    return (
        <ModalWrapper open={open} setOpen={closeDialog}>
            <div className='py-4 w-full flex flex-col gap-4 items-center justify-center'>
                <Dialog.Title as='h3'>
                    <p
                        className={clsx(
                            "p-3 rounded-full ",
                            type === "restore" || type === "restoreAll"
                                ? "text-yellow-600 bg-yellow-100"
                                : "text-red-600 bg-red-200"
                        )}
                    >
                        <FaQuestion size={60} />
                    </p>
                </Dialog.Title>

                <p className='text-center text-gray-500'>
                    {msg ?? "Are you sure you want to delete the selected record?"}
                </p>

                <div className='bg-gray-50 py-3 sm:flex sm:flex-row-reverse gap-4'>
                    <Button
                        type='button'
                        className={clsx(
                            "px-8 text-sm font-semibold text-white sm:w-auto",
                            type === "restore" || type === "restoreAll"
                                ? "bg-yellow-600"
                                : "bg-red-600 hover:bg-red-500"
                        )}
                        onClick={onClick}
                        label={type === "restore" ? "Restore" : "Delete"}
                    />

                    <Button
                        type='button'
                        className='bg-white px-8 text-sm font-semibold text-gray-900 sm:w-auto border'
                        onClick={closeDialog}
                        label='Cancel'
                    />
                </div>
            </div>
        </ModalWrapper>
    );
}