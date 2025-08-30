// src/components/CounterDisplay.tsx
import React from 'react';
import { type CounterActions } from '../types';

// Создаем интерфейс для пропсов компонента
interface CounterDisplayProps {
    value: number;
    actions: CounterActions;
}

// Этот компонент не знает о хуках, он просто принимает пропсы
const CounterDisplay: React.FC<CounterDisplayProps> = ({ value, actions }) => {
    return (
        <section className="card">
            <h2 className="section-title">Counter</h2>
            <div className="mb-6 text-center text-4xl font-bold text-primary">{value}</div>
            <div className="flex justify-center gap-3">
                <button onClick={actions.increment} className="btn btn-success">+1</button>
                <button onClick={actions.decrement} className="btn btn-danger">-1</button>
                <button onClick={actions.reset} className="btn btn-neutral">Reset</button>
            </div>
        </section>
    );
};

export default CounterDisplay;