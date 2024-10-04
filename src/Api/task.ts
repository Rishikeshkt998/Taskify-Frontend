/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from "../services/axios";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
import taskRoutes from "../services/endpoints/taskEndpoints";



Api.interceptors.request.use(
    (config: any) => {
        if (config && config.url && config?.url.startsWith("/user")) {
            const userToken = localStorage.getItem("userToken")
            if (userToken) {
                config.headers.Authorization = `Bearer ${userToken}`;
            }
            const courseId = localStorage.getItem("courseId");
            if (courseId) {
                config.headers['Course-Id'] = courseId;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
Api.interceptors.response.use(
    function (response) {
        if (response.data.newAccessToken) {
            localStorage.setItem("userToken", response.data.newAccessToken);
        }
        const id = localStorage.getItem('userData')
        if (response.data.userId === id && response.data.blocked) {
            Cookies.remove("userToken");
            localStorage.removeItem('userInfo')
        }

        return response;
    },
    function (error) {
        if (error.response && error.response.status === 401 && error.response?.data.message === 'User is not enrolled in this course') {
            toast.error("you are not enrolled this course");
            window.history.back();
            return Promise.reject(error);

        } else if (error.response && error.response.status === 404) {
            window.location.href = "/error404";
            return Promise.reject(error);

        } else if (error.response && error.response.status === 500) {
            window.location.href = "/error500";
        }

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
