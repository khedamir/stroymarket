export const LIGHT_THEME = 'light';
export const DARK_THEME = 'dark';

export const TOGGLE_THEME = 'TOGGLE_THEME';
export const INITIAL_THEME = 'INITIAL_THEME';

type Theme = typeof LIGHT_THEME | typeof DARK_THEME;

export type StateType = {
  theme: Theme;
};

export type ContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export type ActionType = {
  type: typeof TOGGLE_THEME | typeof INITIAL_THEME;
  payload?: any;
};