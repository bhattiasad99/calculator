import React from 'react'
import styles from './Button.module.css'
const Button = (props) => {
    // console.log(props)
    return (
        <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={props.clicked} id={props.id}>
                {props.value}
            </button>
        </div>
    )
}

export default Button
