// frontend/src/components/GroupRoom.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Users, Settings, Bot } from "lucide-react";
import {
  fetchUserGroups,
  removeMember,
  blockMember,
  updateMemberRole,
  getGroupMembers,
} from "../api/groupApi";
import Sidebar from "./Common/Sidebar";
import ChatBox from "./ChatBox";
import VideoConference from "./VideoConference";
import StudyResources from "./StudyResources";
import MeetingTime from "./MeetingTime";
import AIModal from "./AIModal";

const GroupRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [showMembers, setShowMembers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isHost = group?.host === currentUser.id;

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
        setMembers(members.filter((m) => m.userId._id !== memberId));
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
        setMembers(members.filter((m) => m.userId._id !== memberId));
      } catch (error) {
        console.error("Failed to block member:", error);
      }
    }
  };

  const handleRoleChange = async (memberId, role) => {
    try {
      const updatedGroup = await updateMemberRole(
        group.groupId,
        memberId,
        role
      );
      setGroup(updatedGroup);
      setMembers(updatedGroup.members);
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex-1 lg:pl-64 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {group?.name || "Study Group"}
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  Group ID: {group?.groupId || id}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowMembers(true)}
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                >
                  <Users className="h-5 w-5 mr-2" />
                  View Members
                </button>
                {isHost && (
                  <button
                    onClick={() => navigate("/groups")}
                    className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md"
                  >
                    <Settings className="h-5 w-5 mr-2" />
                    Settings
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <VideoConference groupId={id} />
              <ChatBox groupId={id} currentUserId={currentUser.id} />
            </div>
            <div className="space-y-6">
              <MeetingTime groupId={id} isHost={isHost} />
              <StudyResources groupId={id} currentUserId={currentUser.id} />
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
                      key={member.userId}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            member.username
                          )}`}
                          alt={member.username}
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                          <span className="text-gray-900">
                            {member.username}
                          </span>
                          <p className="text-sm text-gray-500">{member.role}</p>
                        </div>
                      </div>
                      {group.host === currentUser.id &&
                        member.userId !== currentUser.id && (
                          <div className="flex space-x-2">
                            <select
                              value={member.role}
                              onChange={(e) =>
                                handleRoleChange(member.userId, e.target.value)
                              }
                              className="text-sm border-gray-300 rounded-md"
                            >
                              <option value="moderator">Moderator</option>
                              <option value="member">Member</option>
                            </select>
                            <button
                              onClick={() =>
                                handleRemoveMember(member.userId._id)
                              }
                              className="text-sm text-orange-600 hover:text-orange-700"
                            >
                              Remove
                            </button>
                            <button
                              onClick={() =>
                                handleBlockMember(member.userId._id)
                              }
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
        <button
          onClick={() => setIsAIModalOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors z-40"
        >
          <Bot className="h-6 w-6" />
        </button>
      </div>
      <AIModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        userInterests={currentUser.interests || []}
      />
    </div>
  );
};

export default GroupRoom;
