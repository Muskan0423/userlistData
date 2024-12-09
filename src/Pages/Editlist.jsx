import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditUser = ({ setUpdatedUsers }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profilePicture: null, 
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => {
        setFormData({
          name: response.data.name,
          email: response.data.email,
          profilePicture: null, 
        });
      })
      .catch((error) => console.error('Error fetching user:', error));
  }, [userId]);

  const validate = () => {
    const errs = {};
    if (!formData.name) errs.name = 'Name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Valid email is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setUpdatedUsers((prev) => [
      ...prev.filter((u) => u.id !== Number(userId)),
      { id: Number(userId), ...formData },
    ]);
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4 text-blue-500">Edit User</h1>

      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
        <div className="flex">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm p-2.5 rounded-md"
            placeholder="Enter name"
          />
        </div>
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
        <div className="flex">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm p-2.5 rounded-md"
            placeholder="Enter email"
          />
        </div>
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="profilePicture" className="block mb-2 text-sm font-medium text-gray-900">Profile Picture</label>
        <input
          type="file"
          id="profilePicture"
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          onChange={handleFileChange}
        />
        <p className="mt-1 text-sm text-gray-500">Upload a profile picture to update.</p>

        {formData.profilePicture && (
          <div className="mt-4">
            <img
              src={formData.profilePicture}
              alt="Uploaded Profile"
              className="w-24 h-24 rounded-full object-cover mx-auto"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Save
      </button>
    </form>
  );
};

export default EditUser;
