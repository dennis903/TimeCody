import IconComponent from '@/components/Icon/Icon.component';
import { type FC } from 'react';

interface IScheduleCalendarContainerProps {
  date: Date;
}

const ScheduleCalendarContainer: FC<IScheduleCalendarContainerProps> = () => {
  return (
    <>
      <main className="main">
        <div className="schedule-contents">
          <div className="schedule-list">
            <div className="schedule-item">
              <div className="schedule-check schedule-check--complete"></div>
              <p className="schedule-item-subtitle">1984 독서하기</p>
            </div>
            <div className="schedule-item">
              <div className="schedule-check schedule-check--doing"></div>
              <p className="schedule-item-subtitle">포트폴리오 제작</p>
            </div>
            <div className="schedule-item">
              <div className="schedule-check"></div>
              <p className="schedule-item-subtitle">영어 공부</p>
            </div>
            <div className="schedule-item">
              <div className="schedule-check"></div>
              <p className="schedule-item-subtitle">과외 하기</p>
            </div>
            <div className="schedule-open">
              <button className="icon-btn">
                <IconComponent icon="icon-open" />
              </button>
            </div>
          </div>
          <div className="schedule-time">
            <ul className="schedule-time-list">
              <li className="schedule-time-item">
                <span className="schedule-time__timeline">08:00AM</span>
                <div className="schedule-time__info">
                  <span className="schedule-time__check"></span>
                  <div className="schedule-time__info-detail">
                    <h3 className="schedule-time__title">아침 운동</h3>
                    <div className="schedule-time__detail">
                      <span className="schedule-time__sub-text">
                        08:00 AM <i className="icon icon-arrow-small"></i> 10:00 AM
                      </span>
                    </div>
                  </div>
                </div>
              </li>
              <li className="schedule-time-item">
                <span className="schedule-time__timeline">10:00AM</span>
                <div className="schedule-time__info">
                  <div className="schedule-time__info-detail">
                    <h3 className="schedule-time__title">인터넷 강의</h3>
                    <div className="schedule-time__detail">
                      <span className="schedule-time__sub-text">
                        10:00 AM <i className="icon icon-arrow-small"></i> 12:00 PM
                      </span>
                    </div>
                  </div>
                </div>
              </li>
              <li className="schedule-time-item">
                <span className="schedule-time__timeline">12:00AM</span>
                <div className="schedule-time__info"></div>
              </li>
              <li className="schedule-time-item">
                <span className="schedule-time__timeline">02:00PM</span>
                <div className="schedule-time__info"></div>
              </li>
              <li className="schedule-time-item">
                <span className="schedule-time__timeline">04:00PM</span>
                <div className="schedule-time__info"></div>
              </li>
              <li className="schedule-time-item">
                <span className="schedule-time__timeline">06:00PM</span>
                <div className="schedule-time__info"></div>
              </li>
              <li className="schedule-time-item">
                <span className="schedule-time__timeline">08:00PM</span>
                <div className="schedule-time__info"></div>
              </li>
              <li className="schedule-time-item">
                <span className="schedule-time__timeline">10:00PM</span>
                <div className="schedule-time__info"></div>
              </li>
              <li className="schedule-time-item">
                <span className="schedule-time__timeline">00:00AM</span>
                <div className="schedule-time__info"></div>
              </li>
              <li className="schedule-time-item">
                <span className="schedule-time__timeline">02:00AM</span>
                <div className="schedule-time__info"></div>
              </li>
              <li className="schedule-time-item">
                <span className="schedule-time__timeline">04:00AM</span>
                <div className="schedule-time__info"></div>
              </li>
              <li className="schedule-time-item">
                <span className="schedule-time__timeline">06:00AM</span>
                <div className="schedule-time__info"></div>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default ScheduleCalendarContainer;
