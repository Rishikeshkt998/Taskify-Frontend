/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from "../services/axios";
import userRoutes from "../services/endpoints/userEndpoints";
import 'react-toastify/dist/ReactToastify.css';


Api.interceptors.request.use(
    (config:any) => {
        if (config && config.url && config?.url.startsWith("/users")) {
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



