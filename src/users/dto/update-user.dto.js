class UpdateUserDto {
  constructor(user = {}) {
    if (user.email !== undefined) this.email = user.email;
    if (user.password !== undefined) this.password = user.password;
  }
}

export { UpdateUserDto };
