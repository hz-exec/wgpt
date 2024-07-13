interface uploadedFile {
    name: string;
    size: number;
    content: string;
}

interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
    files: uploadedFile[] | null;
}
