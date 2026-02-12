import React from 'react';
import { CheckCircle, Calendar, ArrowLeft } from 'lucide-react';
import { generateGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';
import { eventConfig } from '../config/event';

interface SuccessStateProps {
    onBack: () => void;
}

const SuccessState: React.FC<SuccessStateProps> = ({ onBack }) => {
    return (
        <div className="flex flex-col h-full justify-center animate-fade-in">
            <div className="mb-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    ¡Listo! Tu lugar está reservado.
                </h2>
                <p className="text-slate-500 dark:text-slate-400">
                    Hemos enviado un correo de confirmación con todos los detalles del evento.
                </p>
            </div>

            <div className="space-y-4 mb-8">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                    Agregar a calendario
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                        href={generateGoogleCalendarUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300 font-medium"
                    >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" alt="Google" className="w-5 h-5" />
                        Google
                    </a>
                    <button
                        onClick={downloadIcsFile}
                        className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300 font-medium"
                    >
                        <Calendar className="w-5 h-5 text-blue-500" />
                        Outlook / Apple
                    </button>
                </div>
            </div>

            <div className="inline-flex items-center gap-2 py-2 px-4 bg-slate-100 dark:bg-slate-800 rounded-full self-start mb-8">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    NOS VEMOS PRONTO | {eventConfig.displayDate}, {eventConfig.displayTime} {eventConfig.timezoneLabel}
                </span>
            </div>

            <button
                onClick={onBack}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex items-center gap-2 text-sm font-medium transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Volver al inicio
            </button>
        </div>
    );
};

export default SuccessState;
