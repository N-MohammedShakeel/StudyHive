import React, { useState, useEffect } from "react";
import { Calendar, Plus, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import {
  getMeetings,
  createMeeting,
  updateMeeting,
  deleteMeeting,
} from "../api/meetingApi";

const MeetingTime = ({ groupId, isHost }) => {
  const [meetings, setMeetings] = useState([]);
  const [newMeetingDate, setNewMeetingDate] = useState("");
  const [newMeetingTime, setNewMeetingTime] = useState("");
  const [editingMeeting, setEditingMeeting] = useState(null);

  useEffect(() => {
    const loadMeetings = async () => {
      try {
        const fetchedMeetings = await getMeetings(groupId);
        setMeetings(fetchedMeetings);
      } catch (error) {
        console.error(error);
      }
    };
    loadMeetings();
  }, [groupId]);

  const handleAddMeeting = async () => {
    if (!newMeetingDate || !newMeetingTime) return;
    try {
      const dateTime = new Date(`${newMeetingDate}T${newMeetingTime}`);
      const meeting = await createMeeting(groupId, dateTime);
      setMeetings([...meetings, meeting]);
      setNewMeetingDate("");
      setNewMeetingTime("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditMeeting = async (meetingId) => {
    if (!newMeetingDate || !newMeetingTime) return;
    try {
      const dateTime = new Date(`${newMeetingDate}T${newMeetingTime}`);
      const updatedMeeting = await updateMeeting(meetingId, dateTime);
      setMeetings(
        meetings.map((m) => (m._id === meetingId ? updatedMeeting : m))
      );
      setEditingMeeting(null);
      setNewMeetingDate("");
      setNewMeetingTime("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteMeeting = async (meetingId) => {
    try {
      await deleteMeeting(meetingId);
      setMeetings(meetings.filter((m) => m._id !== meetingId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-[var(--bg)] rounded-lg border border-[var(--text20)] p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[var(--text)]">
          Meeting Time
        </h2>
        <Calendar className="h-5 w-5 text-[var(--primary)]" />
      </div>
      <div className="space-y-2">
        {meetings.length > 0 ? (
          meetings.map((meeting) => (
            <div
              key={meeting._id}
              className="flex items-center justify-between p-2 bg-[var(--text5)] rounded-md"
            >
              <span className="text-sm text-[var(--text)]">
                {format(new Date(meeting.dateTime), "MMMM d, yyyy h:mm a")}
              </span>
              {isHost && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingMeeting(meeting._id);
                      setNewMeetingDate(
                        format(new Date(meeting.dateTime), "yyyy-MM-dd")
                      );
                      setNewMeetingTime(
                        format(new Date(meeting.dateTime), "HH:mm")
                      );
                    }}
                    className="text-[var(--primary)] hover:text-[var(--primary85)]"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteMeeting(meeting._id)}
                    className="text-[var(--error)] hover:text-[var(--error-text)]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-[var(--text60)]">No meetings scheduled</p>
        )}
      </div>
      {isHost && (
        <div className="mt-4 space-y-2">
          <div className="flex space-x-2">
            <input
              type="date"
              value={newMeetingDate}
              onChange={(e) => setNewMeetingDate(e.target.value)}
              className="m-1 p-1 rounded-md border-[var(--text20)] focus:ring-[var(--primary)] focus:border-[var(--primary)]"
            />
            <input
              type="time"
              value={newMeetingTime}
              onChange={(e) => setNewMeetingTime(e.target.value)}
              className="m-1 p-1 rounded-md border-[var(--text20)] focus:ring-[var(--primary)] focus:border-[var(--primary)]"
            />
          </div>
          <button
            onClick={
              editingMeeting
                ? () => handleEditMeeting(editingMeeting)
                : handleAddMeeting
            }
            className="flex items-center px-4 py-2 bg-[var(--primary)] text-[var(--primarycontrast)] rounded-md active:bg-[var(--primary85)] transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            {editingMeeting ? "Update Meeting" : "Add Meeting"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MeetingTime;
