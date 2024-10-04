/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../Button";
import ModalWrapper from "../ModelWrapper";
import SelectList from "../SelectList";
import { editTask } from "../../Api/task";
import UserListForEdit from "./UserListForEdit";

// Constants for lists and priorities
const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];



interface EditTaskModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    task: any;  // Ensure task prop is passed correctly 
}

interface FormData {
    title: string;
    date: string;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ open, setOpen, task}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormData>();

    const [team, setTeam] = useState<any[]>([]);
    const [stage, setStage] = useState<string>(LISTS[0]);
    const [priority, setPriority] = useState<string>(PRIORITY[2]);
    const [uploading, setUploading] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // Convert date to "YYYY-MM-DD" format for the date input
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().split("T")[0]; // Converts to "YYYY-MM-DD"
    };

    // Pre-fill form when task data changes
    useEffect(() => {
        if (task) {
            // Set task data into form fields
            setValue("title", task.title);

            // Format and set the date properly
            if (task.date) {
                const formattedDate = formatDate(task.date);
                setValue("date", formattedDate);  
            }

            setTeam(task.team || []);  
            setStage(task.stage.toUpperCase());  
            setPriority(task.priority.toUpperCase());  
        }
    }, [task, setValue]);
    const submitHandler: SubmitHandler<FormData> = async (data) => {
        try {
            setUploading(true);

            const updatedTask = {
                ...task, 
                id: task._id,
                title: data.title,
                date: data.date,
                team,
                stage,
                priority,
            };

            console.log("ids,", updatedTask._id,)
            const response = await editTask(
                updatedTask._id,
                updatedTask.title,
                updatedTask.date,
                updatedTask.team,
                updatedTask.stage,
                updatedTask.priority
            );

            console.log(response); 
            setOpen(false);  
        } catch (error: any) {
            setSubmitError(error.response?.data?.message || "Error updating the task");
        } finally {
            setUploading(false);
        }
    };

    return (
        <ModalWrapper open={open} setOpen={setOpen}>
            <form onSubmit={handleSubmit(submitHandler)}>
                <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
                    UPDATE TASK
                </Dialog.Title>

                <div className="mt-2 flex flex-col gap-6">
                    {/* Task title field */}
                    <Textbox
                        placeholder="Task Title"
                        type="text"
                        name="title"
                        label="Task Title"
                        className="w-full rounded"
                        register={register("title", { required: "Title is required" })}
                        error={errors.title ? errors.title.message : ""}
                    />

                    {/* Team selection */}
                    <UserListForEdit setTeam={setTeam} team={team} />

                    {/* Stage and Date fields */}
                    <div className="flex gap-4">
                        <SelectList
                            label="Task Stage"
                            lists={LISTS}
                            selected={stage}
                            setSelected={setStage}
                        />
                        <div className="w-full">
                            <Textbox
                                placeholder="Date"
                                type="date"
                                name="date"
                                label="Task Date"
                                className="w-full rounded"
                                register={register("date", { required: "Date is required!" })}
                                error={errors.date ? errors.date.message : ""}
                            />
                        </div>
                    </div>

                    {/* Priority Selection */}
                    <div className="flex gap-4">
                        <SelectList
                            label="Priority Level"
                            lists={PRIORITY}
                            selected={priority}
                            setSelected={setPriority}
                        />
                    </div>

                    {/* Error Message */}
                    {submitError && <span className="text-red-500">{submitError}</span>}

                    {/* Submit and Cancel Buttons */}
                    <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
                        {uploading ? (
                            <span className="text-sm py-2 text-red-500">Updating...</span>
                        ) : (
                            <Button
                                label="Update"
                                type="submit"
                                className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
                            />
                        )}

                        <Button
                            type="button"
                            className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                            onClick={() => setOpen(false)}
                            label="Cancel"
                        />
                    </div>
                </div>
            </form>
        </ModalWrapper>
    );
};

export default EditTaskModal;




