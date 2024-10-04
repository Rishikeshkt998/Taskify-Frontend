/* eslint-disable @typescript-eslint/no-unused-vars */


import React, { useState } from "react";
import { Calendar, momentLocalizer, SlotInfo } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import AddTask from "../components/task/AddTask";
// import AddMyTaskForCalender from "../components/task/AddTaskForCalender";
import AddTaskForMyCalender from "../components/task/AddTaskForCalender";

const localizer = momentLocalizer(moment);

interface Event {
    id: number;
    title: string;
    start: Date;
    end: Date;
    managerid?: string | null;
    priority?: string;
    stage?: string;
    date?: string;
}

const MyCalendar: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]); 
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 
    const [isEditMode, setIsEditMode] = useState<boolean>(false); 
    const [selectedDate, setSelectedDate] = useState<string>(""); 
    const handleSelectSlot = (slotInfo: SlotInfo) => {
        setSelectedEvent(null);
        setIsEditMode(false);

        const selectedStartDate = moment(slotInfo.start).format("YYYY-MM-DD");
        setSelectedDate(selectedStartDate); // Set the date to pre-fill the form

        setIsModalOpen(true); // Open the modal
    };

    // Open modal for editing an existing event
    const handleSelectEvent = (event: Event) => {
        setSelectedEvent(event); // Pass the selected event to the form
        setIsEditMode(true); // Set to edit mode

        // Pre-fill the date from the selected event if editing
        const eventDate = moment(event.start).format("YYYY-MM-DD");
        setSelectedDate(eventDate);

        setIsModalOpen(true); // Open the modal
    };

    // Handle form submission (add or update event)
    // const handleTaskSubmit = (data: Event) => {
    //     // if (isEditMode && selectedEvent) {
    //     //     // Update the event
    //     //     setEvents(
    //     //         events.map((e) => (e.id === selectedEvent.id ? { ...e, ...data } : e))
    //     //     );
    //     // } else {
    //     //     // Add a new event
    //     //     const newEvent = { ...data, id: events.length + 1 };
    //     //     setEvents([...events, newEvent]);
    //     // }
    //     setIsModalOpen(false); // Close the modal after submission
    // };

    // Handle deleting an event
    const handleDeleteEvent = (event: Event) => {
        if (window.confirm("Do you want to delete this event?")) {
            setEvents(events.filter((e) => e.id !== event.id));
        }
    };

    return (
        <div>
            <h2 className="text-center font-bold text-2xl mb-4">Task Calendar</h2>
            <div style={{ height: "500px" }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: "100%" }}
                    selectable
                    onSelectSlot={handleSelectSlot} 
                    onSelectEvent={(event) => handleSelectEvent(event as Event)} 
                    onDoubleClickEvent={(event) => handleDeleteEvent(event as Event)} 
                />
            </div>
            {isModalOpen && (
                <AddTaskForMyCalender
                    open={isModalOpen}
                    setOpen={setIsModalOpen}
                    // task={isEditMode ? selectedEvent : undefined} 
                    task={isEditMode ? selectedEvent || undefined : undefined}
                    date={selectedDate} 
                    
                    
                />
            )}
        </div>
    );
};

export default MyCalendar;






