import React, { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateGroup = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    groupName: "",
    category: "",
    description: "",
    meetingLocation: "",
    maxMembers: "",
    startDate: "",
    imageURL: "",
  });

  const categories = ["Drawing", "Gaming", "Cooking", "Music", "Sports", "Photography", "Food", "Education"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const groupData = {
      ...formData,
      creatorName: user.displayName,
      creatorEmail: user.email,
      createdAt: new Date(),
    };

    try {
      const res = await axios.post("http://localhost:3000/groups", groupData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "✅ Group Created Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/allGroups");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create group");
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-4 sm:p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center sm:text-left">
        Create a New Hobby Group
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium">Group Name</label>
          <input
            type="text"
            name="groupName"
            value={formData.groupName}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Hobby Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="select select-bordered w-full"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Meeting Location</label>
          <input
            type="text"
            name="meetingLocation"
            value={formData.meetingLocation}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Max Members</label>
            <input
              type="number"
              name="maxMembers"
              value={formData.maxMembers}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="text"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">User Name</label>
            <input
              type="text"
              value={user.displayName || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">User Email</label>
            <input
              type="email"
              value={user.email || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateGroup;
