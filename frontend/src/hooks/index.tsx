import React from 'react';

import { AuthProvider } from '@hooks/auth';
import { DatePickerProvider } from '@hooks/datePicker';
import { ToastProvider } from '@hooks/toast';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <DatePickerProvider>
        <ToastProvider>{children}</ToastProvider>
      </DatePickerProvider>
    </AuthProvider>
  );
};

export default AppProvider;
