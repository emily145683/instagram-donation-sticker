import type { FeedPost as FeedPostType } from '../types';

interface Props {
  post: FeedPostType;
}

export default function FeedPost({ post }: Props) {
  return (
    <article className="feed-post">
      <header className="feed-post__header">
        <span className="feed-post__avatar" style={{ background: post.avatarGradient }} />
        <span className="feed-post__username">{post.username}</span>
        <span className="feed-post__time">{post.timeAgo}</span>
      </header>
      <div className="feed-post__image" style={{ background: post.imageGradient }} />
      <div className="feed-post__actions">
        <span>❤️</span>
        <span>💬</span>
        <span>📤</span>
      </div>
      <div className="feed-post__likes">{post.likes.toLocaleString()} likes</div>
      <div className="feed-post__caption">
        <strong>{post.username}</strong> {post.caption}
      </div>
    </article>
  );
}
