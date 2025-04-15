import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, Calendar, BookOpen } from "lucide-react";

const GroupList = ({ groups }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map((group) => (
        <div
          key={group._id}
          className="bg-[var(--bg)] rounded-lg border border-[var(--text20)] transition-all cursor-pointer"
          onClick={() => navigate(`/group/${group._id}`)}
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold text-[var(--text)] mb-2">
              {group.name}
            </h3>
            <p className="text-[var(--text60)] mb-4">
              {group.description || "No description"}
            </p>

            <div className="space-y-2">
              <div className="flex items-center text-sm text-[var(--text60)]">
                <Users className="h-4 w-4 mr-2" />
                <span>{group.members.length} members</span>
              </div>

              <div className="flex items-center text-sm text-[var(--text60)]">
                <Calendar className="h-4 w-4 mr-2" />
                <span>
                  Created {new Date(group.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center text-sm text-[var(--text60)]">
                <BookOpen className="h-4 w-4 mr-2" />
                <span>Active</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupList;
