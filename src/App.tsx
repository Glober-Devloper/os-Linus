import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ContentArea } from './components/ContentArea';
import { osUnits } from './data/osContent';

function App() {
  const [activeTopicId, setActiveTopicId] = useState(osUnits[0].topics[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeTopic = osUnits
    .flatMap((unit) => unit.topics)
    .find((topic) => topic.id === activeTopicId);

  const handleTopicSelect = (topicId: string) => {
    setActiveTopicId(topicId);
    setSidebarOpen(false);
  };

  if (!activeTopic) {
    return <div>Topic not found</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        units={osUnits}
        activeTopicId={activeTopicId}
        onTopicSelect={handleTopicSelect}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <ContentArea topic={activeTopic} />
    </div>
  );
}

export default App;
