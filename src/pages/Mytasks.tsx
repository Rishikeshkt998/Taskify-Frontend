/* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useState } from "react";
// import { FaList } from "react-icons/fa";
// import { MdGridView } from "react-icons/md";
// import { useParams } from "react-router-dom";
// import Loading from "../components/Loading";

// import Button from "../components/Button";
// import { IoMdAdd } from "react-icons/io";


// import { tasks } from "../assets/data";

// import BoardView from "../components/BoardView";
// import Title from "../components/Title";
// import Tabs from "../components/Tabs";
// import AddMyTask from "../components/task/AddMytask";
// interface Params {
//     [key: string]: string | undefined;  
// }
// interface TaskType {
//     todo: string;
//     "in progress": string;
//     completed: string;
// }

// const TABS = [
//     { title: "Board View", icon: <MdGridView /> },
//     { title: "List View", icon: <FaList /> },
// ];

// const TASK_TYPE: TaskType = {
//     todo: "bg-blue-600",
//     "in progress": "bg-yellow-600",
//     completed: "bg-green-600",
// };

// interface Task {
//     _id: string;
//     title: string;
//     date: string;
//     priority: 'high' | 'medium' | 'low';
//     stage: 'todo' | 'in progress' | 'completed';
//     assets: string[];
//     team: TeamMember[];
//     isTrashed: boolean;
//     activities: Activity[];
//     subTasks: SubTask[];
//     createdAt: string;
// }
// interface TeamMember {
//     _id: string;
//     name: string;
//     title: string;
//     email: string;
// }

// interface Activity {
//     type: string;
//     activity: string;
//     date: string;
//     by: string;
//     _id: string;
// }

// interface SubTask {
//     title: string;
//     date: string;
//     tag: string; // Assuming each sub-task has a tag
// }
// const Mytasks: React.FC = () => {
//     const params = useParams<Params>();
//     const tasksFromAPI: Task[] = tasks as Task[];

//     const [selected, setSelected] = useState<number>(0);
//     const [open, setOpen] = useState<boolean>(false);
//     const [loading, setLoading] = useState<boolean>(false);

//     const status = params?.status || "";

//     return loading ? (
//         <div className='py-10'>
//             <Loading />
//         </div>
//     ) : (
//         <div className='w-full'>
//             <div className='flex items-center justify-between mb-4'>
//                 <Title title={status ? `${status} Tasks` : "Tasks"} />

//                 {!status && (
//                     <Button
//                         onClick={() => setOpen(true)}
//                         label='Create Task'
//                         icon={<IoMdAdd className='text-lg' />}
//                         className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
//                     />
//                 )}
//             </div>

//             <Tabs tabs={TABS} setSelected={setSelected}>

//                 {selected !== 1 ? (
//                     <BoardView tasks={tasksFromAPI} />
//                 ) : (
//                     <div className='w-full'>
//                         {/* <Table tasks={tasks} /> */}
//                     </div>
//                 )}
//             </Tabs>

//             <AddMyTask open={open} setOpen={setOpen} />
//         </div>
//     );
// };

// export default Mytasks;



// import React, { useState, useEffect } from "react";
// import { FaList } from "react-icons/fa";
// import { MdGridView } from "react-icons/md";
// import { useParams } from "react-router-dom";
// import Loading from "../components/Loading";
// import Button from "../components/Button";
// import { IoMdAdd } from "react-icons/io";
// import axios from "axios";
// import { tasks } from "../assets/data";

// import BoardView from "../components/BoardView";
// import Title from "../components/Title";
// import Tabs from "../components/Tabs";
// import AddMyTask from "../components/task/AddMytask";
// import { getTaskbyId } from "../Api/task";

// interface Params {
//     [key: string]: string | undefined;
// }

// interface TaskType {
//     todo: string;
//     "in progress": string;
//     completed: string;
// }

// const TABS = [
//     { title: "Board View", icon: <MdGridView /> },
//     { title: "List View", icon: <FaList /> },
// ];

// const TASK_TYPE: TaskType = {
//     todo: "bg-blue-600",
//     "in progress": "bg-yellow-600",
//     completed: "bg-green-600",
// };

// interface Task {
//     _id: string;
//     title: string;
//     date: string;
//     priority: "high" | "medium" | "low";
//     stage: "todo" | "in progress" | "completed";
//     isTrashed: boolean;
//     createdAt: string;
// }



// const Mytasks: React.FC = () => {
//     const managerid = localStorage.getItem('userValue');
//     const params = useParams<Params>();
//     const [tasks, setTasks] = useState<Task[]>([]);
//     const [selected, setSelected] = useState<number>(0);
//     const [open, setOpen] = useState<boolean>(false);
//     const [loading, setLoading] = useState<boolean>(true); 
//     const [error, setError] = useState<string | null>(null); 

//     const status = params?.status || "";

//     const fetchTasks = async () => {
//         try {
//             setLoading(true);
//             const response = await getTaskbyId(managerid)
//             console.log(response)
//             setTasks(response?.data?.tasks); 
//             setLoading(false); 
//         } catch (err) {
//             setLoading(false);
//             setError("Failed to load tasks. Please try again later.");
//             console.error(err);
//         }
//     };

//     useEffect(() => {
//         fetchTasks();
//     }, []); 

//     if (loading) {
//         return (
//             <div className='py-10'>
//                 <Loading />
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="py-10">
//                 <p className="text-red-500">{error}</p>
//             </div>
//         );
//     }

//     return (
//         <div className='w-full'>
//             <div className='flex items-center justify-between mb-4'>
//                 <Title title={status ? `${status} Tasks` : "Tasks"} />

//                 {!status && (
//                     <Button
//                         onClick={() => setOpen(true)}
//                         label='Create Task'
//                         icon={<IoMdAdd className='text-lg' />}
//                         className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
//                     />
//                 )}
//             </div>

//             <Tabs tabs={TABS} setSelected={setSelected}>
//                 {selected !== 1 ? (
//                     <BoardView tasks={tasks} />
//                 ) : (
//                     <div className='w-full'>
//                         {/* <Table tasks={tasks} /> */}
//                     </div>
//                 )}
//             </Tabs>

//             <AddMyTask open={open} setOpen={setOpen} />
//         </div>
//     );
// };

// export default Mytasks;


import React, { useState, useEffect } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { useSelector } from "react-redux"; // Import to access the Redux store
import BoardView from "../components/BoardView";
import Title from "../components/Title";
import Tabs from "../components/Tabs";
import AddMyTask from "../components/task/AddMytask";
import { getTaskbyId, getTaskForEmployees } from "../Api/task"; // Assuming this API exists
import Calendar from "rc-calendar";
import "rc-calendar/assets/index.css";
import Table from "../components/task/Table";
import moment, { Moment } from "moment"; // Import Moment.js

interface Params {
    [key: string]: string | undefined;
}

interface TaskType {
    todo: string;
    "in progress": string;
    completed: string;
}

const TABS = [
    { title: "Board View", icon: <MdGridView /> },
    { title: "List View", icon: <FaList /> },
];

const TASK_TYPE: TaskType = {
    todo: "bg-blue-600",
    "in progress": "bg-yellow-600",
    completed: "bg-green-600",
};

interface Task {
    _id: string;
    title: string;
    date: string;
    priority: "high" | "medium" | "low";
    stage: "todo" | "in progress" | "completed";
    isTrashed: boolean;
    createdAt: string;
}

interface RootState {
    auth: {
        isAdmin: boolean;
    };
}

const Mytasks: React.FC = () => {
    const managerid = localStorage.getItem('userValue');
    const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);
    const params = useParams<Params>();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selected, setSelected] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Moment | null>(null); // Use Moment instead of Date
    // const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

    const status = params?.status || "";

    const fetchTasks = async () => {
        try {
            setLoading(true);

            let response;
            if (isAdmin) {
                response = await getTaskbyId(managerid); 
            } else {
                response = await getTaskForEmployees(managerid);
                console.log("valuess",response)
            }

            setTasks(response?.data?.tasks);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError("Failed to load tasks. Please try again later.");
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [isAdmin]); 

    if (loading) {
        return (
            <div className="py-10">
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-10">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                <Title title={status ? `${status} Tasks` : "Tasks"} />

                {!status && isAdmin && ( // Only show "Create Task" if admin
                    <Button
                        onClick={() => setOpen(true)}
                        label="Create Task"
                        icon={<IoMdAdd className="text-lg" />}
                        className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
                    />
                )}
            </div>

            <Tabs tabs={TABS} setSelected={setSelected}>
                {selected !== 1 ? (
                    <BoardView tasks={tasks} />
                ) : (
                    <div className="w-full">
                        <Table tasks={tasks}/>
                    </div>
                )}
            </Tabs>

            {isAdmin && ( 
                <AddMyTask open={open} setOpen={setOpen} />
            )}
        </div>

    );
};

export default Mytasks;

