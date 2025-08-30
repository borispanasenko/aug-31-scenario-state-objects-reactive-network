// src/components/CounterAppContainer.tsx
import { useEffect } from 'react';
import { useCounterState } from '../hooks/useCounterState';
import { useHistoryState } from '../hooks/useHistoryState';
import { useNotificationState } from '../hooks/useNotificationState';
import { useStatsState } from '../hooks/useStatsState';

// Импортируем "глупые" компоненты
import CounterDisplay from './CounterDisplay';
import HistoryList from './HistoryList';
import NotificationsList from './NotificationsList';
import StatsDisplay from './StatsDisplay';

// Container - управляет состоянием и логикой
const CounterAppContainer = () => {
    const counter = useCounterState(0);
    const history = useHistoryState({ countReset: true });
    const notifications = useNotificationState();
    const stats = useStatsState(counter.value, history.history, history.totalOps);


// Достаём стабильные функции
    const { addEntry } = history.actions;
    const { add: notify } = notifications.actions;

    useEffect(() => {
        if (!counter.lastAction) return;

        const { action, timestamp } = counter.lastAction;
        const message = `Counter ${action === 'increment' ? 'increased' : action === 'decrement' ? 'decreased' : 'reset'}`;

        addEntry(action, counter.value, timestamp);
        notify(message, 'success');

        if (counter.value === 10) notify('🎉 Reached 10!', 'celebration');
        else if (counter.value < 0) notify('⚠️ Value is negative', 'warning');

        // Стабильные ссылки
    }, [counter.value, counter.lastAction, addEntry, notify]);


    // 3. Передаём данные и функции "глупым" компонентам
    return (
        <div className="mx-auto max-w-4xl p-6">
            <h1 className="mb-8 text-center text-3xl font-bold tracking-tight">
                Reactive State Objects Network / Modular 'useEffect' Architecture
            </h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <CounterDisplay value={counter.value} actions={counter.actions} />
                <StatsDisplay stats={stats.stats} />
                <HistoryList history={history.history} onClear={history.actions.clear} />
                <NotificationsList notifications={notifications.notifications} />
            </div>
        </div>
    );
};

export default CounterAppContainer;