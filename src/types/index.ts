export interface RsvpSubmission {
  id: string;
  name: string;
  attendance: 'attending' | 'declined';
  guestsCount: number;
  phone?: string;
  relationship: 'bride_family' | 'groom_family' | 'bride_friend' | 'groom_friend' | 'colleague' | 'other';
  dietary?: string;
  message?: string;
  createdAt: string;
}

export interface GuestWish {
  id: string;
  name: string;
  relationship: string;
  message: string;
  createdAt: string;
  likes: number;
}

export interface ScheduleEvent {
  time: string;
  title: string;
  khmerTitle?: string;
  description: string;
  location: string;
  badge?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  category: 'traditional' | 'outdoor' | 'casual';
  url: string;
}
