import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/allGroups/${id}`)
      .then(res => res.json())
      .then(data => setGroup(data));
  }, [id]);

  if (!group) return <p className="text-center mt-10 text-lg">Loading...</p>;

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
        }).then(() => navigate("/allGroups"));
      });
  };

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Update Group</h2>

      <form onSubmit={handleUpdate} className="space-y-4">

        {[
          { label: "Group Name", name: "groupName", type: "text" },
          { label: "Category", name: "category", type: "text" },
          { label: "Meeting Location", name: "meetingLocation", type: "text" },
          { label: "Max Members", name: "maxMembers", type: "number" },
          { label: "Image URL", name: "imageURL", type: "text" }
        ].map((field) => (
          <div key={field.name}>
            <label className="block mb-1 font-medium">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              defaultValue={group[field.name]}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        ))}

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            defaultValue={group.description}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Start Date */}
        <div>
          <label className="block mb-1 font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            defaultValue={group.startDate?.split("T")[0]}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Creator Info (read-only) */}
        {[
          { label: "Creator Name", value: group.creatorName },
          { label: "Creator Email", value: group.creatorEmail }
        ].map((field) => (
          <div key={field.label}>
            <label className="block mb-1 font-medium">{field.label}</label>
            <input
              type="text"
              value={field.value}
              readOnly
              className="w-full border border-gray-300 p-2 rounded bg-gray-100"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-lg sm:text-base"
        >
          Update Group
        </button>
      </form>
    </div>
  );
};

export default UpdateGroup;
