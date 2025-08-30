import { useMemo } from 'react';
import { type Stats, type HistoryEntry, type Trend } from '../types';

export const useStatsState = (_counterValue: number, history: HistoryEntry[], opsTotal: number) => {
    const stats = useMemo<Stats>(() => {
        const total = opsTotal;

        const windowSize = history.length;
        const average =
            windowSize > 0
                ? history.reduce((sum, e) => sum + e.value, 0) / windowSize
                : 0;

        let trend: Trend = 'stable';
        if (windowSize >= 2) {
            const recent = history.slice(-3);
            const older  = history.slice(-6, -3);
            const recentAvg = recent.reduce((s, e) => s + e.value, 0) / recent.length;
            const olderAvg  = older.length > 0 ? older.reduce((s, e) => s + e.value, 0) / older.length : recentAvg;

            if (recentAvg > olderAvg + 1) trend = 'growing';
            else if (recentAvg < olderAvg - 1) trend = 'declining';
        }

        return { total, average: Math.round(average * 100) / 100, trend };
    }, [history, opsTotal]);

    return { stats };
};
