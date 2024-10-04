/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import clsx from "clsx";
// import React, { useState } from "react";
// import {
//     MdAttachFile,
//     MdKeyboardArrowDown,
//     MdKeyboardArrowUp,
//     MdKeyboardDoubleArrowUp,
// } from "react-icons/md";
// import { useSelector } from "react-redux";
// import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils";
// import { BiMessageAltDetail } from "react-icons/bi";
// import { FaList } from "react-icons/fa";
// import { IoMdAdd } from "react-icons/io";
// import TaskDialog from "./task/TaskDialog";
// import UserInfo from "./UserInfo";
// // import AddSubTask from "./task/AddSubTask";

// // Define types for the task structure
// interface Task {
//     _id: string;
//     title: string;
//     date: string | Date;
//     priority: keyof typeof PRIOTITYSTYELS;
//     stage: keyof typeof TASK_TYPE;
// }

// interface TaskCardProps {
//     task: Task;
// }

// // Define the user type
// interface RootState {
//     auth: {
//         isAdmin: any;
//         userInfo: string;
//     }
// }

// const ICONS: any = {
//     HIGH: <MdKeyboardDoubleArrowUp />,
//     MEDIUM: <MdKeyboardArrowUp />,
//     NORMAL: <MdKeyboardArrowDown />,
// };

// const TaskCardAssigned: React.FC<TaskCardProps> = ({ task }) => {
//     const user = useSelector((state: RootState) => state.auth);
//     const [open, setOpen] = useState(false);

//     return (
//         <>
//             <div className='w-full h-fit bg-white shadow-md p-4 rounded'>
//                 <div className='w-full flex justify-between'>
//                     <div
//                         className={clsx(
//                             "flex flex-1 gap-1 items-center text-sm font-medium",
//                             PRIOTITYSTYELS[task?.priority]
//                         )}
//                     >
//                         <span className='text-lg'>{ICONS[task?.priority]}</span>
//                         <span className='uppercase'>{task?.priority} Priority</span>
//                     </div>

//                     {user?.isAdmin && <TaskDialog task={task} />}
//                 </div>

//                 <>
//                     <div className='flex items-center gap-2'>
//                         <div
//                             className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
//                         />
//                         <h4 className='line-clamp-1 text-black'>{task?.title}</h4>
//                     </div>
//                     <span className='text-sm text-gray-600'>
//                         {formatDate(new Date(task?.date))}
//                     </span>
//                 </>

//                 <div className='w-full border-t border-gray-200 my-2' />
//                 <div className='flex items-center justify-between mb-2'>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default TaskCardAssigned;

// import clsx from "clsx";
// import React, { useState } from "react";
// import {
//     MdAttachFile,
//     MdKeyboardArrowDown,
//     MdKeyboardArrowUp,
//     MdKeyboardDoubleArrowUp,
// } from "react-icons/md";
// import { useSelector } from "react-redux";
// import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils";
// import TaskDialog from "./task/TaskDialog";
// import { BiMessageAltDetail } from "react-icons/bi";
// import { FaList } from "react-icons/fa";
// import UserInfo from "./UserInfo";

// interface User {
//     _id: string;
//     name: string;
// }


// interface RootState {
//     auth: {
//         isAdmin: any;
//         userInfo: string;
//     }
// }

// interface Task {
//     _id: string;
//     title: string;
//     date: string; // Adjust date type if necessary
//     team:any;
//     priority: "HIGH" | "MEDIUM" | "LOW"; // Adjust based on your actual types
//     stage: "TODO" | "IN PROGRESS" | "COMPLETED"; // Adjust based on your actual types
// }

// // Define the props for the TaskCard component
// interface TaskCardProps {
//     task: Task;
// }

// const ICONS:any = {
//     HIGH: <MdKeyboardDoubleArrowUp />,
//     MEDIUM: <MdKeyboardArrowUp />,
//     NORMAL: <MdKeyboardArrowDown />,
// };

// const TaskCardAssigned: React.FC<TaskCardProps> = ({ task }) => {
//     const user = useSelector((state: RootState) => state.auth);
//     const [open, setOpen] = useState<boolean>(false);

//     return (
//         <>
//             <div className="w-full h-fit bg-white shadow-md p-4 rounded">
//                 <div className="w-full flex justify-between">
//                     <div
//                         className={clsx(
//                             "flex flex-1 gap-1 items-center text-sm font-medium",
//                             PRIOTITYSTYELS[task?.priority]
//                         )}
//                     >
//                         <span className="text-lg">{ICONS[task?.priority]}</span>
//                         <span className="uppercase">{task?.priority} Priority</span>
//                     </div>

//                     {user?.isAdmin && <TaskDialog task={task} />}
//                 </div>

//                 <>
//                     <div className="flex items-center gap-2">
//                         <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])} />
//                         <h4 className="line-clamp-1 text-black">{task?.title}</h4>
//                     </div>
//                     <span className="text-sm text-gray-600">
//                         {formatDate(new Date(task?.date))}
//                     </span>
//                 </>

//                 <div className="w-full border-t border-gray-200 my-2" />
//                 <div className="flex items-center justify-between mb-2">

//                     <div className="flex flex-row-reverse">
//                         {task?.team?.map((m:any, index:any) => (
//                             <div
//                                 key={index}
//                                 className={clsx(
//                                     "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
//                                     BGS[index % BGS?.length]
//                                 )}
//                             >
//                                 <UserInfo user={m} />
//                             </div>
//                         ))}
//                     </div>
//                 </div>
                
            


//            </div>
//         </>
//     );
// };

// export default TaskCardAssigned;
import clsx from "clsx";
import React, { useState } from "react";
import {
    MdAttachFile,
    MdKeyboardDoubleArrowUp,
    MdKeyboardArrowUp,
    MdKeyboardArrowDown,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils";
import TaskDialog from "./task/TaskDialog";
import UserInfo from "./UserInfo";

interface User {
    _id: string;
    name: string;
}

interface RootState {
    auth: {
        isAdmin: boolean;
        userInfo: string;
    }
}

interface Task {
    _id: string;
    title: string;
    date: string; 
    team: User[];
    priority: "HIGH" | "MEDIUM" | "LOW"; 
    stage: "TODO" | "IN PROGRESS" | "COMPLETED"; 
}

interface TaskCardProps {
    task: Task;
}

const ICONS: any = {
    HIGH: <MdKeyboardDoubleArrowUp />,
    MEDIUM: <MdKeyboardArrowUp />,
    NORMAL: <MdKeyboardArrowDown />,
};

const TaskCardAssigned: React.FC<TaskCardProps> = ({ task }) => {
    const user = useSelector((state: RootState) => state.auth);
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="w-full h-fit bg-white shadow-lg p-6 rounded-lg transition-transform transform hover:scale-105">
            <div className="flex justify-between mb-4">
                <div
                    className={clsx(
                        "flex items-center gap-2 text-sm font-semibold",
                        PRIOTITYSTYELS[task?.priority]
                    )}
                >
                    <span className="text-xl">{ICONS[task?.priority]}</span>
                    <span className="uppercase text-gray-600">{task?.priority} Priority</span>
                </div>

                {user?.isAdmin && <TaskDialog task={task} />}
            </div>

            <div className="flex items-center gap-3 mb-2">
                <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])} />
                <h4 className="text-lg font-bold line-clamp-1 text-black">{task?.title}</h4>
            </div>
            <span className="text-sm text-gray-500 mb-4">
                {formatDate(new Date(task?.date))}
            </span>

            <div className="w-full border-t border-gray-300 my-2" />

            <div className="flex items-center justify-between mb-2">
                <div className="flex flex-row-reverse">
                    {task?.team?.map((m: any, index: any) => (
                        <div
                            key={index}
                            className={clsx(
                                "w-8 h-8 rounded-full flex items-center justify-center text-sm -mr-2 border-2 border-white shadow",
                                BGS[index % BGS?.length]
                            )}
                        >
                            <UserInfo user={m} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TaskCardAssigned;




