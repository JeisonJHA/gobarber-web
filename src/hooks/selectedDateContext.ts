import { createContext } from 'react';

interface SelectedDateContext {
  selectedDate: Date;
  setSelectedDate: (value: Date) => void;
}

export const SelectedDate = createContext<Partial<SelectedDateContext>>({});
