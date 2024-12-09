import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Userlist = ({ updatedUsers, setUpdatedUsers }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const combinedUsers = [...updatedUsers, ...users.filter(u => !updatedUsers.find(up => up.id === u.id))];

  return (
    <div className="relative flex flex-col rounded-lg bg-white shadow-sm border border-slate-200">
      <h1 className="text-lg font-bold p-3 border-b border-slate-200">Users List</h1>
      <nav className="flex min-w-[240px] flex-col gap-2 p-2">
        {combinedUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-3 p-3 rounded-md transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
          >
            <img
              src={user.profilePicture || '/DefaultLogo.jpeg'}
              alt={`${user.name}'s profile`}
              className="w-10 h-10 rounded-full object-cover border"
            />
            <Link to={`/edit/${user.id}`} className="flex-1 text-slate-800 text-sm font-medium">
              {user.name}
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Userlist;
