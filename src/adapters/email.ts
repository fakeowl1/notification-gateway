import type { ChannelAdapter } from "../core/ports.js";
import type { NotificationPayload } from "../shared/types.js";

export class EmailAdapter implements ChannelAdapter {
  async send(_payload: NotificationPayload): Promise<{ providerMessageId: string }> {
    throw new Error("Email adapter is not implemented");
  }
}
