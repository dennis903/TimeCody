import { type FC, useEffect, useState } from 'react';
import IconComponent from '@/components/Icon/Icon.component';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import repository from '@/repository';
import getContrastColor from '@/utils/luminance';

import './CalendarModal.container.css';
import { IEvent } from '@/types';
import { match } from 'ts-pattern';

import CompleteSvg from '@/components/svg/CompleteSvg';
import DoingSvg from '@/components/svg/DoingSvg';
import PeriodSvg from '@/components/svg/PeriodSvg';

interface ICalendarModalItemContainerProps {
  date: Date;
  content: IEvent;
  isEditOn: boolean;
}

const CalendarModalItemContainer: FC<ICalendarModalItemContainerProps> = (props) => {
  const setTypeLabel = (type: string) => {
    switch (type) {
      case 'todo':
        return '할 일';
      case 'routine':
        return '습관';
      case 'schedule':
        return '일정';
      case 'period':
        return '구간';
      default:
        return '';
    }
  };
  const [statusLabel, setStatusLabel] = useState('');
  const [status, setStatus] = useState(0);
  const [isShowStatusLabel, setIsShowStatusLabel] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: updateStatusMutate } = useMutation({
    mutationKey: ['updateStatus'],
    mutationFn: async (status: number) => {
      const res = await repository.monthlyCalendar.putChangeTargetCalendarStatus({
        id: props.content.id,
        status,
      });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['getCalendarByDate', props.date] });

      setStatus(data.status);
    },
  });

  const onClickStatusLabel = () => {
    setIsShowStatusLabel(!isShowStatusLabel);
  };

  const onClickStatusBtn = (status: number) => {
    updateStatusMutate(status);
  };

  useEffect(() => {
    setStatusLabel(() => {
      switch (status) {
        case 0:
          return '미완료';
        case 1:
          return '진행중';
        case 2:
          return '완료';
        default:
          return '';
      }
    });
  }, [status]);

  useEffect(() => {
    if (props.content.status === undefined) {
      return;
    }

    setStatus(props.content.status);
  }, [props.content.status]);

  return (
    <div className="calendar-modal__content">
      {match(props.content.type)
        .when(
          (type) => type === 'todo' || type === 'routine',
          () =>
            match(status)
              .with(1, () => (
                <div
                  className="calendar-modal__checkbox"
                  onClick={onClickStatusLabel}
                  style={{ borderColor: props.content.backgroundColor || props.content.color }}
                >
                  <DoingSvg color={props.content.backgroundColor || props.content.color} />
                </div>
              ))
              .with(2, () => (
                <div
                  className="calendar-modal__checkbox"
                  onClick={onClickStatusLabel}
                  style={{
                    backgroundColor: props.content.backgroundColor || props.content.color,
                    borderColor: props.content.backgroundColor || props.content.color,
                  }}
                >
                  <CompleteSvg
                    color={getContrastColor(props.content.backgroundColor || props.content.color || '#ffffff')}
                  />
                </div>
              ))
              .otherwise(() => <div className="calendar-modal__checkbox" onClick={onClickStatusLabel} />),
        )
        .when(
          (type) => type === 'period',
          () => (
            <div
              className="calendar-modal__checkbox"
              style={{
                backgroundColor: props.content.backgroundColor || props.content.color,
                borderColor: props.content.backgroundColor || props.content.color,
              }}
            >
              <PeriodSvg color="#ffffff" />
            </div>
          ),
        )
        .otherwise(() => (
          <div
            className="calendar-modal__checkbox"
            style={{
              backgroundColor: props.content.backgroundColor || props.content.color,
              borderColor: props.content.backgroundColor || props.content.color,
            }}
          />
        ))}
      <div className="calendar-modal__item">
        <div className="calendar-modal__item-edit">
          <p className="calendar-modal__content-title">{props.content.title}</p>
          {props.isEditOn && <IconComponent icon="icon-order-edit" />}
        </div>
        <div className="calendar-modal__content-state">
          <p className="calendar-modal__state-type">{setTypeLabel(props.content.type)}</p>
          {(props.content.type === 'todo' || props.content.type === 'routine') && (
            <p className="calendar-modal__state-description">{statusLabel}</p>
          )}
        </div>
        {isShowStatusLabel && (
          <div className="calendar-modal__checkbox-selected">
            {status !== 0 && (
              <div className="calendar-modal__checkbox-content">
                <button type="button" className="icon-btn" onClick={() => onClickStatusBtn(0)}></button>
                <span className="calendar-modal__checkbox-description">미완료</span>
              </div>
            )}
            {status !== 1 && (
              <div className="calendar-modal__checkbox-content">
                <button type="button" className="icon-btn" onClick={() => onClickStatusBtn(1)}>
                  <DoingSvg />
                </button>
                <span className="calendar-modal__checkbox-description">진행중</span>
              </div>
            )}
            {status !== 2 && (
              <div className="calendar-modal__checkbox-content">
                <button type="button" className="icon-btn" onClick={() => onClickStatusBtn(2)}>
                  <CompleteSvg />
                </button>
                <span className="calendar-modal__checkbox-description">완료</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarModalItemContainer;
