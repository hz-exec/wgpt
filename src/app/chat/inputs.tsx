"use client"

import styles from './page.module.css';

interface InputsProps {
    onClick: (query: string) => void;
}

export default function Inputs(props: InputsProps) {
    const handleSend = () => {
        const input = document.querySelector("input");
        if (!input) return;

        props.onClick(input.value);
        input.value = "";
    }

    const handleUpload = () => {
        const input = document.querySelector("input");
        if (!input) return;

        input.click();
    }

    return (
        <div className={styles.inputs_container}>
            <input type='file' className={styles.input_child_button} onClick={handleUpload} />
            <input type="text" className={styles.input_child_text}/>
            <button className={styles.input_child_button} onClick={handleSend}>Send</button>
        </div>
    );
}
