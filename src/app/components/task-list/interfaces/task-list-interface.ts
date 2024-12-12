export interface TaskList {
  id: number
  description: string
  dueDate: string
  status: 'PENDNTE' | 'EM ANDAMENTO' | 'FINALIZADO'
}
