export interface Visita {
  id: string;
  pacienteNombre: string;
  pacienteDni: string;
  horario: string;
  estado: 'pendiente' | 'en_camino' | 'en_curso' | 'finalizada' | 'cancelada';
  motivoCancelacion?: string;
  receta?: string[];
}

export const mockedVisitas: Visita[] = [
  {
    id: 'v1',
    pacienteNombre: 'Juan Perez',
    pacienteDni: '12345678',
    horario: '10:00',
    estado: 'pendiente'
  },
  {
    id: 'v2',
    pacienteNombre: 'Maria Garcia',
    pacienteDni: '87654321',
    horario: '11:00',
    estado: 'pendiente'
  },
  {
    id: 'v3',
    pacienteNombre: 'Carlos Lopez',
    pacienteDni: '11223344',
    horario: '09:00',
    estado: 'finalizada',
    receta: ['Ibuprofeno 400mg']
  }
];
