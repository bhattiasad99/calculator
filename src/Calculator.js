import React, { useState } from 'react'
import styles from './Calculator.module.css'
import Button from './Button'
import buttons from './buttons-data'
import Screen from './Screen'

// STATEFUL COMPONENT

const Calculator = (props) => {
    // states
    const [output, setOutput] = useState(0)
    const [operation, setOperation] = useState(null)

    // Large function for calculator buttons logic
    const btnFunctionality = (event) => {
        // dont exceed maximum digits
        if (output.length > 15 && event.type === 'digit') {
            return
        }
        // set operation state
        if (event.type === 'operator') {
            setOperation(event.value)
            // no functionality set
        }
        // set output on screen
        if (event.type === 'digit') {
            // if output is 0 replace the digit
            if (output === 0) {
                // UNLESS the digit is the decimal. Then do it like this ==> 0.something
                if (event.value === '.') {
                    setOutput(String(output) + event.value)
                    return
                }
                setOutput(event.value)
            }
            else {
                // fixed error: single number digit does not convert to array, convert to string before converting to arr
                if (event.value === '.' && String(output).split('').includes('.')) {
                    return
                }
                setOutput(String(output) + String(event.value))
            }
        }
        // set calculator functions
        if (event.type === 'function') {
            // clear button
            if (event.name === 'clear') {
                setOutput(0)
                setOperation(null)
            }
            // correct button
            if (event.name === 'correct') {
                // if nothing to correct
                if (output === 0) {
                    setOperation(null)
                    return
                }
                // rough algo to delete last digit
                const outputArr = output.split('')
                const indexOfLast = output.length - 1
                const newArr = outputArr.slice(0, (indexOfLast))
                const finalStr = newArr.join('')
                // for last digit
                if (output.length === 1) {
                    console.log(output, output.length)
                    setOutput(0)
                    return
                }
                setOutput(finalStr)
            }
        }
    }

    // button handler
    const btnClickHandler = (e) => {
        e.preventDefault()
        const selectedButton = buttons.find(button => (button.id === +e.target.id))
        btnFunctionality(selectedButton)
    }

    // key press handler
    const keyPressHandler = e => {
        e.preventDefault();
        const selectedKey = buttons.find(button => (button.keyTrigger === e.key))
        if (selectedKey) {
            btnFunctionality(selectedKey)
        }
    }

    return (
        <div className={styles.calculator}>
            <Screen operation={operation} output={output} />
            <div className={styles.buttons}>
                {buttons.map(button => {
                    return (
                        <Button
                            key={button.id}
                            clicked={btnClickHandler}
                            buttonPressed={keyPressHandler}
                            {...button} />
                    )
                })}
            </div>
        </div>
    )
}

export default Calculator
