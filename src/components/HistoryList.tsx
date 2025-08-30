// src/components/HistoryList.tsx
import React from 'react';
import { type HistoryEntry } from '../types.ts'; // Предположим, вы экспортируете интерфейс

interface HistoryListProps {
    history: HistoryEntry[];
    onClear: () => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onClear }) => {
    return (
        <section className="card">
            <h2 className="section-title">History (last 10)</h2>
            <div className="max-h-48 space-y-2 overflow-y-auto">
                {[...history].reverse().map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between rounded bg-surface-2 p-2 text-sm">
                        <span className="font-medium capitalize">{entry.action}</span>
                        <span className="font-semibold text-primary">{entry.value}</span>
                        <span className="text-xs text-muted">{entry.timestamp}</span>
                    </div>
                ))}
            </div>
            {history.length > 0 && (
                <button onClick={onClear} className="btn mt-3 btn-neutral-ghost">
                    Clear
                </button>
            )}
        </section>
    );
};

export default HistoryList;