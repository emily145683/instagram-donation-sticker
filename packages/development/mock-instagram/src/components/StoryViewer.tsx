import { useState } from 'react';
import type { StoryItem } from '../types';
import DonationSticker from '../features/donation/DonationSticker';

interface Props {
  stories: StoryItem[];
  startIndex: number;
  onClose: () => void;
}

export default function StoryViewer({ stories, startIndex, onClose }: Props) {
  const [index, setIndex] = useState(startIndex);
  const [ageVerified, setAgeVerified] = useState(false);
  const story = stories[index];

  const goNext = () => {
    if (index < stories.length - 1) setIndex(index + 1);
    else onClose();
  };

  const goPrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div className="story-viewer">
      <div className="story-viewer__progress">
        {stories.map((s, i) => (
          <div key={s.id} className="story-viewer__progress-bar">
            <div
              className={`story-viewer__progress-fill ${i < index ? 'is-complete' : ''} ${
                i === index ? 'is-active' : ''
              }`}
            />
          </div>
        ))}
      </div>

      <div className="story-viewer__header">
        <span className="story-viewer__avatar" style={{ background: story.avatarGradient }} />
        <span className="story-viewer__username">{story.username}</span>
        <button className="story-viewer__close" onClick={onClose} aria-label="Close story">
          ✕
        </button>
      </div>

      <div className="story-viewer__image" style={{ background: story.imageGradient }}>
        <button className="story-viewer__tap story-viewer__tap--prev" onClick={goPrev} aria-label="Previous story" />
        <button className="story-viewer__tap story-viewer__tap--next" onClick={goNext} aria-label="Next story" />

        {story.charity && (
          <DonationSticker
            charity={story.charity}
            ageVerified={ageVerified}
            onAgeVerified={() => setAgeVerified(true)}
          />
        )}
      </div>
    </div>
  );
}
