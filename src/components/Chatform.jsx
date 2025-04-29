import { useRef, useState } from "react";

const Chatform = ({ chatHistory, setChatHistory, generateBotResponse, isLoading }) => {
    const inputRef = useRef();
    const [inputValue, setInputValue] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputValue.trim();
        if (!userMessage || isLoading) return;

        // Clear input
        setInputValue("");
        inputRef.current.value = "";

        // Add user message to chat history
        setChatHistory(history => [...history, { role: "user", text: userMessage }]);

        // Add thinking message after a short delay
        setTimeout(() => {
            setChatHistory(history => [...history, { role: "model", text: "Thinking..." }]);
        }, 300);

        // Generate bot response
        generateBotResponse([...chatHistory, { role: "user", text: userMessage }]);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
            <input 
                ref={inputRef} 
                type="text" 
                placeholder={isLoading ? "Waiting for response..." : "Type your message..."} 
                className="message-input" 
                required 
                disabled={isLoading}
                value={inputValue}
                onChange={handleInputChange}
            />
            <button 
                className="material-symbols-outlined" 
                type="submit"
                disabled={isLoading || !inputValue.trim()}
            >
                {isLoading ? "hourglass_empty" : "arrow_upward"}
            </button>
        </form>
    );
};

export default Chatform;