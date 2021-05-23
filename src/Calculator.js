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

    // button handler
    const btnClickHandler = (e) => {
        e.preventDefault()
        const selectedButton = buttons.find(button => (button.id === +e.target.id))
        // dont exceed maximum digits
        if (output.length > 15 && selectedButton.type === 'digit') {
            return
        }
        // set operation state
        if (selectedButton.type === 'operator') {
            setOperation(selectedButton.value)
            // no functionality set
        }
        // set output on screen
        if (selectedButton.type === 'digit') {
            // if output is 0 replace the digit
            if (output === 0) {
                // UNLESS the digit is the decimal. Then do it like this ==> 0.something
                if (selectedButton.value === '.') {
                    setOutput(String(output) + selectedButton.value)
                    return
                }
                setOutput(selectedButton.value)
            }
            else {
                // fixed error: single number digit does not convert to array, convert to string before converting to arr
                if (selectedButton.value === '.' && String(output).split('').includes('.')) {
                    return
                }
                setOutput(String(output) + String(selectedButton.value))
            }
        }
        // set calculator functions
        if (selectedButton.type === 'function') {
            // clear button
            if (selectedButton.name === 'clear') {
                setOutput(0)
                setOperation(null)
            }
            // correct button
            if (selectedButton.name === 'correct') {
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

    return (
        <div className={styles.calculator}>
            <Screen operation={operation} output={output} />
            <div className={styles.buttons}>
                {buttons.map(button => {
                    return (
                        <Button key={button.id} {...button} clicked={btnClickHandler} />
                    )
                })}
            </div>
        </div>
    )
}

export default Calculator
