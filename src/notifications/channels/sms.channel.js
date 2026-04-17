import Joi from 'joi';
import { ChannelStrategy } from './channel.strategy.js';

class SmsChannel extends ChannelStrategy {
  #validateRecipient(recipient) {
    // Regex: ^        → inicio del string
    //        \+?      → signo + opcional (para prefijo internacional, ej: +54)
    //        [1-9]    → primer dígito entre 1-9 (no puede empezar con 0)
    //        \d{7,14} → entre 7 y 14 dígitos adicionales
    //        $        → fin del string
    // Ejemplos válidos: +5491112345678, 01112345678 (no válido), 5491112345678
    const { error } = Joi.string()
      .pattern(/^\+?[1-9]\d{7,14}$/)
      .validate(recipient);
    if (error) {
      throw new Error(`Invalid phone number: ${recipient}`);
    }
  }

  #truncateContent(content) {
    if (content.length > 160) {
      console.warn('[SMS] Content exceeds 160 characters, truncating.');
      return content.slice(0, 160);
    }
    return content;
  }

  async send(notification) {
    this.#validateRecipient(notification.recipient);

    const content = this.#truncateContent(notification.content);

    // Simulación del envío
    console.log(`[SMS] Sending to ${notification.recipient}: ${content}`);

    return {
      state: 'sent',
      details: {
        recipient: notification.recipient,
        content,
        sent_at: new Date().toISOString(),
      },
    };
  }
}

export { SmsChannel };
