/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */


import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../Button";
import ModalWrapper from "../ModelWrapper";
import UserList from "./UserList";
import SelectList from "../SelectList";
import {  addTaskToAssign } from "../../Api/task"; 

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

interface Task {
    title?: string;
    team?: any[];
    stage?: string;
    priority?: string;
    date?: string;
}

// interface AddTaskProps {
//     open: boolean;
//     setOpen: React.Dispatch<React.SetStateAction<boolean>>;
//     task?: Task; 
// }

interface FormData {
    title: string; 
    date: string; 
}

interface AddTaskProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    task?: Task|undefined; 
    date?: string;
    fetchTasks:()=>void
}

const AddTask: React.FC<AddTaskProps> = ({ open, setOpen, task, date, fetchTasks }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue, 
    } = useForm<FormData>({
        defaultValues: {
            title: task?.title || "",  
            date: task?.date || date || "", 
        }
    });

    // Other state variables
    const [team, setTeam] = useState<any[]>(task?.team || []);
    const [stage, setStage] = useState<any>(task?.stage?.toUpperCase() || LISTS[0]);
    const [priority, setPriority] = useState<any>(task?.priority?.toUpperCase() || PRIORITY[2]);
    const [uploading, setUploading] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string | null>(null);


    useEffect(() => {
        if (date) {
            setValue('date', date); 
        }
    }, [date, setValue]);

    const submitHandler: SubmitHandler<FormData> = async (data) => {
        try {
            setUploading(true);
            const response = await addTaskToAssign(data.title, data.date, team, stage, priority);
            console.log(response);
            fetchTasks()
            setOpen(false);
        } catch (error: any) {
            setSubmitError(error.response?.data?.message || "Error submitting the task");
        } finally {
            setUploading(false);
        }
    };

    return (
        <ModalWrapper open={open} setOpen={setOpen}>
            <form onSubmit={handleSubmit(submitHandler)}>
                <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
                    {task ? "UPDATE TASK" : "ADD TASK"}
                </Dialog.Title>

                <div className="mt-2 flex flex-col gap-6">
                    {/* Task Title Input */}
                    <Textbox
                        placeholder="Task Title"
                        type="text"
                        name="title"
                        label="Task Title"
                        className="w-full rounded"
                        register={register("title", { required: "Title is required" })}
                        error={errors.title ? errors.title.message : ""}
                    />
                    <UserList setTeam={setTeam} team={team} />
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

export default AddTask;







