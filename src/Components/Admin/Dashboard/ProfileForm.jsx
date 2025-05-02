import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUser } from '../../../Redux/Faculty/UserSlice';
import { toast } from 'react-toastify';
import FullScreenLoader from '../../Home/Pages/FullScreenLoader';

const ProfileForm = () => {
  const fields = [
    { label: "First Name", name: "firstName", placeholder: "Enter First Name" },
    { label: "Last Name", name: "lastName", placeholder: "Enter Last Name" },
    { label: "Email", name: "email", placeholder: "Enter Email" },
    { label: "Phone Number", name: "phoneNumber", placeholder: "Phone Number" },
    { label: "Date of Birth", name: "dateOfBirth", type: "date" },
    { label: "Gender", name: "gender", type: "select", options: ["MALE", "FEMALE", "OTHER"] },
    { label: "Designation", name: "designation", type: "select", options: ["Assistant Professor", "Associate Professor", "Professor", "Lecturer", "Dean", "Head of Department", "Others"] },
    { label: "Employee Code", name: "employeeCode", placeholder: "Employee Code" },
    { label: "Department", name: "department", type: "select", options: ["Computer Science", "Information Technology", "Electronics", "Mechanical Engineering", "Civil Engineering", "Mathematics", "Others"] },
    { label: "Date of Joining", name: "dateOfJoining", type: "date" },
  ];

  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.user);

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
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id: user.id, updatedUser: formData }))
      .then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          toast.success('Profile updated successfully!', {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      })
      .catch(() => {
        toast.error('Error updating profile!', {
          position: 'top-right',
          autoClose: 3000,
        });
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-white">
      {isLoading && <FullScreenLoader />}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map(({ label, name, placeholder, type = "text", options }) => (
          <div key={name} className="flex flex-col">
            <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-300">
              {label}
            </label>
            {type === "select" ? (
              <select
                id={name}
                name={name}
                value={formData[name] || ''}
                onChange={handleChange}
                className="bg-gray-700 border border-gray-600 rounded-md p-3 focus:outline-none focus:border-pink-600"
              >
                <option value="">Select {label}</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={name}
                name={name}
                type={type}
                value={formData[name] || ''}
                onChange={handleChange}
                placeholder={placeholder}
                className="bg-gray-700 border border-gray-600 rounded-md p-3 focus:outline-none focus:border-pink-500"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        <label htmlFor="address" className="mb-1 text-sm font-medium text-gray-300">
          Address
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address || ''}
          onChange={handleChange}
          placeholder="Enter Address"
          className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 focus:outline-none focus:border-pink-500"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
      >
        Save Profile
      </button>
    </form>
  );
};

export default ProfileForm;
