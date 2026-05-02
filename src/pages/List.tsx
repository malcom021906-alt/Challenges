import { LogOut, Plus, Trash2, Edit2, WifiOff, CheckCircle2, Circle } from 'lucide-react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useTasksContext } from '../contexts/TasksContext';

const TasksList: React.FC = () => {
  const { logout, user } = useAuthContext();
  const { tasks, toggleTask, deleteTask, isOnline } = useTasksContext();
  const history = useHistory();

  const handleLogout = async () => {
    await logout();
    history.replace('/login');
  };

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-blue-600 text-white shadow-md z-10 sticky top-0">
        <div className="flex items-center justify-between px-4 h-14">
          <h1 className="text-xl font-bold tracking-wide">Mis Tareas</h1>
          <div className="flex items-center gap-2">
            {!isOnline && (
              <WifiOff className="text-red-300 w-5 h-5 mr-1" />
            )}
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-blue-700 font-semibold transition-colors text-sm"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
            <p className="text-sm text-slate-500 mb-4">
              Conectado como: <strong className="text-slate-700">{user?.email}</strong>
            </p>
            {!isOnline && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold mb-4">
                Sin conexión - Modo Solo Lectura
              </div>
            )}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                Pendientes: {pendingCount}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                Completadas: {completedCount}
              </span>
            </div>
          </div>

          {tasks.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 border-dashed">
              <div className="text-5xl mb-4 opacity-50">📋</div>
              <h2 className="text-xl font-bold text-slate-600 mb-2">No hay tareas aún</h2>
              <p className="text-slate-400 text-sm">Toca el botón + para agregar tu primera tarea</p>
            </div>
          ) : (
            <ul className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-white divide-y divide-slate-100">
              {tasks.map((task) => (
                <li key={task.id} className="group relative flex items-center p-3 hover:bg-slate-50 transition-colors">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="flex-shrink-0 p-2 text-slate-400 hover:text-blue-600 transition-colors focus:outline-none"
                    disabled={!isOnline}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  
                  <div 
                    className="flex-1 min-w-0 px-3 cursor-pointer py-2"
                    onClick={() => history.push(`/task/view/${task.id}`)}
                  >
                    <h2 className={`font-semibold text-slate-800 truncate ${task.completed ? 'line-through text-slate-400' : ''}`}>
                      {task.title}
                    </h2>
                    <p className={`text-sm truncate ${task.completed ? 'text-slate-300' : 'text-slate-500'}`}>
                      {task.description}
                    </p>
                  </div>

                  <div className="flex-shrink-0 mr-2 flex flex-col sm:flex-row items-center gap-2">
                    {task.completed ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 uppercase tracking-wider hidden sm:inline-block">Hecho</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 uppercase tracking-wider hidden sm:inline-block">Pte</span>
                    )}
                  </div>

                  {/* Actions visible on hover or always on touch devices */}
                  <div className="flex-shrink-0 flex items-center opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); history.push(`/task/edit/${task.id}`); }}
                      disabled={!isOnline}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-30 focus:outline-none"
                      title="Editar"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
                      disabled={!isOnline}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30 focus:outline-none"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={() => history.push('/task/add')}
          disabled={!isOnline}
          className="fixed bottom-20 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 z-40 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
          aria-label="Agregar tarea"
        >
          <Plus size={28} />
        </button>
      </main>
    </div>
  );
};

export default TasksList;
