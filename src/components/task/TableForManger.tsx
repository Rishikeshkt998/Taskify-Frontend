/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState} from "react"; 
import {
    MdKeyboardArrowDown,
    MdKeyboardArrowUp,
    MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { toast } from "sonner";
import {  PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../../utils";
import clsx from "clsx";

import Button from "../Button";
import ConfirmatioDialog from "../Dialog";

import { deleteTask } from "../../Api/task";
import EditTaskModalforManager from "./EditTaskModelforManager";

interface TeamMember {
    _id: string;
    name: string;
    title: string;
    email: string;
}

interface Task {
    _id: string;
    title: string;
    date: string;
    priority: "high" | "medium" | "low";
    stage: "todo" | "in progress" | "completed";
    team: TeamMember[];

}

interface TableProps {
    tasks: any; // Change this to initialTasks to indicate the initial data
    fetchTasks:()=>void
}

const ICONS: Record<string, JSX.Element> = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
};

const TableForManager: React.FC<TableProps> = ({ tasks, fetchTasks }) => {
    const [task, setTasks] = useState<Task[]>(tasks); // Use state for tasks
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [selected, setSelected] = useState<string | null>(null);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const deleteClicks = (id: string) => {
        setSelected(id);
        setOpenDialog(true);
    };

    const deleteHandler = async () => {
        if (selected) {
            try {
                await deleteTask(selected);
                toast.success("Task deleted successfully");
                setTasks((prevTasks) => prevTasks.filter(task => task._id !== selected));
            } catch (error) {
                toast.error("Failed to delete task");
            } finally {
                setOpenDialog(false);
                setSelected(null);
            }
        }
    };

    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setOpenEditModal(true);
    };


    const TableHeader: React.FC = () => (
        <thead className="w-full border-b border-gray-300">
            <tr className="w-full text-black text-left">
                <th className="py-2">Task Title</th>
                <th className="py-2">Priority</th>
                <th className="py-2">Created At</th>
            </tr>
        </thead>
    );

    const TableRow: React.FC<{ task: Task }> = ({ task }) => (
        <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-300/10">
            <td className="py-2">
                <div className="flex items-center gap-2">
                    <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])} />
                    <p className="w-full line-clamp-2 text-base text-black">{task?.title}</p>
                </div>
            </td>

            <td className="py-2">
                <div className="flex gap-1 items-center">
                    <span className={clsx("text-lg", PRIOTITYSTYELS[task?.priority])}>
                        {ICONS[task?.priority]}
                    </span>
                    <span className="capitalize line-clamp-1">
                        {task?.priority} Priority
                    </span>
                </div>
            </td>

            <td className="py-2">
                <span className="text-sm text-gray-600">
                    {formatDate(new Date(task?.date))}
                </span>
            </td>

            <td className="py-2 flex gap-2 md:gap-4 justify-end">
                <Button
                    className="text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base"
                    label="Edit"
                    type="button"
                    onClick={() => handleEdit(task)}
                />

                <Button
                    className="text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base"
                    label="Delete"
                    type="button"
                    onClick={() => deleteClicks(task._id)}
                />
            </td>
        </tr>
    );

    return (
        <>
            <div className="bg-white px-2 md:px-4 pt-4 pb-9 shadow-md rounded">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <TableHeader />
                        <tbody>
                            {task?.map((task, index) => (
                                <TableRow key={index} task={task} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ConfirmatioDialog
                open={openDialog}
                setOpen={setOpenDialog}
                onClick={deleteHandler}
            />
            <EditTaskModalforManager
                open={openEditModal}
                setOpen={setOpenEditModal}
                task={editingTask}
                fetchTasks={fetchTasks}
            />
        </>
    );
};

export default TableForManager;