import { useState } from 'react';
import TopNav from './components/TopNav';
import StoriesBar from './components/StoriesBar';
import FeedPost from './components/FeedPost';
import StoryViewer from './components/StoryViewer';
import { stories, feedPosts } from './data/mockData';
import './App.css';

export default function App() {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);

  return (
    <div className="app">
      <TopNav />
      <main className="app__feed">
        <StoriesBar stories={stories} onSelect={setActiveStoryIndex} />
        {feedPosts.map((post) => (
          <FeedPost key={post.id} post={post} />
        ))}
      </main>

      {activeStoryIndex !== null && (
        <StoryViewer
          stories={stories}
          startIndex={activeStoryIndex}
          onClose={() => setActiveStoryIndex(null)}
        />
      )}
    </div>
  );
}
