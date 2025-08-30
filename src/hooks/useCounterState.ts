import { useState } from 'react';
import { type CounterActions, type CounterAction } from '../types';

export const useCounterState = (initialValue: number = 0) => {
    const [value, setValue] = useState<number>(initialValue);
    const [lastAction, setLastAction] = useState<{
        action: CounterAction;
        timestamp: string;
    } | null>(null);

    const actions: CounterActions = {
        increment: () => {
            setValue(prev => prev + 1);
            setLastAction({ action: 'increment', timestamp: new Date().toLocaleTimeString() });
        },
        decrement: () => {
            setValue(prev => prev - 1);
            setLastAction({ action: 'decrement', timestamp: new Date().toLocaleTimeString() });
        },
        reset: () => {
            setValue(0);
            setLastAction({ action: 'reset', timestamp: new Date().toLocaleTimeString() });
        }
    };

    return { value, actions, lastAction };
};