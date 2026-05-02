import { Save, ArrowLeft } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTasksContext } from '../contexts/TasksContext';

const TaskForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const isEditing = !!id;
  const { addTask, updateTask, getTaskById } = useTasksContext();
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing && id) {
      const task = getTaskById(id);
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
      } else {
        history.replace('/tasks');
      }
    }
  }, [id, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('El título es obligatorio');
      return;
    }

    if (isEditing && id) {
      updateTask(id, { title: title.trim(), description: description.trim() });
    } else {
      addTask(title.trim(), description.trim());
    }

    history.goBack();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-blue-600 text-white shadow-md z-10 sticky top-0">
        <div className="flex items-center px-4 h-14">
          <button 
            onClick={() => history.goBack()} 
            className="p-2 -ml-2 mr-2 hover:bg-blue-700 rounded-full transition-colors focus:outline-none"
            aria-label="Volver"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold tracking-wide">
            {isEditing ? 'Editar Tarea' : 'Nueva Tarea'}
          </h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 mt-2">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="space-y-1">
                  <label htmlFor="task-title" className="block text-sm font-medium text-slate-700">
                    Título de la tarea
                  </label>
                  <input
                    id="task-title"
                    type="text"
                    placeholder="¿Qué necesitas hacer?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-slate-50"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="task-description" className="block text-sm font-medium text-slate-700">
                    Descripción
                  </label>
                  <textarea
                    id="task-description"
                    placeholder="Agrega detalles sobre la tarea..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-slate-50 resize-y"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                    <p className="text-red-600 text-sm font-semibold">
                      {error}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl mt-2 transition-colors flex justify-center items-center gap-2 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/30"
                >
                  <Save size={20} />
                  {isEditing ? 'Guardar Cambios' : 'Crear Tarea'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TaskForm;
