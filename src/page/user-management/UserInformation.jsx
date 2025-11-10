import React from 'react';

export default function UserInformation({ user }) {

  if (!user) return null;

  return (
    <div className="rounded-lg shadow-sm">
      <div className="relative bg-blue-100 py-10 flex flex-col items-center rounded-t-lg">
        <div className="w-20 h-20 rounded-full bg-[#136BFB] border-2 border-white overflow-hidden mb-2">
          <img
            src="https://avatar.iran.liara.run/public/20"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-gray-600 text-sm">{user?.userName}</p>

        <p className="text-gray-600 text-sm">User</p>
      </div>

      <div className="p-5">
        <div className="space-y-4">
          <ProfileField label="Name" value={user?.userName} />
          <ProfileField label="Email" value={user?.email} />
          <ProfileField
            label="Contact No"
            value={user?.phone}
          />
          <ProfileField label="GDC NO" value={user?.gdcNumber} />
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, value, badge, highlight }) {
  return (
    <div className="border-b border-gray-200 pb-2 last:border-none">
      <div className="text-gray-700 font-medium">{label}</div>
      <div className="flex items-center">
        <div className={highlight ? 'text-blue-600' : 'text-gray-600'}>
          {value || '-'}
        </div>
        {badge && (
          <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}