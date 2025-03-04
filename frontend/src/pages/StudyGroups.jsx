// frontend/src/pages/StudyGroups.jsx
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
import AIModal from "../components/AIModal";

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
        console.error("Failed to load groups:", error);
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
    } catch (error) {
      console.error("Failed to create group:", error);
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
    } catch (error) {
      console.error("Failed to edit group:", error);
    }
  };

  const handleDeleteGroup = async (groupId) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      try {
        await deleteGroup(groupId);
        setUserGroups(userGroups.filter((g) => g.groupId !== groupId));
        setPublicGroups(publicGroups.filter((g) => g.groupId !== groupId));
      } catch (error) {
        console.error("Failed to delete group:", error);
      }
    }
  };

  const handleJoinGroup = async (e) => {
    e.preventDefault();
    try {
      const joinedGroup = await joinGroup(groupIdToJoin);
      setUserGroups([...userGroups, joinedGroup]);
      setGroupIdToJoin("");
    } catch (error) {
      console.error("Failed to join group:", error);
    }
  };

  const handleJoinPublicGroup = async (groupId) => {
    try {
      const joinedGroup = await joinGroup(groupId);
      setUserGroups([...userGroups, joinedGroup]);
    } catch (error) {
      console.error("Failed to join group:", error);
    }
  };

  const filteredPublicGroups = publicGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.groupId.includes(searchQuery)
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex-1 lg:pl-64 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Study Groups
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Collaborate and learn together
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Group
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Your Groups
              </h2>
              {loading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
                  ))}
                </div>
              ) : userGroups.length > 0 ? (
                <div className="space-y-4">
                  {userGroups.map((group) => (
                    <div
                      key={group._id}
                      className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div
                          className="flex-1 cursor-pointer"
                          onClick={() => navigate(`/group/${group._id}`)}
                        >
                          <h3 className="font-semibold text-gray-900 text-lg">
                            {group.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {group.description || "No description"}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
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
                              className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteGroup(group.groupId)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        )}
                        {!group.isPublic && (
                          <Lock className="h-5 w-5 text-gray-400 ml-2" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-md">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No groups yet
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Create or join a group to get started
                  </p>
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Public Groups
                </h2>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-1 top-2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search groups..."
                      className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <form onSubmit={handleJoinGroup} className="flex space-x-2">
                    <input
                      type="text"
                      value={groupIdToJoin}
                      onChange={(e) => setGroupIdToJoin(e.target.value)}
                      placeholder="Enter Group ID"
                      className="rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-auto"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
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
                    className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {group.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {group.description || "No description"}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
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
                        className="px-3 py-1 text-sm bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition-colors"
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
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors z-40"
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
    </div>
  );
};

export default StudyGroups;
