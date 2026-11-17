import { useState } from 'react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  GitBranch,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import {
  BUTTERFLY_LINKS,
  INITIAL_GAME_STATE,
  LEVELS,
  getChoiceFromHistory,
} from '../data/gameData';
import { GameState } from '../types/game';

interface CausalTreeViewProps {
  state: GameState;
}

type TreeSubMode = 'tree' | 'butterfly' | 'template';

export function CausalTreeView({ state }: CausalTreeViewProps) {
  const [subMode, setSubMode] = useState<TreeSubMode>('tree');
  const [selectedLevelId, setSelectedLevelId] = useState<string>('1-2');
  const [copied, setCopied] = useState(false);

  const selectedLevel = LEVELS.find((l) => l.id === selectedLevelId) ?? LEVELS[0];
  const sampleOutcomes = selectedLevel.choices.map((c) => ({
    choice: c,
    delta: c.computeOutcome(INITIAL_GAME_STATE),
  }));

  const handleCopyMarkdown = () => {
    const lines = [
      `【关卡编号】：${selectedLevel.code}`,
      `【场景名称】：${selectedLevel.sceneName}`,
      `【核心知识点】：${selectedLevel.coreKnowledge.join('、')}`,
      `【前置条件】：${selectedLevel.preconditionDesc}`,
      `剧情引入：${selectedLevel.baseIntro}`,
      ...sampleOutcomes.map(
        ({ choice, delta }) =>
          `【选项${choice.key}】${choice.label}：积分${
            delta.reformScore >= 0 ? '+' : ''
          }${delta.reformScore}，认知+${delta.legalLiteracy}%，${delta.futureHint}`
      ),
    ].join('\n');
    navigator.clipboard?.writeText(lines).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F6F6F3] min-h-0">
      <header className="shrink-0 bg-[#12161F] text-white px-4 h-14 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-amber-300" />
          <h1 className="text-base font-semibold">因果图谱与模板</h1>
        </div>
        <span className="text-xs text-stone-400 font-mono-tabular">14 幕联动</span>
      </header>

      {/* Sub-mode Segmented Control */}
      <div className="shrink-0 bg-white border-b border-stone-200 p-2.5">
        <div className="grid grid-cols-3 gap-1 p-1 bg-stone-100 rounded-xl">
          {(
            [
              { id: 'tree', label: '14关选择树' },
              { id: 'butterfly', label: '蝴蝶效应链' },
              { id: 'template', label: '关卡模板' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSubMode(tab.id)}
              className={`py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                subMode === tab.id
                  ? 'bg-white text-[#181A1F] shadow-xs font-semibold'
                  : 'text-stone-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3.5 space-y-4">
        {subMode === 'tree' && (
          <>
            {([1, 2, 3] as const).map((ch) => {
              const chLevels = LEVELS.filter((l) => l.chapter === ch);
              return (
                <div
                  key={ch}
                  className="bg-white border border-stone-200 rounded-2xl p-3.5 space-y-2.5"
                >
                  <div className="text-xs font-semibold text-[#1E3A5F]">
                    {chLevels[0].chapterTitle}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {chLevels.map((lvl) => {
                      const historyItem = getChoiceFromHistory(state, lvl.id);
                      const isSelected = selectedLevel.id === lvl.id;
                      return (
                        <button
                          key={lvl.id}
                          type="button"
                          onClick={() => setSelectedLevelId(lvl.id)}
                          className={`text-left p-2.5 rounded-xl border transition-colors cursor-pointer ${
                            isSelected
                              ? 'border-[#1E3A5F] bg-[#1E3A5F]/[0.06]'
                              : historyItem
                              ? 'border-emerald-300 bg-emerald-50/40'
                              : 'border-stone-200 bg-stone-50/60'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] mb-0.5">
                            <span className="font-mono-tabular text-stone-500">
                              {lvl.id}
                            </span>
                            {historyItem ? (
                              <span className="inline-flex items-center gap-0.5 text-emerald-700 font-semibold">
                                <CheckCircle2 className="w-3 h-3" />
                                选{historyItem.choiceKey}
                              </span>
                            ) : (
                              <span className="text-stone-400">待演练</span>
                            )}
                          </div>
                          <div className="text-xs font-semibold text-[#181A1F] truncate">
                            {lvl.sceneName}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Selected Node Detail */}
            <div className="bg-white border border-stone-200 rounded-2xl p-4 space-y-2.5">
              <div className="text-xs text-stone-500 font-mono-tabular">
                {selectedLevel.code} · {selectedLevel.sceneName}
              </div>
              {selectedLevel.choices.map((c) => {
                const delta = c.computeOutcome(state);
                return (
                  <div
                    key={c.key}
                    className="p-3 rounded-xl border border-stone-200 bg-stone-50 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between font-semibold text-[#181A1F]">
                      <span>
                        {c.key}. {c.label}
                      </span>
                      <span className="font-mono-tabular text-[#1E3A5F]">
                        积分{delta.reformScore >= 0 ? '+' : ''}
                        {delta.reformScore}
                      </span>
                    </div>
                    <p className="text-stone-600">{delta.futureHint}</p>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {subMode === 'butterfly' && (
          <div className="space-y-3">
            {BUTTERFLY_LINKS.map((link) => {
              const isTriggered = state.history.some(
                (h) =>
                  h.levelId === link.sourceLevelId &&
                  h.choiceKey === link.sourceChoiceKey
              );
              return (
                <div
                  key={link.id}
                  className={`p-4 rounded-2xl border space-y-1.5 ${
                    isTriggered
                      ? 'bg-emerald-50/70 border-emerald-300'
                      : 'bg-white border-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-stone-500">
                    <span className="inline-flex items-center gap-1 font-mono-tabular">
                      {link.sourceLevelId}
                      <ArrowRight className="w-3 h-3" />
                      {link.targetLevelId}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 font-semibold ${
                        link.polarity === 'positive'
                          ? 'text-emerald-700'
                          : link.polarity === 'risk'
                          ? 'text-red-700'
                          : 'text-amber-700'
                      }`}
                    >
                      {link.polarity === 'risk' ? (
                        <ShieldAlert className="w-3 h-3" />
                      ) : (
                        <Sparkles className="w-3 h-3" />
                      )}
                      {isTriggered ? '本局已触发' : link.polarity === 'risk' ? '风险代价' : '正向联动'}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-[#181A1F]">
                    {link.effectTitle}
                  </div>
                  <div className="text-xs text-[#1E3A5F]">
                    {link.sourceLabel} → {link.targetLabel}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {link.mechanismNote}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {subMode === 'template' && (
          <div className="space-y-3">
            <div className="bg-white border border-stone-200 rounded-2xl p-3.5 space-y-2.5">
              <label
                htmlFor="mobile-tpl-select"
                className="text-xs font-semibold text-[#181A1F] block"
              >
                选择检视关卡模板：
              </label>
              <select
                id="mobile-tpl-select"
                value={selectedLevel.id}
                onChange={(e) => setSelectedLevelId(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-stone-300 bg-stone-50 text-sm text-[#181A1F]"
              >
                {LEVELS.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.code} · {l.sceneName}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="w-full h-10 rounded-xl bg-[#1E3A5F] text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? '已复制模板文本' : '复制本关通用模板'}</span>
              </button>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-4 space-y-3 text-xs">
              <div>
                <span className="text-stone-500">【关卡编号】</span>
                <span className="font-semibold text-[#181A1F] ml-1">
                  {selectedLevel.code}
                </span>
              </div>
              <div>
                <span className="text-stone-500">【场景名称】</span>
                <span className="font-semibold text-[#181A1F] ml-1">
                  {selectedLevel.sceneName}
                </span>
              </div>
              <div>
                <span className="text-stone-500">【核心知识点】</span>
                <span className="text-[#1E3A5F] ml-1">
                  {selectedLevel.coreKnowledge.join(' / ')}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 leading-relaxed text-[#181A1F]">
                {selectedLevel.baseIntro}
              </div>

              {sampleOutcomes.map(({ choice, delta }) => (
                <div
                  key={choice.key}
                  className="p-3 rounded-xl border border-stone-200 space-y-1"
                >
                  <div className="font-semibold text-[#181A1F]">
                    选项 {choice.key} · {choice.label}
                  </div>
                  <div className="font-mono-tabular text-[#1E3A5F]">
                    积分 {delta.reformScore >= 0 ? '+' : ''}
                    {delta.reformScore} · 认知 +{delta.legalLiteracy}% · 管教信任{' '}
                    {delta.officerTrust >= 0 ? '+' : ''}
                    {delta.officerTrust}
                  </div>
                  <div className="text-stone-600">{delta.futureHint}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
