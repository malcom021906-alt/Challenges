import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonButton,
  IonInput,
  IonTextarea,
  IonCard,
  IonCardContent,
  IonIcon
} from '@ionic/react';
import { saveOutline } from 'ionicons/icons';
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
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tasks" />
          </IonButtons>
          <IonTitle>{isEditing ? 'Editar Tarea' : 'Nueva Tarea'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light">
        <div className="max-w-lg mx-auto p-4 mt-4">
          <IonCard className="rounded-2xl shadow-md">
            <IonCardContent className="p-6">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <IonInput
                  id="task-title"
                  label="Título de la tarea"
                  labelPlacement="stacked"
                  placeholder="¿Qué necesitas hacer?"
                  fill="outline"
                  value={title}
                  onIonInput={(e) => setTitle(e.detail.value! as string)}
                  color="primary"
                  required
                  className="custom-input"
                />

                <IonTextarea
                  id="task-description"
                  label="Descripción"
                  labelPlacement="stacked"
                  placeholder="Agrega detalles sobre la tarea..."
                  fill="outline"
                  value={description}
                  onIonInput={(e) => setDescription(e.detail.value! as string)}
                  rows={5}
                  color="primary"
                  className="custom-input"
                />

                {error && (
                  <div className="bg-red-500/10 p-3 rounded-xl text-red-600 text-sm font-semibold border border-red-500/20">
                    {error}
                  </div>
                )}

                <IonButton
                  type="submit"
                  expand="block"
                  className="mt-2 h-14 font-bold text-lg"
                  style={{ '--border-radius': '1rem' }}
                  color="primary"
                >
                  <IonIcon icon={saveOutline} slot="start" />
                  {isEditing ? 'Guardar Cambios' : 'Crear Tarea'}
                </IonButton>
              </form>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TaskForm;
