import { IonSpinner } from '@ionic/react';

function Loader({ loading }: { loading?: boolean }) {
    if (!loading) return null;

    return (
        <div className="fixed inset-0 flex flex-col justify-center items-center bg-white/80 backdrop-blur-sm z-50">
            <IonSpinner name="crescent" color="primary" className="h-16 w-16 mb-4" />
            <p className="text-xl font-medium text-gray-600">Cargando contactos...</p>
        </div>
    );
}

export default Loader;
