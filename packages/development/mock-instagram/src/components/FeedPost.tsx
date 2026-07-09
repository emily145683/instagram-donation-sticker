import { useMemo, useState } from 'react';
import type { FeedPost as FeedPostType } from '../types';

interface Props {
  post: FeedPostType;
}

export default function FeedPost({ post }: Props) {
  const images = useMemo(() => post.imageUrls ?? [], [post.imageUrls]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const hasCarousel = images.length > 1;
  const currentImageUrl = images.length > 0 ? images[Math.min(activeImageIndex, images.length - 1)] : undefined;

  const goPrev = () => {
    setActiveImageIndex((idx) => (idx === 0 ? images.length - 1 : idx - 1));
  };

  const goNext = () => {
    setActiveImageIndex((idx) => (idx === images.length - 1 ? 0 : idx + 1));
  };

  return (
    <article className="feed-post">
      <header className="feed-post__header">
        <span className="feed-post__avatar" style={{ background: post.avatarGradient }} />
        <span className="feed-post__username">{post.username}</span>
        <span className="feed-post__time">{post.timeAgo}</span>
      </header>
      <div className="feed-post__image" style={currentImageUrl ? undefined : { background: post.imageGradient }}>
        {currentImageUrl && <img src={currentImageUrl} alt={`${post.username} post image ${activeImageIndex + 1}`} />}
        {hasCarousel && (
          <>
            <button className="feed-post__carousel-btn feed-post__carousel-btn--prev" onClick={goPrev} aria-label="Previous image">
              ‹
            </button>
            <button className="feed-post__carousel-btn feed-post__carousel-btn--next" onClick={goNext} aria-label="Next image">
              ›
            </button>
            <div className="feed-post__dots" aria-label="Image position">
              {images.map((_, idx) => (
                <span key={`${post.id}-dot-${idx}`} className={`feed-post__dot ${idx === activeImageIndex ? 'is-active' : ''}`} />
              ))}
            </div>
          </>
        )}
      </div>
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
