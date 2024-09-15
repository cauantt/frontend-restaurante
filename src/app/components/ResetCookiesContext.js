'use client'
import React, { createContext, useContext } from 'react';

const ResetCookiesContext = createContext()

export function ResetCookiesProvider({ children, resetCookies }) {
  return (
    <ResetCookiesContext.Provider value={resetCookies}>
      {children}
    </ResetCookiesContext.Provider>
  );
}

export function useResetCookies() {
  const context = useContext(ResetCookiesContext);
  if (context === undefined) {
    throw new Error('useResetCookies must be used within a ResetCookiesProvider');
  }
  return context;
}
