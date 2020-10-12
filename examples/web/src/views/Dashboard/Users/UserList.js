import React from 'react';
import { useUsers } from 'src/models';

const sortItems = (all) =>
  all.sort((userA, userB) => {
    if (userA.firstName !== userB.firstName) {
      return userA.firstName > userB.firstName ? 1 : -1;
    }
    return userA.lastName > userB.lastName ? 1 : -1;
  });

const UserList = () => {
  const users = useUsers(sortItems);
  return (
    <div>
      <ul style={{ listStyle: 'none', paddingInlineStart: 0 }}>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
