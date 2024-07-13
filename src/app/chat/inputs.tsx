"use client"

import { useRef, useState, useEffect } from 'react';
import styles from './page.module.css';

interface InputsProps {
    onClick: (query: string) => void;
}

export default function Inputs(props: InputsProps) {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [inputContent, setInputContent] = useState("");
    const [isComposing, setIsComposing] = useState(false);
    const [inputRows, setInputRows] = useState(1);
    
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        if (!input) {
            console.error("Input not found");
            return;
        }

        const files = input.files;
        if (!files) {
            console.error("Files not found");
            return;
        }

        const file = files[0];
        if (!file) {
            console.error("File not found");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result;
            if (!content) {
                console.error("Content not found");
                return;
            }

            setInputContent(content.toString());
        }
        reader.readAsText(file);
    }
 
    const handleUpload = async () => {
        if (!inputFileRef.current) {
            console.error("Input file not found");
            return;
        }

        inputFileRef.current.click();
    }

    const handleInputContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textareaLineHeight = 24;
        const previousRows = event.target.rows;
        event.target.rows = 1;

        const currentRows = Math.floor(event.target.scrollHeight / textareaLineHeight);

        if (currentRows === previousRows) {
            event.target.rows = currentRows;
        }

        if (currentRows >= 3) {
            event.target.rows = 3;
            event.target.scrollTop = event.target.scrollHeight;
        }

        setInputContent(event.target.value);
        setInputRows(currentRows);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !isComposing && !e.shiftKey && !e.ctrlKey) {
            handleSend();
        }
    }

    const handleCompositionStart = () => {
        setIsComposing(true);
      };
    
      const handleCompositionEnd = () => {
        setIsComposing(false);
      };

      const handleSend = () => {
        console.log("Send: " + inputContent);
        if (!inputContent) {
            return;
        }
        props.onClick(inputContent);
        setInputContent("");
    }

    return (
        <div className={styles.inputs_container}>
            <input type="file" ref={inputFileRef} style={{display: 'none'}} onChange={handleFileChange}/>
            <button className={styles.input_child_button} onClick={handleUpload}>Upload</button>
            <textarea
                value={inputContent}
                rows={inputRows}
                className={styles.input_child_text}
                onChange={handleInputContentChange}
                onKeyDown={handleKeyDown}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
            />
            <button className={styles.input_child_button} onClick={handleSend}>Send</button>
        </div>
    );
}
