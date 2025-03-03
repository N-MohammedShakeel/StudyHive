// frontend/src/pages/StudyGroups.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Users, Lock, Globe, Edit, Trash2 } from "lucide-react";
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
  const userId = JSON.parse(localStorage.getItem("user") || "{}").id;

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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 lg:pl-64">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Study Groups</h1>
              <p className="text-gray-600">
                Join or create a study group to collaborate with others
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Group
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
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
                      className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div
                          className="flex-1 cursor-pointer"
                          onClick={() => navigate(`/group/${group._id}`)}
                        >
                          <h3 className="font-semibold text-gray-900">
                            {group.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {group.description || "No description"}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
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
                              className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteGroup(group.groupId)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        )}
                        {!group.isPublic && (
                          <Lock className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No groups yet
                  </h3>
                  <p className="text-gray-600">
                    Create your first group or join an existing one
                  </p>
                </div>
              )}
            </div>

            <div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Public Groups
                </h2>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search groups..."
                        className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <form onSubmit={handleJoinGroup} className="flex space-x-2">
                    <input
                      type="text"
                      value={groupIdToJoin}
                      onChange={(e) => setGroupIdToJoin(e.target.value)}
                      placeholder="Enter Group ID"
                      className="rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
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
                    className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {group.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {group.description || "No description"}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
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
                        className="px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100"
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
    </div>
  );
};

export default StudyGroups;
