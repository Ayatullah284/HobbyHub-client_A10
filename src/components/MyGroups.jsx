import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyGroups = () => {
  const { user } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/allGroups")
      .then(res => res.json())
      .then(data => {
        const myGroups = data.filter(g => g.creatorEmail === user.email);
        setGroups(myGroups);
      });
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "আপনি কি নিশ্চিতভাবে এই গ্রুপটি মুছে ফেলতে চান?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "হ্যাঁ, মুছে ফেলুন!",
      cancelButtonText: "বাতিল"
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/groups/${id}`, { method: "DELETE" });
      if (res.ok) {
        await Swal.fire({
          title: "Deleted!",
          text: "Group deleted successfully! ",
          icon: "success",
          confirmButtonText: "ঠিক আছে"
        });
        setGroups(groups.filter(g => g._id !== id));
      } else {
        Swal.fire({ title: "Failed!", text: "Failed to delete group", icon: "error", confirmButtonText: "ঠিক আছে" });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({ title: "Error!", text: "Error deleting group", icon: "error", confirmButtonText: "ঠিক আছে" });
    }
  };

  return (
    <div className="p-4 sm:p-6 w-full max-w-5xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left">My Groups</h2>

      {groups.length === 0 ? (
        <p className="text-center text-sm sm:text-base mt-6">আপনি এখনও কোনো গ্রুপ তৈরি করেননি।</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm sm:text-base">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-2 sm:px-4 py-2 text-left ">Group Name</th>
                <th className="border px-2 sm:px-4 py-2 text-left">Category</th>
                <th className="border px-2 sm:px-4 py-2 text-left">Description</th>
                <th className="border px-2 sm:px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((g) => (
                <tr key={g._id} className="hover:bg-gray-50 ">
                  <td className="border px-2 sm:px-4 py-2">{g.groupName}</td>
                  <td className="border px-2 sm:px-4 py-2">{g.category}</td>
                  <td className="border px-2 sm:px-4 py-2">{g.description}</td>
                  <td className="border px-2 sm:px-4 py-2 flex flex-col sm:flex-row justify-center items-center gap-2 ">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 w-full sm:w-auto cursor-pointer"
                      onClick={() => navigate(`/groupDetails/${g._id}`)}
                    >
                      Info
                    </button>
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 w-full sm:w-auto cursor-pointer"
                      onClick={() => navigate(`/updateGroup/${g._id}`)}
                    >
                      Update
                    </button>

                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full sm:w-auto cursor-pointer"
                      onClick={() => handleDelete(g._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyGroups;
