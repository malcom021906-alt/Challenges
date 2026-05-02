import React from 'react';
import { Mail, Phone, User, MapPin } from 'lucide-react';

const PersonalInfo: React.FC = () => {
    // Mock user data
    const user = {
        name: "Malcom osorio",
        email: "user@mail.com",
        phone: "+57 311 234 5678",
        address: "Cali, Colombia",
        avatar: "https://ionicframework.com/docs/img/demos/avatar.svg"
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-32 h-32 mb-6 shadow-lg border-4 border-blue-500/20 rounded-full overflow-hidden bg-white">
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-1">{user.name}</h2>
            <p className="text-slate-500 font-medium mb-6">Administrador</p>

            <div className="w-full bg-white/50 backdrop-blur-sm overflow-hidden rounded-2xl border border-blue-300/30 divide-y divide-blue-300/30">
                <div className="flex items-center p-4">
                    <div className="w-10 flex justify-center text-blue-600 mr-3">
                        <User size={24} />
                    </div>
                    <div>
                        <h3 className="text-blue-900/60 font-semibold text-xs uppercase tracking-wider mb-1">Nombre Completo</h3>
                        <p className="text-blue-900 font-bold m-0">{user.name}</p>
                    </div>
                </div>

                <div className="flex items-center p-4">
                    <div className="w-10 flex justify-center text-blue-600 mr-3">
                        <Mail size={24} />
                    </div>
                    <div>
                        <h3 className="text-blue-900/60 font-semibold text-xs uppercase tracking-wider mb-1">Correo Electrónico</h3>
                        <p className="text-blue-900 font-bold m-0">{user.email}</p>
                    </div>
                </div>

                <div className="flex items-center p-4">
                    <div className="w-10 flex justify-center text-blue-600 mr-3">
                        <Phone size={24} />
                    </div>
                    <div>
                        <h3 className="text-blue-900/60 font-semibold text-xs uppercase tracking-wider mb-1">Teléfono</h3>
                        <p className="text-blue-900 font-bold m-0">{user.phone}</p>
                    </div>
                </div>

                <div className="flex items-center p-4">
                    <div className="w-10 flex justify-center text-blue-600 mr-3">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <h3 className="text-blue-900/60 font-semibold text-xs uppercase tracking-wider mb-1">Ubicación</h3>
                        <p className="text-blue-900 font-bold m-0">{user.address}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;

