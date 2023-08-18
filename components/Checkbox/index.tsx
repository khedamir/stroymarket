import React, { useContext } from 'react'
import ThemeContext from '../../context/ThemeContext'
import styles from './Checkbox.module.scss'

const Checkbox = ({ ...rest }) => {
    const { theme } = useContext(ThemeContext)
    return <input className={`${styles.checkBox} ${theme && styles[theme]}`} type="checkbox" {...rest} />
}

export default Checkbox
