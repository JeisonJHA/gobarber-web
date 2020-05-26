import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 380px;

  .DayPicker {
    background: #28262e;
    border-radius: 10px;
  }

  .DayPicker-Caption {
    height: 50px;
    border-radius: 10px 10px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 380px;
    color: #f4ede8;
    background: #3e3b47;
    font-size: 16px;
    font-weight: 500;
    line-height: 21px;
  }

  .DayPicker-NavBar {
    button {
      background: transparent;
      border: 0;
      color: #f4ede8;
      margin-top: 19px;
      position: absolute;

      svg {
        height: 20px;
        width: 20px;
        color: #999591;
      }
    }
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Weekdays {
    margin-top: 0em;
  }

  .DayPicker-Weekday {
    width: 40px;
    height: 40px;
    font-size: 16px;
    line-height: 21px;
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 0 16px 16px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected,
  .DayPicker-Weekday--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
