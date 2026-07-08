// src/theme/ThemeContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@jadwalkuliah_theme';

export const LIGHT_COLORS = {
  mode: 'light',
  bg: '#F5F6FC',
  surface: '#FFFFFF',
  surfaceAlt: '#EEF0FF',
  primary: '#4338CA',
  primaryDeep: '#3730A3',
  primarySoft: '#EEF0FF',
  accent: '#F59E0B',
  accentSoft: '#FEF3E2',
  success: '#059669',
  successSoft: '#ECFDF5',
  danger: '#DC2626',
  dangerSoft: '#FEF2F2',
  sky: '#0284C7',
  navy: '#1E293B',
  textDark: '#1E2538',
  textSub: '#64748B',
  border: '#E7E9F3',
  shadow: 'rgba(30,37,56,0.08)',
};

export const DARK_COLORS = {
  mode: 'dark',
  bg: '#0A0F1E',
  surface: '#141B2E',
  surfaceAlt: '#1B2340',
  primary: '#818CF8',
  primaryDeep: '#6366F1',
  primarySoft: '#1E2547',
  accent: '#FBBF24',
  accentSoft: '#2A2210',
  success: '#34D399',
  successSoft: '#0F2A20',
  danger: '#F87171',
  dangerSoft: '#2A1414',
  sky: '#38BDF8',
  navy: '#CBD5E1',
  textDark: '#F1F5F9',
  textSub: '#94A3B8',
  border: '#242D48',
  shadow: 'rgba(0,0,0,0.5)',
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === 'dark') setIsDark(true);
      } catch (e) {
        // abaikan, gunakan default light
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const toggleTheme = async () => {
    setIsDark((prev) => {
      const next = !prev;
      AsyncStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light').catch(() => {});
      return next;
    });
  };

  const colors = isDark ? DARK_COLORS : LIGHT_COLORS;

  if (!ready) return null;

  return (
    <ThemeContext.Provider value={{ colors, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme harus dipakai di dalam ThemeProvider');
  return ctx;
}
