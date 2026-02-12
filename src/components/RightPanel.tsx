import React from 'react';
import Countdown from './Countdown';
import HubSpotForm from './HubSpotForm';
import SuccessState from './SuccessState';

interface RightPanelProps {
    state: 'form' | 'success';
    onSuccess: () => void;
    onBack: () => void;
}

const RightPanel: React.FC<RightPanelProps> = ({ state, onSuccess, onBack }) => {
    return (
        <section className="md:w-7/12 p-8 md:p-16 flex flex-col justify-center bg-white dark:bg-slate-900 transition-colors duration-300 min-h-[600px]">
            {state === 'form' ? (
                <div className="animate-fade-in max-w-lg mx-auto w-full">
                    <Countdown />

                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Registro al Webinar</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            Completa tus datos para asegurar tu lugar en la sesión en vivo.
                        </p>
                    </div>

                    <HubSpotForm onSuccess={onSuccess} />
                </div>
            ) : (
                <div className="max-w-lg mx-auto w-full">
                    <SuccessState onBack={onBack} />
                </div>
            )}
        </section>
    );
};

export default RightPanel;
