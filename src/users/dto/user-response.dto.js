class UserResponseDto {
  constructor(user = {}) {
    this.id = user.id;
    this.email = user.email;
  }

  static swaggerSchema() {
    return {
      id: 1,
      email: 'user@example.com',
    };
  }
}

export { UserResponseDto };
