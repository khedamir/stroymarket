import { createContext, FC, ReactNode, useEffect, useReducer } from 'react'

export const enum THEME_REDUCER_ACTION {
    INIT,
    TOGGLE,
}

export const enum THEME {
    DARK = 'dark',
    LIGHT = 'light',
}

type ThemeReducerAction = {
    type: THEME_REDUCER_ACTION
}

type ThemeState = {
    theme: THEME
}

const initialState: ThemeState = {
    theme: THEME.DARK,
}

export type ThemeContextType = {
    theme: THEME
    toggleTheme: () => void
}
interface Cookie {
    sid?: string | null
}

const themeReducer = (state: ThemeState, action: ThemeReducerAction): ThemeState => {
    switch (action.type) {
        case THEME_REDUCER_ACTION.INIT:
            const theme = localStorage.getItem('theme')
            if (theme) {
                return { ...state, theme: theme as THEME }
            }
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

            if (prefersDark) {
                return { ...state, theme: THEME.DARK }
            }
            return { ...state, theme: THEME.LIGHT }
        case THEME_REDUCER_ACTION.TOGGLE:
            const newTheme = state.theme === THEME.DARK ? THEME.LIGHT : THEME.DARK
            localStorage.setItem('theme', newTheme)
            return { ...state, theme: newTheme }
    }
}

function init(initialState: ThemeState): ThemeState {
    return { theme: initialState.theme }
}

const ThemeContext = createContext<ThemeContextType>({ ...initialState, toggleTheme: () => {} })

type themeContextProps = {
    children: ReactNode
}
export const ThemeContextProvider: FC<themeContextProps> = ({ children }) => {
    const [state, dispatch] = useReducer(themeReducer, initialState, init)
    useEffect(() => {
        dispatch({ type: THEME_REDUCER_ACTION.INIT })
    }, [])

    const value = {
        theme: state.theme,
        toggleTheme: () => {
            dispatch({ type: THEME_REDUCER_ACTION.TOGGLE })
        },
    }
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeContext
