import Joi from 'joi';

class CreateNotificationDto {
  constructor(notification = {}) {
    this.title = notification.title;
    this.content = notification.content;
    this.channel = notification.channel;
    this.recipient = notification.recipient;
  }

  static notificationSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    channel: Joi.string().valid('email', 'sms', 'push').required(),
    recipient: Joi.string().required(),
  });

  static swaggerSchema() {
    return {
      title: 'Welcome',
      content: 'Your notification content',
      channel: 'email',
      recipient: 'user@example.com',
    };
  }

  validate() {
    const { error } = CreateNotificationDto.notificationSchema.validate(
      {
        title: this.title,
        content: this.content,
        channel: this.channel,
        recipient: this.recipient,
      },
      { abortEarly: false },
    );

    return {
      valid: !error,
      errors: error ? error.details.map((detail) => detail.message) : [],
    };
  }
}

export { CreateNotificationDto };
