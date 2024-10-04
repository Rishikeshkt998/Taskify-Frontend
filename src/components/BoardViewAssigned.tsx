/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import TaskCardAssigned from "./TaskCardAssigned";
// interface Task {
//     _id: string;
//     title: string;
//     date: string;
//     team: string[]
//     priority: 'high' | 'medium' | 'low';
//     stage: 'todo' | 'in progress' | 'completed';
    
//     isTrashed: boolean;

//     createdAt: string;
// }



interface BoardViewProps {
    tasks: any;
}

const BoardViewAssigned: React.FC<BoardViewProps> = ({ tasks }) => {
    return (
        <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10'>
            {tasks.map((task:any, index:any) => (
                <TaskCardAssigned task={task} key={index} />
            ))}
        </div>
    );
};

export default BoardViewAssigned;