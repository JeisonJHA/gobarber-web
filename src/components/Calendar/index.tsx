import React, { useCallback, useContext, useState } from 'react';
import DayPicker, {
  NavbarElementProps,
  WeekdayElementProps,
  CaptionElementProps,
  DayModifiers,
} from 'react-day-picker';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import 'react-day-picker/lib/style.css';

import { Container } from './styles';
import { SelectedDate } from '../../hooks/selectedDateContext';

const SelectedMonth = React.createContext(new Date());
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Caption = (props: CaptionElementProps) => {
  const { classNames, date, localeUtils } = props;
  const caption = localeUtils.formatMonthTitle(date);
  return <div className={classNames.caption}>{caption}</div>;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Weekday = (props: WeekdayElementProps) => {
  const { selectedDate } = useContext(SelectedDate);
  const month = useContext(SelectedMonth);
  const { weekday, className, localeUtils, locale, weekdaysShort } = props;
  const showWeekday = useCallback(() => {
    if (!weekdaysShort) return '';
    return weekdaysShort[weekday];
  }, [weekday, weekdaysShort]);

  const defineClassName = useCallback(() => {
    return weekday === selectedDate?.getDay() &&
      selectedDate?.getMonth() === month.getMonth()
      ? `${className} ${className}--selected`
      : className;
  }, [className, month, selectedDate, weekday]);

  const weekdayName = localeUtils.formatWeekdayShort(weekday, locale);
  return (
    <div className={defineClassName()} title={weekdayName}>
      {showWeekday()}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Navbar = (props: NavbarElementProps) => {
  const {
    onPreviousClick,
    onNextClick,
    className,
    showPreviousButton,
    showNextButton,
  } = props;
  return (
    <div className={className}>
      {showPreviousButton && (
        <button
          type="button"
          style={{
            float: 'left',
            left: ' 0px',
            marginLeft: '39px',
          }}
          onClick={() => onPreviousClick()}
        >
          <FiArrowLeft />
        </button>
      )}
      {showNextButton && (
        <button
          type="button"
          style={{
            float: 'right',
            right: ' 0px',
            marginRight: '39px',
          }}
          onClick={() => onNextClick()}
        >
          <FiArrowRight />
        </button>
      )}
    </div>
  );
};

const Calendar: React.FC = () => {
  const { selectedDate, setSelectedDate } = useContext(SelectedDate);
  const [month, setMonth] = useState(new Date());

  const handleDateChange = useCallback(
    (day: Date, modifiers: DayModifiers) => {
      if (modifiers.available) {
        if (!setSelectedDate) return;
        setSelectedDate(day);
      }
    },
    [setSelectedDate]
  );

  return (
    <Container>
      <SelectedMonth.Provider value={month}>
        <DayPicker
          navbarElement={Navbar}
          captionElement={Caption}
          weekdayElement={Weekday}
          weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
          fromMonth={new Date()}
          modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
          disabledDays={[{ daysOfWeek: [0, 6] }]}
          onDayClick={handleDateChange}
          selectedDays={selectedDate}
          onMonthChange={(date) => setMonth(date)}
          months={[
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro',
          ]}
        />
      </SelectedMonth.Provider>
    </Container>
  );
};

export default Calendar;
