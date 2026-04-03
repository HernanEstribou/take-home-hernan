class NotificationResponseDto {
  constructor(notification = {}) {
    this.title = notification.title;
    this.content = notification.content;
    this.channel = notification.channel;
    this.recipient = notification.recipient;
  }

  static swaggerSchema() {
    return {
      id: 1,
      userId: 1,
      title: 'Welcome',
      content: 'Your notification content',
      channel: 'email',
      recipient: 'user@example.com',
      created_at: '2026-01-01T00:00:00.000Z',
      updated_at: '2026-01-01T00:00:00.000Z',
    };
  }
}

export { NotificationResponseDto };
