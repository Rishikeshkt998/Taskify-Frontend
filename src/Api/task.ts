/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from "../services/axios";
import 'react-toastify/dist/ReactToastify.css';
import taskRoutes from "../services/endpoints/taskEndpoints";



Api.interceptors.request.use(
    (config: any) => {
        if (config && config.url && config?.url.startsWith("/tasks")) {
            const userToken = localStorage.getItem("userToken")
            if (userToken) {
                config.headers.Authorization = `Bearer ${userToken}`;
            }

        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const addTask = async (
    title: string,
    mangerid:string |null,
    date: Date | string, 
    stage: any, 
    priority: "high" | "medium" | "normal" | "low" 
): Promise<any> => {
    try {
        const res = await Api.post(taskRoutes.addTask, {
            title,
            mangerid,
            date,
            stage,
            priority,
        });
        return res; 
    } catch (error) {
        console.error('Error in adding task:', error);
        throw error; 
    }
};

export const editTask = async (
    id:string,
    title: string,
    date: Date | string,
    stage: any,
    priority: any
): Promise<any> => {
    try {
        const res = await Api.put(taskRoutes.editTask, {
            id,
            title,
            date,
            stage,
            priority,
        });
        return res;
    } catch (error) {
        console.error('Error in adding task:', error);
        throw error;
    }
};
export const editTaskForManager = async (
    id: string,
    title: string,
    date: Date | string,
    team:string[],
    stage: any,
    priority: any
): Promise<any> => {
    try {
        const res = await Api.put(taskRoutes.editTaskForUser, {
            id,
            title,
            date,
            team,
            stage,
            priority,
        });
        return res;
    } catch (error) {
        console.error('Error in adding task:', error);
        throw error;
    }
};

export const deleteTask = async (id:any
): Promise<any> => {
    try {
        const res = await Api.delete(`${taskRoutes.deleteTask}/${id}`);
        return res;
    } catch (error) {
        console.error('Error in adding task:', error);
        throw error;
    }
};

export const addTaskToAssign = async (
    title: string,
    date: Date | string,
    team:string[],
    stage: any,
    priority: "high" | "medium" | "normal" | "low"
): Promise<any> => {
    try {
        const res = await Api.post(taskRoutes.addAssignedTask, {
            title,
            date,
            team,
            stage,
            priority,
        });
        return res;
    } catch (error) {
        console.error('Error in adding task:', error);
        throw error;
    }
};
export const getTaskbyId = async (managerid:any
): Promise<any> => {
    try {
        const res = await Api.get(`${taskRoutes.getmytask}/${managerid}`);
        console.log("value",res)
        return res;
    } catch (error) {
        console.error('Error in adding task:', error);
        throw error;
    }
};

export const getTaskForEmployees = async (id: any
): Promise<any> => {
    try {
        const res = await Api.get(`${taskRoutes.getemployeetask}/${id}`);
        console.log("value", res)
        return res;
    } catch (error) {
        console.error('Error in adding task:', error);
        throw error;
    }
};

export const getAssignedtask = async (
): Promise<any> => {
    try {
        const res = await Api.get(taskRoutes.assignedtask);
        console.log("value", res)
        return res;
    } catch (error) {
        console.error('Error in adding task:', error);
        throw error;
    }
};
