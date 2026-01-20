class CreateUserDto {
  constructor(user = {}) {
    this.email = user.email;
    this.password = user.password;
  }
}

export { CreateUserDto };
