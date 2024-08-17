interface SettingsProps{
    closeSettings: () => void;
}

interface ChatProps{
    closeChat: () => void;
    messages: string[];
    handleSendMessage: (e: React.FormEvent) => void;
    input: string;
    setInput: (value: string) => void;
}
