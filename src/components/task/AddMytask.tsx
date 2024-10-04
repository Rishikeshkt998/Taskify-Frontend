/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../Button";
import ModalWrapper from "../ModelWrapper";
import SelectList from "../SelectList";
import { addTask } from "../../Api/task"; // Ensure this is the correct import for your API function

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

interface Task {
    title?: string;
    managerid?:string|null;
    team?: any[];
    stage?: string;
    priority?: string;
    date?: string;
}

interface AddTaskProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    task?: Task; // Optional task prop for updating
    fetchTasks:()=>void
}

interface FormData {
    title: string; // Field for task title
    date: string;  // Field for task due date
}

const AddMyTask: React.FC<AddTaskProps> = ({ open, setOpen, task, fetchTasks }) => {
    const managerid = localStorage.getItem('userValue');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [stage, setStage] = useState<any>(task?.stage?.toUpperCase() || LISTS[0]);
    const [priority, setPriority] = useState<any>(task?.priority?.toUpperCase() || PRIORITY[2]);
    const [uploading, setUploading] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // Form submission handler
    const submitHandler: SubmitHandler<FormData> = async (data) => {
        try {
            setUploading(true);


            const response = await addTask(data.title,managerid, data.date, stage, priority); // Call your API function with the task data
            console.log(response); // Handle the response as needed
            fetchTasks()
            setOpen(false); // Close the modal after submission
        } catch (error: any) {
            setSubmitError(error.response?.data?.message || "Error submitting the task");
        } finally {
            setUploading(false);
        }
    };

    return (
        <ModalWrapper open={open} setOpen={setOpen}>
            <form onSubmit={handleSubmit(submitHandler)}>
                <Dialog.Title
                    as="h2"
                    className="text-base font-bold leading-6 text-gray-900 mb-4"
                >
                    {task ? "UPDATE TASK" : "ADD TASK"}
                </Dialog.Title>

                <div className="mt-2 flex flex-col gap-6">
                    <Textbox
                        placeholder="Task Title"
                        type="text"
                        name="title"
                        label="Task Title"
                        className="w-full rounded"
                        register={register("title", { required: "Title is required" })}
                        error={errors.title ? errors.title.message : ""}
                    />
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
                                register={register("date", {
                                    required: "Date is required!",
                                })}
                                error={errors.date ? errors.date.message : ""}
                            />
                        </div>
                    </div>


                    <div className="flex gap-4">
                        <SelectList
                            label="Priority Level"
                            lists={PRIORITY}
                            selected={priority}
                            setSelected={setPriority}
                        />
                    </div>

                    {submitError && <span className="text-red-500">{submitError}</span>}

                    <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
                        {uploading ? (
                            <span className="text-sm py-2 text-red-500">Uploading...</span>
                        ) : (
                            <Button
                                label="Submit"
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

export default AddMyTask;