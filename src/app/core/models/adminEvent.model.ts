export interface AdminEvent {
  id: number;
  title: string;
  description?: string;
  eventDate: string;
  reminderTime: string | null;
  reminderSent: boolean;
  reminderSentTime: string | null;
  userEmail: string;
}