"use client";

import React, { useState } from "react";
import { Mail, Phone, Globe, Bell, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/user-store";
import { baseUrl } from "@/lib/utl";

interface UserProfile {
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  language: string;
  emailNotifications: boolean;
}

export default function ProfileSetting() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>({
    name: "Sai Tayzar Tun",
    role: "Staff",
    email: "user@doitung.com",
    phone: "+66 123 456 789",
    avatar: "S",
    language: "English",
    emailNotifications: true,
  });

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, type } = e.target;
    // Only emailNotifications is actionable in the UI now
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === "emailNotifications") {
        setProfile({ ...profile, [name]: checked });
      }
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${baseUrl}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        useAuthStore.getState().setUser(null);
        router.push("/login");
      } else {
        console.error("Logout failed with status:", response.status);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="bg-staff-backdrop min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        {/* Page Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
              Profile & Settings
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your account information and preferences
            </p>
          </div>
        </div>

        {/* Main Content Grid - single column layout */}
        <div className="grid grid-cols-1 gap-6">
          {/* Profile Card (stacked) */}
          <div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200/50">
              {/* Avatar and Info */}
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-[#8a6752] to-[#6d5441]">
                    <span className="text-xl font-semibold text-white">
                      {profile.avatar.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {profile.name}
                </h2>
                <p className="mt-1 text-sm font-medium text-[#8a6752]">
                  {profile.role}
                </p>
                <p className="mt-3 text-xs text-gray-500">Member since 2024</p>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Email</span>
                    <span className="text-xs font-medium text-gray-900">
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Forms (stacked below profile) */}
          <div className="space-y-6">
            {/* Personal Information Card */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200/50">
              <div className="flex items-center justify-between">
                <h3 className="mb-4 text-base font-semibold text-gray-900">
                  Personal Information
                </h3>
                <div className="flex items-center gap-2">
                  {/* Back button removed per request */}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-medium tracking-wide text-gray-700 uppercase">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    disabled
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700"
                    placeholder="Full Name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-medium tracking-wide text-gray-700 uppercase">
                    Email Address
                  </label>
                  <div className="relative mt-2">
                    <Mail className="absolute top-2.5 left-3 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      disabled
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 pl-10 text-sm text-gray-700"
                      placeholder="Email address"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-medium tracking-wide text-gray-700 uppercase">
                    Phone Number
                  </label>
                  <div className="relative mt-2">
                    <Phone className="absolute top-2.5 left-3 h-4 w-4 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      disabled
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 pl-10 text-sm text-gray-700"
                      placeholder="Phone number"
                    />
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-xs font-medium tracking-wide text-gray-700 uppercase">
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={profile.role}
                    disabled
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700"
                    placeholder="Role"
                  />
                </div>
              </div>
            </div>

            {/* Settings Card */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200/50">
              <h3 className="mb-4 text-base font-semibold text-gray-900">
                Preferences & Settings
              </h3>

              <div className="space-y-5">
                {/* Language */}
                <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50/50 p-4">
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Language
                      </p>
                      <p className="text-xs text-gray-500">
                        Choose your preferred language
                      </p>
                    </div>
                  </div>
                  <select
                    name="language"
                    value={profile.language}
                    disabled
                    className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 transition focus:border-[#8a6752] focus:ring-1 focus:ring-[#8a6752] focus:outline-none disabled:bg-gray-50 disabled:text-gray-600"
                  >
                    <option>English</option>
                    <option>Lahu</option>
                  </select>
                </div>

                {/* Email Notifications*/}
                <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50/50 p-4">
                  <div className="flex items-center gap-3">
                    <Bell className="h-4 w-4 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Email Notifications
                      </p>
                      <p className="text-xs text-gray-500">
                        Receive updates via email
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={profile.emailNotifications}
                      onChange={handleEditChange}
                      className="peer sr-only"
                    />
                    <div className="peer relative h-6 w-11 rounded-full bg-gray-300 peer-checked:bg-[#8a6752] peer-disabled:opacity-50 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logout under profile card */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg bg-[#8a6752] px-4 py-2 text-sm font-medium text-white hover:bg-[#7a5c47]"
          >
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
