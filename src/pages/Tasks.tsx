/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */



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
import moment, { Moment } from "moment";

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
  const [selectedDate, setSelectedDate] = useState<Moment | undefined>(undefined); 
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
      console.log(error)
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

          {!status && (
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
              <BoardViewAssigned tasks={filteredTasks} fetchTasks={fetchTasks}/>
          ) : (
            <div className="w-full">
                  <Table tasks={filteredTasks} fetchTasks={fetchTasks}/>
            </div>
          )}
        </Tabs>

          <AddTask open={open} setOpen={setOpen} fetchTasks={fetchTasks} />
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
  );
};

export default Tasks;




