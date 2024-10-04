/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useState } from "react";
// import { Dialog } from "@headlessui/react";
// import Textbox from "../Textbox";
// import { useForm, SubmitHandler } from "react-hook-form";



// import { BiImages } from "react-icons/bi";
// import Button from "../Button";
// import ModalWrapper from "../ModelWrapper";
// import UserList from "./UserList";
// import SelectList from "../SelectList";

// const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
// const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

// interface Task {
//     title?: string;
//     team?: any[];
//     stage?: string;
//     priority?: string;
//     date?: string;
// }

// interface AddTaskProps {
//     open: boolean;
//     setOpen: React.Dispatch<React.SetStateAction<boolean>>;
//     task?: Task;
// }

// interface FormData {
//     title: string;
//     date: string;
// }

// const AddTask: React.FC<AddTaskProps> = ({ open, setOpen, task }) => {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<FormData>();

//     const [team, setTeam] = useState<any[]>(task?.team || []);
//     const [stage, setStage] = useState<string>(task?.stage?.toUpperCase() || LISTS[0]);
//     const [priority, setPriority] = useState<string>(task?.priority?.toUpperCase() || PRIORITY[2]);
//     const [assets, setAssets] = useState<FileList | null>(null);
//     const [uploading, setUploading] = useState<boolean>(false);

//     const submitHandler: SubmitHandler<FormData> = (data) => {
//         console.log(data);
//     };

//     const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setAssets(e.target.files);
//     };

//     return (
//         <ModalWrapper open={open} setOpen={setOpen}>
//             <form onSubmit={handleSubmit(submitHandler)}>
//                 <Dialog.Title
//                     as="h2"
//                     className="text-base font-bold leading-6 text-gray-900 mb-4"
//                 >
//                     {task ? "UPDATE TASK" : "ADD TASK"}
//                 </Dialog.Title>

//                 <div className="mt-2 flex flex-col gap-6">
//                     <Textbox
//                         placeholder="Task Title"
//                         type="text"
//                         name="title"
//                         label="Task Title"
//                         className="w-full rounded"
//                         register={register("title", { required: "Title is required" })}
//                         error={errors.title ? errors.title.message : ""}
//                     />

//                     <UserList setTeam={setTeam} team={team} />

//                     <div className="flex gap-4">
//                         <SelectList
//                             label="Task Stage"
//                             lists={LISTS}
//                             selected={stage}
//                             setSelected={setStage}
//                         />

//                         <div className="w-full">
//                             <Textbox
//                                 placeholder="Date"
//                                 type="date"
//                                 name="date"
//                                 label="Task Date"
//                                 className="w-full rounded"
//                                 register={register("date", {
//                                     required: "Date is required!",
//                                 })}
//                                 error={errors.date ? errors.date.message : ""}
//                             />
//                         </div>
//                     </div>

//                     <div className="flex gap-4">
//                         <SelectList
//                             label="Priority Level"
//                             lists={PRIORITY}
//                             selected={priority}
//                             setSelected={setPriority}
//                         />

//                         <div className="w-full flex items-center justify-center mt-4">
//                             <label
//                                 className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4"
//                                 htmlFor="imgUpload"
//                             >
//                                 <input
//                                     type="file"
//                                     className="hidden"
//                                     id="imgUpload"
//                                     onChange={handleSelect}
//                                     accept=".jpg, .png, .jpeg"
//                                     multiple={true}
//                                 />
//                                 <BiImages />
//                                 <span>Add Assets</span>
//                             </label>
//                         </div>
//                     </div>

//                     <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
//                         {uploading ? (
//                             <span className="text-sm py-2 text-red-500">Uploading assets</span>
//                         ) : (
//                             <Button
//                                 label="Submit"
//                                 type="submit"
//                                 className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
//                             />
//                         )}

//                         <Button
//                             type="button"
//                             className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
//                             onClick={() => setOpen(false)}
//                             label="Cancel"
//                         />
//                     </div>
//                 </div>
//             </form>
//         </ModalWrapper>
//     );
// };

// export default AddTask;


// import React, { useState } from "react";
// import { Dialog } from "@headlessui/react";
// import Textbox from "../Textbox";
// import { useForm, SubmitHandler } from "react-hook-form";
// import Button from "../Button";
// import ModalWrapper from "../ModelWrapper";
// import UserList from "./UserList";
// import SelectList from "../SelectList";
// import { addTask, addTaskToAssign } from "../../Api/task"; // Ensure this is the correct import for your API function

// const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
// const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

// interface Task {
//     title?: string;
//     team?: any[];
//     stage?: string;
//     priority?: string;
//     date?: string;
// }

// interface AddTaskProps {
//     open: boolean;
//     setOpen: React.Dispatch<React.SetStateAction<boolean>>;
//     task?: Task; // Optional task prop for updating
// }

// interface FormData {
//     title: string; // Field for task title
//     date: string;  // Field for task due date
// }

// const AddTask: React.FC<AddTaskProps> = ({ open, setOpen, task }) => {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<FormData>();

//     // State variables for team, stage, and priority
//     const [team, setTeam] = useState<any[]>(task?.team || []);
//     const [stage, setStage] = useState<any>(task?.stage?.toUpperCase() || LISTS[0]);
//     const [priority, setPriority] = useState<any>(task?.priority?.toUpperCase() || PRIORITY[2]);
//     const [uploading, setUploading] = useState<boolean>(false);
//     const [submitError, setSubmitError] = useState<string | null>(null);


//     const submitHandler: SubmitHandler<FormData> = async (data) => {
//         try {
//             setUploading(true);


//             const response = await addTaskToAssign(data.title, data.date, team, stage,priority);
//             console.log(response);
//             setOpen(false);
//         } catch (error: any) {
//             setSubmitError(error.response?.data?.message || "Error submitting the task");
//         } finally {
//             setUploading(false);
//         }
//     };

//     return (
//         <ModalWrapper open={open} setOpen={setOpen}>
//             <form onSubmit={handleSubmit(submitHandler)}>
//                 <Dialog.Title
//                     as="h2"
//                     className="text-base font-bold leading-6 text-gray-900 mb-4"
//                 >
//                     {task ? "UPDATE TASK" : "ADD TASK"}
//                 </Dialog.Title>

//                 <div className="mt-2 flex flex-col gap-6">
//                     <Textbox
//                         placeholder="Task Title"
//                         type="text"
//                         name="title"
//                         label="Task Title"
//                         className="w-full rounded"
//                         register={register("title", { required: "Title is required" })}
//                         error={errors.title ? errors.title.message : ""}
//                     />

//                     <UserList setTeam={setTeam} team={team} />

//                     <div className="flex gap-4">
//                         <SelectList
//                             label="Task Stage"
//                             lists={LISTS}
//                             selected={stage}
//                             setSelected={setStage}
//                         />

//                         <div className="w-full">
//                             <Textbox
//                                 placeholder="Date"
//                                 type="date"
//                                 name="date"
//                                 label="Task Date"
//                                 className="w-full rounded"
//                                 register={register("date", {
//                                     required: "Date is required!",
//                                 })}
//                                 error={errors.date ? errors.date.message : ""}
//                             />
//                         </div>
//                     </div>

//                     <div className="flex gap-4">
//                         <SelectList
//                             label="Priority Level"
//                             lists={PRIORITY}
//                             selected={priority}
//                             setSelected={setPriority}
//                         />
//                     </div>

//                     {submitError && <span className="text-red-500">{submitError}</span>}

//                     <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
//                         {uploading ? (
//                             <span className="text-sm py-2 text-red-500">Uploading...</span>
//                         ) : (
//                             <Button
//                                 label="Submit"
//                                 type="submit"
//                                 className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
//                             />
//                         )}

//                         <Button
//                             type="button"
//                             className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
//                             onClick={() => setOpen(false)}
//                             label="Cancel"
//                         />
//                     </div>
//                 </div>
//             </form>
//         </ModalWrapper>
//     );
// };

// export default AddTask;

import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../Button";
import ModalWrapper from "../ModelWrapper";
import UserList from "./UserList";
import SelectList from "../SelectList";
import { addTask, addTaskToAssign } from "../../Api/task"; // Ensure this is the correct import for your API function

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

interface Task {
    title?: string;
    team?: any[];
    stage?: string;
    priority?: string;
    date?: string;
}

interface AddTaskProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    task?: Task; // Optional task prop for updating
}

interface FormData {
    title: string; // Field for task title
    date: string;  // Field for task due date
}

interface AddTaskProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    task?: Task|undefined; // Optional task prop for updating
    date?: string; // Add the date prop for pre-filling the form
}

const AddTask: React.FC<AddTaskProps> = ({ open, setOpen, task, date }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue, // Used to set default values in the form
    } = useForm<FormData>({
        defaultValues: {
            title: task?.title || "",  // Pre-fill title if editing a task
            date: task?.date || date || "",  // Pre-fill date (from task or selected slot)
        }
    });

    // Other state variables
    const [team, setTeam] = useState<any[]>(task?.team || []);
    const [stage, setStage] = useState<any>(task?.stage?.toUpperCase() || LISTS[0]);
    const [priority, setPriority] = useState<any>(task?.priority?.toUpperCase() || PRIORITY[2]);
    const [uploading, setUploading] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // Pre-fill the date field whenever the `date` prop changes
    useEffect(() => {
        if (date) {
            setValue('date', date); // Set the date field with the selected date from the calendar
        }
    }, [date, setValue]);

    const submitHandler: SubmitHandler<FormData> = async (data) => {
        try {
            setUploading(true);
            const response = await addTaskToAssign(data.title, data.date, team, stage, priority);
            console.log(response);
            setOpen(false); // Close modal after successful submission
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

                    {/* Team Selection Component */}
                    <UserList setTeam={setTeam} team={team} />

                    {/* Stage and Date Selection */}
                    <div className="flex gap-4">
                        {/* Task Stage Selection */}
                        <SelectList
                            label="Task Stage"
                            lists={LISTS}
                            selected={stage}
                            setSelected={setStage}
                        />

                        {/* Task Date Selection (Date Picker) */}
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







