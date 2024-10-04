/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useEffect, useState } from "react";
// import { Dialog } from "@headlessui/react";
// import Textbox from "../Textbox";
// import { useForm, SubmitHandler } from "react-hook-form";
// import Button from "../Button";
// import ModalWrapper from "../ModelWrapper";
// import UserList from "./UserList";
// import SelectList from "../SelectList";
// import { editTask } from "../../Api/task"; 

// const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
// const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

// interface Task {
//     _id: string; // Add ID for updating the task
//     title: string;
//     team: any[];
//     stage: string;
//     priority: string;
//     date: string;
// }

// interface EditTaskModalProps {
//     open: boolean;
//     setOpen: React.Dispatch<React.SetStateAction<boolean>>;
//     task: Task; // Required task prop for updating
// }

// interface FormData {
//     title: string; // Field for task title
//     date: string;  // Field for task due date
// }

// const EditTaskModal: React.FC<EditTaskModalProps> = ({ open, setOpen, task }) => {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         setValue,
//     } = useForm<FormData>({
//         defaultValues: {
//             title: task?.title || "",  
//             date: task?.date || "",     
//         }
//     });

//     // State for team, stage, and priority
//     const [team, setTeam] = useState<any[]>(task?.team || []);
//     const [stage, setStage] = useState<string>(task?.stage?.toUpperCase() || LISTS[0]);
//     const [priority, setPriority] = useState<string>(task?.priority?.toUpperCase() || PRIORITY[2]);
//     const [uploading, setUploading] = useState<boolean>(false);
//     const [submitError, setSubmitError] = useState<string | null>(null);

//     const submitHandler: SubmitHandler<FormData> = async (data) => {
//         try {
//             setUploading(true);
 
//             const response = await editTask(data.title, data.date, team, stage, priority);
//             console.log(response);
//             setOpen(false); 
//         } catch (error: any) {
//             setSubmitError(error.response?.data?.message || "Error updating the task");
//         } finally {
//             setUploading(false);
//         }
//     };

//     return (
//         <ModalWrapper open={open} setOpen={setOpen}>
//             <form onSubmit={handleSubmit(submitHandler)}>
//                 <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
//                     UPDATE TASK
//                 </Dialog.Title>

//                 <div className="mt-2 flex flex-col gap-6">
//                     {/* Task Title Input */}
//                     <Textbox
//                         placeholder="Task Title"
//                         value={task.title}
//                         type="text"
//                         name="title"
//                         label="Task Title"
//                         className="w-full rounded"
//                         register={register("title", { required: "Title is required" })}
//                         error={errors.title ? errors.title.message : ""}
//                     />

//                     {/* Team Selection Component */}
//                     <UserList setTeam={setTeam} team={team} />

//                     {/* Stage and Date Selection */}
//                     <div className="flex gap-4">
//                         {/* Task Stage Selection */}
//                         <SelectList
//                             label="Task Stage"
//                             lists={LISTS}
//                             selected={stage}
//                             setSelected={setStage}
//                         />

//                         {/* Task Date Selection (Date Picker) */}
//                         <div className="w-full">
//                             <Textbox
//                                 placeholder="Date"
//                                 value={task.date}
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

//                     {/* Priority Selection */}
//                     <div className="flex gap-4">
//                         <SelectList
//                             label="Priority Level"
//                             lists={PRIORITY}
//                             value={task.priority}
//                             selected={priority}
//                             setSelected={setPriority}
//                         />
//                     </div>

//                     {/* Error Message */}
//                     {submitError && <span className="text-red-500">{submitError}</span>}

//                     {/* Submit and Cancel Buttons */}
//                     <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
//                         {uploading ? (
//                             <span className="text-sm py-2 text-red-500">Updating...</span>
//                         ) : (
//                             <Button
//                                 label="Update"
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

// export default EditTaskModal;


// import React, { useEffect, useState } from "react";
// import { Dialog } from "@headlessui/react";
// import Textbox from "../Textbox";
// import { useForm, SubmitHandler } from "react-hook-form";
// import Button from "../Button";
// import ModalWrapper from "../ModelWrapper";
// import UserList from "./UserList";
// import SelectList from "../SelectList";
// import { editTask } from "../../Api/task";

// const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
// const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

// interface Task {
//     _id: string; // Task ID for updating
//     title: string;
//     team: any[];
//     stage: string;
//     priority: string;
//     date: string;
// }

// interface EditTaskModalProps {
//     open: boolean;
//     setOpen: React.Dispatch<React.SetStateAction<boolean>>;
//     task: any; // Task prop for pre-filling
//     onSave:any
// }

// interface FormData {
//     title: string; // Field for task title
//     date: string;  // Field for task due date
// }

// const EditTaskModal: React.FC<EditTaskModalProps> = ({ open, setOpen, task ,onSave}) => {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         setValue,
//     } = useForm<FormData>();

//     // State for team, stage, and priority
//     const [team, setTeam] = useState<any[]>([]);           // Pre-filling team
//     const [stage, setStage] = useState<string>(LISTS[0]);  // Pre-filling stage
//     const [priority, setPriority] = useState<string>(PRIORITY[2]); // Pre-filling priority
//     const [uploading, setUploading] = useState<boolean>(false);
//     const [submitError, setSubmitError] = useState<string | null>(null);

//     // Update form values when the modal opens and the task prop changes
//     useEffect(() => {
//         if (task) {
//             console.log(task)
//             setValue("title", task.title);                  // Set task title in form
//             setValue("date", task.date);                    // Set task date in form
//             setTeam(task.team);                             // Set task team
//             setStage(task.stage.toUpperCase());             // Set task stage
//             setPriority(task.priority.toUpperCase());       // Set task priority
//         }
//     }, [task, setValue]); // Runs when task changes

//     const submitHandler: SubmitHandler<FormData> = async (data) => {
//         try {
//             setUploading(true);

//             const updatedTask = {
//                 ...task,            // Include task ID and other properties
//                 title: data.title,  // Updated title from the form
//                 date: data.date,    // Updated date from the form
//                 team,
//                 stage,
//                 priority,
//             };

//             // Call the editTask API
//             const response = await editTask(
//                 updatedTask.title,
//                 updatedTask.date,
//                 updatedTask.team,
//                 updatedTask.stage,
//                 updatedTask.priority
//             );

//             console.log(response);
//             setOpen(false); // Close modal on success
//         } catch (error: any) {
//             setSubmitError(error.response?.data?.message || "Error updating the task");
//         } finally {
//             setUploading(false);
//         }
//     };

//     return (
//         <ModalWrapper open={open} setOpen={setOpen}>
//             <form onSubmit={handleSubmit(submitHandler)}>
//                 <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
//                     UPDATE TASK
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
//                                 error={errors.date ? errors.date.message : ""} // Show error if any
//                             />
//                         </div>
//                     </div>

//                     {/* Priority Selection */}
//                     <div className="flex gap-4">
//                         <SelectList
//                             label="Priority Level"
//                             lists={PRIORITY}
//                             selected={priority}
//                             setSelected={setPriority} // Allow priority to be editable
//                         />
//                     </div>

//                     {/* Error Message */}
//                     {submitError && <span className="text-red-500">{submitError}</span>}

//                     {/* Submit and Cancel Buttons */}
//                     <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
//                         {uploading ? (
//                             <span className="text-sm py-2 text-red-500">Updating...</span>
//                         ) : (
//                             <Button
//                                 label="Update"
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

// export default EditTaskModal;
import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../Button";
import ModalWrapper from "../ModelWrapper";
import UserList from "./UserList";
import SelectList from "../SelectList";
import { editTask } from "../../Api/task";
import UserListForEdit from "./UserListForEdit";

// Constants for lists and priorities
const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

// Form data types
interface Task {
    _id: string;
    title: string;
    team: any[];
    stage: string;
    priority: string;
    date: string;
}

interface EditTaskModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    task: any;  // Ensure task prop is passed correctly
    onSave: () => Promise<void>;  
}

interface FormData {
    title: string;
    date: string;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ open, setOpen, task, onSave }) => {
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
            onSave();  
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




