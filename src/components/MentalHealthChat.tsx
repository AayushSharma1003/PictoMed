import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Heart, AlertCircle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
};

const MentalHealthChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your PictoMed mental health assistant. How are you feeling today?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    setTimeout(() => {
      let responseText = '';
      
      const lowerCaseInput = inputValue.toLowerCase();
      
      if (lowerCaseInput.includes('anxious') || lowerCaseInput.includes('anxiety')) {
        responseText = "I understand that anxiety can be challenging. Deep breathing exercises can help in the moment. Breathe in for 4 counts, hold for 7, and exhale for 8. Would you like me to guide you through a brief relaxation exercise?";
      } else if (lowerCaseInput.includes('sad') || lowerCaseInput.includes('depressed') || lowerCaseInput.includes('depression')) {
        responseText = "I'm sorry to hear you're feeling down. Remember that it's okay to not be okay sometimes. Would you like to talk about what's been happening recently, or would you prefer some self-care suggestions?";
      } else if (lowerCaseInput.includes('stress') || lowerCaseInput.includes('stressed')) {
        responseText = "Dealing with stress can be overwhelming. It might help to identify your stressors and address them one by one. Have you tried any stress management techniques like mindfulness or physical activity?";
      } else if (lowerCaseInput.includes('hello') || lowerCaseInput.includes('hi')) {
        responseText = "Hello! How are you feeling today? I'm here to listen and provide support.";
      } else if (lowerCaseInput.includes('help')) {
        responseText = "I'm here to help. You can talk to me about how you're feeling, ask for coping strategies, or just chat. If you're in crisis, please consider reaching out to a mental health professional or crisis line for immediate support.";
      } else if (lowerCaseInput.includes('thank')) {
        responseText = "You're welcome! Taking care of your mental health is important, and I'm glad I could be of assistance. Is there anything else you'd like to talk about?";
      } else {
        responseText = "Thank you for sharing that with me. How long have you been feeling this way? Remember that your feelings are valid, and it's okay to seek support.";
      }
      
      const assistantMessage: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <section className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-picto-green-light/30 to-white dark:from-picto-red-dark/30 dark:to-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-picto-green-medium dark:text-picto-red-medium hover:underline">
              <Home className="mr-2 h-5 w-5" />
              Return Home
            </Link>
          </div>
          
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-picto-gray-dark dark:text-white mb-4">
              Mental Health <span className="text-picto-green-dark dark:text-picto-red-light">Support</span>
            </h1>
            <p className="text-xl text-picto-gray-dark dark:text-gray-200 max-w-2xl mx-auto">
              Chat with our AI assistant for emotional support, coping strategies, and mental wellness guidance.
            </p>
          </div>
          
          <div className="glass-card animate-fade-in overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 240px)', minHeight: '500px' }}>
            <div className="bg-picto-gray-lightest dark:bg-gray-800 border-b border-picto-gray-light dark:border-gray-700 p-4">
              <button className="w-full flex items-center justify-center space-x-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg py-2 px-4 transition-colors">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">Crisis Support Resources</span>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.sender === 'user' 
                        ? 'bg-picto-blue-medium text-white rounded-tr-none' 
                        : 'bg-white border border-picto-gray-light rounded-tl-none'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      {message.sender === 'assistant' ? (
                        <>
                          <Heart className="h-5 w-5 text-picto-green-medium" />
                          <span className="font-medium text-picto-green-dark">PictoMed Assistant</span>
                        </>
                      ) : (
                        <>
                          <User className="h-5 w-5 text-white" />
                          <span className="font-medium">You</span>
                        </>
                      )}
                      <span className={`text-xs ${message.sender === 'user' ? 'text-white/70' : 'text-picto-gray-medium'}`}>
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <p className={message.sender === 'user' ? 'text-white' : 'text-picto-gray-dark'}>
                      {message.text}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-picto-gray-light rounded-2xl rounded-tl-none px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-5 w-5 text-picto-green-medium" />
                      <span className="font-medium text-picto-green-dark">PictoMed Assistant</span>
                      <span className="text-xs text-picto-gray-medium">
                        {formatTime(new Date())}
                      </span>
                    </div>
                    <div className="flex space-x-1 mt-2">
                      <div className="h-2 w-2 bg-picto-gray-medium rounded-full animate-pulse"></div>
                      <div className="h-2 w-2 bg-picto-gray-medium rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="h-2 w-2 bg-picto-gray-medium rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            <div className="border-t border-picto-gray-light p-4">
              <div className="relative">
                <textarea
                  className="w-full px-4 py-3 pr-12 border border-picto-gray-light rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-picto-green-medium"
                  placeholder="Type your message here..."
                  rows={2}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                ></textarea>
                <button 
                  className="absolute right-3 bottom-3 p-2 bg-picto-green-medium text-white rounded-lg hover:bg-picto-green-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleSendMessage}
                  disabled={inputValue.trim() === '' || isTyping}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
              <p className="text-xs text-picto-gray-medium mt-2 text-center">
                This AI assistant is for informational purposes only and does not replace professional mental health services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentalHealthChat;
