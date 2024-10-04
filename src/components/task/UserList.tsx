/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

// import { useEffect, useState } from "react";
// import { getUsers } from "../../Api/user";

// interface User {
//     id: string;
//     name: string;
// }

// interface UserListProps {
//     setTeam: (team: User[]) => void; // Updated to accept an array of User
//     team: User[]; // This should be of type User[]
// }

// const UserList: React.FC<UserListProps> = ({ setTeam, team }) => {
//     const [users, setData] = useState<User[]>([]);
//     const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
//     const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

//     const toggleUserSelection = (user: User) => {
//         const updatedSelection = selectedUsers.includes(user)
//             ? selectedUsers.filter((u) => u.id !== user.id)
//             : [...selectedUsers, user];

//         setSelectedUsers(updatedSelection);
//         setTeam(updatedSelection); // Update the team state with selected users
//     };

//     const fetchUsers = async () => {
//         try {
//             const response = await getUsers();
//             setData(response?.data?.users || []); // Safeguard in case users are not found
//         } catch (error) {
//             console.error("Error fetching users:", error);
//         }
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     return (
//         <div className="relative">
//             <h3 className="font-bold mb-2">Select Users:</h3>
//             <span className="text-sm text-gray-700">
//                 Selected Users: {selectedUsers.map(user => user.name).join(", ") || "None"}
//             </span>
//             <div>
//                 <button
//                     onClick={() => setDropdownOpen((prev) => !prev)}
//                     className="w-full p-2 border rounded bg-gray-100 text-left"
//                 >
//                     {selectedUsers.length > 0 ? "Select more users" : "Select Users"}
//                 </button>
//                 {dropdownOpen && (
//                     <ul className="absolute z-10 mt-1 w-full border border-gray-300 bg-white rounded shadow-lg max-h-60 overflow-auto">
//                         {users.map((user) => (
//                             <li key={user.id}>
//                                 <button
//                                     type="button"
//                                     onClick={() => toggleUserSelection(user)}
//                                     className={`w-full text-left p-2 hover:bg-blue-500 hover:text-white ${selectedUsers.includes(user) ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
//                                 >
//                                     {user.name}
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default UserList;





// import { Listbox, Transition } from "@headlessui/react";
// import { Fragment, useEffect, useState } from "react";
// import { BsChevronExpand } from "react-icons/bs";
// import { summary } from "../../assets/data";
// import clsx from "clsx";
// import { getInitials } from "../../utils";
// import { MdCheck } from "react-icons/md";
// import { getUsers } from "../../Api/user";

// interface User {
//     _id: string;
//     name: string;
// }

// interface UserListProps {
//     setTeam: (team: string[]) => void;
//     team: User[];
// }

// const UserList: React.FC<UserListProps> = ({ setTeam, team }) => {
//     const [data, setData] = useState<User[]>([]);
//     const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
//         const fetchUsers = async () => {
//             try {
//                 const response = await getUsers()
//                 console.log(response?.data)
//                 setData(response?.data?.users);
//             } catch (error) {
//                 console.error("Error fetching users:", error);
//             }
//         };
//     useEffect(() => {
//             fetchUsers();
//         }, []);
//     const handleChange = (el: User[]) => {
//         setSelectedUsers(el);
//         setTeam(el.map((u) => u._id));
//     };

//     useEffect(() => {
//         if (team?.length < 1) {
//             data && setSelectedUsers([data[0]]);
//         } else {
//             setSelectedUsers(team);
//         }
//     }, [team, data]);

//     return (
//         <div>
//             <p className="text-gray-700">Assign Task To: </p>
//             <Listbox value={selectedUsers} onChange={handleChange} multiple>
//                 <div className="relative mt-1">
//                     <Listbox.Button className="relative w-full cursor-default rounded bg-white pl-3 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-gray-300 sm:text-sm">
//                         <span className="block truncate">
//                             {selectedUsers?.map((user) => user?.name).join(", ")||"selected users"}
//                         </span>
//                         <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
//                             <BsChevronExpand className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                         </span>
//                     </Listbox.Button>

//                     <Transition
//                         as={Fragment}
//                         leave="transition ease-in duration-100"
//                         leaveFrom="opacity-100"
//                         leaveTo="opacity-0"
//                     >
//                         <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
//                             {data?.map((user, index) => (
//                                 <Listbox.Option
//                                     key={index}
//                                     className={({ active }) =>
//                                         `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"
//                                         }`
//                                     }
//                                     value={user}
//                                 >
//                                     {({ selected }) => (
//                                         <>
//                                             <div
//                                                 className={clsx(
//                                                     "flex items-center gap-2 truncate",
//                                                     selected ? "font-medium" : "font-normal"
//                                                 )}
//                                             >
//                                                 <div className="w-6 h-6 rounded-full text-white flex items-center justify-center bg-violet-600">
//                                                     <span className="text-center text-[10px]">
//                                                         {getInitials(user?.name)}
//                                                     </span>
//                                                 </div>
//                                                 <span>{user.name}</span>
//                                             </div>
//                                             {selected ? (
//                                                 <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
//                                                     <MdCheck className="h-5 w-5" aria-hidden="true" />
//                                                 </span>
//                                             ) : null}
//                                         </>
//                                     )}
//                                 </Listbox.Option>
//                             ))}
//                         </Listbox.Options>
//                     </Transition>
//                 </div>
//             </Listbox>
//         </div>
//     );
// };

// export default UserList;


// import { Listbox, Transition } from "@headlessui/react";
// import { Fragment, useEffect, useState } from "react";
// import { BsChevronExpand } from "react-icons/bs";
// import { MdCheck } from "react-icons/md";
// import axios from "axios"; 
// import { getInitials } from "../../utils";
// import { getUsers } from "../../Api/user";

// interface User {
//     _id: string;
//     name: string;
// }

// interface UserListProps {
//     setTeam: (team: string[]) => void;
//     team: User[];
// }

// const UserList: React.FC<UserListProps> = ({ setTeam, team }) => {
//     const [data, setData] = useState<User[]>([]); 
//     const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

//     const fetchUsers = async () => {
//         try {
//             const response = await getUsers() 
//             console.log(response?.data)
//             setData(response?.data?.users); 
//         } catch (error) {
//             console.error("Error fetching users:", error);
//         }
//     };


//     const handleChange = (el: User[]) => {
//         setSelectedUsers(el);
//         setTeam(el.map((u) => u._id));
//     };

//     useEffect(() => {
//         fetchUsers(); 
//     }, []);

//     useEffect(() => {
//         if (team?.length < 1 && data.length > 0) {
//             setSelectedUsers([data[0]]); 
//         } else {
//             setSelectedUsers(team); 
//         }
//     }, [team, data]);

//     return (
//         <div>
//             <p className="text-gray-700">Assign Task To: </p>
//             <Listbox value={selectedUsers} onChange={handleChange} multiple>
//                 <div className="relative mt-1">
//                     <Listbox.Button className="relative w-full cursor-default rounded bg-white pl-3 pr-10 text-left px-3 py-2.5 border border-gray-300 sm:text-sm">
//                         <span className="block truncate">
//                             {selectedUsers?.map((user) => user.name).join(", ") || "Select users"}
//                         </span>
//                         <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
//                             <BsChevronExpand className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                         </span>
//                     </Listbox.Button>

//                     <Transition
//                         as={Fragment}
//                         leave="transition ease-in duration-100"
//                         leaveFrom="opacity-100"
//                         leaveTo="opacity-0"
//                     >
//                         <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
//                             {data?.map((user, index) => (
//                                 <Listbox.Option
//                                     key={user._id} // Use user._id as the key
//                                     className={({ active }) =>
//                                         `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"}`
//                                     }
//                                     value={user}
//                                 >
//                                     {({ selected }) => (
//                                         <>
//                                             <div className={`flex items-center gap-2 truncate ${selected ? "font-medium" : "font-normal"}`}>
//                                                 <div className="w-6 h-6 rounded-full text-white flex items-center justify-center bg-violet-600">
//                                                     <span className="text-center text-[10px]">
//                                                         {getInitials(user.name)}
//                                                     </span>
//                                                 </div>
//                                                 <span>{user.name}</span>
//                                             </div>
//                                             {selected ? (
//                                                 <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
//                                                     <MdCheck className="h-5 w-5" aria-hidden="true" />
//                                                 </span>
//                                             ) : null}
//                                         </>
//                                     )}
//                                 </Listbox.Option>
//                             ))}
//                         </Listbox.Options>
//                     </Transition>
//                 </div>
//             </Listbox>
//         </div>
//     );
// };

// export default UserList;
// import { Listbox, Transition } from "@headlessui/react";
// import { Fragment, useEffect, useState } from "react";
// import { BsChevronExpand } from "react-icons/bs";
// import clsx from "clsx";
// import { MdCheck } from "react-icons/md";
// import { getInitials } from "../../utils";
// import { getUsers } from "../../Api/user";

// interface User {
//     _id: string;
//     name: string;
// }

// interface UserListProps {
//     setTeam: (team: string[]) => void; 
//     team: User[]
// }

// const UserList: React.FC<UserListProps> = ({ setTeam, team }) => {


//         const [data, setData] = useState<User[]>([]);
//         const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

//         const fetchUsers = async () => {
//             try {
//                 const response = await getUsers()
//                 console.log(response?.data)
//                 setData(response?.data?.users);
//             } catch (error) {
//                 console.error("Error fetching users:", error);
//             }
//         };

//         useEffect(() => {
//             fetchUsers();
//         }, []);

//     const handleChange = (selected: User[]) => {
//         setSelectedUsers(selected);
//         setTeam(selected?.map((u) => u?._id)); 
//     };

//     useEffect(() => {
//         if (team?.length < 1 && data) {
//             setSelectedUsers([data[0]]);
//         } else {
//             setSelectedUsers(team); 
//         }
//     }, [team, data]);

//     return (
//         <div>
//             <p className="text-gray-700">Assign Task To: </p>
//             <Listbox value={selectedUsers} onChange={handleChange} multiple>
//                 <div className="relative mt-1">
//                     <Listbox.Button className="relative w-full cursor-default rounded bg-white pl-3 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-gray-300 sm:text-sm">
//                         <span className="block truncate">
//                             {selectedUsers?.map((user) => user?.name).join(", ")}
//                         </span>
//                         <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
//                             <BsChevronExpand className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                         </span>
//                     </Listbox.Button>

//                     <Transition
//                         as={Fragment}
//                         leave="transition ease-in duration-100"
//                         leaveFrom="opacity-100"
//                         leaveTo="opacity-0"
//                     >
//                         <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
//                             {data?.map((user, index) => (
//                                 <Listbox.Option
//                                     key={index}
//                                     className={({ active }) =>
//                                         `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"
//                                         }`
//                                     }
//                                     value={user}
//                                 >
//                                     {({ selected }) => (
//                                         <>
//                                             <div
//                                                 className={clsx(
//                                                     "flex items-center gap-2 truncate",
//                                                     selected ? "font-medium" : "font-normal"
//                                                 )}
//                                             >
//                                                 <div className="w-6 h-6 rounded-full text-white flex items-center justify-center bg-violet-600">
//                                                     <span className="text-center text-[10px]">
//                                                         {getInitials(user.name)}
//                                                     </span>
//                                                 </div>
//                                                 <span>{user?.name}</span>
//                                             </div>
//                                             {selected && (
//                                                 <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
//                                                     <MdCheck className="h-5 w-5" aria-hidden="true" />
//                                                 </span>
//                                             )}
//                                         </>
//                                     )}
//                                 </Listbox.Option>
//                             ))}
//                         </Listbox.Options>
//                     </Transition>
//                 </div>
//             </Listbox>
//         </div>
//     );
// };

// export default UserList;

import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { BsChevronExpand } from "react-icons/bs";
import clsx from "clsx";
import { MdCheck } from "react-icons/md";
import { getInitials } from "../../utils";
import { getUsers } from "../../Api/user";

interface User {
    _id: string;
    name: string;
}

interface UserListProps {
    setTeam: (team: string[]) => void;
    team: any
}

const UserList: React.FC<UserListProps> = ({ setTeam, team }) => {
    const [data, setData] = useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            console.log(response?.data);
            setData(response?.data?.users || []);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChange = (selected: User[]) => {
        setSelectedUsers(selected);
        setTeam(selected.map((u) => u?._id)); // Update the team with selected user IDs
    };

    useEffect(() => {
        if (team.length > 0) {
            const teamUsers = data.filter(user => team.includes(user?._id));
            setSelectedUsers(teamUsers);
        } else if (data.length > 0) {
            setSelectedUsers([data[0]]); // Select the first user by default if no team is set
            setTeam([data[0]?._id]); // Ensure the team state is set with the first user's ID
        }
    }, [team, data]);

    return (
        <div>
            <p className="text-gray-700">Assign Task To:</p>
            <Listbox value={selectedUsers} onChange={handleChange} multiple>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded bg-white pl-3 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-gray-300 sm:text-sm">
                        <span className="block truncate">
                            {selectedUsers.map((user) => user.name).join(", ") || "Select Users"}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <BsChevronExpand className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                    </Listbox.Button>

                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {data.map((user) => (
                                <Listbox.Option
                                    key={user._id}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"}`
                                    }
                                    value={user}
                                >
                                    {({ selected }) => (
                                        <>
                                            <div
                                                className={clsx(
                                                    "flex items-center gap-2 truncate",
                                                    selected ? "font-medium" : "font-normal"
                                                )}
                                            >
                                                <div className="w-6 h-6 rounded-full text-white flex items-center justify-center bg-violet-600">
                                                    <span className="text-center text-[10px]">
                                                        {getInitials(user?.name)}
                                                    </span>
                                                </div>
                                                <span>{user?.name}</span>
                                            </div>
                                            {selected && (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    <MdCheck className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            )}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
};

export default UserList;


