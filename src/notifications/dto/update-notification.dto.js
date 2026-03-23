import Joi from 'joi';

class UpdateNotificationDto {
  constructor(notification = {}) {
    this.title = notification.title;
    this.content = notification.content;
    this.channel = notification.channel;
    this.recipient = notification.recipient;
  }

  static notificationSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    channel: Joi.string().required(),
    recipient: Joi.string().required(),
  });

  validate() {
    const { error } = UpdateNotificationDto.notificationSchema.validate(
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

export { UpdateNotificationDto };
