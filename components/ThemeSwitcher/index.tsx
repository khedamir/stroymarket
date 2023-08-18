import { useContext } from 'react'
import ThemeContext, { THEME } from '../../context/ThemeContext'
import styles from './ThemeSwitcher.module.scss'

function ThemeSwitcher() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    return (
        <div className={`${styles.wrapper} ${styles[theme]}`}>
            <input type="checkbox" id="switcher" onChange={toggleTheme} checked={theme === THEME.DARK} />
            <label htmlFor="switcher">
                <div className={styles.iconWrapper}>
                    <span className={styles.icon}>
                        <span></span>
                    </span>
                </div>
                <div className={styles.iconWrapper}>
                    <span className={styles.icon}>
                        <span></span>
                    </span>
                </div>
            </label>
        </div>
    )
}

export default ThemeSwitcher
