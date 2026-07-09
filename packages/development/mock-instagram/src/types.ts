export interface ImpactStatement {
  amount: number;
  /** e.g. "can fund a week of coastal plastic collection" */
  description: string;
}

export interface Charity {
  id: string;
  name: string;
  emoji: string;
  websiteUrl: string;
  fact: string;
  totalDonatedTodayGBP: number;
  othersDonatedToday: number;
  impactStatements: ImpactStatement[];
}

export interface StoryItem {
  id: string;
  username: string;
  avatarGradient: string;
  imageGradient: string;
  /** Optional real photo URL; falls back to imageGradient when not set. */
  imageUrl?: string;
  charity?: Charity;
}

export interface FeedPost {
  id: string;
  username: string;
  avatarGradient: string;
  imageGradient: string;
  /** Optional photo list for carousel-style feed posts. */
  imageUrls?: string[];
  caption: string;
  likes: number;
  timeAgo: string;
}
