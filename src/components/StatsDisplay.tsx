// src/components/StatsDisplay.tsx
import React from 'react';
import { type Stats } from '../types.ts'; // Предположим, вы экспортируете интерфейс

interface StatsDisplayProps {
    stats: Stats;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats }) => {
    return (
        <section className="card">
            <h2 className="section-title">Stats</h2>
            <div className="space-y-3">
                <div className="flex justify-between">
                    <span className="muted">Total Operations:</span>
                    <span className="font-semibold">{stats.total}</span>
                </div>
                <div className="flex justify-between">
                    <span className="muted">Average Value:</span>
                    <span className="font-semibold">{stats.average}</span>
                </div>
                <div className="flex justify-between">
                    <span className="muted">Trend:</span>
                    <span className={'font-semibold ' +
                        (stats.trend === 'growing' ? 'text-green-600' :
                            stats.trend === 'declining' ? 'text-red-600' : 'text-gray-600')}>
                        {stats.trend === 'growing' ? '📈 Growing' :
                            stats.trend === 'declining' ? '📉 Declining' : '➡️ Stable'}
                    </span>
                </div>
            </div>
        </section>
    );
};

export default StatsDisplay;