import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Auth/AuthContext";

const AllGroups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/allGroups")
      .then((res) => {
        setGroups(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 ">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        All Hobby Groups
      </h2>

      {groups.length === 0 ? (
        <p className="text-center text-gray-500">No groups available</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition">
              <figure className="h-48 overflow-hidden">
                <img
                  src={group.imageURL}
                  alt={group.title}
                  className="w-full h-full object-cover "
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{group.groupName}</h2>
                <p className="text-sm text-gray-500">{group.category}</p>
                <p className="text-gray-700">{group.description?.slice(0, 80)}...</p>

                <div className="card-actions justify-end mt-2">
                  <Link to={`/groupDetails/${group._id}`}>
                    <button className="btn btn-primary btn-sm">
                      See more
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllGroups;
