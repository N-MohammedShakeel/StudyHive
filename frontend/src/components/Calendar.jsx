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
  startOfWeek,
  endOfWeek,
  addWeeks,
  subWeeks,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";

const Calendar = ({ events, onEventClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month");

  const getDays = () => {
    if (viewMode === "month") {
      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(currentDate);
      return eachDayOfInterval({ start: monthStart, end: monthEnd });
    } else {
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
      const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
      return eachDayOfInterval({ start: weekStart, end: weekEnd });
    }
  };

  const days = getDays();

  const getEventsForDay = (date) => {
    return (events || []).filter((event) => {
      try {
        const eventDate = new Date(event.dueDate);
        return (
          eventDate.getDate() === date.getDate() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getFullYear() === date.getFullYear()
        );
      } catch {
        return false;
      }
    });
  };

  const getEventStyle = (event) => {
    const statusStyles = {
      not_started:
        "border-l-4 border-[var(--error)] bg-[var(--error5)] text-[var(--error-text)]",
      in_progress:
        "border-l-4 border-[var(--warning)] bg-[var(--warning5)] text-[var(--warning-text)]",
      completed:
        "border-l-4 border-[var(--success)] bg-[var(--success5)] text-[var(--success-text)]",
    };
    return statusStyles[event.status] || "bg-[var(--text5)] text-[var(--text)]";
  };

  const handlePrev = () => {
    setCurrentDate(
      viewMode === "month"
        ? subMonths(currentDate, 1)
        : subWeeks(currentDate, 1)
    );
  };

  const handleNext = () => {
    setCurrentDate(
      viewMode === "month"
        ? addMonths(currentDate, 1)
        : addWeeks(currentDate, 1)
    );
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "month" ? "week" : "month");
  };

  return (
    <div className="bg-[var(--bg)] rounded-lg border border-[var(--text20)]">
      <div className="p-4 border-b border-[var(--text20)] flex justify-between items-center">
        <button
          onClick={handlePrev}
          className="p-2 text-[var(--text60)] hover:text-[var(--primary)]"
          aria-label="Previous period"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <button
            onClick={toggleViewMode}
            className="px-3 py-1 text-sm bg-[var(--primary5)] text-[var(--primary)] rounded-md hover:bg-[var(--primary20)]"
          >
            {viewMode === "month" ? "Week View" : "Month View"}
          </button>
        </div>
        <button
          onClick={handleNext}
          className="p-2 text-[var(--text60)] hover:text-[var(--primary)]"
          aria-label="Next period"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-px bg-[var(--text20)]">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="bg-[var(--text5)] p-2 text-center text-sm font-medium text-[var(--text60)]"
          >
            {day}
          </div>
        ))}
        {days.map((day) => {
          const dayEvents = getEventsForDay(day);
          return (
            <div
              key={day.toString()}
              className={`bg-[var(--bg)] p-2 min-h-[100px] ${
                viewMode === "month" && !isSameMonth(day, currentDate)
                  ? "text-[var(--text60)]"
                  : isToday(day)
                  ? "bg-[var(--primary5)]"
                  : ""
              }`}
            >
              <span
                className={`text-sm ${
                  isToday(day) ? "font-bold text-[var(--primary)]" : ""
                }`}
              >
                {format(day, "d")}
              </span>
              <div className="mt-1 space-y-1">
                {dayEvents.map((event) => (
                  <button
                    key={event._id}
                    onClick={() => onEventClick(event)}
                    className={`w-full text-left text-xs p-1 rounded truncate ${getEventStyle(
                      event
                    )}`}
                    aria-label={`${event.name}, status: ${
                      event.status || "unknown"
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
