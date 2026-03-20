# 🤖 React AI Chatbot

A conversational AI chatbot built with **React + Vite** that uses the **Google Gemini 2.5 Flash** API to generate intelligent, real-time responses. The UI features a chat bubble interface with support for multi-turn conversations and loading states.

---

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 6 | Build tool & dev server |
| Google Gemini 2.5 Flash | AI language model (via REST API) |
| Vanilla CSS | Styling |
| Google Material Symbols | Icons |

---

## 📁 Project Structure

```
react-chatbot/
├── public/                   # Static assets
├── src/
│   ├── components/
│   │   ├── ChatbotIcon.jsx   # SVG robot icon used in the header & bot messages
│   │   ├── ChatMessage.jsx   # Renders a single chat bubble (user or bot)
│   │   └── Chatform.jsx      # Text input + submit button form
│   ├── App.jsx               # Main app — manages state & calls Gemini API
│   ├── index.css             # Global styles
│   └── main.jsx              # React entry point
├── .env                      # Gemini API URL (kept secret, not committed)
├── index.html                # HTML shell
├── package.json
└── vite.config.js
```

---

## ⚙️ How It Works

### 1. User Sends a Message
The user types into the `<Chatform />` component and hits submit. The message is added to the `chatHistory` state in `App.jsx` and a **"Thinking..."** placeholder is immediately shown in the chat so the UI feels responsive.

### 2. Gemini API Call
`App.jsx` calls `generateBotResponse()`, which:
- Formats the **entire conversation history** into the Gemini API's expected format:
  ```json
  {
    "contents": [
      { "role": "user",  "parts": [{ "text": "Hello!" }] },
      { "role": "model", "parts": [{ "text": "Hi! How can I help?" }] },
      ...
    ]
  }
  ```
- Sends a `POST` request to the Gemini REST endpoint (stored in `.env`).
- Parses `data.candidates[0].content.parts[0].text` from the response.

### 3. Response Displayed
The **"Thinking..."** placeholder is replaced with the actual bot response. If the API returns an error, a user-friendly error message is shown for 5 seconds.

### 4. Multi-turn Conversation
Every message (user + bot) is kept in `chatHistory`. Each new API call sends the **full history**, giving Gemini context of the entire conversation for coherent, context-aware replies.

---

## 🔑 Environment Variables

The API URL is stored in a `.env` file at the project root:

```env
VITE_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=YOUR_API_KEY
```

> ⚠️ **Never commit your `.env` file to version control.** It is already listed in `.gitignore`.

To get an API key, visit [Google AI Studio](https://aistudio.google.com/apikey).

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- A Google Gemini API key

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/sourya-07/react-chatbot.git
cd react-chatbot

# 2. Install dependencies
npm install

# 3. Create your .env file
echo "VITE_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=YOUR_API_KEY" > .env

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🧩 Component Overview

### `App.jsx`
The root component that:
- Holds `chatHistory`, `isLoading`, and `error` state
- Contains the `generateBotResponse()` function that calls the Gemini API
- Renders the header, chat body, and footer

### `Chatform.jsx`
- Controlled text input synced via `useState`
- Disables the input and button while the API is loading
- Calls `generateBotResponse()` on submit

### `ChatMessage.jsx`
- Renders a single message bubble
- Detects `"Thinking..."` text to apply an animated dots class
- Shows `<ChatbotIcon />` only for bot messages

### `ChatbotIcon.jsx`
- A pure SVG robot face icon used in the header and next to every bot message

---

## 📄 License

MIT
