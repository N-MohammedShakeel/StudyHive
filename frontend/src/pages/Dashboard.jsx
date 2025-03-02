// frontend/src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { format, isToday, isThisWeek } from "date-fns";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../api/eventApi";
import Calendar from "../components/Calender.jsx";
import EventAddPopup from "../components/EventAppPopup.jsx";
import EventDetailsModal from "../components/EventDetailsModal.jsx";
import Sidebar from "../components/Common/Sidebar.jsx";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const fetchedEvents = await fetchEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const handleCreateEvent = async (eventData) => {
    try {
      const dueDateTime = new Date(`${eventData.dueDate}T${eventData.dueTime}`);
      const newEvent = { ...eventData, dueDate: dueDateTime };
      const createdEvent = await createEvent(newEvent);
      setEvents([...events, createdEvent]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  };

  const handleUpdateEvent = async (id, eventData) => {
    try {
      const updatedEvent = await updateEvent(id, eventData);
      setEvents(events.map((e) => (e._id === id ? updatedEvent : e)));
      setIsDetailsModalOpen(false);
    } catch (error) {
      console.error("Failed to update event:", error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent(id);
      setEvents(events.filter((e) => e._id !== id));
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
  };

  const todayEvents = events.filter((event) =>
    isToday(new Date(event.dueDate))
  );
  const weekEvents = events.filter((event) =>
    isThisWeek(new Date(event.dueDate))
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 lg:pl-64">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Events
                  </h2>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">
                      Today
                    </h3>
                    {todayEvents.length > 0 ? (
                      <div className="space-y-2">
                        {todayEvents.map((event) => (
                          <div
                            key={event._id}
                            className="p-3 bg-white border rounded-lg shadow-sm cursor-pointer hover:bg-gray-50"
                            onClick={() => handleEventClick(event)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {event.name}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {format(new Date(event.dueDate), "h:mm a")}
                                </p>
                              </div>
                              <span
                                className={`text-xs px-2 py-1 rounded ${
                                  event.type === "exam"
                                    ? "bg-red-100 text-red-800"
                                    : event.type === "homework"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {event.type}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No events today</p>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">
                      This Week
                    </h3>
                    {weekEvents.length > 0 ? (
                      <div className="space-y-2">
                        {weekEvents.map((event) => (
                          <div
                            key={event._id}
                            className="p-3 bg-white border rounded-lg shadow-sm cursor-pointer hover:bg-gray-50"
                            onClick={() => handleEventClick(event)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {event.name}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {format(new Date(event.dueDate), "E, MMM d")}
                                </p>
                              </div>
                              <span
                                className={`text-xs px-2 py-1 rounded ${
                                  event.type === "exam"
                                    ? "bg-red-100 text-red-800"
                                    : event.type === "homework"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {event.type}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No events this week
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <CalendarIcon className="h-8 w-8 text-indigo-600" />
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Welcome back, {user?.name || "User"}!
                    </h1>
                    <p className="text-gray-600">
                      Today is {format(new Date(), "EEEE, MMMM d, yyyy")}
                    </p>
                  </div>
                </div>

                <Calendar events={events} onEventClick={handleEventClick} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <EventAddPopup
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreateEvent}
      />
      <EventDetailsModal
        isOpen={isDetailsModalOpen}
        event={selectedEvent}
        onClose={() => setIsDetailsModalOpen(false)}
        onUpdate={handleUpdateEvent}
        onDelete={handleDeleteEvent}
      />
    </div>
  );
};

export default Dashboard;
