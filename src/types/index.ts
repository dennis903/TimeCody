export interface IEvent {
  type: 'period' | 'routine' | 'schedule' | 'todo';
  id: string;
  title: string;
  start: string;
  end?: string;
  color?: string;
  groupId?: string;
  backgroundColor?: string;
  status?: 0 | 1 | 2;
}

export interface ICategory {
  id: number;
  title: string;
  color?: string;
}
