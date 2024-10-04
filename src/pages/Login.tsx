// import React, { useEffect } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import Textbox from "../components/Textbox";
// import Button from "../components/Button";
// import { useSelector } from "react-redux";
// // import { useSelector } from "react-redux";
// // import { RootState } from "../store"; 

// interface LoginFormInputs {
//     email: string;
//     password: string;
// }
// interface RootState {
//     auth: {
//         userInfo: string;
//     }
// }

// const Login: React.FC = () => {
//     const user = useSelector((state: RootState) => state.auth);


//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<LoginFormInputs>();

//     const navigate = useNavigate();
//     const submitHandler: SubmitHandler<LoginFormInputs> = async (data) => {
//         console.log("submit", data);
//     };

//     useEffect(() => {
//         if (user) {
//             navigate("/dashboard");
//         }
//     }, [user, navigate]);

//     return (
//         <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
//             <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
//                 <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
//                     <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
//                         <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base bordergray-300 text-gray-600">
//                             Manage all your tasks in one place!
//                         </span>
//                         <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700">
//                             <span>Cloud-Based</span>
//                             <span>Task Manager</span>
//                         </p>

//                         <div className="cell">
//                             <div className="circle rotate-in-up-left"></div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* right side */}
//                 <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
//                     <form
//                         onSubmit={handleSubmit(submitHandler)}
//                         className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14"
//                     >
//                         <div className="">
//                             <p className="text-blue-600 text-3xl font-bold text-center">
//                                 Welcome back!
//                             </p>
//                             <p className="text-center text-base text-gray-700">
//                                 Keep all your credentials safe.
//                             </p>
//                         </div>

//                         <div className="flex flex-col gap-y-5">
//                             <Textbox
//                                 placeholder="email@example.com"
//                                 type="email"
//                                 name="email"
//                                 label="Email Address"
//                                 className="w-full rounded-full"
//                                 register={register("email", {
//                                     required: "Email Address is required!",
//                                 })}
//                                 error={errors.email ? errors.email.message : ""}
//                             />
//                             <Textbox
//                                 type="password"
//                                 placeholder="your password"
//                                 name="password"
//                                 label="Password"
//                                 className="w-full rounded-full"
//                                 register={register("password", {
//                                     required: "Password is required!",
//                                 })}
//                                 error={errors.password ? errors.password.message : ""}
//                             />

//                             <span className="text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer">
//                                 Forget Password?
//                             </span>

//                             <Button
//                                 type="submit"
//                                 label="Submit"
//                                 className="w-full h-10 bg-blue-700 text-white rounded-full"
//                             />
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;

import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "../components/Button";
import { setAdminStatus, setCredentials } from "../store/slice/authSlice";
import { userLogin } from "../Api/user";
import { useDispatch} from "react-redux";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

interface LoginFormInputs {
    email: string;
    password: string;
}


const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Required"),
    });
    const formik = useFormik<LoginFormInputs>({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const res = await userLogin(values.email, values.password);
                console.log(res)
                if (res?.data.success) {
                    dispatch(setCredentials(res.data.token));
                    dispatch(setAdminStatus(res.data.isAdmin));
                    localStorage.setItem('userId', res.data.name);
                    localStorage.setItem('userValue', res.data._id);
                    toast.success('Successfully logged in.');
                    navigate(`/dashboard`);
                } else {
                    toast.error(res?.data.message || 'Login failed');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                toast.error('An error occurred during login. Please try again later.');
            }
        }, 
        
    });



    return (
        <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
            <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
               <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
                    <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
                        <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-gray-600">
                            Manage all your tasks in one place!
                        </span>
                        <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700">
                            <span>Cloud-Based</span>
                            <span>Task Manager</span>
                        </p>
                        <div className="cell">
                            <div className="circle rotate-in-up-left"></div>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
                    <form
                        onSubmit={formik.handleSubmit}
                        className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14"
                    >
                        <div>
                            <p className="text-blue-600 text-3xl font-bold text-center">
                                Welcome back!
                            </p>
                            <p className="text-center text-base text-gray-700">
                                Keep all your credentials safe.
                            </p>
                        </div>

                        <div className="flex flex-col gap-y-5">
                            {/* Email Input */}
                            <div className="w-full flex flex-col gap-1">
                                <label htmlFor="email" className="text-slate-800">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="email@example.com"
                                    id="email"
                                    {...formik.getFieldProps("email")} // Register input with Formik
                                    
                                    aria-invalid={formik.errors.email ? "true" : "false"}
                                    className={`bg-transparent px-3 py-2.5 border rounded-full border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300 ${formik.errors.email ? "border-red-500" : ""
                                        }`}
                                />
                                {formik.errors.email && (
                                    <span className="text-xs text-[#f64949fe] mt-0.5">{formik.errors.email}</span>
                                )}
                            </div>

                            <div className="w-full flex flex-col gap-1">
                                <label htmlFor="password" className="text-slate-800">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="your password"
                                    id="password"
                                    {...formik.getFieldProps("password")} // Register input with Formik
                                    aria-invalid={formik.errors.password ? "true" : "false"}
                                    className={`bg-transparent px-3 py-2.5 border rounded-full border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300 ${formik.errors.password ? "border-red-500" : ""
                                        }`}
                                />
                                {formik.errors.password && (
                                    <span className="text-xs text-[#f64949fe] mt-0.5">{formik.errors.password}</span>
                                )}
                            </div>

                            <span className="text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer">
                                Forget Password?
                            </span>

                            <Button
                                type="submit"
                                label="Submit"
                                className="w-full h-10 bg-blue-700 text-white rounded-full"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;




