export type Channel = "email" | "telegram" | "discord";
export type Priority = "normal" | "high";
export type NotificationStatus = "PENDING" | "PROCESSING" | "SENT" | "PARTIAL_FAILED" | "FAILED";
export type DeliveryStatus = "QUEUED" | "SENDING" | "SENT" | "RETRYING" | "DEAD";

export interface NotificationPayload {
  channels: Channel[];
  recipients: Record<string, unknown>;
  subject?: string;
  body: string;
  priority: Priority;
}
