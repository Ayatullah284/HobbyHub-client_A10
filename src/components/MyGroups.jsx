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

  // const handleDelete = async (id) => {
  //   const confirmDelete = window.confirm("আপনি কি নিশ্চিতভাবে এই গ্রুপটি মুছে ফেলতে চান?");
  //   if (!confirmDelete) return;

  //   try {
  //     const res = await fetch(`http://localhost:3000/groups/${id}`, {
  //       method: "DELETE",
  //     });
  //     if (res.ok) {
  //       alert("Group deleted successfully!");
  //       setGroups(groups.filter(g => g._id !== id));
  //     } else {
  //       alert("Failed to delete group");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error deleting group");
  //   }
  // };

  const handleDelete = async (id) => {
  // SweetAlert2 confirmation
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
    const res = await fetch(`http://localhost:3000/groups/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      // Success SweetAlert2
      await Swal.fire({
        title: "Deleted!",
        text: "Group deleted successfully!",
        icon: "success",
        confirmButtonText: "ঠিক আছে"
      });

      // Update state
      setGroups(groups.filter(g => g._id !== id));
    } else {
      Swal.fire({
        title: "Failed!",
        text: "Failed to delete group",
        icon: "error",
        confirmButtonText: "ঠিক আছে"
      });
    }
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error!",
      text: "Error deleting group",
      icon: "error",
      confirmButtonText: "ঠিক আছে"
    });
  }
};

  return (
    <div className="p-4 w-3/4 mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Groups</h2>

      {groups.length === 0 ? (
        <p>আপনি এখনও কোনো গ্রুপ তৈরি করেননি।</p>
      ) : (
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Group Name</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((g) => (
              <tr key={g._id}>
                <td className="border px-4 py-2">{g.groupName}</td>
                <td className="border px-4 py-2">{g.category}</td>
                <td className="border px-4 py-2">{g.description}</td>
                <td className="border px-4 py-2 space-x-2">

                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
                    onClick={() => navigate(`/updateGroup/${g._id}`)}
                  >
                    Update
                  </button>

                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                    onClick={() => handleDelete(g._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyGroups;
