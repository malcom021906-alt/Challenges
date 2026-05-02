import { Edit2, Trash2, CheckCircle2, Circle, ArrowLeft, Search } from 'lucide-react';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTasksContext } from '../contexts/TasksContext';

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getTaskById, toggleTask, deleteTask } = useTasksContext();
  const history = useHistory();

  const task = getTaskById(id);

  if (!task) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <header className="bg-blue-600 text-white shadow-md z-10 sticky top-0">
          <div className="flex items-center px-4 h-14">
            <button 
              onClick={() => history.replace('/tasks')} 
              className="p-2 -ml-2 mr-2 hover:bg-blue-700 rounded-full transition-colors focus:outline-none"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold tracking-wide">Tarea no encontrada</h1>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 flex items-center justify-center">
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm p-8 w-full max-w-md">
            <Search className="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <h2 className="text-xl font-bold text-slate-700 mb-6">Esta tarea no existe</h2>
            <button 
              onClick={() => history.replace('/tasks')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
            >
              Volver a la lista
            </button>
          </div>
        </main>
      </div>
    );
  }

  const handleDelete = () => {
    deleteTask(task.id);
    history.replace('/tasks');
  };

  const handleToggle = () => {
    toggleTask(task.id);
  };

  const createdDate = new Date(task.createdAt).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-blue-600 text-white shadow-md z-10 sticky top-0">
        <div className="flex items-center px-4 h-14">
          <button 
            onClick={() => history.replace('/tasks')} 
            className="p-2 -ml-2 mr-2 hover:bg-blue-700 rounded-full transition-colors focus:outline-none"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold tracking-wide">Detalle de Tarea</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 mt-2">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
            <div className={`p-4 ${task.completed ? 'bg-green-500' : 'bg-amber-500'} text-white flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                {task.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                <span className="font-bold text-lg">
                  {task.completed ? 'Completada' : 'Pendiente'}
                </span>
              </div>
              <span className="px-3 py-1 bg-white/20 rounded-full font-bold text-sm">
                {task.completed ? '✅' : '⏳'}
              </span>
            </div>

            <div className="p-6">
              <h1 className="text-2xl font-bold text-slate-800 mb-4">{task.title}</h1>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Descripción</h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {task.description || 'Sin descripción'}
                </p>
              </div>

              <div className="mb-8 pb-6 border-b border-slate-100">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Fecha de creación</h3>
                <p className="text-slate-600">{createdDate}</p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleToggle}
                  className={`w-full py-4 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${
                    task.completed 
                      ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {task.completed ? <Circle size={20} /> : <CheckCircle2 size={20} />}
                  {task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
                </button>

                <button
                  onClick={() => history.push(`/task/edit/${task.id}`)}
                  className="w-full py-4 px-4 rounded-xl font-bold flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <Edit2 size={20} />
                  Editar tarea
                </button>

                <button
                  onClick={handleDelete}
                  className="w-full py-4 px-4 rounded-xl font-bold flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={20} />
                  Eliminar tarea
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TaskDetail;
