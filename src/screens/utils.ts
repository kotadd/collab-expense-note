export const findGroupUsers = (userIDs, users) => {
  let userList = {};
  users.forEach(user => {
    if (userIDs.indexOf(user.id) == -1) return;
    return (userList[user.id] = user.data().name);
  });
  return userList;
};
