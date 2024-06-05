"use client"

import styles from './page.module.css';

interface InputsProps {
    onClick: (prompt: string) => void;
}

export default function Inputs(props: InputsProps) {
    const handleSend = () => {
        const input = document.querySelector("input");
        if (!input) return;

        props.onClick(input.value);
        input.value = "";
    }

    return (
        <div className={styles.input_container}>
            <div className={styles.inputs_child_input}>
                <input type="text" width="100%"/>
            </div>
            <div className={styles.inputs_child_button}>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}
