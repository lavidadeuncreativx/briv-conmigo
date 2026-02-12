import React from 'react';
import { eventConfig } from '../config/event';
import Avatar1 from '../assets/avatars/1.jpg';
import Avatar2 from '../assets/avatars/2.jpg';
import Avatar3 from '../assets/avatars/3.jpg';
import { Calendar, MapPin, Clock, Video } from 'lucide-react';

interface LeftPanelProps {
    state: 'form' | 'success';
}

const LeftPanel: React.FC<LeftPanelProps> = ({ state }) => {
    return (
        <section className="md:w-5/12 mesh-gradient p-10 flex flex-col justify-between relative overflow-hidden text-white transition-all duration-500 ease-in-out">
            <div className="relative z-10 w-full h-full flex flex-col justify-between">
                <div>
                    <div className="mb-12">
                        <img
                            src="https://brivesoluciones.com/wp-content/uploads/2025/09/Logo-Brive-Conmigo.png"
                            alt="Brivé Logo"
                            className="h-12 w-auto object-contain"
                        />
                    </div>

                    {state === 'form' ? (
                        <div className="animate-fade-in-up">
                            <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-6">
                                {eventConfig.title.split(' ').map((word, i) =>
                                    word.toLowerCase() === 'rh' || word.toLowerCase() === 'ideal' ?
                                        <span key={i} className="text-primary">{word} </span> :
                                        <span key={i}>{word} </span>
                                )}
                            </h1>
                            <p className="text-slate-300 text-lg leading-relaxed max-w-sm">
                                {eventConfig.subtitle}
                            </p>
                        </div>
                    ) : (
                        <div className="animate-fade-in-up">
                            <div className="bg-white/10 backdrop-blur-md p-8 rounded-[32px] border border-white/20 shadow-2xl">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                                        <Calendar className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">{eventConfig.displayDate}</h3>
                                    <p className="text-primary font-medium mb-6">{eventConfig.displayTime} {eventConfig.timezoneLabel}</p>

                                    <div className="w-full h-px bg-white/10 mb-6"></div>

                                    <div className="flex items-center gap-3 text-slate-300 text-sm">
                                        <Video className="w-4 h-4" />
                                        <span>{eventConfig.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {state === 'form' && (
                    <div className="group relative w-full max-w-[320px] h-24 flip-card cursor-pointer">
                        <div className="relative w-full h-full flip-card-inner">

                            {/* Front: Social Proof */}
                            <div className="absolute inset-0 flip-card-front">
                                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 h-full flex items-center hover:bg-white/15 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="flex -space-x-3">
                                            <img alt="Attendee 1" className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover" src={Avatar1} />
                                            <img alt="Attendee 2" className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover" src={Avatar2} />
                                            <img alt="Attendee 3" className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover" src={Avatar3} />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-sm font-bold text-white">+1,200</p>
                                            <p className="text-xs text-slate-300">profesionales registrados</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Back: Schedule/Details */}
                            <div className="absolute inset-0 flip-card-back">
                                <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-primary/30 h-full flex flex-col justify-center items-start shadow-xl">
                                    <div className="flex items-center gap-3 mb-1">
                                        <Clock className="w-4 h-4 text-primary" />
                                        <span className="text-sm font-bold text-white">{eventConfig.displayTime} {eventConfig.timezoneLabel}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Video className="w-4 h-4 text-primary" />
                                        <span className="text-xs text-slate-300">Vía Zoom Meeting</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>

            {state === 'success' && (
                <div className="relative z-10 text-slate-400 text-sm mt-auto">
                    <p>Te enviamos los accesos a tu correo.</p>
                </div>
            )}

            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
        </section>
    );
};

export default LeftPanel;
