import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Users,
  Lock,
  Globe,
  Edit,
  Trash2,
  Bot,
} from "lucide-react";
import {
  fetchUserGroups,
  fetchPublicGroups,
  createGroup,
  joinGroup,
  editGroup,
  deleteGroup,
} from "../api/groupApi";
import Sidebar from "../components/Common/Sidebar";
import CreateGroupModal from "../components/CreateGroupModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import AIModal from "../components/AIModal";
import toast, { Toaster } from "react-hot-toast";

const StudyGroups = () => {
  const navigate = useNavigate();
  const [userGroups, setUserGroups] = useState([]);
  const [publicGroups, setPublicGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editGroupData, setEditGroupData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [groupIdToJoin, setGroupIdToJoin] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState(null);
  const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const loadGroups = async () => {
      setLoading(true);
      try {
        const [userGroupsData, publicGroupsData] = await Promise.all([
          fetchUserGroups(),
          fetchPublicGroups(),
        ]);
        setUserGroups(userGroupsData);
        setPublicGroups(publicGroupsData);
      } catch (error) {
        toast.error("Failed to load groups", error);
      } finally {
        setLoading(false);
      }
    };
    loadGroups();
  }, []);

  const handleCreateGroup = async (groupData) => {
    try {
      const newGroup = await createGroup(groupData);
      setUserGroups([...userGroups, newGroup]);
      if (groupData.isPublic) setPublicGroups([...publicGroups, newGroup]);
      toast.success("Group created successfully");
    } catch (error) {
      toast.error("Failed to create group", error);
    }
  };

  const handleEditGroup = async (groupData) => {
    try {
      const updatedGroup = await editGroup({
        groupId: editGroupData.groupId,
        ...groupData,
      });
      setUserGroups(
        userGroups.map((g) => (g._id === updatedGroup._id ? updatedGroup : g))
      );
      setPublicGroups(
        publicGroups.map((g) => (g._id === updatedGroup._id ? updatedGroup : g))
      );
      setIsEditModalOpen(false);
      toast.success("Group updated successfully");
    } catch (error) {
      toast.error("Failed to edit group", error);
    }
  };

  const handleDeleteGroup = async () => {
    if (!groupToDelete) return;
    try {
      await deleteGroup(groupToDelete);
      setUserGroups(userGroups.filter((g) => g.groupId !== groupToDelete));
      setPublicGroups(publicGroups.filter((g) => g.groupId !== groupToDelete));
      setIsDeleteModalOpen(false);
      setGroupToDelete(null);
      toast.success("Group deleted successfully");
    } catch (error) {
      toast.error("Failed to delete group", error);
    }
  };

  const openDeleteModal = (groupId) => {
    setGroupToDelete(groupId);
    setIsDeleteModalOpen(true);
  };

  const handleJoinGroup = async (e) => {
    e.preventDefault();
    try {
      const joinedGroup = await joinGroup(groupIdToJoin);
      setUserGroups([...userGroups, joinedGroup]);
      setGroupIdToJoin("");
      toast.success("Joined group successfully");
    } catch (error) {
      toast.error("Failed to join group", error);
    }
  };

  const handleJoinPublicGroup = async (groupId) => {
    try {
      const joinedGroup = await joinGroup(groupId);
      setUserGroups([...userGroups, joinedGroup]);
      toast.success("Joined group successfully");
    } catch (error) {
      toast.error("Failed to join group", error);
    }
  };

  const filteredPublicGroups = publicGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      group.groupId.includes(searchQuery.trim())
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
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 p-5 rounded-xl bg-[var(--bg)] border border-[var(--text20)]">
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)]">
                Study Groups
              </h1>
              <p className="text-[var(--text60)] text-sm sm:text-base">
                Collaborate and learn together
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center px-4 py-2 bg-[var(--primary)] text-[var(--primarycontrast)] rounded-lg active:bg-[var(--primary85)] transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Group
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-[var(--text)]">
                Your Groups
              </h2>
              {loading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-32 bg-[var(--text20)] rounded-lg"
                    ></div>
                  ))}
                </div>
              ) : userGroups.length > 0 ? (
                <div className="space-y-4">
                  {userGroups.map((group) => (
                    <div
                      key={group._id}
                      className="bg-[var(--bg)] rounded-xl border border-[var(--text20)] p-5 transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div
                          className="flex-1 cursor-pointer"
                          onClick={() => navigate(`/group/${group._id}`)}
                        >
                          <h3 className="font-semibold text-[var(--text)] text-lg">
                            {group.name}
                          </h3>
                          <p className="text-sm text-[var(--text60)] mt-1 line-clamp-2">
                            {group.description || "No description"}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[var(--text60)]">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              <span>{group.members.length} members</span>
                            </div>
                            <div className="flex items-center">
                              <Globe className="h-4 w-4 mr-1" />
                              <span>ID: {group.groupId}</span>
                            </div>
                          </div>
                        </div>
                        {group.host === userId && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setEditGroupData(group);
                                setIsEditModalOpen(true);
                              }}
                              className="p-2 text-[var(--primary)] hover:bg-[var(--primary5)] rounded-full transition-colors"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => openDeleteModal(group.groupId)}
                              className="p-2 text-[var(--error)] hover:bg-[var(--error5)] rounded-full transition-colors"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        )}
                        {!group.isPublic && (
                          <Lock className="h-5 w-5 text-[var(--text60)] ml-2" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-[var(--bg)] rounded-xl border border-[var(--text20)]">
                  <Users className="h-12 w-12 text-[var(--text60)] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-[var(--text)] mb-2">
                    No groups yet
                  </h3>
                  <p className="text-[var(--text60)] text-sm">
                    Create or join a group to get started
                  </p>
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-[var(--text)] mb-4">
                  Public Groups
                </h2>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="flex-3 relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search groups..."
                      className="m-2 p-2 pl-10 w-full rounded-lg border-[var(--text20)] focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                    />
                    <Search
                      className="absolute left-5 top-4 transform h-5 w-5 text-[var(--text60)]"
                      viewBox="0 0 24 24"
                    />
                  </div>
                  <form onSubmit={handleJoinGroup} className="flex space-x-2">
                    <input
                      type="text"
                      value={groupIdToJoin}
                      onChange={(e) => setGroupIdToJoin(e.target.value)}
                      placeholder="Enter Group ID"
                      className="m-2 p-2 rounded-lg border-[var(--text20)] focus:ring-[var(--primary)] focus:border-[var(--primary)] w-full sm:w-auto"
                    />
                    <button
                      type="submit"
                      className="m-2 p-2 px-4 bg-[var(--primary)] text-[var(--primarycontrast)] rounded-lg active:bg-[var(--primary85)] transition-colors"
                    >
                      Join
                    </button>
                  </form>
                </div>
              </div>
              <div className="space-y-4">
                {filteredPublicGroups.map((group) => (
                  <div
                    key={group._id}
                    className="bg-[var(--bg)] rounded-xl border border-[var(--text20)] p-5 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-[var(--text)] text-lg">
                          {group.name}
                        </h3>
                        <p className="text-sm text-[var(--text60)] mt-1 line-clamp-2">
                          {group.description || "No description"}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[var(--text60)]">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{group.members.length} members</span>
                          </div>
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-1" />
                            <span>ID: {group.groupId}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleJoinPublicGroup(group.groupId)}
                        className="px-3 py-1 text-sm bg-[var(--primary5)] text-[var(--primary)] rounded-md hover:bg-[var(--primary20)] transition-colors"
                      >
                        Join
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsAIModalOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-[var(--primary)] text-[var(--primarycontrast)] p-4 rounded-full active:bg-[var(--primary85)] transition-colors z-40"
        >
          <Bot className="h-6 w-6" />
        </button>
      </div>
      <CreateGroupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateGroup}
      />
      <CreateGroupModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditGroup}
        initialData={editGroupData}
      />
      <AIModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        userInterests={user.interests || []}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteGroup}
        itemType="group"
      />
    </div>
  );
};

export default StudyGroups;
