// frontend/src/components/Calendar.jsx
import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Calendar = ({ events, onEventClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDay = (date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.dueDate);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <button
          onClick={handlePrevMonth}
          className="p-2 text-gray-600 hover:text-indigo-600"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-2 text-gray-600 hover:text-indigo-600"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
        {days.map((day) => {
          const dayEvents = getEventsForDay(day);
          return (
            <div
              key={day.toString()}
              className={`bg-white p-2 min-h-[100px] ${
                !isSameMonth(day, currentMonth)
                  ? "text-gray-400"
                  : isToday(day)
                  ? "bg-indigo-50"
                  : ""
              }`}
            >
              <span
                className={`text-sm ${
                  isToday(day) ? "font-bold text-indigo-600" : ""
                }`}
              >
                {format(day, "d")}
              </span>
              <div className="mt-1 space-y-1">
                {dayEvents.map((event) => (
                  <button
                    key={event._id}
                    onClick={() => onEventClick(event)}
                    className={`w-full text-left text-xs p-1 rounded truncate ${
                      event.type === "exam"
                        ? "bg-red-100 text-red-800"
                        : event.type === "homework"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {event.name}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
