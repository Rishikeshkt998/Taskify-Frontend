/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Fragment, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Menu, Transition } from "@headlessui/react";
import ConfirmatioDialog from "../Dialog";
import { deleteTask } from "../../Api/task"; // API function to delete the task
import { toast } from "react-toastify"; // For showing notifications
import EditTaskModal from "./EditTaskModal";

// Define the Task interface
interface Task {
    _id: string;
    title: string;
    // Add other task properties as needed
}

interface TaskDialogProps {
    task: Task; // Only task is passed as a prop
    fetchTasks:()=>void
}

const TaskDialog: React.FC<TaskDialogProps> = ({ task, fetchTasks }) => {
    const [openEdit, setOpenEdit] = useState<boolean>(false); // To manage AddTask modal
    const [openDialog, setOpenDialog] = useState<boolean>(false); // To manage confirmation dialog

    // Show confirmation dialog when delete button is clicked
    const deleteClicks = () => {
        setOpenDialog(true); // Open the confirmation dialog
    };

 
    const deleteHandler = async () => {
        try {
            await deleteTask(task._id);
            toast.success("Task deleted successfully"); 
            fetchTasks()
            
        } catch (error) {
            toast.error("Failed to delete task"); 
        } finally {
            setOpenDialog(false); 
        }
    };

    // Menu items
    const items = [
        {
            label: "Edit",
            icon: <MdOutlineEdit className="mr-2 h-5 w-5" aria-hidden="true" />,
            onClick: () => setOpenEdit(true), // Open edit modal
        },
    ];

    return (
        <>
            <div>
                <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-600 ">
                        <BsThreeDots />
                    </Menu.Button>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute p-4 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                            <div className="px-1 py-1 space-y-2">
                                {items.map((el) => (
                                    <Menu.Item key={el.label}>
                                        {({ active }) => (
                                            <button
                                                onClick={el.onClick}
                                                className={`${active ? "bg-blue-500 text-white" : "text-gray-900"
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                {el.icon}
                                                {el.label}
                                            </button>
                                        )}
                                    </Menu.Item>
                                ))}
                            </div>

                            <div className="px-1 py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={deleteClicks} // Open the confirmation dialog
                                            className={`${active ? "bg-blue-500 text-white" : "text-red-900"
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            <RiDeleteBin6Line
                                                className="mr-2 h-5 w-5 text-red-400"
                                                aria-hidden="true"
                                            />
                                            Delete
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
            <EditTaskModal
                open={openEdit}
                setOpen={setOpenEdit}
                task={task}
                key={new Date().getTime()}
                fetchTasks={fetchTasks}
            /> 
            <ConfirmatioDialog
                open={openDialog}
                setOpen={setOpenDialog}
                onClick={deleteHandler} 
            />
        </>
    );
};

export default TaskDialog;

