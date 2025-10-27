import React, { useEffect, useState, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext"; 
import { toast } from "react-hot-toast";

const GroupDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext); 
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/allGroups/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setGroup(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (!user) return <Navigate to="/login" replace />;
  if (loading) return <div>Loading group details...</div>;
  if (!group) return <div>Group not found</div>;

  const isInactive = new Date(group.startDate) < new Date();

  const handleJoin = () => {
    fetch(`http://localhost:3000/groups/${id}/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user._id }),
    })
      .then((res) => res.json())
      .then(() => toast.success("Joined the group successfully!"))
      .catch(() => toast.error("Failed to join group"));
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-lg rounded-xl">
      {group.imageURL && (
        <img
          src={group.imageURL}
          alt={group.groupName}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-4">{group.groupName}</h1>
      <p className="mb-2 text-gray-600">Category: {group.category}</p>
      <p className="mb-4">{group.description}</p>
      <p className="mb-2">Start Date: {new Date(group.startDate).toLocaleDateString()}</p>
      <p className="mb-6">Creator: {group.creatorName}</p>

      {!isInactive ? (
        <button onClick={handleJoin} className="btn btn-primary">
          Join Group
        </button>
      ) : (
        <p className="text-red-500 font-semibold">Group is inactive</p>
      )}
    </div>
  );
};

export default GroupDetails;
