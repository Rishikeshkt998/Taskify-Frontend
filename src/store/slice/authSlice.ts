import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') as string) : null,
    isSidebarOpen: false,
    isAdmin: localStorage.getItem('isAdmin') ? JSON.parse(localStorage.getItem('isAdmin') as string) : false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.userInfo = null
            localStorage.removeItem('userInfo')
        },
        setOpenSidebar: (state, action) => {
            state.isSidebarOpen = action.payload;
        },
        setAdminStatus: (state, action) => {
            state.isAdmin = action.payload;
            localStorage.setItem('isAdmin', JSON.stringify(action.payload)); 
        },
       
    }
})

export const { setCredentials, logout, setOpenSidebar, setAdminStatus } = authSlice.actions;
export default authSlice.reducer