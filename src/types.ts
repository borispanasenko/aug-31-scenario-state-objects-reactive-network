export type CounterAction = 'increment' | 'decrement' | 'reset';

export interface CounterActions {
    increment: () => void;
    decrement: () => void;
    reset: () => void;
}

export interface HistoryEntry {
    id: string;
    action: CounterAction;
    value: number;
    timestamp: string;
}

export interface HistoryActions {
    addEntry: (action: CounterAction, value: number, timestamp: string) => void;
    clear: () => void;
}

export type NotificationType = 'info' | 'success' | 'warning' | 'celebration';

export interface NotificationItem {
    id: string;
    message: string;
    type: NotificationType;
}

export interface NotificationActions {
    add: (message: string, type?: NotificationType) => void;
    remove: (id: string) => void;
    clearAll: () => void;
}

export type Trend = 'stable' | 'growing' | 'declining';

export interface Stats {
    total: number;
    average: number;
    trend: Trend;
}