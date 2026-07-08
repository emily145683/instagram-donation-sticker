export interface Charity {
  id: string;
  name: string;
  emoji: string;
  websiteUrl: string;
  fact: string;
  totalDonatedTodayGBP: number;
  othersDonatedToday: number;
}

export interface StoryItem {
  id: string;
  username: string;
  avatarGradient: string;
  imageGradient: string;
  charity?: Charity;
}

export interface FeedPost {
  id: string;
  username: string;
  avatarGradient: string;
  imageGradient: string;
  caption: string;
  likes: number;
  timeAgo: string;
}
