import type { ChannelAdapter, NotificationQueue, NotificationRepository } from "./ports.js";

export class NotificationService {
  constructor(
    _repository: NotificationRepository,
    _queue: NotificationQueue,
    _adapters: Record<string, ChannelAdapter>,
  ) {}
}
