import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useHistory } from 'react-router-dom';
import PersonalInfo from "../components/personalInfo";

const PersonalInfoPage: React.FC = () => {
    const history = useHistory();

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <header className="bg-blue-600 text-white shadow-md z-10 sticky top-0">
                <div className="flex items-center px-4 h-14">
                    <button 
                        onClick={() => history.goBack()} 
                        className="p-2 -ml-2 mr-2 hover:bg-blue-700 rounded-full transition-colors focus:outline-none"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-xl font-bold tracking-wide">Información Personal</h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 flex flex-col items-center">
                <div className="w-full max-w-lg shadow-xl rounded-[2rem] mt-8 bg-blue-100 overflow-hidden border border-blue-200">
                    <div className="text-center pt-8 pb-2">
                        <h2 className="text-xl font-extrabold text-blue-700">Mi Perfil</h2>
                    </div>
                    <div className="p-6">
                        <PersonalInfo />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PersonalInfoPage;

