import type { NotificationPayload } from "../shared/types.js";

export interface NotificationRepository {
  create: (...args: unknown[]) => unknown;
  findById: (...args: unknown[]) => unknown;
  findByIdempotencyKey: (...args: unknown[]) => unknown;
}

export interface NotificationQueue {
  enqueue: (...args: unknown[]) => unknown;
}

export interface ChannelAdapter {
  send(payload: NotificationPayload): Promise<{ providerMessageId: string }>;
}
