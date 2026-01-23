import { query } from '../config/database.js';

const getAllUsers = async () => {
  const result = await query('SELECT * FROM users');
  return result.rows;
};

const getOneUser = async (id) => {
  const result = await query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

const createNewUser = async (user) => {
  const result = await query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
    [user.email, user.password],
  );
  return result.rows[0];
};

const updateOneUser = async (id, userDto) => {
  const result = await query(
    'UPDATE users SET email = $1, password = $2 WHERE id = $3 RETURNING *',
    [userDto.email, userDto.password, id],
  );
  return result.rows[0];
};

const deleteOneUser = async (id) => {
  const result = await query('DELETE FROM users WHERE id = $1 RETURNING *', [
    id,
  ]);
  return result.rows[0];
};

export { getAllUsers, getOneUser, createNewUser, updateOneUser, deleteOneUser };
