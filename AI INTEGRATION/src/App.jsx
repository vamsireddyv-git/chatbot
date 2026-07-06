import { useState } from 'react'
import sideLogo from './assets/sideimage.png'
import mainLogo from './assets/gemini.png'
import axios from 'axios'
import ReactMarkDown from 'react-markdown';
import './App.css'
const API_URL = import.meta.env.VITE_API_URL;

function App() {

  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if(!inputText.trim()){
      return <p>Please enter a valid question</p>
    }
    setIsLoading(true);
    try{
      const response = await axios.post(`${API_URL}/api/ai/generate`,{message : inputText});
      const updatedMessages = [
      ...messages, 
      { userMessage: inputText, status: "user" }, 
      { botMessage: response.data.reply, status: "ai" }
    ];
    setMessages(updatedMessages);
      setInputText('');
    }catch(error){
      return <p>Something went wrong. Please try again later.</p>
    } finally {
      setIsLoading(false);
    }
  };

  return (
   <div className="h-screen w-screen bg-black px-4 sm:px-20 md:px-30 flex items-center justify-center">
  <div className="bg-gray-200 h-[90vh] w-full max-w-4xl rounded-2xl relative flex flex-col justify-between overflow-hidden">
    
    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 mb-24">
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <h1 className="text-2xl font-semibold text-gray-700">Hi Broo ! What's on your Mind?</h1>
        </div>
      ) : (
        messages.map((message, index) => {
          return (
            <div key={index} className="w-full">
              {message.status === "user" ? (
                <div className="flex justify-end">
                  <div className="bg-blue-500 text-white p-3 rounded-2xl rounded-tr-none max-w-xs sm:max-w-md break-words shadow-sm">
                    {message.userMessage}
                  </div>
                </div>
              ) : (
                <div className="flex justify-start">
                  <div className="message bg-white text-gray-800 p-3 rounded-2xl rounded-tl-none text-wrap shadow-sm border border-gray-300">
                    <ReactMarkDown>{message.botMessage}</ReactMarkDown>
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
    {isLoading && (
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-gray-300 text-gray-700 px-4 py-2 rounded-full shadow-md">
        Loading...
      </div>
    )}
    <form 
      onSubmit={handleSendMessage} 
      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center w-[90%] max-w-xl bg-white rounded-full border border-gray-400 shadow-md px-4 py-2 z-50"
    >
      <textarea onChange={(e) => setInputText(e.target.value)}
        value={inputText}
        placeholder="Ask Gemini" 
        className="flex-1 h-10 resize-none outline-none text-gray-700 pr-12 pt-2 bg-transparent"
      />
      <button 
        type="submit"
        className={`bg-black text-white px-5 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors cursor-pointer ml-2 ${isLoading ? `hidden` : `block`}`}
      >Send
      </button>
    </form>

  </div>
</div>
  )
}

export default App
