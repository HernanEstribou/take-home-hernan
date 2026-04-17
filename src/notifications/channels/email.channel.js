import Joi from 'joi';
import { ChannelStrategy } from './channel.strategy.js';

class EmailChannel extends ChannelStrategy {
  #validateRecipient(recipient) {
    const { error } = Joi.string()
      .email({ tlds: { allow: false } })
      .validate(recipient);
    if (error) {
      throw new Error(`Invalid email address: ${recipient}`);
    }
  }

  #generateTemplate(notification) {
    return `Subject: ${notification.title}\nBody: ${notification.content}`;
  }

  async send(notification) {
    this.#validateRecipient(notification.recipient);

    const template = this.#generateTemplate(notification);

    //Send simulation
    console.log(`[EMAIL] Sending to ${notification.recipient}:\n${template}`);

    return {
      state: 'sent',
      details: {
        recipient: notification.recipient,
        template,
        sent_at: new Date().toISOString(),
      },
    };
  }
}

export { EmailChannel };
