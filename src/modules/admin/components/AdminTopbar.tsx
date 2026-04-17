import { useState, useEffect, useRef } from "react";
import {
  HiOutlineBell,
  HiOutlineMagnifyingGlass,
  HiOutlineBars3,
  HiMapPin,
} from "react-icons/hi2";
import { HiOutlineMail } from "react-icons/hi";
import { IoBookOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import logo from "../../../../public/preview-image.png";
import Input from "../../../shared/Input/Index";
import Button from "../../../shared/Button/Index";
import { setUserInfo } from "../../../global/slice";

type Props = {
  onMenuClick: () => void;
};

export default function AdminTopbar({ onMenuClick }: Props) {
  const [q, setQ] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state?.learnFlow?.userInfo);
  const token =
    useSelector((state: any) => state?.learnFlow?.userToken) ||
    localStorage.getItem("token");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    bio: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.fullName || "",
        email: user.email || "",
        location: user.location || "",
        bio: user.bio || "",
      });
      if (user.avatar) setProfileImage(user.avatar);
    }
  }, [user]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!token) return;
    setSaving(true);
    try {
      let payload: any;
      let headers: any = { Authorization: `Bearer ${token}` };

      if (fileInputRef.current?.files?.[0]) {
        payload = new FormData();
        payload.append("fullName", formData.name);
        payload.append("email", formData.email);
        payload.append("location", formData.location);
        payload.append("bio", formData.bio || "");
        payload.append("avatar", fileInputRef.current.files[0]);
        headers["Content-Type"] = "multipart/form-data";
      } else {
        payload = {
          fullName: formData.name,
          email: formData.email,
          location: formData.location,
          bio: formData.bio || "",
        };
        headers["Content-Type"] = "application/json";
      }

      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}users/profile`,
        payload,
        { headers },
      );
      const data = response.data?.data || response.data;
      console.log(response?.data?.data);
      dispatch(setUserInfo(data));
      setIsModalOpen(false);
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return "AD";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const handleBellClick = () => {
    toast.info("Notifications feature coming next.");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!q.trim()) {
      toast.info("Type something to search.");
      return;
    }

    toast.success(`Searching for "${q}"`);
  };

  return (
    <>
      <header className="px-3 pt-3 sm:hidden">
        <div className="rounded-2xl bg-white px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.05)] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="LearnFlow logo"
                className="h-8 w-8 object-contain"
              />
              <span className="text-sm font-bold text-slate-900">
                LEARNFLOW
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleBellClick}
                className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100"
              >
                <HiOutlineBell className="h-6 w-6" />
                <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-500 px-1 text-[10px] text-white">
                  3
                </span>
              </button>
              <button
                type="button"
                onClick={onMenuClick}
                className="rounded-xl p-2 text-violet-500 hover:bg-violet-50"
              >
                <HiOutlineBars3 className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex h-10 w-10 cursor-pointer overflow-hidden items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700 hover:ring-2 hover:ring-violet-300 transition-all shrink-0"
              >
                {profileImage || user?.avatar ? (
                  <img
                    src={profileImage || user?.avatar}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  getInitials(user?.fullName)
                )}
              </button>
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-900">
                  {user?.fullName || "Admin User"}
                </p>
                <p className="text-xs text-slate-500 capitalize">
                  {user?.role || "Admin"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <header className="hidden border-b border-slate-200 bg-white px-4 py-4 sm:block md:px-6 xl:px-8">
        <div className="flex items-center justify-between gap-4">
          <form onSubmit={handleSearch} className="relative w-full max-w-md">
            <HiOutlineMagnifyingGlass className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search courses..."
              className="h-10 w-full rounded-full border border-slate-200 bg-slate-50 pr-4 pl-10 text-sm outline-none transition focus:border-violet-400 focus:bg-white"
            />
          </form>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleBellClick}
              className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100"
            >
              <HiOutlineBell className="h-5 w-5" />
              <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-500 px-1 text-[10px] text-white">
                3
              </span>
            </button>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900">
                  {user?.fullName || "Admin User"}
                </p>
                <p className="text-xs text-slate-500">
                  {user?.role || "Admin"}
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex h-10 w-10 cursor-pointer overflow-hidden items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700 hover:ring-2 hover:ring-violet-300 transition-all"
              >
                {profileImage || user?.avatar ? (
                  <img
                    src={profileImage || user?.avatar}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  getInitials(user?.fullName)
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-[20px] shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Admin Profile
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex justify-center mb-6">
              <div className="relative w-[100px] h-[100px]">
                <div className="h-full w-full rounded-full bg-violet-100 flex items-center justify-center text-violet-700 text-3xl font-bold overflow-hidden shadow-sm">
                  {profileImage || user?.avatar ? (
                    <img
                      src={profileImage || user?.avatar}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    getInitials(user?.fullName)
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-1.5 bg-slate-600 text-white rounded-full border-2 border-white hover:bg-slate-700 transition-colors shadow-sm"
                >
                  <FiEdit className="w-4 h-4" />
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                size="small"
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                icon={<HiOutlineMail className="w-5 h-5" />}
                size="small"
                readOnly={true}
              />
              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                icon={<HiMapPin className="w-5 h-5" />}
                size="small"
              />
              <Input
                label="Bio"
                name="bio"
                value={formData.bio || ""}
                onChange={handleChange}
                icon={<IoBookOutline className="w-5 h-5" />}
                size="small"
              />
            </div>

            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setIsModalOpen(false)}
                className="rounded-[15px]"
              >
                Cancel
              </Button>
              <Button
                fullWidth
                onClick={handleSave}
                loading={saving}
                loadingText="Saving..."
                className="rounded-[15px]"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
