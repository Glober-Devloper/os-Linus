import { BookOpen, Menu, X } from 'lucide-react';
import { Unit } from '../types/content';

interface SidebarProps {
  units: Unit[];
  activeTopicId: string;
  onTopicSelect: (topicId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ units, activeTopicId, onTopicSelect, isOpen, onToggle }: SidebarProps) {
  return (
    <>
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 text-white rounded-lg shadow-lg hover:bg-slate-700 transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-80 bg-slate-900 text-slate-100
          overflow-y-auto border-r border-slate-800 transition-transform duration-300 z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <BookOpen size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold">OS II & Linux</h1>
              <p className="text-sm text-slate-400">Interactive Learning</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          {units.map((unit) => (
            <div key={unit.id} className="mb-6">
              <div className="px-3 py-2 mb-2">
                <h2 className="font-semibold text-blue-400 text-sm uppercase tracking-wider">
                  {unit.title}
                </h2>
                <p className="text-xs text-slate-500 mt-1">{unit.hours} Hours</p>
              </div>
              <ul className="space-y-1">
                {unit.topics.map((topic) => (
                  <li key={topic.id}>
                    <button
                      onClick={() => onTopicSelect(topic.id)}
                      className={`
                        w-full text-left px-3 py-2 rounded-lg text-sm transition-all
                        ${
                          activeTopicId === topic.id
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }
                      `}
                    >
                      {topic.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={onToggle}
        />
      )}
    </>
  );
}
