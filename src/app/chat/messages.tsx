import styles from './page.module.css';
import MarkdownMessage from './md';

interface MessagesProps {
    messages: Message[];
}

export default function Messages(props: MessagesProps) {
    function renderMessage(message: Message, index: number) {

        function getContent(content: string) {
            if (message.role !== "assistant") {
                return message.content;
            }

            return (
                <MarkdownMessage content={content}/>
            );
        }
        
        let className =
          message.role === "user"
            ? styles.message_user_container
            : message.role === "assistant"
            ? styles.message_assistant_container
            : styles.message_system_container;
        return (
            <div key={index} className={className}>
                {getContent(message.content)}
            </div>
        );
    }

    return (
        <>
            {props.messages.map((message, index) => (
                renderMessage(message, index)
            ))}
        </>
    );
}
