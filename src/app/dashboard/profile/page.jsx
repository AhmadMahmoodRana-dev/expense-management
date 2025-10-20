"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select";
import api from "@/lib/axios";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
    currency: "",
    language: "",
    timezone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  const handleInputChange = (name, value) => {
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchProfile = async () => {
    try {
      const { data } = await api.get(`/profile`);
      console.log(data, "Profile data");
      setProfile({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        phone: data.phone || "",
        dateOfBirth: data.dateOfBirth || "",
        currency: data.currency || "",
        language: data.language || "",
        timezone: data.timezone || "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Profile updated:", profile);
      const { data } = await api.put("/profile", profile);
      console.log(data, "Updated profile response");
      fetchProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    setIsEditing(false);
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${
      lastName?.charAt(0) || ""
    }`.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Expense Manager Pro
          </h1>
          <p className="text-lg text-white">
            Manage your profile and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              {/* Profile Card */}
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-green-400 to-blue-500 p-1">
                    {profile.profilePhoto ? (
                      <img
                        src={"profile.profilePhoto"}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover border-4 border-white"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center border-4 border-white">
                        <span className="text-2xl font-bold text-gray-700">
                          {getInitials(profile.firstName, profile.lastName)}
                        </span>
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-2 right-2 bg-green-500 text-white p-2 rounded-full cursor-pointer hover:bg-green-600 transition-all shadow-lg">
                      <input type="file" className="hidden" accept="image/*" />
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </label>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-gray-600 text-sm">Expense Manager User</p>

                {/* Quick Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-green-600 font-bold">$2,847</div>
                    <div className="text-xs text-gray-500">Monthly Budget</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-blue-600 font-bold">$1,234</div>
                    <div className="text-xs text-gray-500">
                      Spent This Month
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("personal")}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                    activeTab === "personal"
                      ? "bg-green-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>Personal Info</span>
                  </div>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl shadow-lg overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-900 to-blue-600 px-6 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Personal Information
                    </h2>
                    <p className="text-green-100">
                      Manage your personal details and contact information
                    </p>
                  </div>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-white text-green-600 px-6 py-2 rounded-xl font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600 transition-all shadow-lg hover:shadow-xl"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="space-x-3">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="bg-white text-gray-600 px-6 py-2 rounded-xl font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="bg-white text-green-600 px-6 py-2 rounded-xl font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600 transition-all shadow-lg hover:shadow-xl"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 bg-white">
                <div className="space-y-8">
                  {/* Personal Information Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="flex items-center text-sm font-medium text-gray-700">
                        <svg
                          className="w-4 h-4 mr-2 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        First Name
                      </Label>
                      {isEditing ? (
                        <Input
                          type="text"
                          value={profile.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          className="w-full rounded-xl"
                          required
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                          {profile.firstName}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center text-sm font-medium text-gray-700">
                        <svg
                          className="w-4 h-4 mr-2 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Last Name
                      </Label>
                      {isEditing ? (
                        <Input
                          type="text"
                          value={profile.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          className="w-full rounded-xl"
                          required
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                          {profile.lastName}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center text-sm font-medium text-gray-700">
                        <svg
                          className="w-4 h-4 mr-2 text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        Phone Number
                      </Label>
                      {isEditing ? (
                        <Input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className="w-full rounded-xl"
                          required
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                          {profile.phone}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center text-sm font-medium text-gray-700">
                        <svg
                          className="w-4 h-4 mr-2 text-purple-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Date of Birth
                      </Label>
                      {isEditing ? (
                        <Input
                          type="date"
                          value={profile.dateOfBirth}
                          onChange={(e) =>
                            handleInputChange("dateOfBirth", e.target.value)
                          }
                          className="w-full rounded-xl"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                          {profile.dateOfBirth}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center text-sm font-medium text-gray-700">
                        <svg
                          className="w-4 h-4 mr-2 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Currency
                      </Label>
                      {isEditing ? (
                        <Select
                          value={profile.currency}
                          onValueChange={(value) =>
                            handleInputChange("currency", value)
                          }
                        >
                          <SelectTrigger className="w-full rounded-xl">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD - US Dollar</SelectItem>
                            <SelectItem value="EUR">EUR - Euro</SelectItem>
                            <SelectItem value="GBP">
                              GBP - British Pound
                            </SelectItem>
                            <SelectItem value="JPY">
                              JPY - Japanese Yen
                            </SelectItem>
                            <SelectItem value="CAD">
                              CAD - Canadian Dollar
                            </SelectItem>
                            <SelectItem value="AUD">
                              AUD - Australian Dollar
                            </SelectItem>
                            <SelectItem value="CHF">
                              CHF - Swiss Franc
                            </SelectItem>
                            <SelectItem value="CNY">
                              CNY - Chinese Yuan
                            </SelectItem>
                            <SelectItem value="INR">
                              INR - Indian Rupee
                            </SelectItem>
                            <SelectItem value="PKR">
                              PKR - Pakistani Rupee
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                          {profile.currency}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center text-sm font-medium text-gray-700">
                        <svg
                          className="w-4 h-4 mr-2 text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                          />
                        </svg>
                        Language
                      </Label>
                      {isEditing ? (
                        <Select
                          value={profile.language}
                          onValueChange={(value) =>
                            handleInputChange("language", value)
                          }
                        >
                          <SelectTrigger className="w-full rounded-xl">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="it">Italian</SelectItem>
                            <SelectItem value="pt">Portuguese</SelectItem>
                            <SelectItem value="ru">Russian</SelectItem>
                            <SelectItem value="ja">Japanese</SelectItem>
                            <SelectItem value="zh">Chinese</SelectItem>
                            <SelectItem value="ar">Arabic</SelectItem>
                            <SelectItem value="urdu">Urdu</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                          {profile.language}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center text-sm font-medium text-gray-700">
                        <svg
                          className="w-4 h-4 mr-2 text-purple-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Timezone
                      </Label>
                      {isEditing ? (
                        <Select
                          value={profile.timezone}
                          onValueChange={(value) =>
                            handleInputChange("timezone", value)
                          }
                        >
                          <SelectTrigger className="w-full rounded-xl">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UTC">
                              UTC - Coordinated Universal Time
                            </SelectItem>
                            <SelectItem value="America/New_York">
                              EST - Eastern Time
                            </SelectItem>
                            <SelectItem value="America/Chicago">
                              CST - Central Time
                            </SelectItem>
                            <SelectItem value="America/Denver">
                              MST - Mountain Time
                            </SelectItem>
                            <SelectItem value="America/Los_Angeles">
                              PST - Pacific Time
                            </SelectItem>
                            <SelectItem value="Europe/London">
                              GMT - London
                            </SelectItem>
                            <SelectItem value="Europe/Paris">
                              CET - Central European Time
                            </SelectItem>
                            <SelectItem value="Asia/Dubai">
                              GST - Gulf Standard Time
                            </SelectItem>
                            <SelectItem value="Asia/Karachi">
                              PKT - Pakistan Time
                            </SelectItem>
                            <SelectItem value="Asia/Kolkata">
                              IST - India Time
                            </SelectItem>
                            <SelectItem value="Asia/Tokyo">
                              JST - Japan Time
                            </SelectItem>
                            <SelectItem value="Australia/Sydney">
                              AEST - Australian Eastern Time
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                          {profile.timezone}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
