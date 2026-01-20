const getAllUsers = () => {
  const response = [
    { id: 1, email: 'user1@example.com', password: 'hashedPassword123' },
    { id: 2, email: 'user2@example.com', password: 'hashedPassword456' },
    { id: 3, email: 'user3@example.com', password: 'hashedPassword789' },
  ];

  return response;
};

const getOneUser = (id) => {
  const response = {
    id: parseInt(id),
    email: `user${id}@example.com`,
    password: 'hashedPassword123',
  };

  return response;
};

const createNewUser = (user) => {
  const response = {
    id: Math.floor(Math.random() * 1000) + 4,
    email: user.email,
    password: user.password,
  };

  return response;
};

const updateOneUser = (id, userDto) => {
  const response = {
    id: parseInt(id),
    email: userDto.email || `user${id}@example.com`,
    password: userDto.password || 'hashedPassword123',
  };

  return response;
};

const deleteOneUser = (id) => {
  const response = {
    id: parseInt(id),
    email: `user${id}@example.com`,
    password: 'hashedPassword123',
  };

  return response;
};

export { getAllUsers, getOneUser, createNewUser, updateOneUser, deleteOneUser };
