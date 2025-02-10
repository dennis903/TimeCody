export const dateDB: {
  [key: string]: Array<{
    type: string;
    title: string;
    start: string;
    end?: string;
    color?: string;
    groupId?: string;
    backgroundColor?: string;
    status?: 0 | 1 | 2; // 0: 미완료, 1: 진행중, 2: 완료
  }>;
} = {
  '2024-07': [
    {
      type: 'period',
      title: '여름 축제',
      start: '2024-07-14',
      end: '2024-07-16',
      color: 'yellow',
    },
    {
      type: 'routine',
      groupId: 'exercise',
      title: '아침 조깅',
      start: '2024-07-05T06:30:00',
    },
    {
      type: 'schedule',
      title: '가족 모임',
      start: '2024-07-20',
    },
    {
      type: 'todo',
      title: '책 읽기 - "위대한 개츠비"',
      start: '2024-07-10T15:00:00',
      end: '2024-07-10T17:00:00',
      backgroundColor: 'blue',
      status: 0,
    },
  ],
  '2024-08': [
    {
      type: 'period',
      title: '해변 휴가',
      start: '2024-08-01',
      end: '2024-08-05',
      color: 'aqua',
    },
    {
      type: 'routine',
      groupId: 'exercise',
      title: '요가 수업',
      start: '2024-08-12T07:00:00',
      status: 2,
    },
    {
      type: 'schedule',
      title: '워크숍',
      start: '2024-08-25',
    },
    {
      type: 'todo',
      title: '생일 파티 준비',
      start: '2024-08-15T14:00:00',
      end: '2024-08-15T16:00:00',
      backgroundColor: 'purple',
      status: 1,
    },
  ],
  '2024-09': [
    {
      type: 'period',
      title: '가을 축제',
      start: '2024-09-18',
      end: '2024-09-20',
      color: 'orange',
    },
    {
      type: 'routine',
      groupId: 'exercise',
      title: '저녁 달리기',
      start: '2024-09-07T18:30:00',
      status: 0,
    },
    {
      type: 'schedule',
      title: '회사 회의',
      start: '2024-09-13',
    },
    {
      type: 'todo',
      title: '시험 준비',
      start: '2024-09-22T10:00:00',
      end: '2024-09-22T12:00:00',
      backgroundColor: 'red',
      status: 2,
    },
  ],
  '2024-10': [
    {
      type: 'period',
      title: '할로윈 준비',
      start: '2024-10-25',
      end: '2024-10-31',
      color: 'black',
    },
    {
      type: 'routine',
      groupId: 'exercise',
      title: '헬스장 운동',
      start: '2024-10-05T17:00:00',
      status: 0,
    },
    {
      type: 'schedule',
      title: '봉사 활동',
      start: '2024-10-12',
    },
    {
      type: 'todo',
      title: '할로윈 쿠키 만들기',
      start: '2024-10-29T13:00:00',
      end: '2024-10-29T15:00:00',
      backgroundColor: 'orange',
      status: 0,
    },
  ],
  '2024-11': [
    {
      type: 'period',
      title: '가을 휴양',
      start: '2024-11-10',
      end: '2024-11-12',
      color: 'brown',
    },
    {
      type: 'routine',
      groupId: 'exercise',
      title: '필라테스',
      start: '2024-11-08T08:00:00',
      status: 0,
    },
    {
      type: 'schedule',
      title: '연간 리뷰',
      start: '2024-11-20',
    },
    {
      type: 'todo',
      title: '블로그 글쓰기',
      start: '2024-11-15T09:00:00',
      end: '2024-11-15T11:00:00',
      backgroundColor: 'green',
      status: 1,
    },
  ],
  '2024-12': [
    {
      type: 'period',
      title: '휴일 시즌',
      start: '2024-12-24',
      end: '2024-12-26',
      color: 'green',
    },
    {
      type: 'period',
      title: '겨울 휴가',
      start: '2024-12-27',
      end: '2024-12-31',
      color: 'blue',
    },
    {
      type: 'routine',
      groupId: 'workout',
      title: '요가 세션',
      start: '2024-12-05T07:00:00',
      status: 1,
    },
    {
      type: 'routine',
      groupId: 'workout',
      title: '달리기',
      start: '2024-12-07T06:30:00',
      status: 2,
    },
    {
      type: 'schedule',
      title: '팀 미팅',
      start: '2024-12-15',
    },
    {
      type: 'schedule',
      title: '프로젝트 마감',
      start: '2024-12-20',
    },
    {
      type: 'todo',
      title: '발표 준비',
      start: '2024-12-10T09:00:00',
      end: '2024-12-10T11:00:00',
      backgroundColor: 'orange',
      status: 2,
    },
    {
      type: 'todo',
      title: '크리스마스 쇼핑',
      start: '2024-12-23T14:00:00',
      end: '2024-12-23T17:00:00',
      backgroundColor: 'red',
      status: 0,
    },
  ],
  '2025-01': [
    {
      type: 'period',
      title: '신년 휴가',
      start: '2025-01-01',
      end: '2025-01-03',
      color: 'blue',
    },
    {
      type: 'routine',
      groupId: 'exercise',
      title: '아침 조깅',
      start: '2025-01-05T06:30:00',
      color: 'blue',
      status: 1,
    },
    {
      type: 'schedule',
      title: '신년 모임',
      start: '2025-01-10',
    },
    {
      type: 'todo',
      title: '책 읽기 - "1984"',
      start: '2025-01-15T15:00:00',
      end: '2025-01-15T17:00:00',
      backgroundColor: 'green',
      status: 1,
    },
  ],
};
