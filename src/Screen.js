import React from 'react'
import styles from './Screen.module.css'
const Screen = ({ operation, output }) => {
    return (
        <div className={styles.screen}>
            <span className={styles.operation}>{operation}</span>
            <span className={styles.output}>{output}</span>
        </div>
    )
}

export default Screen
