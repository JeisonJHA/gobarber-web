import { createContext } from 'react';

interface SelectedDateContext {
  selectedDate: Date;
  setSelectedDate: (value: Date) => void;
}

export const SelectedDate = createContext<Partial<SelectedDateContext>>({});

interface SelectedMonthContext {
  selectedMonth: Date;
  setSelectedMonth: (value: Date) => void;
}

export const SelectedMonth = createContext<Partial<SelectedMonthContext>>({});
