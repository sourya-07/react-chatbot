import { useState } from "react";
import ChatbotIcon from "./components/ChatbotIcon"
import Chatform from "./components/Chatform";
import ChatMessage from "./components/ChatMessage";

const App = () => {
  const [chatHistory, setChatHistory] = useState([])

  const generateBotRespose = (history) => {
    console.log(history)
  }
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
        {/* Chatbot body */}
        <div className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text" style={{ 'background': '#f5f5f5 ', 'borderRadius': '13px 13px 3px 13px' }}>Hey there ✌️ <br /> How can I help you today?</p>
          </div>

          {chatHistory.map((chat, index) => {
            return <ChatMessage key={index} chat={chat} />;
          })}

        </div>

        <div className="chat-footer">
          <Chatform chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotRespose={generateBotRespose}/>
        </div>
      </div>
    </div>
  );
};

export default App;