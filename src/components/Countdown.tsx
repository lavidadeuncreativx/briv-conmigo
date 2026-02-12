import React, { useEffect, useState } from 'react';
import { differenceInSeconds, parseISO } from 'date-fns';
import { eventConfig } from '../config/event';

const Countdown: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        const targetDate = parseISO(eventConfig.startDateTimeISO);

        const calculateTimeLeft = () => {
            const now = new Date();
            const diff = differenceInSeconds(targetDate, now);

            if (diff <= 0) {
                setIsStarted(true);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(diff / (3600 * 24));
            const hours = Math.floor((diff % (3600 * 24)) / 3600);
            const minutes = Math.floor((diff % 3600) / 60);
            const seconds = diff % 60;

            setTimeLeft({ days, hours, minutes, seconds });
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatNumber = (num: number) => num.toString().padStart(2, '0');

    if (isStarted) {
        return (
            <div className="mb-10 animate-fade-in">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                    El evento ha iniciado
                </p>
                <div className="bg-primary/10 p-4 rounded-2xl border border-primary/20 text-center">
                    <span className="text-primary font-bold text-xl">¡Únete ahora!</span>
                </div>
            </div>
        );
    }

    return (
        <div className="mb-10 animate-fade-in">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">Iniciamos en</p>
            <div className="flex gap-4">
                <TimeUnit value={formatNumber(timeLeft.days)} label="Días" />
                <TimeUnit value={formatNumber(timeLeft.hours)} label="Hrs" />
                <TimeUnit value={formatNumber(timeLeft.minutes)} label="Min" />
                <TimeUnit value={formatNumber(timeLeft.seconds)} label="Seg" isAccent />
            </div>
        </div>
    );
};

const TimeUnit = ({ value, label, isAccent = false }: { value: string; label: string; isAccent?: boolean }) => (
    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl min-w-[70px] text-center border border-slate-100 dark:border-slate-800 shadow-sm">
        <span className={`block text-2xl font-bold ${isAccent ? 'text-primary' : 'text-slate-800 dark:text-white'}`}>
            {value}
        </span>
        <span className="text-[10px] text-slate-400 uppercase tracking-wider">{label}</span>
    </div>
);

export default Countdown;
