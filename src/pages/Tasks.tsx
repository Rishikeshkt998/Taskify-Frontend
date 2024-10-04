/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */

// import React, { useEffect, useState } from "react";
// import { FaList } from "react-icons/fa";
// import { MdGridView } from "react-icons/md";
// import { useParams } from "react-router-dom";
// import Loading from "../components/Loading";

// import Button from "../components/Button";
// import { IoMdAdd } from "react-icons/io";


// import { tasks } from "../assets/data";
// // import Table from "../components/task/Table";

// import BoardView from "../components/BoardView";
// import AddTask from "../components/task/AddTask";
// import Title from "../components/Title";
// import Tabs from "../components/Tabs";
// import TaskTitle from "../components/TaskTiitle";
// import BoardViewAssigned from "../components/BoardViewAssigned";
// import { getAssignedtask } from "../Api/task";

// // Define type for task status parameters from useParams
// interface Params {
//   [key: string]: string | undefined;  // Index signature for the object
// }
// interface TaskType {
//   todo: string;
//   "in progress": string;
//   completed: string;
// }

// const TABS = [
//   { title: "Board View", icon: <MdGridView /> },
//   { title: "List View", icon: <FaList /> },
// ];

// const TASK_TYPE: TaskType = {
//   todo: "bg-blue-600",
//   "in progress": "bg-yellow-600",
//   completed: "bg-green-600",
// };

// interface Task {
//   _id: string;
//   title: string;
//   date: string;
//   priority: 'high' | 'medium' | 'low';
//   stage: 'todo' | 'in progress' | 'completed';
//   team: TeamMember[];
//   isTrashed: boolean;
//   createdAt: string;
// }

// // If you haven't already, define other required interfaces:
// interface TeamMember {
//   _id: string;
//   name: string;
//   title: string;
//   email: string;
// }


// const Tasks: React.FC = () => {
//   const params = useParams<Params>();
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [selected, setSelected] = useState<number>(0); 
//   const [open, setOpen] = useState<boolean>(false); 
//   const [loading, setLoading] = useState<boolean>(false); 
//   const [error, setError] = useState<string | null>(null); 

//   const status = params?.status || "";
//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const response = await getAssignedtask()
//       console.log(response)
//       setTasks(response?.data?.tasks);
//       setLoading(false);
//     } catch (err) {
//       setLoading(false);
//       setError("Failed to load tasks. Please try again later.");
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []); 

//   return loading ? (
//     <div className='py-10'>
//       <Loading />
//     </div>
//   ) : (
//     <div className='w-full'>
//       <div className='flex items-center justify-between mb-4'>
//         <Title title={status ? `${status} Tasks` : "Tasks"} />

//         {!status && (
//           <Button
//             onClick={() => setOpen(true)}
//             label='Create Task'
//             icon={<IoMdAdd className='text-lg' />}
//             className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
//           />
//         )}
//       </div>

//       <Tabs tabs={TABS} setSelected={setSelected}>

//         {selected !== 1 ? (
//           <BoardViewAssigned tasks={tasks} />
//         ) : (
//           <div className='w-full'>
//             {/* <Table tasks={tasks} /> */}
//           </div>
//         )}
//       </Tabs>

//       <AddTask open={open} setOpen={setOpen} />
//     </div>
//   );
// };

// export default Tasks;



// import React, { useEffect, useState } from "react";
// import { FaList } from "react-icons/fa";
// import { MdGridView } from "react-icons/md";
// import { useParams } from "react-router-dom";
// import Loading from "../components/Loading";
// import Button from "../components/Button";
// import { IoMdAdd } from "react-icons/io";
// import BoardViewAssigned from "../components/BoardViewAssigned";
// import AddTask from "../components/task/AddTask";
// import Title from "../components/Title";
// import Tabs from "../components/Tabs";
// import { getAssignedtask } from "../Api/task";
// import Calendar from 'rc-calendar';
// import 'rc-calendar/assets/index.css';

// // Define type for task status parameters from useParams
// interface Params {
//   [key: string]: string | undefined;
// }

// interface TaskType {
//   todo: string;
//   "in progress": string;
//   completed: string;
// }

// const TABS = [
//   { title: "Board View", icon: <MdGridView /> },
//   { title: "List View", icon: <FaList /> },
// ];

// const TASK_TYPE: TaskType = {
//   todo: "bg-blue-600",
//   "in progress": "bg-yellow-600",
//   completed: "bg-green-600",
// };

// interface Task {
//   _id: string;
//   title: string;
//   date: string;
//   priority: 'high' | 'medium' | 'low';
//   stage: 'todo' | 'in progress' | 'completed';
//   team: TeamMember[];
//   isTrashed: boolean;
//   createdAt: string;
// }

// interface TeamMember {
//   _id: string;
//   name: string;
//   title: string;
//   email: string;
// }

// const Tasks: React.FC = () => {
//   const params = useParams<Params>();
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [selected, setSelected] = useState<number>(0);
//   const [open, setOpen] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null); // For the selected date
//   const [filteredTasks, setFilteredTasks] = useState<Task[]>([]); // Filtered tasks based on date

//   const status = params?.status || "";

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const response = await getAssignedtask();
//       console.log(response);
//       setTasks(response?.data?.tasks);
//       setFilteredTasks(response?.data?.tasks); // Initially set filteredTasks to all tasks
//       setLoading(false);
//     } catch (err) {
//       setLoading(false);
//       setError("Failed to load tasks. Please try again later.");
//       console.error(err);
//     }
//   };

//   // Effect to filter tasks based on the selected date
//   useEffect(() => {
//     if (selectedDate) {
//       // Filter tasks by selected date
//       const filtered = tasks.filter(task =>
//         new Date(task.date).toDateString() === selectedDate.toDateString()
//       );
//       setFilteredTasks(filtered);
//     } else {
//       // Show all tasks when no date is selected
//       setFilteredTasks(tasks);
//     }
//   }, [selectedDate, tasks]);

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return loading ? (
//     <div className="py-10">
//       <Loading />
//     </div>
//   ) : (
//     <div className="w-full flex">
//       <div className="flex-1">
//         <div className="flex items-center justify-between mb-4">
//           <Title title={status ? `${status} Tasks` : "Tasks"} />

//           {/* Button to create a task */}
//           {!status && (
//             <Button
//               onClick={() => setOpen(true)}
//               label="Create Task"
//               icon={<IoMdAdd className="text-lg" />}
//               className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
//             />
//           )}
//         </div>

//         {/* Tabs to toggle between Board View and List View */}
//         <Tabs tabs={TABS} setSelected={setSelected}>
//           {selected !== 1 ? (
//             <BoardViewAssigned tasks={filteredTasks} /> // Show filtered tasks
//           ) : (
//             <div className="w-full">
//               {/* List view logic here */}
//             </div>
//           )}
//         </Tabs>

//         <AddTask open={open} setOpen={setOpen} />
//       </div>

//       {/* Right Side Calendar */}
//       <div className="w-1/4 p-4 mt-16">
//         <h3 className="font-bold text-lg mb-2">Filter by Date</h3>
//         <Calendar
//           onChange={setSelectedDate} // Update the selected date
//           value={selectedDate} // Bind the selected date
//           className="border rounded-lg"
//         />
//       </div>
//     </div>
//   );
// };

// export default Tasks;

// import React, { useEffect, useState } from "react";
// import { FaList } from "react-icons/fa";
// import { MdGridView } from "react-icons/md";
// import { useParams } from "react-router-dom";
// import Loading from "../components/Loading";
// import Button from "../components/Button";
// import { IoMdAdd } from "react-icons/io";
// import BoardViewAssigned from "../components/BoardViewAssigned";
// import AddTask from "../components/task/AddTask";
// import Title from "../components/Title";
// import Tabs from "../components/Tabs";
// import { getAssignedtask } from "../Api/task";
// import Calendar from "rc-calendar";
// import "rc-calendar/assets/index.css";
// import Table from "../components/task/Table";

// // Define type for task status parameters from useParams
// interface Params {
//   [key: string]: string | undefined;
// }

// interface TaskType {
//   todo: string;
//   "in progress": string;
//   completed: string;
// }

// const TABS = [
//   { title: "Board View", icon: <MdGridView /> },
//   { title: "List View", icon: <FaList /> },
// ];

// const TASK_TYPE: TaskType = {
//   todo: "bg-blue-600",
//   "in progress": "bg-yellow-600",
//   completed: "bg-green-600",
// };

// interface Task {
//   _id: string;
//   title: string;
//   date: string;
//   priority: "high" | "medium" | "low";
//   stage: "todo" | "in progress" | "completed";
//   team: TeamMember[];
//   isTrashed: boolean;
//   createdAt: string;
// }

// interface TeamMember {
//   _id: string;
//   name: string;
//   title: string;
//   email: string;
// }

// const Tasks: React.FC = () => {
//   const params = useParams<Params>();
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [selected, setSelected] = useState<number>(0);
//   const [open, setOpen] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null); 
//   const [filteredTasks, setFilteredTasks] = useState<Task[]>([]); 

//   const status = params?.status || "";

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const response = await getAssignedtask();
//       console.log(response);
//       setTasks(response?.data?.tasks);
//       setFilteredTasks(response?.data?.tasks); 
//       setLoading(false);
//     } catch (err) {
//       setLoading(false);
//       setError("Failed to load tasks. Please try again later.");
//       console.error(err);
//     }
//   };


//   useEffect(() => {
//     if (selectedDate) {

//       const filtered = tasks.filter(
//         (task) => new Date(task.date).toDateString() === selectedDate.toDateString()
//       );
//       setFilteredTasks(filtered);
//     } else {

//       setFilteredTasks(tasks);
//     }
//   }, [selectedDate, tasks]);

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return loading ? (
//     <div className="py-10">
//       <Loading />
//     </div>
//   ) : (
//     <div className="w-full flex flex-col md:flex-row gap-4">

//       <div className="flex-1 p-4">
//         <div className="flex items-center justify-between mb-4">
//           <Title title={status ? `${status} Tasks` : "Tasks"} />

//           {/* Button to create a task */}
//           {!status && (
//             <Button
//               onClick={() => setOpen(true)}
//               label="Create Task"
//               icon={<IoMdAdd className="text-lg" />}
//               className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
//             />
//           )}
//         </div>

//         {/* Tabs to toggle between Board View and List View */}
//         <Tabs tabs={TABS} setSelected={setSelected}>
//           {selected !== 1 ? (
//             <BoardViewAssigned tasks={filteredTasks} /> 
//           ) : (
//             <div className="w-full">
//                   <Table tasks={filteredTasks}/>
//             </div>
//           )}
//         </Tabs>

//         <AddTask open={open} setOpen={setOpen} />
//       </div>

//       {/* Calendar Section */}
//       <div className="w-full md:w-1/4 p-4 mt-4 md:mt-16 border-t md:border-t-0 md:border-l">
//         <h3 className="font-bold text-lg mb-2">Filter by Date</h3>
//         <Calendar
//           onChange={setSelectedDate} 
//           value={selectedDate} 
//           className="border rounded-lg"
//         />
//       </div>
//     </div>
//   );
// };

// export default Tasks;



// import React, { useEffect, useState } from "react";
// import { FaList } from "react-icons/fa";
// import { MdGridView } from "react-icons/md";
// import { useParams } from "react-router-dom";
// import Loading from "../components/Loading";
// import Button from "../components/Button";
// import { IoMdAdd } from "react-icons/io";
// import BoardViewAssigned from "../components/BoardViewAssigned";
// import AddTask from "../components/task/AddTask";
// import Title from "../components/Title";
// import Tabs from "../components/Tabs";
// import { getAssignedtask } from "../Api/task";
// import Calendar from "rc-calendar";
// import "rc-calendar/assets/index.css";
// import Table from "../components/task/Table";

// // Define type for task status parameters from useParams
// interface Params {
//   [key: string]: string | undefined;
// }

// interface TaskType {
//   todo: string;
//   "in progress": string;
//   completed: string;
// }

// const TABS = [
//   { title: "Board View", icon: <MdGridView /> },
//   { title: "List View", icon: <FaList /> },
// ];

// const TASK_TYPE: TaskType = {
//   todo: "bg-blue-600",
//   "in progress": "bg-yellow-600",
//   completed: "bg-green-600",
// };

// interface Task {
//   _id: string;
//   title: string;
//   date: string;
//   priority: "high" | "medium" | "low";
//   stage: "todo" | "in progress" | "completed";
//   team: TeamMember[];
//   isTrashed: boolean;
//   createdAt: string;
// }

// interface TeamMember {
//   _id: string;
//   name: string;
//   title: string;
//   email: string;
// }

// const Tasks: React.FC = () => {
//   const params = useParams<Params>();
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [selected, setSelected] = useState<number>(0);
//   const [open, setOpen] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

//   const status = params?.status || "";

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const response = await getAssignedtask();
//       console.log(response);
//       setTasks(response?.data?.tasks);
//       setFilteredTasks(response?.data?.tasks);
//       setLoading(false);
//     } catch (err) {
//       setLoading(false);
//       setError("Failed to load tasks. Please try again later.");
//       console.error(err);
//     }
//   };
  
//   useEffect(() => {
//     if (selectedDate) {
//       // Ensure task.date is converted to a Date object before comparing
//       const filtered = tasks.filter(
//         (task) => new Date(task.date).toDateString() === selectedDate.toDateString()
//       );
//       setFilteredTasks(filtered);
//     } else {
//       setFilteredTasks(tasks); // If no date selected, show all tasks
//     }
//   }, [selectedDate, tasks]);

//   // Fetch tasks on component mount
//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return loading ? (
//     <div className="py-10">
//       <Loading />
//     </div>
//   ) : (
//     <div className="w-full flex flex-col md:flex-row gap-4">

//       <div className="flex-1 p-4">
//         <div className="flex items-center justify-between mb-4">
//           <Title title={status ? `${status} Tasks` : "Tasks"} />

//           {/* Button to create a task */}
//           {!status && (
//             <Button
//               onClick={() => setOpen(true)}
//               label="Create Task"
//               icon={<IoMdAdd className="text-lg" />}
//               className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
//             />
//           )}
//         </div>

//         {/* Tabs to toggle between Board View and List View */}
//         <Tabs tabs={TABS} setSelected={setSelected}>
//           {selected !== 1 ? (
//             <BoardViewAssigned tasks={filteredTasks} />
//           ) : (
//             <div className="w-full">
//               <Table tasks={filteredTasks} />
//             </div>
//           )}
//         </Tabs>

//         <AddTask open={open} setOpen={setOpen} />
//       </div>

//       {/* Calendar Section */}
//       <div className="w-full md:w-1/4 p-4 mt-4 md:mt-16 border-t md:border-t-0 md:border-l">
//         <h3 className="font-bold text-lg mb-2">Filter by Date</h3>
//         <Calendar
//           onChange={setSelectedDate}
//           value={selectedDate}
//           className="border rounded-lg"
//         />
         
//       </div>
//     </div>
//   );
// };

// export default Tasks;


import React, { useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import BoardViewAssigned from "../components/BoardViewAssigned";
import AddTask from "../components/task/AddTask";
import Title from "../components/Title";
import Tabs from "../components/Tabs";
import { getAssignedtask } from "../Api/task";
import Calendar from "rc-calendar";
import "rc-calendar/assets/index.css";
import Table from "../components/task/Table";
import moment, { Moment } from "moment"; // Import Moment.js

// Define type for task status parameters from useParams
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
  team: TeamMember[];
  isTrashed: boolean;
  createdAt: string;
}

interface TeamMember {
  _id: string;
  name: string;
  title: string;
  email: string;
}

const Tasks: React.FC = () => {
  const params = useParams<Params>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selected, setSelected] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null); // Use Moment instead of Date
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  const status = params?.status || "";

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await getAssignedtask();
      console.log(response);
      setTasks(response?.data?.tasks);
      setFilteredTasks(response?.data?.tasks);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Failed to load tasks. Please try again later.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      const filtered = tasks.filter(
        (task) => moment(task.date).isSame(selectedDate, 'day') 
      );
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(tasks); 
    }
  }, [selectedDate, tasks]);
  useEffect(() => {
    fetchTasks();
  }, []);

  return loading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full flex flex-col md:flex-row gap-4">

      <div className="flex-1 p-4">
        <div className="flex items-center justify-between mb-4">
          <Title title={status ? `${status} Tasks` : "Tasks"} />

          {/* Button to create a task */}
          {!status && (
            <Button
              onClick={() => setOpen(true)}
              label="Create Task"
              icon={<IoMdAdd className="text-lg" />}
              className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
            />
          )}
        </div>

        {/* Tabs to toggle between Board View and List View */}
        <Tabs tabs={TABS} setSelected={setSelected}>
          {selected !== 1 ? (
            <BoardViewAssigned tasks={filteredTasks} />
          ) : (
            <div className="w-full">
              <Table tasks={filteredTasks} />
            </div>
          )}
        </Tabs>

        <AddTask open={open} setOpen={setOpen} />
      </div>

      <div className="w-full md:w-1/4 p-4 mt-4 md:mt-16 border-t md:border-t-0 md:border-l">
        <h3 className="font-bold text-lg mb-2">Filter by Date</h3>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className="border rounded-lg"
        />
      </div>
    </div>
  );
};

export default Tasks;




