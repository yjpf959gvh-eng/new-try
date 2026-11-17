import {
  BookOpen,
  CalendarDays,
  GitBranch,
  HeartHandshake,
  MessageCircle,
} from 'lucide-react';
import { AppView } from '../types/game';

interface MobileBottomNavProps {
  activeView: AppView;
  unreadPhoneCount: number;
  pendingNewcomersCount: number;
  onNavigate: (view: AppView) => void;
}

const TABS: {
  id: AppView;
  label: string;
  Icon: typeof MessageCircle;
}[] = [
  { id: 'play', label: '剧情', Icon: MessageCircle },
  { id: 'daily', label: '日常', Icon: CalendarDays },
  { id: 'bonds', label: '羁绊', Icon: HeartHandshake },
  { id: 'cards', label: '卡册', Icon: BookOpen },
  { id: 'tree', label: '图谱', Icon: GitBranch },
];

export function MobileBottomNav({
  activeView,
  unreadPhoneCount,
  pendingNewcomersCount,
  onNavigate,
}: MobileBottomNavProps) {
  return (
    <nav
      aria-label="主导航"
      className="shrink-0 z-40 bg-[#12161F]/95 backdrop-blur-md border-t border-white/10 grid grid-cols-5 h-16 px-1"
    >
      {TABS.map(({ id, label, Icon }) => {
        const isActive = activeView === id;
        const badgeCount =
          id === 'bonds'
            ? unreadPhoneCount
            : id === 'daily'
            ? pendingNewcomersCount
            : 0;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onNavigate(id)}
            className={`relative flex flex-col items-center justify-center min-h-[48px] transition-colors cursor-pointer focus-visible:outline-none ${
              isActive ? 'text-amber-300' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <div className="relative">
              <Icon
                className={`w-5 h-5 ${isActive ? 'stroke-[2.25]' : 'stroke-[1.75]'}`}
                aria-hidden="true"
              />
              {badgeCount > 0 && (
                <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center font-mono-tabular">
                  {badgeCount}
                </span>
              )}
            </div>
            <span
              className={`text-[11px] mt-1 tracking-tight whitespace-nowrap ${
                isActive ? 'font-semibold' : 'font-medium'
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
