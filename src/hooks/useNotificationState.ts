// useNotificationState.ts
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { type NotificationItem, type NotificationActions, type NotificationType } from '../types';

export const useNotificationState = (duration = 3000) => {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const batchTimerRef = useRef<number | null>(null);

    const restartBatchTimer = useCallback(() => {
        if (batchTimerRef.current) clearTimeout(batchTimerRef.current);
        batchTimerRef.current = window.setTimeout(() => {
            setNotifications([]);
            batchTimerRef.current = null;
        }, duration);
    }, [duration]);

    useEffect(() => {
        return () => { if (batchTimerRef.current) clearTimeout(batchTimerRef.current); };
    }, []);

    const add = useCallback((message: string, type: NotificationType = 'info') => {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        setNotifications(prev => [...prev, { id, message, type }]);
        restartBatchTimer();
    }, [restartBatchTimer]);

    const remove = useCallback((id: string) => {
        setNotifications(prev => {
            const next = prev.filter(n => n.id !== id);
            if (next.length === 0 && batchTimerRef.current) {
                clearTimeout(batchTimerRef.current);
                batchTimerRef.current = null;
            }
            return next;
        });
    }, []);

    const clearAll = useCallback(() => {
        setNotifications([]);
        if (batchTimerRef.current) {
            clearTimeout(batchTimerRef.current);
            batchTimerRef.current = null;
        }
    }, []);

    const actions: NotificationActions = useMemo(
        () => ({ add, remove, clearAll }),
        [add, remove, clearAll]
    );

    return { notifications, actions: actions };
};
