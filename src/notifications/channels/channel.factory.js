import { EmailChannel } from './email.channel.js';
import { SmsChannel } from './sms.channel.js';
import { PushChannel } from './push.channel.js';

const channels = {
  email: new EmailChannel(),
  sms: new SmsChannel(),
  push: new PushChannel(),
};

const getChannel = (channelName) => {
  const channel = channels[channelName];

  if (!channel) {
    throw new Error(`Channel "${channelName}" is not supported`);
  }

  return channel;
};

export { getChannel };
