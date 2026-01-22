import Joi from 'joi';

class CreateUserDto {
  constructor(user = {}) {
    this.email = user.email;
    this.password = user.password;
  }

  static swaggerSchema() {
    return {
      email: 'newuser@example.com',
      password: 'password123',
    };
  }

  static userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  validate() {
    const { error } = CreateUserDto.userSchema.validate(
      {
        email: this.email,
        password: this.password,
      },
      { abortEarly: false },
    );

    return {
      valid: !error,
      errors: error ? error.details.map((detail) => detail.message) : [],
    };
  }
}

export { CreateUserDto };
