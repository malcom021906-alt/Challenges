El repositorio esta destinado para subir los Challenges de la Asignatura de desarrollo para pltaformas moviles
Los challenges se suben a la rama correspondiente es decir el challenge *1 esta en la rama Challenge1

Parcial #1

se realiza el primer punto del parcial el cual involucra el desarrollo de una progressive web app en react 
<img width="1456" height="845" alt="image" src="https://github.com/user-attachments/assets/33b74896-0105-4486-83b3-e9e6c6e9a78d" />
LoginForm: Tiene inputs de email y contraseña con estado local
<img width="1600" height="805" alt="image" src="https://github.com/user-attachments/assets/1633d6c8-b009-4aae-9a90-3dd1da913cfc" />
 en el componente PerfilUsuario (accesible desde el header). Mostralo como <img> circular en el header. Si no hay avatar, mostrar las iniciales del nombre en un círculo de color.

<img width="1600" height="795" alt="image" src="https://github.com/user-attachments/assets/25e56ee2-2e4e-4324-b368-28b34eec2c0b" />

el componente Dashboard recibe el usuario como prop y renderiza condicionalmente: si el rol es "recepcionista" no muestra la sección de estadísticas; si es "medico" no muestra el formulario de alta de pacientes. El control se hace con renderizado condicional, no con navegación.
recibe el array de pacientes y los callbacks onEditar(paciente) y onEliminar(id). Renderiza una tabla HTML con una fila por paciente mostrando nombre completo, DNI y teléfono. El botón eliminar abre una modal de confirmación. El botón editar llama a onEditar y el padre se encarga de pasar el paciente al formulario.
<img width="1600" height="811" alt="image" src="https://github.com/user-attachments/assets/d9a6e1b1-c36f-4c5e-8273-bc5b94e4122d" />

<img width="917" height="765" alt="{6EF81776-49D0-48F4-B3BC-30728840CADF}" src="https://github.com/user-attachments/assets/2284cea6-15c1-4134-9004-bda23b98fa4f" />

configurá name "MediCare+ Admin", short_name "MediCare", registrá el service worker (CRA: cambiar unregister por register / Vite: plugin PWA). Agregá un comentario en el código explicando qué significa la estrategia "cache first" y en qué casos conviene usarla para una app médica.


Punto #2 del primer parcial

<img width="544" height="935" alt="image" src="https://github.com/user-attachments/assets/e07717d1-a36b-4899-846c-03e6fabaf91b" />

la app usa IonTabs con tres tabs principales (visibles post-login). Dentro de la tab de Visitas, hay una navegación anidada con IonRouterOutlet que permite ir de la lista de visitas al detalle de una visita sin perder la tab bar:
Tabs (post-login):
  Tab 1 /visitas          → VisitasPage     (lista del día)
  Tab 1 /visitas/:id    → DetalleVisitaPage  (detalle + receta)
  Tab 2 /pacientes  → MisPacientesPage
  Tab 3 /perfil          → PerfilMedicoPage

  <img width="615" height="928" alt="image" src="https://github.com/user-attachments/assets/dd83a9ed-12b8-4f54-bc24-5ea2eb4ab48f" />

  <img width="655" height="960" alt="image" src="https://github.com/user-attachments/assets/8ebdf0b9-b5cf-4124-bc27-5fb85b1b0259" />

  <img width="621" height="890" alt="image" src="https://github.com/user-attachments/assets/038cb033-083d-4fb6-8003-c7fad9be8137" />

por falta de tiempo no se logro mejorar los estilos y se dejaron como los basicos de ionic , de igual forma se utilizo algunos modelos y estilos ya usados previamente en el curso para agilizar pues era un proceso bastante extenso 













