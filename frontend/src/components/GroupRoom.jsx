// frontend/src/components/GroupRoom.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Users, Video, Upload, MessageSquare } from "lucide-react";
import {
  fetchUserGroups,
  removeMember,
  blockMember,
  getGroupMembers,
} from "../api/groupApi";
import Sidebar from "./Common/Sidebar";

const GroupRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [showMembers, setShowMembers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const loadGroupAndMembers = async () => {
      setLoading(true);
      try {
        const groups = await fetchUserGroups();
        const foundGroup = groups.find((g) => g._id === id);
        if (!foundGroup) throw new Error("Group not found");
        setGroup(foundGroup);

        const memberDetails = await getGroupMembers(id);
        setMembers(memberDetails);
      } catch (error) {
        console.error("Failed to load group or members:", error);
        navigate("/groups");
      } finally {
        setLoading(false);
      }
    };
    loadGroupAndMembers();
  }, [id, navigate]);

  const handleRemoveMember = async (memberId) => {
    if (window.confirm("Remove this member temporarily?")) {
      try {
        const updatedGroup = await removeMember(group.groupId, memberId);
        setGroup(updatedGroup);
        setMembers(members.filter((m) => m._id !== memberId));
      } catch (error) {
        console.error("Failed to remove member:", error);
      }
    }
  };

  const handleBlockMember = async (memberId) => {
    if (window.confirm("Block this member permanently?")) {
      try {
        const updatedGroup = await blockMember(group.groupId, memberId);
        setGroup(updatedGroup);
        setMembers(members.filter((m) => m._id !== memberId));
      } catch (error) {
        console.error("Failed to block member:", error);
      }
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex-1 lg:pl-64">
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {group?.name || "Study Group"}
                </h1>
                <p className="text-gray-600">
                  Group ID: {group?.groupId || id}
                </p>
              </div>
              <button
                onClick={() => setShowMembers(true)}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                <Users className="h-5 w-5 mr-2" />
                View Members
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Video Conference
                  </h2>
                  <button className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    <Video className="h-5 w-5 mr-2" />
                    Join Call
                  </button>
                </div>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Video call will appear here</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Discussion
                  </h2>
                  <button className="text-indigo-600 hover:text-indigo-700">
                    <MessageSquare className="h-5 w-5" />
                  </button>
                </div>
                <div className="h-96 bg-gray-50 rounded-lg p-4 overflow-y-auto">
                  <p className="text-gray-500 text-center">No messages yet</p>
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Resources
                  </h2>
                  <button className="text-indigo-600 hover:text-indigo-700">
                    <Upload className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-500">No resources shared yet</p>
                </div>
              </div>
            </div>
          </div>

          {showMembers && group && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Group Members
                  </h3>
                  <button
                    onClick={() => setShowMembers(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
                <div className="space-y-4">
                  {members.map((member) => (
                    <div
                      key={member._id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            member.name
                          )}`}
                          alt={member.name}
                          className="h-10 w-10 rounded-full"
                        />
                        <span className="text-gray-900">{member.name}</span>
                      </div>
                      {group.host === currentUser.id &&
                        member._id !== currentUser.id && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleRemoveMember(member._id)}
                              className="text-sm text-orange-600 hover:text-orange-700"
                            >
                              Remove
                            </button>
                            <button
                              onClick={() => handleBlockMember(member._id)}
                              className="text-sm text-red-600 hover:text-red-700"
                            >
                              Block
                            </button>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupRoom;
