import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Auth/AuthContext";

const UpdateGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

  const [group, setGroup] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/allGroups/${id}`)
      .then(res => res.json())
      .then(data => setGroup(data));
  }, [id]);

  if (!group) return <p className="text-center mt-10">Loading...</p>;

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      groupName: form.groupName.value,
      category: form.category.value,
      description: form.description.value,
      meetingLocation: form.meetingLocation.value,
      maxMembers: form.maxMembers.value,
      startDate: form.startDate.value,
      imageURL: form.imageURL.value,
      // creator info unchanged
      creatorName: group.creatorName,
      creatorEmail: group.creatorEmail
    };

    fetch(`http://localhost:3000/updateGroup/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    })
      .then(res => res.json())
      .then(() => {
        Swal.fire({
          title: "Updated!",
          text: "Group has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK"
        }).then(() => {
          navigate("/allGroups");
        });
      });
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Group</h2>
      <form onSubmit={handleUpdate} className="space-y-4">

        <div>
          <label className="block mb-1">Group Name</label>
          <input
            type="text"
            name="groupName"
            defaultValue={group.groupName}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Category</label>
          <input
            type="text"
            name="category"
            defaultValue={group.category}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            defaultValue={group.description}
            className="w-full border p-2 rounded"
            rows="4"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1">Meeting Location</label>
          <input
            type="text"
            name="meetingLocation"
            defaultValue={group.meetingLocation}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Max Members</label>
          <input
            type="number"
            name="maxMembers"
            defaultValue={group.maxMembers}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Start Date</label>
          <input
            type="date"
            name="startDate"
            defaultValue={group.startDate?.split("T")[0]}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Image URL</label>
          <input
            type="text"
            name="imageURL"
            defaultValue={group.imageURL}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Creator Name</label>
          <input
            type="text"
            value={group.creatorName}
            className="w-full border p-2 rounded bg-gray-100"
            readOnly
          />
        </div>

        <div>
          <label className="block mb-1">Creator Email</label>
          <input
            type="text"
            value={group.creatorEmail}
            className="w-full border p-2 rounded bg-gray-100"
            readOnly
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Group
        </button>
      </form>
    </div>
  );
};

export default UpdateGroup;
