import { X } from 'lucide-react';
import { GameState } from '../types/game';
import { DossierSidebar } from './DossierSidebar';
import { CharacterId } from '../types/game';

interface DossierSheetProps {
  open: boolean;
  state: GameState;
  leadCharacterId: Exclude<CharacterId, 'narrator' | 'player'>;
  onClose: () => void;
  onOpenPhone: () => void;
}

export function DossierSheet({
  open,
  state,
  leadCharacterId,
  onClose,
  onOpenPhone,
}: DossierSheetProps) {
  if (!open) return null;

  return (
    <div
      className="absolute inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-end justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="实时档案与行为标签"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#F6F6F3] rounded-t-3xl border-t border-stone-300 max-h-[84dvh] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Handle + Header */}
        <div className="pt-2.5 pb-3 px-5 bg-white border-b border-stone-200 shrink-0">
          <div className="w-10 h-1.5 bg-stone-300 rounded-full mx-auto mb-3" />
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#181A1F]">
              随身档案 · {state.protagonistName}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] min-w-[44px] -mr-2 flex items-center justify-center text-stone-500 hover:text-[#181A1F] cursor-pointer"
              aria-label="关闭档案抽屉"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto flex-1">
          <DossierSidebar
            state={state}
            leadCharacterId={leadCharacterId}
            onOpenPhone={() => {
              onClose();
              onOpenPhone();
            }}
          />
        </div>
      </div>
    </div>
  );
}
