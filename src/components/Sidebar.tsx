import React from "react";
import {
    MdDashboard,
    MdLogout,
    MdOutlineAddTask,
    MdOutlinePendingActions,
    MdTaskAlt,
} from "react-icons/md";
import { FaTasks} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout, setOpenSidebar } from "../store/slice/authSlice";
import clsx from "clsx";

interface LinkData {
    label: string;
    link: string;
    icon: JSX.Element;
    disabled:boolean
}

const linkData: LinkData[] = [
    {
        label: "Dashboard",
        link: "dashboard",
        icon: <MdDashboard />,
        disabled:false,
    },
    {
        label: "My Tasks",
        link: "mytasks",
        icon: <FaTasks />,
        disabled: false,
    },
    {
        label: "Assigned Tasks",
        link: "tasks",
        icon: <FaTasks />,
        disabled: false,
    },
    {
        label: "Completed",
        link: "completed",
        icon: <MdTaskAlt />,
        disabled: true,
    },
    {
        label: "In Progress",
        link: "in-progress",
        icon: <MdOutlinePendingActions />,
        disabled: true,
    },
    {
        label: "To Do",
        link: "todo",
        icon: <MdOutlinePendingActions />,
        disabled: true,
    },
    // {
    //     label: "Team",
    //     link: "team",
    //     icon: <FaUsers />,
    // },
    // {
    //     label: "Trash",
    //     link: "trashed",
    //     icon: <FaTrashAlt />,
    // },
];




interface RootState {
    auth: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        isAdmin: any;
        userInfo: string,
    }
}

const Sidebar: React.FC = () => {
    const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);
    // const user = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();
    const path = location.pathname.split("/")[1];

    // const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);
    const filteredLinks = isAdmin
        ? linkData
        : linkData.filter((link) => link.label !== "Assigned Tasks" && link.label !== "Dashboard");
    const closeSidebar = () => {
        dispatch(setOpenSidebar(false));
    };
    interface NavLinkProps {
        el: LinkData; 
    }
    const navigate=useNavigate()
    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('userId');
        localStorage.removeItem('userValue');
        localStorage.removeItem('userToken');
        localStorage.removeItem('isAdmin');


        navigate('/');
    };
    
    const NavLink: React.FC<NavLinkProps> = ({ el }) => {
        const handleClick = (e: React.MouseEvent) => {
            if (el.disabled) {
                e.preventDefault();
            }
        };
        return (
            // <Link
            //     to={el.link}
            //     onClick={closeSidebar}
            //     className={clsx(
            //         "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]",
            //         path === el.link.split("/")[0] ? "bg-blue-700 text-neutral-100" : ""
            //     )}
            // >
            <Link
                to={el?.disabled ? "#" : el.link} // Disable link navigation
                onClick={(e) => {
                    handleClick(e);
                    if (!el.disabled) closeSidebar(); // Close sidebar only if not disabled
                }}
                className={clsx(
                    "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]",
                    path === el.link.split("/")[0] ? "bg-blue-700 text-neutral-100" : ""
                )}
            >
                {el.icon}
                <span className="hover:text-[#2564ed]">{el.label}</span>
            </Link>
        );
    };

    return (
        <div className="w-full h-full flex flex-col gap-6 p-5">
            <h1 className="flex gap-1 items-center">
                <p className="bg-blue-600 p-2 rounded-full">
                    <MdOutlineAddTask className="text-white text-2xl font-black" />
                </p>
                <span className="text-2xl font-bold text-black">TaskMe</span>
            </h1>
            
            <div className="flex-1 flex flex-col gap-y-5 py-8">
                {filteredLinks.map((link) => (
                    <NavLink el={link} key={link.label} />
                ))}
            </div>

            <div>
                <button
                    className="w-full flex gap-2 p-2 items-center text-lg text-gray-800"
                    onClick={handleLogout}
                >
                    <MdLogout />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;



