import { useState, useEffect } from "react";
import ChatbotIcon from "./components/ChatbotIcon"
import Chatform from "./components/Chatform";
import ChatMessage from "./components/ChatMessage";
const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const generateBotResponse = async (history) => {
    setIsLoading(true);
    setError(null);
    
    // Format the entire conversation history for the API
    const formattedHistory = history
      .filter(msg => msg.text !== "Thinking...")
      .map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));
    
    // Format the request body to include the entire conversation
    const requestOptions = {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: formattedHistory
      })
    };
    
    try {
      console.log("Sending request to:", API_URL);
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to get response from AI");
      }

      if (!data.candidates || data.candidates.length === 0) {
        throw new Error("No response generated");
      }

      const botResponse = data.candidates[0].content.parts[0].text;
      
      setChatHistory(prevHistory => 
        prevHistory.map(msg => 
          msg.text === "Thinking..." ? { role: "model", text: botResponse } : msg
        )
      );
    } catch (error) {
      console.error("API Error:", error);
      setError(error.message || "An unexpected error occurred");
      
      setChatHistory(prevHistory => 
        prevHistory.map(msg => 
          msg.text === "Thinking..." ? { 
            role: "model", 
            text: "Sorry, I encountered an error. Please try again." 
          } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  
  return (
    <div className="container">
      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button className="material-symbols-outlined">
            keyboard_arrow_down
          </button>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {/* Chatbot body */}
        <div className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey there ✌️ <br /> How can I help you today?
            </p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        <div className="chat-footer">
          <Chatform 
            chatHistory={chatHistory} 
            setChatHistory={setChatHistory} 
            generateBotResponse={generateBotResponse}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default App;