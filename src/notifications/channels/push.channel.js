import Joi from 'joi';
import { ChannelStrategy } from './channel.strategy.js';

class PushChannel extends ChannelStrategy {
  #validateToken(recipient) {
    // Validación de Token alfanumérico de entre 32 y 255 caracteres
    // Ejemplo: dR3xK92mPQs4FjJXaarJ5cFkpXH2KT2EkLmN8vYbZ1qWo9uCxR6sTgDhEpViAw7j
    const { error } = Joi.string()
      .alphanum()
      .min(32)
      .max(255)
      .validate(recipient);
    if (error) {
      throw new Error(`Invalid device token: ${recipient}`);
    }
  }

  #formatPayload(notification) {
    // Formato estándar compatible con Firebase Cloud Messaging (FCM) / APNs
    return {
      notification: {
        title: notification.title,
        body: notification.content,
      },
      token: notification.recipient,
    };
  }

  async send(notification) {
    this.#validateToken(notification.recipient);

    const payload = this.#formatPayload(notification);

    // Simulación del envío
    console.log(`[PUSH] Sending to token ${notification.recipient}:`, payload);

    return {
      state: 'sent',
      details: {
        token: notification.recipient,
        payload,
        sent_at: new Date().toISOString(),
      },
    };
  }
}

export { PushChannel };
