import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonFab,
  IonFabButton,
  IonBadge,
  IonChip
} from '@ionic/react';
import { logOutOutline, addOutline, trashOutline, createOutline } from 'ionicons/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useTasksContext } from '../contexts/TasksContext';

const TasksList: React.FC = () => {
  const { logout, user } = useAuthContext();
  const { tasks, toggleTask, deleteTask } = useTasksContext();
  const history = useHistory();

  const handleLogout = async () => {
    await logout();
    history.replace('/login');
  };

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Mis Tareas</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout} className="font-semibold">
              <IonIcon slot="start" icon={logOutOutline} />
              <span className="hidden sm:inline">Salir</span>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light">
        <div className="max-w-3xl mx-auto p-4">
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <p className="text-sm text-slate-500 mb-3">
              Conectado como: <strong className="text-slate-700">{user?.email}</strong>
            </p>
            <div className="flex gap-3">
              <IonChip color="primary">
                <IonLabel>Pendientes: {pendingCount}</IonLabel>
              </IonChip>
              <IonChip color="success">
                <IonLabel>Completadas: {completedCount}</IonLabel>
              </IonChip>
            </div>
          </div>

          {tasks.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📋</div>
              <h2 className="text-xl font-bold text-slate-600 mb-2">No hay tareas aún</h2>
              <p className="text-slate-400">Toca el botón + para agregar tu primera tarea</p>
            </div>
          ) : (
            <IonList className="rounded-2xl overflow-hidden shadow-md bg-white" color='light'>
              {tasks.map((task) => (
                <IonItemSliding key={task.id} className="bg-white">
                  <IonItem
                    color="light"
                    button
                    onClick={() => history.push(`/task/view/${task.id}`)}
                    className="py-1 bg-white"
                  >
                    <IonCheckbox
                      slot="start"
                      checked={task.completed}
                      onIonChange={(e) => {
                        e.stopPropagation();
                        toggleTask(task.id);
                      }}
                    />
                    <IonLabel
                      className={task.completed ? 'line-through opacity-50' : ''}
                    >
                      <h2 className="font-semibold">{task.title}</h2>
                      <p className="text-sm text-slate-500 truncate">{task.description}</p>
                    </IonLabel>
                    {task.completed ? (
                      <IonBadge color="success" slot="end">Hecho</IonBadge>
                    ) : (
                      <IonBadge color="warning" slot="end">Pendiente</IonBadge>
                    )}
                  </IonItem>

                  <IonItemOptions side="end">
                    <IonItemOption
                      color="primary"
                      onClick={() => history.push(`/task/edit/${task.id}`)}
                    >
                      <IonIcon slot="icon-only" icon={createOutline} />
                    </IonItemOption>
                    <IonItemOption
                      color="danger"
                      onClick={() => deleteTask(task.id)}
                    >
                      <IonIcon slot="icon-only" icon={trashOutline} />
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
              ))}
            </IonList>
          )}
        </div>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/task/add')} color="primary">
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default TasksList;
