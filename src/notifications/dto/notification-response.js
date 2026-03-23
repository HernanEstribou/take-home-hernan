class NotificationResponseDto {
  constructor(notification = {}) {
    this.title = notification.title;
    this.content = notification.content;
    this.channel = notification.channel;
    this.recipient = notification.recipient;
  }
}

export { NotificationResponseDto };
