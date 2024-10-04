/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// import Dashboard from './pages/Dashboard';
// import UserLoggedIn from './components/UserLoggedin';
// import UserLoggedOut from './components/UsersLoggedOut';
import Login from './pages/Login'
import { Navigate, Outlet, Route, Routes, useLocation,  } from "react-router-dom";
import SignUpForm from './pages/Signup';
import UserLoggedOut from './components/UsersLoggedOut';
import UserLoggedIn from './components/UserLoggedin';
import { useDispatch, useSelector } from 'react-redux';
// import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
// import { Fragment, useRef } from 'react';
// import { setOpenSidebar } from './store/slice/authSlice';
// import { IoClose } from 'react-icons/io5';
// import { Transition } from '@headlessui/react';
// import clsx from 'clsx';
import Tasks from './pages/Tasks';
import { Fragment, useRef } from 'react';
import { setOpenSidebar } from './store/slice/authSlice';
import { Transition } from '@headlessui/react';
import { IoClose } from 'react-icons/io5';
import clsx from 'clsx';
import Mytasks from './pages/Mytasks';
import Calender from './pages/Calender';
// import UserLoggedOut from './components/UsersLoggedOut';
// import UserLoggedIn from './components/UserLoggedin';
// import Tasks from './pages/Tasks';
// import Employee from './pages/Employee';
// import Trash from './pages/Trash';
// import TaskDetails from './pages/TaskDetails';
interface RootState {
  auth: {
    userInfo: string,
  }
}
function Layout() {
  const user = useSelector((state: RootState) => state.auth);

  const location = useLocation();

  return user ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
        <Sidebar />
      </div>

      {/* <MobileSidebar /> */}

      <div className='flex-1 overflow-y-auto'>
        {/* <Navbar /> */}

        <div className='p-4 2xl:px-10'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='/' state={{ from: location }} replace />
  );
}
// const MobileSidebar: React.FC = () => {
//   const isSidebarOpen = useSelector((state: RootState) => state.auth.isSidebarOpen);
//   const mobileMenuRef = useRef<HTMLDivElement | null>(null);
//   const dispatch = useDispatch();

//   const closeSidebar = () => {
//     dispatch(setOpenSidebar(false));
//   };

//   return (
//     <>
//       <Transition
//         show={isSidebarOpen}
//         as={Fragment}
//         enter='transition-opacity duration-700'
//         enterFrom='opacity-x-10'
//         enterTo='opacity-x-100'
//         leave='transition-opacity duration-700'
//         leaveFrom='opacity-x-100'
//         leaveTo='opacity-x-0'
//       >
//         {(ref) => (
//           <div
//             ref={(node) => (mobileMenuRef.current = node)}
//             className={clsx(
//               "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform",
//               isSidebarOpen ? "translate-x-0" : "translate-x-full"
//             )}
//             onClick={closeSidebar}
//           >
//             <div className="bg-white w-3/4 h-full">
//               <div className="w-full flex justify-end px-5 mt-5">
//                 <button
//                   onClick={closeSidebar}
//                   className="flex justify-end items-end"
//                   title="Close sidebar"
//                 >
//                   <IoClose size={25} />
//                 </button>
//               </div>

//               <div className="-mt-10">
//                 <Sidebar />
//               </div>
//             </div>
//           </div>
//         )}
//       </Transition>
//     </>
//   );
// };
function App() {

  return (
    <main className='w-full min-h-screen bg-[#f3f4f6] '>
      <Routes>
        <Route element={<UserLoggedOut />}>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<SignUpForm />} />
        </Route>
        <Route element={<UserLoggedIn />}>
          <Route element={<Layout />}>
            <Route path='/dashboard' element={<Calender />} />
            <Route path='/mytasks' element={<Mytasks />} />
            <Route path='/tasks' element={<Tasks />} />
          </Route>
        </Route>
    </Routes>
    </main>
    
  )
}

export default App
