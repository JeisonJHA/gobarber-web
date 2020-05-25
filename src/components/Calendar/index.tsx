import React, { useCallback, useState } from 'react';
import DayPicker, {
  NavbarElementProps,
  WeekdayElementProps,
  CaptionElementProps,
  DayModifiers,
} from 'react-day-picker';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import 'react-day-picker/lib/style.css';

import { Container } from './styles';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Caption = (props: CaptionElementProps) => {
  const { classNames, date, localeUtils } = props;
  const caption = localeUtils.formatMonthTitle(date);
  console.log(date);
  return <div className={classNames.caption}>{caption}</div>;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Weekday = (props: WeekdayElementProps) => {
  const { weekday, className, localeUtils, locale, weekdaysShort } = props;
  const showWeekday = useCallback(() => {
    if (!weekdaysShort) return '';
    return weekdaysShort[weekday];
  }, [weekday, weekdaysShort]);
  const defineClassName = useCallback(() => {
    return className;
  }, [className]);
  const weekdayName = localeUtils.formatWeekdayShort(weekday, locale);
  console.log(weekdayName);
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
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);
  return (
    <Container>
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
    </Container>
  );
};

export default Calendar;
