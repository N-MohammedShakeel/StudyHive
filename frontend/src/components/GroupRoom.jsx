import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Users, Settings, Bot } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
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
        toast.error("Failed to load group", error);
        navigate("/groups");
      } finally {
        setLoading(false);
      }
    };
    loadGroupAndMembers();
  }, [id, navigate]);

  const handleRemoveMember = async (memberId) => {
    try {
      const updatedGroup = await removeMember(group.groupId, memberId);
      setGroup(updatedGroup);
      setMembers(members.filter((m) => m.userId?._id !== memberId));
      toast.success("Member removed successfully");
    } catch (error) {
      toast.error(error.message || "Failed to remove member");
    }
  };

  const handleBlockMember = async (memberId) => {
    try {
      const updatedGroup = await blockMember(group.groupId, memberId);
      setGroup(updatedGroup);
      setMembers(members.filter((m) => m.userId?._id !== memberId));
      toast.success("Member blocked successfully");
    } catch (error) {
      toast.error(error.message || "Failed to block member");
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
      toast.success("Member role updated successfully");
    } catch (error) {
      toast.error(error.message || "Failed to update role");
    }
  };

  if (loading)
    return (
      <div className="text-center py-12 text-[var(--text)]">Loading...</div>
    );

  return (
    <div className="flex min-h-screen bg-[var(--bg)]">
      <Toaster position="top-right" />
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex-1 lg:pl-64 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[var(--bg)] rounded-xl border border-[var(--text20)] p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)]">
                  {group?.name || "Study Group"}
                </h1>
                <p className="text-[var(--text60)] text-sm sm:text-base">
                  Group ID: {group?.groupId || id}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowMembers(true)}
                  className="flex items-center px-4 py-2 bg-[var(--primary)] text-[var(--primarycontrast)] rounded-lg active:bg-[var(--primary85)] transition-colors"
                  aria-label="View group members"
                >
                  <Users className="h-5 w-5 mr-2" />
                  View Members
                </button>
                {isHost && (
                  <button
                    onClick={() => navigate("/groups")}
                    className="flex items-center px-4 py-2 bg-[var(--text60)] text-[var(--primarycontrast)] rounded-lg active:bg-[var(--text70)] transition-colors"
                    aria-label="Group settings"
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
            <div
              className="fixed inset-0 bg-[var(--text20)] flex items-center justify-center z-50"
              style={{
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            >
              <div className="bg-[var(--bg)] rounded-lg w-full max-w-md p-6 border border-[var(--text20)]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-[var(--text)]">
                    Group Members
                  </h3>
                  <button
                    onClick={() => setShowMembers(false)}
                    className="text-3xl text-[var(--text60)] hover:text-[var(--text)]"
                    aria-label="Close members list"
                  >
                    ×
                  </button>
                </div>
                <div className="space-y-4">
                  {members.map((member) => {
                    if (!member.userId) {
                      return null;
                    }
                    const displayName =
                      member.userId?.name || member.username || "Unknown";
                    return (
                      <div
                        key={member._id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                              displayName
                            )}`}
                            alt={displayName}
                            className="h-10 w-10 rounded-full"
                          />
                          <div>
                            <span className="text-[var(--text)]">
                              {displayName}
                            </span>
                            <p className="text-sm text-[var(--text60)] capitalize">
                              {member.role}
                            </p>
                          </div>
                        </div>
                        {group.host === currentUser.id &&
                          member.userId._id !== currentUser.id && (
                            <div className="flex space-x-2">
                              <select
                                value={member.role}
                                onChange={(e) =>
                                  handleRoleChange(
                                    member.userId._id,
                                    e.target.value
                                  )
                                }
                                className="text-sm border-[var(--text20)] rounded-md focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                                aria-label={`Change role for ${displayName}`}
                              >
                                <option value="moderator">Moderator</option>
                                <option value="member">Member</option>
                              </select>
                              <button
                                onClick={() =>
                                  handleRemoveMember(member.userId._id)
                                }
                                className="text-sm text-[var(--warning)] hover:text-[var(--warning-text)]"
                                aria-label={`Remove ${displayName}`}
                              >
                                Remove
                              </button>
                              <button
                                onClick={() =>
                                  handleBlockMember(member.userId._id)
                                }
                                className="text-sm text-[var(--error)] hover:text-[var(--error-text)]"
                                aria-label={`Block ${displayName}`}
                              >
                                Block
                              </button>
                            </div>
                          )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={() => setIsAIModalOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-[var(--primary)] text-[var(--primarycontrast)] p-4 rounded-full active:bg-[var(--primary85)] transition-colors z-40"
          aria-label="Open AI assistant"
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
