import type { ChannelAdapter } from "../core/ports.js";
import type { NotificationPayload } from "../shared/types.js";

export class TelegramAdapter implements ChannelAdapter {
  async send(_payload: NotificationPayload): Promise<{ providerMessageId: string }> {
    throw new Error("Telegram adapter is not implemented");
  }
}
