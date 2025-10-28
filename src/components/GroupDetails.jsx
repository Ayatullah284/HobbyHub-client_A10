import React, { useEffect, useState, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext"; 
import { toast } from "react-hot-toast";
import { Slide } from "react-awesome-reveal";

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
  if (loading) return <div className="text-center mt-10">Loading group details...</div>;
  if (!group) return <div className="text-center mt-10">Group not found</div>;

  const isInactive = new Date(group.startDate) < new Date();

  const handleJoin = () => {
    fetch(`http://localhost:3000/groups/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user._id }),
    })
      .then((res) => res.json())
      .then(() => toast.success("Joined the group successfully!"))
      .catch(() => toast.error("Failed to join group"));
  };

  return (
    <Slide className="max-w-3xl mx-auto my-10 p-4 sm:p-6 bg-white shadow-lg rounded-xl">
      
      {group.imageURL && (
        <img
          src={group.imageURL}
          alt={group.groupName}
          className="w-full h-52 sm:h-72 md:h-96 object-cover rounded-lg mb-6"
        />
      )}

      <h1 className="text-2xl sm:text-3xl font-bold mb-4">{group.groupName}</h1>
      <p className="mb-2 text-gray-600 text-sm sm:text-base">
        Category: {group.category}
      </p>

      <p className="mb-4 leading-relaxed text-gray-800 text-sm sm:text-base">
        {group.description}
      </p>

      <p className="mb-2 text-sm sm:text-base">
        Start Date: {new Date(group.startDate).toLocaleDateString()}
      </p>

      <p className="mb-6 text-sm sm:text-base">
        Creator: <span className="font-medium">{group.creatorName}</span>
      </p>

      {!isInactive ? (
        <button
          onClick={handleJoin}
          className="btn btn-primary w-full sm:w-auto"
        >
          Join Group
        </button>
      ) : (
        <p className="text-red-500 font-semibold">Group is no longer active</p>
      )}
      
    </Slide>
  );
};

export default GroupDetails;





