import type { Charity, StoryItem, FeedPost } from '../types';

export const charities: Charity[] = [
  {
    id: 'ocean-cleanup',
    name: 'Ocean Cleanup Trust',
    emoji: '🌊',
    websiteUrl: 'https://example-charity.org/ocean-cleanup',
    fact: 'Every £5 removes roughly 1kg of plastic from the ocean.',
    totalDonatedTodayGBP: 482,
    othersDonatedToday: 63,
    impactStatements: [
      { amount: 3, description: 'can fund a week of coastal plastic collection' },
      { amount: 5, description: "can fund 10 days' worth of ocean plastic removal" },
      { amount: 10, description: 'can fund a full beach cleanup session' },
    ],
  },
  {
    id: 'youth-mind',
    name: 'Youth Mind Support',
    emoji: '💛',
    websiteUrl: 'https://example-charity.org/youth-mind',
    fact: '1 in 6 young people experience a mental health problem each year.',
    totalDonatedTodayGBP: 210,
    othersDonatedToday: 29,
    impactStatements: [
      { amount: 3, description: 'can fund a week of peer support chat access' },
      { amount: 5, description: 'can fund 10 days of helpline support' },
      { amount: 10, description: 'can fund a full counselling session' },
    ],
  },
];

export const stories: StoryItem[] = [
  {
    id: 'story-1',
    username: 'jess.codes',
    avatarGradient: 'linear-gradient(135deg,#f58529,#dd2a7b)',
    imageGradient: 'linear-gradient(160deg,#2b5876,#4e4376)',
    imageUrl: 'https://picsum.photos/seed/ocean-cleanup/800/1400',
    charity: charities[0],
  },
  {
    id: 'story-2',
    username: 'sam_travels',
    avatarGradient: 'linear-gradient(135deg,#833ab4,#fd1d1d)',
    imageGradient: 'linear-gradient(160deg,#11998e,#38ef7d)',
    imageUrl: 'https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=1200&h=2000&dpr=2',
  },
  {
    id: 'story-3',
    username: 'mia.makes',
    avatarGradient: 'linear-gradient(135deg,#fcb045,#fd1d1d)',
    imageGradient: 'linear-gradient(160deg,#ff512f,#dd2476)',
    imageUrl: 'https://picsum.photos/seed/mia-craft-story/800/1400',
    charity: charities[1],
  },
  {
    id: 'story-4',
    username: 'theo.b',
    avatarGradient: 'linear-gradient(135deg,#00c6ff,#0072ff)',
    imageGradient: 'linear-gradient(160deg,#232526,#414345)',
  },
  {
    id: 'story-5',
    username: 'ella_draws',
    avatarGradient: 'linear-gradient(135deg,#f7971e,#ffd200)',
    imageGradient: 'linear-gradient(160deg,#5f2c82,#49a09d)',
  },
];

export const feedPosts: FeedPost[] = [
  {
    id: 'post-1',
    username: 'jess.codes',
    avatarGradient: 'linear-gradient(135deg,#f58529,#dd2a7b)',
    imageGradient: 'linear-gradient(160deg,#2b5876,#4e4376)',
    imageUrls: [
      'https://picsum.photos/seed/feed-ocean-1/1080/1080',
      'https://picsum.photos/seed/feed-ocean-2/1080/1080',
      'https://picsum.photos/seed/feed-ocean-3/1080/1080',
    ],
    caption: 'Beach cleanup this weekend 🌊',
    likes: 482,
    timeAgo: '2h',
  },
  {
    id: 'post-2',
    username: 'sam_travels',
    avatarGradient: 'linear-gradient(135deg,#833ab4,#fd1d1d)',
    imageGradient: 'linear-gradient(160deg,#11998e,#38ef7d)',
    imageUrls: [
      'https://picsum.photos/seed/feed-travel-1/1080/1080',
      'https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=1080&h=1080&fit=crop&dpr=2',
      'https://picsum.photos/seed/feed-travel-3/1080/1080',
    ],
    caption: 'Golden hour hits different 🌅',
    likes: 1204,
    timeAgo: '4h',
  },
  {
    id: 'post-3',
    username: 'mia.makes',
    avatarGradient: 'linear-gradient(135deg,#fcb045,#fd1d1d)',
    imageGradient: 'linear-gradient(160deg,#ff512f,#dd2476)',
    imageUrls: [
      'https://picsum.photos/seed/mia-craft-feed-1/1080/1080',
      'https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg?auto=compress&cs=tinysrgb&w=1080&h=1080&fit=crop&dpr=2',
      'https://picsum.photos/seed/mia-craft-feed-3/1080/1080',
    ],
    caption: 'New piece finished today 🎨',
    likes: 356,
    timeAgo: '6h',
  },
];
