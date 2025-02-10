export interface IEvent {
  type: 'period' | 'routine' | 'schdule' | 'todo';
  title: string;
  start: string;
  end?: string;
  color?: string;
  groupId?: string;
  backgroundColor?: string;
  status?: 0 | 1 | 2;
}
