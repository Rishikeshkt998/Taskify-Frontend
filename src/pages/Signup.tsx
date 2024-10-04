/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import { Link, useNavigate } from 'react-router-dom';
// import * as Yup from 'yup';
// import { signup } from '../Api/user';
// const SignUpForm: React.FC = () => {
//     const navigate = useNavigate();

//     // Validation schema for Formik using Yup
//     const SignupSchema = Yup.object().shape({
//         name: Yup.string().required('Name is required'),
//         email: Yup.string().email('Invalid email').required('Email is required'),
//         phone: Yup.string().matches(/^\d{10}$/, 'Invalid phone number').required('Phone is required'),
//         password: Yup.string()
//             .min(8, 'Password must be at least 8 characters')
//             .required('Password is required'),
//         confirmPassword: Yup.string()
//             .oneOf([Yup.ref('password')], 'Passwords must match')
//             .required('Confirm your password'),
//         role: Yup.string().required('Please select a role')
//     });

//     const handleSubmit = async (values: any, { setSubmitting }: any) => {
//         try {
//             const { name, email, phone, password, confirmPassword } = values;
//             const res = await signup(name, email, phone, password, confirmPassword);
//             if (res?.data.success) {
//                 navigate('/user/otp');  // Redirect to OTP page after successful signup
//             }
//         } catch (error) {
//             console.error(error);
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     return (
//         <div className="bg-white min-h-screen flex">
//             <div className="w-full flex flex-row">
//                 {/* Left Column for Information */}
//                 <div className="hidden lg:flex flex-col justify-between bg-gradient-to-r from-blue-800 to-blue-950 shadow-lg lg:p-8 xl:p-12 lg:max-w-sm xl:max-w-lg">
//                     <div className="flex items-center justify-start space-x-3">
//                         <span className="bg-black rounded-full w-8 h-8"></span>
//                         <Link to='/' className="font-medium text-xl text-white">JobberWin</Link>
//                     </div>
//                     <div className="space-y-5">
//                         <h1 className="lg:text-3xl xl:text-5xl text-white font-extrabold">
//                             Enter your account and discover your future
//                         </h1>
//                         <p className="text-lg text-white">Already have an account?</p>
//                         <Link to='/user/login'>
//                             <button className="inline-block px-4 py-3 border-2 rounded-lg font-medium border-black bg-black text-white">Login here</button>
//                         </Link>
//                     </div>
//                     <p className="font-medium text-white">© 2024 JobberWin</p>
//                 </div>

//                 {/* Right Column for Form */}
//                 <div className="flex flex-1 flex-col items-center justify-center px-10 relative">
//                     <div className="flex lg:hidden justify-between items-center w-full py-4">
//                         <div className="flex items-center space-x-3">
//                             <span className="bg-black rounded-full w-6 h-6"></span>
//                             <Link to='/' className="font-medium text-lg">JobberWin</Link>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                             <span>Already have an account?</span>
//                             <Link to='/user/login' className="underline font-medium text-blue-600">Login</Link>
//                         </div>
//                     </div>

//                     <div className="flex flex-1 flex-col justify-center space-y-5 max-w-md">
//                         <div className="text-center">
//                             <h2 className="text-3xl md:text-4xl font-bold">Create an Account</h2>
//                             <p className="text-md md:text-xl">Sign up and start your journey today!</p>
//                         </div>

//                         {/* Formik Form */}
//                         <Formik
//                             initialValues={{
//                                 name: '',
//                                 email: '',
//                                 phone: '',
//                                 password: '',
//                                 confirmPassword: '',
//                                 role: ''
//                             }}
//                             validationSchema={SignupSchema}
//                             onSubmit={handleSubmit}
//                         >
//                             {({ isSubmitting }) => (
//                                 <Form>
//                                     <div className="flex flex-col max-w-md space-y-5">
//                                         <div>
//                                             <Field
//                                                 type="text"
//                                                 name="name"
//                                                 placeholder="Name"
//                                                 className="w-full px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg border-black"
//                                             />
//                                             <ErrorMessage name="name" component="small" className="text-red-500" />
//                                         </div>
//                                         <div>
//                                             <Field
//                                                 type="email"
//                                                 name="email"
//                                                 placeholder="Email"
//                                                 className="w-full px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg border-black"
//                                             />
//                                             <ErrorMessage name="email" component="small" className="text-red-500" />
//                                         </div>
//                                         <div>
//                                             <Field
//                                                 type="text"
//                                                 name="phone"
//                                                 placeholder="Phone"
//                                                 className="w-full px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg border-black"
//                                             />
//                                             <ErrorMessage name="phone" component="small" className="text-red-500" />
//                                         </div>
//                                         <div>
//                                             <Field
//                                                 type="password"
//                                                 name="password"
//                                                 placeholder="Password"
//                                                 className="w-full px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg border-black"
//                                             />
//                                             <ErrorMessage name="password" component="small" className="text-red-500" />
//                                         </div>
//                                         <div>
//                                             <Field
//                                                 type="password"
//                                                 name="confirmPassword"
//                                                 placeholder="Confirm Password"
//                                                 className="w-full px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg border-black"
//                                             />
//                                             <ErrorMessage name="confirmPassword" component="small" className="text-red-500" />
//                                         </div>
//                                         <div>
//                                             <Field
//                                                 as="select"
//                                                 name="role"
//                                                 className="w-full px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg border-black text-black"
//                                             >
//                                                 <option value="">Select Role</option>
//                                                 <option value="user">User</option>
//                                                 <option value="recruiter">Recruiter</option>
//                                             </Field>
//                                             <ErrorMessage name="role" component="small" className="text-red-500" />
//                                         </div>

//                                         <button
//                                             type="submit"
//                                             disabled={isSubmitting}
//                                             className="w-full flex items-center justify-center px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium bg-black text-white"
//                                         >
//                                             {isSubmitting ? 'Submitting...' : 'Submit'}
//                                         </button>

//                                         <div className="flex items-center justify-center mt-4">
//                                             <span className="border border-black w-full"></span>
//                                             <span className="px-4">Or</span>
//                                             <span className="border border-black w-full"></span>
//                                         </div>
//                                     </div>
//                                 </Form>
//                             )}
//                         </Formik>
//                     </div>

//                     <div className="hidden lg:flex justify-between items-center w-full py-4">
//                         <div className="flex items-center space-x-2">
//                             <span>Already have an account?</span>
//                             <Link to='/user/login' className="underline font-medium text-blue-600">Login now</Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SignUpForm;
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { signup } from '../Api/user';

const SignUpForm: React.FC = () => {
    const navigate = useNavigate();
    const SignupSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phone: Yup.string().matches(/^\d{10}$/, 'Invalid phone number').required('Phone is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm your password'),
        role: Yup.string().required('Please select a role')
    });

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        try {
            const { name, email, phone, password, confirmPassword, role } = values;
            const res = await signup(name, email, phone, password, confirmPassword, role);
            if (res?.data.success) {
                navigate('/');  
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
            <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
                {/* Left side content */}
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
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            phone: '',
                            password: '',
                            confirmPassword: '',
                            role: ''
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="form-container w-full md:w-[450px] flex flex-col gap-y-3 bg-white px-10 pt-6  pb-3 rounded-lg shadow-md">
                                <div>
                                    <p className="text-blue-600 text-3xl font-bold text-center">Create an Account</p>
                                    <p className="text-center text-base text-gray-700">Sign up and start your journey today!</p>
                                </div>

                                <div className="flex flex-col gap-y-1">
                                    {/* Name Input */}
                                    <div className="w-full flex flex-col gap-1">
                                        <label htmlFor="name" className="text-slate-800">Name</label>
                                        <Field
                                            type="text"
                                            name="name"
                                            placeholder="Name"
                                            className="w-full px-3 py-0.5 border rounded-full border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
                                        />
                                        <ErrorMessage name="name" component="span" className="text-xs text-[#f64949fe] mt-0.5" />
                                    </div>

                                    {/* Email Input */}
                                    <div className="w-full flex flex-col gap-1">
                                        <label htmlFor="email" className="text-slate-800">Email Address</label>
                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="email@example.com"
                                            className="w-full px-3 py-0.5 border rounded-full border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
                                        />
                                        <ErrorMessage name="email" component="span" className="text-xs text-[#f64949fe] mt-0.5" />
                                    </div>

                                    {/* Phone Input */}
                                    <div className="w-full flex flex-col gap-1">
                                        <label htmlFor="phone" className="text-slate-800">Phone</label>
                                        <Field
                                            type="text"
                                            name="phone"
                                            placeholder="Phone"
                                            className="w-full px-3 py-0.5 border rounded-full border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
                                        />
                                        <ErrorMessage name="phone" component="span" className="text-xs text-[#f64949fe] mt-0.5" />
                                    </div>

                                    {/* Password Input */}
                                    <div className="w-full flex flex-col gap-1">
                                        <label htmlFor="password" className="text-slate-800">Password</label>
                                        <Field
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            className="w-full px-3 py-0.5 border rounded-full border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
                                        />
                                        <ErrorMessage name="password" component="span" className="text-xs text-[#f64949fe] mt-0.5" />
                                    </div>

                                    {/* Confirm Password Input */}
                                    <div className="w-full flex flex-col gap-1">
                                        <label htmlFor="confirmPassword" className="text-slate-800">Confirm Password</label>
                                        <Field
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            className="w-full px-3 py-0.5 border rounded-full border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
                                        />
                                        <ErrorMessage name="confirmPassword" component="span" className="text-xs text-[#f64949fe] mt-0.5" />
                                    </div>

                                    {/* Role Selection */}
                                    <div className="w-full flex flex-col gap-1">
                                        <label htmlFor="role" className="text-slate-800">Role</label>
                                        <Field
                                            as="select"
                                            name="role"
                                            className="w-full px-3 py-0.5 border rounded-full border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
                                        >
                                            <option value="">Select Role</option>
                                            <option value="Employee">Employee</option>
                                            <option value="Manager">Manager</option>
                                        </Field>
                                        <ErrorMessage name="role" component="span" className="text-xs text-[#f64949fe] mt-0.5" />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-10 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit'}
                                    </button>

                                    <span className="text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer">
                                        Already have an account? <Link to='/user/login' className="text-blue-600">Login here</Link>
                                    </span>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;


