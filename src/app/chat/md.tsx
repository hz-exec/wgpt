import rehypeSanitize from "rehype-sanitize";
import MarkdownPreview from '@uiw/react-markdown-preview';
import styles from './page.module.css';

interface MarkdownMessageProps {
    content: string;
}

const rehypePlugins = [rehypeSanitize];

export default function MarkdownMessage(props: MarkdownMessageProps) {
    return (
        <div className={styles.message_assistant_container}>
        {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {props.content}
      </ReactMarkdown> */}
      <MarkdownPreview 
        source={props.content} 
        rehypePlugins={rehypePlugins}
        className={styles.message_assistant_container}
        />
      </div>
    );
}
