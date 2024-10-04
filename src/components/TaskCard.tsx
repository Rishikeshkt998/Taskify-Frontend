/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import React from "react";
import {
    MdKeyboardArrowDown,
    MdKeyboardArrowUp,
    MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useSelector } from "react-redux";
import {  PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils";

import TaskDialog from "./task/TaskDialog";
// import AddSubTask from "./task/AddSubTask";

// Define types for the task structure
interface Task {
    _id: string;
    title: string;
    date: string | Date;
    priority: keyof typeof PRIOTITYSTYELS;
    stage: keyof typeof TASK_TYPE;
}

interface TaskCardProps {
    task: Task;
}

// Define the user type
interface RootState {
    auth: {
        isAdmin: any;
        userInfo: string;
    }
}

const ICONS:any = {
    HIGH: <MdKeyboardDoubleArrowUp />,
    MEDIUM: <MdKeyboardArrowUp />,
    NORMAL: <MdKeyboardArrowDown />,
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const user = useSelector((state: RootState) => state.auth);
    // const [open, setOpen] = useState(false);

    return (
        <>
            <div className='w-full h-fit bg-white shadow-md p-4 rounded'>
                <div className='w-full flex justify-between'>
                    <div
                        className={clsx(
                            "flex flex-1 gap-1 items-center text-xs font-medium",
                            PRIOTITYSTYELS[task?.priority]
                        )}
                    >
                        <span className='text-lg'>{ICONS[task?.priority]}</span>
                        <span className='uppercase '>{task?.priority} Priority</span>
                    </div>

                    {user?.isAdmin && <TaskDialog task={task} />}
                </div>

                <>
                    <div className='flex items-center gap-2'>
                        <div
                            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
                        />
                        <h4 className='line-clamp-1 text-black'>{task?.title}</h4>
                    </div>
                    <span className='text-sm text-gray-600'>
                        {formatDate(new Date(task?.date))}
                    </span>
                </>

                <div className='w-full border-t border-gray-200 my-2' />
                <div className='flex items-center justify-between mb-2'>
                 </div>
                 </div>
        </>
    );
};

export default TaskCard;




