import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonBadge
} from '@ionic/react';
import { createOutline, trashOutline, checkmarkCircleOutline, ellipseOutline } from 'ionicons/icons';
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
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tasks" />
            </IonButtons>
            <IonTitle>Tarea no encontrada</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent color="light">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-bold text-slate-600">Esta tarea no existe</h2>
            <IonButton routerLink="/tasks" className="mt-4">
              Volver a la lista
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
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
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tasks" />
          </IonButtons>
          <IonTitle>Detalle de Tarea</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light">
        <div className="max-w-lg mx-auto p-4 mt-4">
          <IonCard className="rounded-2xl shadow-md overflow-hidden">
            <div className={`p-4 ${task.completed ? 'bg-green-500' : 'bg-amber-500'} text-white flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <IonIcon icon={task.completed ? checkmarkCircleOutline : ellipseOutline} className="text-2xl" />
                <span className="font-bold text-lg">
                  {task.completed ? 'Completada' : 'Pendiente'}
                </span>
              </div>
              <IonBadge color="light">
                {task.completed ? '✅' : '⏳'}
              </IonBadge>
            </div>

            <IonCardContent className="p-6 bg-white">
              <h1 className="text-2xl font-bold text-slate-800 mb-4">{task.title}</h1>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Descripción</h3>
                <p className="text-slate-600 leading-relaxed">
                  {task.description || 'Sin descripción'}
                </p>
              </div>

              <div className="mb-6 pb-6 border-b border-slate-100">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Fecha de creación</h3>
                <p className="text-slate-600">{createdDate}</p>
              </div>

              <div className="flex flex-col gap-3">
                <IonButton
                  expand="block"
                  onClick={handleToggle}
                  color={task.completed ? 'warning' : 'success'}
                  style={{ '--border-radius': '0.75rem' }}
                >
                  <IonIcon icon={task.completed ? ellipseOutline : checkmarkCircleOutline} slot="start" />
                  {task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
                </IonButton>

                <IonButton
                  expand="block"
                  routerLink={`/task/edit/${task.id}`}
                  color="primary"
                  fill="outline"
                  style={{ '--border-radius': '0.75rem' }}
                >
                  <IonIcon icon={createOutline} slot="start" />
                  Editar tarea
                </IonButton>

                <IonButton
                  expand="block"
                  onClick={handleDelete}
                  color="danger"
                  fill="clear"
                  style={{ '--border-radius': '0.75rem' }}
                >
                  <IonIcon icon={trashOutline} slot="start" />
                  Eliminar tarea
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TaskDetail;
