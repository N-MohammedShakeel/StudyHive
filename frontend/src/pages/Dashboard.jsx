import React, { useState, useEffect } from "react";
import { format, isToday, isThisWeek } from "date-fns";
import { Plus, Calendar as CalendarIcon, Bot } from "lucide-react";
import {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../api/eventApi";
import Calendar from "../components/Calendar";
import EventAddPopup from "../components/EventAppPopup";
import EventDetailsModal from "../components/EventDetailsModal";
import Sidebar from "../components/Common/Sidebar";
import AIModal from "../components/AIModal";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const fetchedEvents = await fetchEvents();
        setEvents(fetchedEvents || []);
      } catch (error) {
        toast.error("Sign in again " + error);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const handleCreateEvent = async (eventData) => {
    try {
      const createdEvent = await createEvent(eventData);
      setEvents([...events, createdEvent]);
      setIsAddModalOpen(false);
      toast.success("Event created successfully");
    } catch (error) {
      toast.error(error.message || "Failed to create event");
    }
  };

  const handleUpdateEvent = async (id, eventData) => {
    try {
      const updatedEvent = await updateEvent(id, eventData);
      setEvents(events.map((e) => (e._id === id ? updatedEvent : e)));
      setIsDetailsModalOpen(false);
      toast.success("Event updated successfully");
    } catch (error) {
      toast.error(error.message || "Failed to update event");
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent(id);
      setEvents(events.filter((e) => e._id !== id));
      setIsDetailsModalOpen(false);
      toast.success("Event deleted successfully");
    } catch (error) {
      toast.error(error.message || "Failed to delete event");
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "not_started":
        return "border-l-4 border-[var(--error)] bg-[var(--error5)] text-[var(--error-text)]";
      case "in_progress":
        return "border-l-4 border-[var(--warning)] bg-[var(--warning5)] text-[var(--warning-text)]";
      case "completed":
        return "border-l-4 border-[var(--success)] bg-[var(--success5)] text-[var(--success-text)]";
      default:
        return "bg-[var(--text5)] text-[var(--text)]";
    }
  };

  const getTypeStyle = (type) => {
    switch (type) {
      case "exam":
        return "bg-[var(--error5)] text-[var(--error-text)]";
      case "homework":
        return "bg-[var(--primary5)] text-[var(--primary)]";
      default:
        return "bg-[var(--success5)] text-[var(--success-text)]";
    }
  };

  const todayEvents = events.filter((event) => {
    try {
      return isToday(new Date(event.dueDate));
    } catch {
      return false;
    }
  });
  const weekEvents = events.filter((event) => {
    try {
      return isThisWeek(new Date(event.dueDate));
    } catch {
      return false;
    }
  });

  return (
    <div className="flex min-h-screen bg-[var(--bg)]">
      <Toaster position="top-right" />
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex-1 lg:pl-64 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-1 space-y-6">
              <div className="bg-[var(--bg)] rounded-xl border border-[var(--text20)] p-6 transition-all">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-[var(--text)]">
                    Events
                  </h2>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="p-2 text-[var(--primary)] hover:bg-[var(--primary5)] rounded-full transition-colors"
                    aria-label="Add new event"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-[var(--text60)] mb-3">
                      Today
                    </h3>
                    {loading ? (
                      <div className="animate-pulse space-y-3">
                        {[1, 2].map((i) => (
                          <div
                            key={i}
                            className="h-16 bg-[var(--text20)] rounded-lg"
                          ></div>
                        ))}
                      </div>
                    ) : todayEvents.length > 0 ? (
                      <div className="space-y-3">
                        {todayEvents.map((event) => (
                          <div
                            key={event._id}
                            className={`p-4 rounded-lg cursor-pointer hover:bg-opacity-80 transition-colors ${getStatusStyle(
                              event.status
                            )}`}
                            onClick={() => handleEventClick(event)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleEventClick(event)
                            }
                            aria-label={`View details for ${event.name}`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{event.name}</h4>
                                <p className="text-sm">
                                  {event.dueTime ||
                                    format(new Date(event.dueDate), "h:mm a")}
                                </p>
                              </div>
                              <div className="flex flex-col items-end space-y-1">
                                <span
                                  className={`text-xs px-2 py-1 rounded ${getTypeStyle(
                                    event.type
                                  )}`}
                                >
                                  {event.type}
                                </span>
                                <span
                                  className={`text-xs px-2 py-1 rounded capitalize ${getStatusStyle(
                                    event.status
                                  )}`}
                                >
                                  {event.status?.replace("_", " ")}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-[var(--text60)]">
                        No events today
                      </p>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[var(--text60)] mb-3">
                      This Week
                    </h3>
                    {loading ? (
                      <div className="animate-pulse space-y-3">
                        {[1, 2].map((i) => (
                          <div
                            key={i}
                            className="h-16 bg-[var(--text20)] rounded-lg"
                          ></div>
                        ))}
                      </div>
                    ) : weekEvents.length > 0 ? (
                      <div className="space-y-3">
                        {weekEvents.map((event) => (
                          <div
                            key={event._id}
                            className={`p-4 rounded-lg cursor-pointer hover:bg-opacity-80 transition-colors ${getStatusStyle(
                              event.status
                            )}`}
                            onClick={() => handleEventClick(event)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleEventClick(event)
                            }
                            aria-label={`View details for ${event.name}`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{event.name}</h4>
                                <p className="text-sm">
                                  {format(new Date(event.dueDate), "E, MMM d")}
                                </p>
                              </div>
                              <div className="flex flex-col items-end space-y-1">
                                <span
                                  className={`text-xs px-2 py-1 rounded ${getTypeStyle(
                                    event.type
                                  )}`}
                                >
                                  {event.type}
                                </span>
                                <span
                                  className={`text-xs px-2 py-1 rounded capitalize ${getStatusStyle(
                                    event.status
                                  )}`}
                                >
                                  {event.status?.replace("_", " ")}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-[var(--text60)]">
                        No events this week
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[var(--bg)] rounded-xl border border-[var(--text20)] p-6 transition-all">
                <div className="flex items-center space-x-4 mb-6">
                  <CalendarIcon className="h-8 w-8 text-[var(--primary)]" />
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)]">
                      Welcome back, {user?.name || "User"}!
                    </h1>
                    <p className="text-[var(--text60)] text-sm sm:text-base">
                      {format(new Date(), "EEEE, MMMM d, yyyy")}
                    </p>
                  </div>
                </div>
                {loading ? (
                  <div className="animate-pulse h-96 bg-[var(--text20)] rounded-lg"></div>
                ) : (
                  <Calendar events={events} onEventClick={handleEventClick} />
                )}
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsAIModalOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-[var(--primary)] text-[var(--primarycontrast)] p-4 rounded-full active:bg-[var(--primary85)] transition-colors z-40"
          aria-label="Open AI assistant"
        >
          <Bot className="h-6 w-6" />
        </button>
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
      <AIModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        userInterests={user.interests || []}
      />
    </div>
  );
};

export default Dashboard;
