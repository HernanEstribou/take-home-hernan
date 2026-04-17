class ChannelStrategy {
  async send(notification) {
    throw new Error('send() must be implemented by the channel');
  }
}

export { ChannelStrategy };
