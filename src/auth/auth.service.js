import * as authRepository from './auth.repository.js';
import bcrypt from 'bcrypt';

const validateUser = async (email, password) => {
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return null;
  }

  return user;
};

export { validateUser };
