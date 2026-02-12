import React, { useEffect, useState } from 'react';
import { eventConfig } from '../config/event';

interface HubSpotFormProps {
    onSuccess: () => void;
}

declare global {
    interface Window {
        hbspt: any;
    }
}

const HubSpotForm: React.FC<HubSpotFormProps> = ({ onSuccess }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadError, setLoadError] = useState(false);
    const containerId = 'hubspot-form-container';

    useEffect(() => {
        // Aggressive cleanup on mount to remove any existing forms
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = '';
        }

        const scriptId = 'hs-script-loader';
        let script = document.getElementById(scriptId) as HTMLScriptElement;

        const createForm = () => {
            if (window.hbspt) {
                const container = document.getElementById(containerId);
                if (!container) return;

                // Double check: if it already has children, don't create another one
                if (container.children.length > 0) {
                    setIsLoaded(true);
                    return;
                }

                // Clear again just to be safe
                container.innerHTML = '';

                try {
                    window.hbspt.forms.create({
                        region: eventConfig.hubspot.region,
                        portalId: eventConfig.hubspot.portalId,
                        formId: eventConfig.hubspot.formId,
                        target: `#${containerId}`,
                        onFormReady: () => {
                            setIsLoaded(true);
                            console.log("HubSpot form ready");

                            // Force check: if multiple forms appeared, kill the extra ones
                            // This handles the "3 forms" bug if HS library triggers multiple callbacks
                            setTimeout(() => {
                                const forms = container.querySelectorAll('.hs-form');
                                if (forms.length > 1) {
                                    console.warn("Detected multiple forms, removing extras...");
                                    for (let i = 1; i < forms.length; i++) {
                                        forms[i].remove();
                                    }
                                }
                            }, 500);
                        },
                        onFormSubmitted: () => {
                            console.log("Form submitted");
                            onSuccess();
                        }
                    });
                } catch (e) {
                    console.error("Error creating HubSpot form", e);
                    setLoadError(true);
                }
            }
        };

        if (script) {
            if (window.hbspt) {
                createForm();
            } else {
                script.addEventListener('load', createForm);
            }
        } else {
            script = document.createElement('script');
            script.src = `https://js.hsforms.net/forms/embed/v2.js`;
            script.id = scriptId;
            script.async = true;
            script.defer = true;
            script.onload = createForm;
            script.onerror = () => setLoadError(true);
            document.body.appendChild(script);
        }

        return () => {
            // Cleanup: remove the form from DOM when component unmounts
            const container = document.getElementById(containerId);
            if (container) container.innerHTML = '';

            if (script) {
                script.removeEventListener('load', createForm);
            }
        };
    }, []);

    if (loadError) {
        return <MockForm onSuccess={onSuccess} />;
    }

    return (
        <div className="w-full min-h-[400px]">
            {!isLoaded && (
                <div className="animate-pulse space-y-4 mb-4">
                    <div className="h-10 bg-slate-100 rounded-xl w-full"></div>
                    <div className="h-10 bg-slate-100 rounded-xl w-full"></div>
                    <div className="h-10 bg-slate-100 rounded-xl w-full"></div>
                    <div className="h-12 bg-slate-200 rounded-xl w-full"></div>
                </div>
            )}
            <div id={containerId}></div>
        </div>
    );
};

// Fallback Mock Form
const MockForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
    // ... same mock form code ...
    const [email, setEmail] = useState("mariana.gonzalez@empresa");
    const [name, setName] = useState("Mariana González");
    const [isValidEmail, setIsValidEmail] = useState(true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.includes('@')) {
            setIsValidEmail(false);
            return;
        }
        setTimeout(() => onSuccess(), 800);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="mock-name">Nombre Completo *</label>
                <input
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-transparent focus:border-primary focus:ring-4 focus:ring-primary/20 rounded-xl text-slate-900 dark:text-white transition-all outline-none"
                    id="mock-name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
            </div>
            <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="mock-email">Correo Electrónico *</label>
                <div className="relative">
                    <input
                        className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-2 ${!isValidEmail ? 'border-amber-500 ring-4 ring-amber-500/20' : 'border-transparent focus:border-primary focus:ring-4 focus:ring-primary/20'} rounded-xl text-slate-900 dark:text-white transition-all outline-none`}
                        id="mock-email"
                        type="email"
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value);
                            setIsValidEmail(true);
                        }}
                        required
                    />
                    {!isValidEmail && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-amber-500 text-xl font-bold">!</span>
                        </div>
                    )}
                </div>
                {!isValidEmail && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1 mt-1">
                        Por favor incluye un formato de correo válido (ej. nombre@empresa.com)
                    </p>
                )}
            </div>
            <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="mock-country">País *</label>
                <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-transparent focus:border-primary focus:ring-4 focus:ring-primary/20 rounded-xl text-slate-900 dark:text-white transition-all outline-none appearance-none" id="mock-country">
                    <option value="MX">México</option>
                    <option value="CO">Colombia</option>
                    <option value="CL">Chile</option>
                    <option value="AR">Argentina</option>
                    <option value="PE">Perú</option>
                </select>
            </div>
            <div className="flex items-start gap-3 pt-2">
                <input type="checkbox" id="mock-terms" className="mt-1 w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary" required defaultChecked />
                <label className="text-xs text-slate-500 dark:text-slate-400 leading-normal" htmlFor="mock-terms">
                    Acepto recibir comunicaciones sobre el webinar y los términos de privacidad de Brivé.
                </label>
            </div>
            <button type="submit" className="w-full py-4 bg-primary hover:bg-[#a0b12e] text-slate-900 font-bold rounded-xl transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 group">
                Confirmar Registro
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </button>
        </form>
    );
}

export default HubSpotForm;
