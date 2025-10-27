// src/pages/AllGroups.jsx
import { useEffect, useState } from "react";
import { Link,  } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Auth/AuthContext";

const AllGroups = () => {
  const [groups, setGroups] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:3000/allGroups") // later replace your API URL
      .then((res) => {
        setGroups(res.data);
        // console.log(res.data)
      })
      .catch((err) => console.error(err));

     
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">All Hobby Groups</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div key={group._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={group.imageURL}
                alt={group.title}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{group.groupName}</h2>
              <p className="text-sm text-gray-500">{group.category}</p>
              <p className="text-gray-700">
                {group.description?.slice(0, 80)}...
              </p>

              <div className="card-actions justify-end">
                <Link to={`/SeeMore/${group._id}`}>
                  <button className="btn btn-primary btn-sm">
                    See more
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllGroups;
