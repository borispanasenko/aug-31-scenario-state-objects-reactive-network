// src/components/NotificationsList.tsx
import React from 'react';
import { type NotificationItem } from '../types.ts'; // Предположим, вы экспортируете интерфейс

interface NotificationsListProps {
    notifications: NotificationItem[];
}

const NotificationsList: React.FC<NotificationsListProps> = ({ notifications }) => {
    return (
        <section className="card">
            <h2 className="section-title">Notifications</h2>
            <div className="space-y-2">
                {notifications.map((n) => (
                    <div key={n.id} className={'rounded-lg p-3 text-sm fade-in ' +
                        (n.type === 'success' ? 'bg-green-100 text-green-800' :
                            n.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                                n.type === 'celebration' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800')}>
                        {n.message}
                    </div>
                ))}
            </div>
            {notifications.length === 0 && (
                <div className="text-sm italic text-muted">No notifications</div>
            )}
        </section>
    );
};

export default NotificationsList;