import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

import axios from 'axios';

import Navbar from './components/Navbar';

const EditProfile = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState('success'); // 'success' | 'error'

    const {
        user,
        setUser,
        logout,
    } = useAuth();

    const [name, setName] = useState(
        user?.name || ''
    );

    const [bio, setBio] = useState(
        user?.bio || ''
    );

    const [profilePicture, setProfilePicture] =
        useState(null);

    const [preview, setPreview] =
        useState(user?.profilePicture || '');

    const [loading, setLoading] =
        useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setProfilePicture(file);

        setPreview(
            URL.createObjectURL(file)
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setLoading(true);

            const formData =
                new FormData();

            formData.append(
                'name',
                name
            );

            formData.append(
                'bio',
                bio
            );

            if (profilePicture) {

                formData.append(
                    'profilePicture',
                    profilePicture
                );

            }

            const response =
                await axios.put(
                    `${import.meta.env.VITE_API_URL}/users/profile/${user._id}`,
                    formData,
                    {
                        headers: {
                            'Content-Type':
                                'multipart/form-data',
                        },
                    }
                );

            console.log(
                'Updated user:',
                response.data
            );

            setUser(
                response.data
            );

            localStorage.setItem(
                'user',
                JSON.stringify(
                    response.data
                )
            );

            showMessage('success', 'Profile updated successfully!');

        } catch (error) {

            console.error(error);

            showMessage(
                'error',
                error.response?.data?.message ||
                'Failed to update profile.'
            );

        } finally {

            setLoading(false);

        }
    };

    const showMessage = (type, text) => {
        setMessageType(type);
        setMessage(text);

        // auto-hide after 3 seconds
        setTimeout(() => {
            setMessage(null);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-[#FCF7F8]">

            <Navbar
                user={user}
                logout={logout}
            />

            <main className="max-w-3xl mx-auto p-6">

                <section className="bg-white rounded-3xl p-8 shadow-md border border-[#BEBFC5]">
                    {message && (
                        <div
                            className={`mb-6 p-4 rounded-xl text-white font-semibold transition ${messageType === 'success'
                                    ? 'bg-green-600'
                                    : 'bg-red-600'
                                }`}
                        >
                            {message}
                        </div>
                    )}
                    <h1 className="text-3xl font-bold text-[#A31621] mb-6">
                        Edit Profile
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* PROFILE PHOTO */}

                        <div className="flex flex-col items-center">

                            <img
                                src={
                                    preview ||
                                    'https://media.istockphoto.com/id/1214428300/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=vftMdLhldDx9houN4V-g3C9k0xl6YeBcoB_Rk6Trce0='
                                }
                                alt="Profile"
                                className="w-36 h-36 rounded-full object-cover border-4 border-[#4E8098]"
                            />

                            <div className="mt-4">
                                <label
                                    htmlFor="profileImage"
                                    className="
            flex flex-col items-center justify-center
            w-full p-6
            border-2 border-dashed border-[#BEBFC5]
            rounded-2xl
            bg-[#FCF7F8]
            cursor-pointer
            hover:border-[#4E8098]
            hover:bg-[#F6F8FB]
            transition
        "
                                >
                                    <div className="text-[#A31621] text-lg font-semibold">
                                        Upload Profile Picture
                                    </div>

                                    <div className="text-sm text-[#4E8098] mt-1">
                                        Click to select an image
                                    </div>

                                    <div className="text-xs text-gray-500 mt-2">
                                        PNG, JPG, JPEG
                                    </div>
                                </label>

                                <input
                                    id="profileImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>

                        </div>

                        {/* NAME */}

                        <div>

                            <label className="block text-sm font-semibold text-[#A31621] mb-2">
                                Full Name
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                className="w-full border border-[#BEBFC5] rounded-xl p-3"
                                required
                            />

                        </div>

                        {/* EMAIL */}

                        <div>

                            <label className="block text-sm font-semibold text-[#A31621] mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                value={user.email}
                                disabled
                                className="w-full border border-[#BEBFC5] rounded-xl p-3 bg-gray-100 text-gray-500"
                            />

                            <p className="text-xs text-gray-500 mt-1">
                                Email cannot be changed.
                            </p>

                        </div>

                        {/* BIO */}

                        <div>

                            <label className="block text-sm font-semibold text-[#A31621] mb-2">
                                Bio
                            </label>

                            <textarea
                                value={bio}
                                onChange={(e) =>
                                    setBio(
                                        e.target.value
                                    )
                                }
                                rows={5}
                                placeholder="Tell patients a little about yourself..."
                                className="w-full border border-[#BEBFC5] rounded-xl p-3"
                            />

                        </div>

                        {/* ACTIONS */}

                        <div className="flex gap-4">

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(-1)
                                }
                                className="flex-1 bg-gray-200 hover:bg-gray-300 py-3 rounded-xl font-semibold"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-[#A31621] hover:bg-red-800 text-white py-3 rounded-xl font-semibold transition"
                            >
                                {loading
                                    ? 'Saving...'
                                    : 'Save Changes'}
                            </button>

                        </div>

                    </form>

                </section>

            </main>

        </div>
    );
};

export default EditProfile;