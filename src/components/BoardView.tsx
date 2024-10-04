import React from "react";
import TaskCard from "./TaskCard";
interface Task {
    _id: string;
    title: string;
    date: string;
    priority: 'high' | 'medium' | 'low';
    stage: 'todo' | 'in progress' | 'completed';

    isTrashed: boolean;

    createdAt: string;
}



interface BoardViewProps {
    tasks: Task[]; 
    fetchTasks:()=>void
}

const BoardView: React.FC<BoardViewProps> = ({ tasks, fetchTasks }) => {
    return (
        <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10'>
            {tasks?.map((task, index) => (
                <TaskCard task={task} key={index} fetchTasks={fetchTasks} /> 
            ))}
        </div>
    );
};

export default BoardView;
