// src/hooks/useHistoryState.ts
import { useCallback, useMemo, useState } from 'react';
import { type HistoryActions, type HistoryEntry, type CounterAction } from '../types';

export const useHistoryState = (opts?: { countReset?: boolean }) => {
    const countReset = opts?.countReset ?? true;              // ← конфиг, считать ли reset
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [totalOps, setTotalOps] = useState<number>(0);      // ← бесконечный счётчик

    const addEntry = useCallback(
        (action: CounterAction, value: number, timestamp: string) => {
            const id =
                typeof crypto !== 'undefined' && 'randomUUID' in crypto
                    ? crypto.randomUUID()
                    : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

            // держим только последние 10 в истории
            setHistory(prev => [...prev.slice(-9), { id, action, value, timestamp }]);

            // увеличиваем total независимо от длины истории
            setTotalOps(t => t + (countReset || action !== 'reset' ? 1 : 0));
        },
        [countReset]
    );

    const clear = useCallback(() => {
        // чистим только список, НО НЕ сбрасываем totalOps
        setHistory([]);
    }, []);

    const resetTotals = useCallback(() => {
        // опционально: ручной сброс глобального счётчика
        setTotalOps(0);
    }, []);

    const actions: HistoryActions = useMemo(
        () => ({ addEntry, clear }),
        [addEntry, clear]
    );

    // возвращаем totalOps отдельно
    return { history, actions: actions, totalOps, resetTotals };
};
