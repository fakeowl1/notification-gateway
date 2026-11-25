import type { ChannelAdapter } from "../core/ports.js";
import type { NotificationPayload } from "../shared/types.js";

export class DiscordAdapter implements ChannelAdapter {
  async send(_payload: NotificationPayload): Promise<{ providerMessageId: string }> {
    throw new Error("Discord adapter is not implemented");
  }
}
