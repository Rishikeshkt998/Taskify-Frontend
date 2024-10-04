/* eslint-disable @typescript-eslint/no-unused-vars */


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
import TableForManager from "../components/task/TableForManger";

interface Params {
    [key: string]: string | undefined;
}



const TABS = [
    { title: "Board View", icon: <MdGridView /> },
    { title: "List View", icon: <FaList /> },
];



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
    const [selectedDate, setSelectedDate] = useState<Moment | undefined>(undefined); // Use Moment instead of Date
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
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
        <div className="w-full flex flex-col md:flex-row gap-4">

            <div className="flex-1 p-4">
                <div className="flex items-center justify-between mb-4">
                    <Title title={status ? `${status} Tasks` : "Tasks"} />

                    {!status && isAdmin && (
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
                        <BoardView tasks={filteredTasks} fetchTasks={fetchTasks}/>
                    ) : (
                        <div className="w-full">
                            {!isAdmin ? (
                                    <Table tasks={tasks} fetchTasks={fetchTasks}/>
                            ) : (
                                    <TableForManager tasks={tasks} fetchTasks={fetchTasks} />
                            )}
                        </div>
                    )}
                </Tabs>
                {isAdmin && (
                    <AddMyTask open={open} setOpen={setOpen} fetchTasks={fetchTasks} />
                )}

                
            </div>

            <div className="w-full md:w-1/4 p-4 mt-4 md:mt-16 border-t md:border-t-0 md:border-l">
                <h3 className="font-bold text-lg mb-2">Filter by Date</h3>
                <Calendar
                    onChange={(date: Moment | null) => setSelectedDate(date || undefined)}
                    value={selectedDate}
                    className="border rounded-lg"
                />
            </div>
        </div>
    )

    
};

export default Mytasks;




