function Loader() {
    return (
        <div className="fixed inset-0 flex flex-col justify-center items-center bg-white/80 backdrop-blur-sm z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
            <p className="text-xl font-medium text-gray-600">Cargando contactos...</p>
        </div>
    );
}

export default Loader;
