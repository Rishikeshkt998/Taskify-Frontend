/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from "../services/axios";
import userRoutes from "../services/endpoints/userEndpoints";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";



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
            // window.location.href = "/login";
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



export const signup = async (name: string, email: string, phone: string, password: string, confirmPassword: string,role:string) => {
    try {
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }

        const res = await Api.post(userRoutes.userSignup, { name, email, phone, password, confirmPassword ,role});
        return res

    } catch (error) {
        console.error('Error in signup:', error);


    }
};



export const userLogin = async (email: string, password: string) => {
    try {
        const res = await Api.post(userRoutes.userLogin, { email, password })
        localStorage.setItem("userToken", res?.data.token)

        return res
    } catch (error) {
        console.log(error)
    }
};

export const getUsers = async () => {
    try {
        const res = await Api.get(userRoutes.getUser)

        return res
    } catch (error) {
        console.log(error)
    }
};



