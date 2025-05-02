import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, uploadImage } from '../../../Redux/Faculty/UserSlice';
import ProfileForm from './ProfileForm';
import {  toast } from 'react-toastify'; 
import FullScreenLoader from '../../Home/Pages/FullScreenLoader';

const UserProfile = () => {
    const dispatch = useDispatch();
    const { user, isLoading, error } = useSelector((state) => state.user);
    
    const [previewImage, setPreviewImage] = useState('');
    const [imageType, setImageType] = useState('image/png');
    const [selectedImage, setSelectedImage] = useState(null); // To store the selected image for upload

    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', dateOfBirth: '', gender: '',
        designation: '', address: '', role: '', employeeCode: '',
        department: '', dateOfJoining: '', phoneNumber: '', enabled: true,
    });

    useEffect(() => {
        dispatch(getUserProfile());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setFormData({ ...user });
            setPreviewImage(user.profileImage || '/avatar.png');
        }
    }, [user]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];
                setPreviewImage(base64String);
                setImageType(file.type);
                setSelectedImage(file); // Store the selected image for upload
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpload = () => {
        if (selectedImage) {
            const formData = new FormData();
            formData.append('image', selectedImage);
            dispatch(uploadImage({ id: user.id, formData }))
                .then((response) => {
                    if (response.meta.requestStatus === 'fulfilled') {
                        toast.success('Profile image uploaded successfully!', {
                            position: 'top-right',
                            autoClose: 3000,
                            
                        });
                    }
                })
                .catch(() => {
                    toast.error('Error uploading profile image!', {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                });
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 p-8 pt-10 flex flex-col items-center justify-center">
            <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text pb-10 text-center">Your Details </h1>
            <div className="w-full max-w-6xl bg-gray-900 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">

                {/* Left - Profile image */}
                <div className="md:w-1/3 bg-gray-800 flex flex-col items-center justify-center py-10 px-6 text-white ">
                    <label htmlFor="imageUpload" className="cursor-pointer group relative">
                        <img
                            src={`data:${imageType};base64,${previewImage}`}
                            alt="Profile"
                            className="rounded-full w-36 h-36 object-cover border-4 border-pink-500 group-hover:brightness-75 transition shadow-2xl shadow-emerald-600"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                            <span className="text-xs bg-black bg-opacity-60 px-2 py-1 rounded">Change</span>
                        </div>
                    </label>
                    <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />

                    {/* Upload Image Button */}
                    <button
                        onClick={handleImageUpload}
                        className="mt-4 text-sm text-white bg-rose-600 py-2 px-4 rounded-lg hover:bg-rose-700 transition"
                        disabled={!selectedImage || isLoading}
                    >
                        {isLoading ? <FullScreenLoader/> : 'Upload Image'}
                    </button>

                    <h2 className="text-xl font-semibold mt-4">{formData.firstName} {formData.lastName}</h2>
                    <h2 className="text-md font-semibold text-purple-600">{formData.email}</h2>
                </div>

                {/* Right - Profile form */}
                <div className="md:w-2/3 bg-gray-900 p-8">
                    <ProfileForm />
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
