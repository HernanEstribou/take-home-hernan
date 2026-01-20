class UserResponseDto {
  constructor(user = {}) {
    this.id = user.id;
    this.email = user.email;
  }
}

export { UserResponseDto };
