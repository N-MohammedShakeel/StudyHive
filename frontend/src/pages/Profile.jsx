import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User as UserIcon,
  Mail,
  Edit,
  Save,
  Trash2,
  Lock,
  Bot,
} from "lucide-react";
import {
  updateProfile,
  addPassword,
  changePassword,
  deleteAccount,
  getUserProfile,
} from "../api/userApi";
import Sidebar from "../components/Common/Sidebar";
import AIModal from "../components/AIModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interests: [],
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState("");
  const [errorTimeout, setErrorTimeout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  const interestsList = [
    "Android Development",
    "Artificial Intelligence",
    "Cloud Computing",
    "Web Development",
    "Data Structures",
    "Algorithms",
    "Cybersecurity",
    "Machine Learning",
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const userData = await getUserProfile();
        setUser(userData);
        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          interests: userData.interests || [],
        });
      } catch (error) {
        toast.error("Failed to load profile", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    if (error) {
      setErrorTimeout(
        setTimeout(() => {
          setError("");
        }, 5000)
      );
    } else if (errorTimeout) {
      clearTimeout(errorTimeout);
    }
  }, [error]);

  const handleProfileSave = async () => {
    try {
      await updateProfile(formData);
      const updatedUser = await getUserProfile(); // Refetch full user data
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditingProfile(false);
      setError("");
      toast.success("Profile updated successfully");
    } catch (error) {
      setError(error.message || "Failed to update profile");
      toast.error("Failed to update profile");
    }
  };

  const handlePasswordSave = async () => {
    if (!passwordData.newPassword || !passwordData.confirmNewPassword) {
      setError("Please fill in all password fields");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      if (user?.googleId && !user.hasPassword) {
        const payload = { newPassword: passwordData.newPassword };
        await addPassword(payload);
        const updatedUser = await getUserProfile();
        setUser(updatedUser);
        toast.success("Password added successfully");
      } else {
        if (!passwordData.currentPassword) {
          setError("Current password is required");
          return;
        }
        const payload = {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        };
        await changePassword(payload);
        toast.success("Password updated successfully");
      }
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setIsEditingPassword(false);
      setError("");
    } catch (error) {
      const errorMsg = error.message || "Failed to update password";
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
      toast.success("Account deleted successfully");
    } catch (error) {
      setError(error.message || "Failed to delete account");
      toast.error("Failed to delete account");
    }
  };

  const toggleInterest = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  if (loading || !user) {
    return (
      <div className="text-center py-12 text-[var(--text60)]">Loading...</div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[var(--bg)]">
      <Toaster position="top-right" />
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex-1 lg:pl-64 p-4 sm:p-6 md:p-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div className="border-b border-[var(--text10)] pb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)]">
              Your Profile
            </h1>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Profile Info Section */}
          <div className="border-b border-[var(--text10)] pb-6">
            {isEditingProfile ? (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[var(--text70)]"
                  >
                    Name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-[var(--text50)]" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="pl-10 block w-full rounded-md border-[var(--text20)] focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[var(--text70)]"
                  >
                    Email
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-[var(--text50)]" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="pl-10 block w-full rounded-md border-[var(--text20)] focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={handleProfileSave}
                    className="flex items-center px-3 sm:px-4 py-2 bg-[var(--primary)] text-[var(--primarycontrast)] rounded-md active:bg-[var(--primary85)] transition-colors"
                  >
                    <Save className="h-5 w-5 mr-2" />
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditingProfile(false)}
                    className="px-3 sm:px-4 py-2 bg-[var(--text60)] text-[var(--primarycontrast)] rounded-md active:bg-[var(--text70)] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name || "User"
                  )}`}
                  alt="Profile"
                  className="h-16 w-16 rounded-full"
                />
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text)]">
                    {user.name || "User"}
                  </h2>
                  <p className="text-[var(--text60)]">
                    {user.email || "email@example.com"}
                  </p>
                </div>
                {!isEditingPassword && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="flex items-center px-3 sm:px-4 py-2 bg-[var(--primary)] text-[var(--primarycontrast)] rounded-md active:bg-[var(--primary85)] transition-colors"
                  >
                    <Edit className="h-5 w-5 mr-2" />
                    Edit Profile
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Interests Section */}
          <div className="border-b border-[var(--text10)] pb-6">
            <h3 className="text-lg font-medium text-[var(--text)] mb-4">
              Interests
            </h3>
            {isEditingProfile ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {interestsList.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`p-2 text-sm rounded-md transition-colors ${
                      formData.interests.includes(interest)
                        ? "bg-[var(--primary5)] text-[var(--primary)] active:bg-[var(--primary20)]"
                        : "bg-[var(--text5)] text-[var(--text70)] active:bg-[var(--text10)]"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            ) : (
              <div>
                {user.interests && user.interests.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[var(--primary5)] text-[var(--primary)] rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-[var(--text60)]">No interests set</p>
                )}
              </div>
            )}
          </div>

          {/* Account Actions Section */}
          <div className="space-y-6">
            {isEditingPassword ? (
              <div className="space-y-4">
                {user.hasPassword && (
                  <div>
                    <label
                      htmlFor="currentPassword"
                      className="block text-sm font-medium text-[var(--text70)]"
                    >
                      Current Password
                    </label>
                    <div className="mt-1 relative border-[var(--text)] border-2 rounded-xl">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-[var(--text50)]" />
                      </div>
                      <input
                        type="password"
                        id="currentPassword"
                        value={passwordData.currentPassword}
                        style={{ border: "none", outline: "none" }}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            currentPassword: e.target.value,
                          })
                        }
                        className="pl-10 m-2 p-2 block w-full rounded-md border-[var(--text20)] focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                      />
                    </div>
                  </div>
                )}
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-[var(--text70)]"
                  >
                    New Password
                  </label>
                  <div className="mt-1 relative border-[var(--text)] border-2 rounded-xl">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-[var(--text50)]" />
                    </div>
                    <input
                      type="password"
                      id="newPassword"
                      value={passwordData.newPassword}
                      style={{ border: "none", outline: "none" }}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                      className="pl-10 m-2 p-2 block w-full rounded-md border-[var(--text20)] focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="confirmNewPassword"
                    className="block text-sm font-medium text-[var(--text70)]"
                  >
                    Confirm New Password
                  </label>
                  <div className="mt-1 relative border-[var(--text)] border-2 rounded-xl">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-[var(--text50)]" />
                    </div>
                    <input
                      type="password"
                      id="confirmNewPassword"
                      value={passwordData.confirmNewPassword}
                      style={{ border: "none", outline: "none" }}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmNewPassword: e.target.value,
                        })
                      }
                      className="pl-10 m-2 p-2 block w-full rounded-md border-[var(--text20)] focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <button
                    onClick={handlePasswordSave}
                    className="px-3 sm:px-4 py-2 bg-[var(--primary)] text-[var(--primarycontrast)] rounded-md active:bg-[var(--primary85)] transition-colors"
                  >
                    {user.hasPassword ? "Save Password" : "Add Password"}
                  </button>
                  <button
                    onClick={() => setIsEditingPassword(false)}
                    className="px-3 sm:px-4 py-2 bg-[var(--text60)] text-[var(--primarycontrast)] rounded-md active:bg-[var(--text70)] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsEditingPassword(true)}
                  className="px-3 sm:px-4 py-2 bg-[var(--primary)] text-[var(--primarycontrast)] rounded-md active:bg-[var(--primary85)] transition-colors"
                >
                  {user.hasPassword ? "Change Password" : "Add Password"}
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="flex items-center px-3 sm:px-4 py-2 bg-red-600 text-white rounded-md active:bg-red-700 transition-colors"
                >
                  <Trash2 className="h-5 w-5 mr-2" />
                  Delete Account
                </button>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => setIsAIModalOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-[var(--primary)] text-[var(--primarycontrast)] p-3 sm:p-4 rounded-full active:bg-[var(--primary85)] transition-colors z-40"
        >
          <Bot className="h-6 w-6" />
        </button>
      </div>
      <AIModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        userInterests={user.interests || []}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
        itemType="account"
      />
    </div>
  );
};

export default Profile;
