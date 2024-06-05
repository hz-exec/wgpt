
interface OngoingMessageProps {
    content: string;
}

export default function OngoingMessage(props: OngoingMessageProps) {
    return (
        <div>
            {props.content}
        </div>
    );
}
