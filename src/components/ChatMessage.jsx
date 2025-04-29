import ChatbotIcon from "./ChatbotIcon";

const ChatMessage = ({ chat }) => {
    const isThinking = chat.text === "Thinking...";
    
    return (
        <div className={`message ${chat.role === "model" ? 'bot' : 'user'}-message`}>
            {chat.role === "model" && <ChatbotIcon />}
            <p className={`message-text ${isThinking ? 'thinking' : ''}`}>
                {chat.text}
                {isThinking && <span className="thinking-dots">...</span>}
            </p>
        </div>
    );
};

export default ChatMessage;
