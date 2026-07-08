import type { StoryItem } from '../types';

interface Props {
  stories: StoryItem[];
  onSelect: (index: number) => void;
}

export default function StoriesBar({ stories, onSelect }: Props) {
  return (
    <div className="stories-bar">
      {stories.map((story, i) => (
        <button key={story.id} className="stories-bar__item" onClick={() => onSelect(i)}>
          <span className="stories-bar__avatar" style={{ background: story.avatarGradient }}>
            {story.charity && <span className="stories-bar__charity-dot" title="Has donation sticker" />}
          </span>
          <span className="stories-bar__username">{story.username}</span>
        </button>
      ))}
    </div>
  );
}
