
import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import CustomButton from '@/components/ui/custom-button';
import { MessageSquare, Volume2, Plus, Send, Loader2 } from 'lucide-react';
import { sendMessageToAzureOpenAI } from '@/services/azureOpenAI';
import { toast } from "@/hooks/use-toast";
import ReactMarkdown from 'react-markdown';

const CakeBuddyPage: React.FC = () => {
  const { language } = useParams<{ language: string }>();
  const [messages, setMessages] = useState<{ user: boolean; text: string; translation?: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    // Add user message
    const userMessage = { user: true, text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call Azure OpenAI API
      const aiResponse = await sendMessageToAzureOpenAI(
        [...messages, userMessage], 
        language || 'English'
      );
      
      if (aiResponse) {
        setMessages(prev => [...prev, aiResponse]);
      }
    } catch (error) {
      console.error("Error in chat:", error);
      toast({
        title: "Chat Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = async (suggestion: string) => {
    if (isLoading) return;
    
    setInputValue('');
    const userMessage = { user: true, text: suggestion };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Call Azure OpenAI API
      const aiResponse = await sendMessageToAzureOpenAI(
        [...messages, userMessage], 
        language || 'English'
      );
      
      if (aiResponse) {
        setMessages(prev => [...prev, aiResponse]);
      }
    } catch (error) {
      console.error("Error in chat:", error);
      toast({
        title: "Chat Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTranslation = (index: number) => {
    if (messages[index].user) return;
    setShowTranslation(!showTranslation);
  };

  return (
    <AppLayout>
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center mb-8 gap-6">
          <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center">
            <img 
              src="/lovable-uploads/723f129e-ea72-4e1c-ad3c-aa57eb3b2cdb.png" 
              alt="Cake Character" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-purple-800">Chat with Cake Buddy</h1>
            <p className="text-lg text-gray-700 mt-1">
              Your AI language assistant for {language} learning
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 hover:shadow-xl transition-all">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
              <MessageSquare size={20} />
            </div>
            <h3 className="font-semibold mb-1">Practice Conversation</h3>
            <p className="text-sm text-gray-600">Engage in natural dialogues to improve your speaking skills</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 hover:shadow-xl transition-all">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
              <Volume2 size={20} />
            </div>
            <h3 className="font-semibold mb-1">Learn Pronunciation</h3>
            <p className="text-sm text-gray-600">Get feedback on your accent and pronunciation with voice exercises</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 hover:shadow-xl transition-all">
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-3">
              <Plus size={20} />
            </div>
            <h3 className="font-semibold mb-1">Vocabulary Builder</h3>
            <p className="text-sm text-gray-600">Build your vocabulary with personalized word lists and quizzes</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-2 md:p-6">
          <div className="h-[400px] overflow-y-auto mb-4 p-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500">
                  <p className="text-lg mb-2">Start chatting with Cake Buddy!</p>
                  <p className="text-sm">Ask questions about {language} words, phrases, or grammar.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.user ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.user 
                          ? 'bg-blue-600 text-white rounded-tr-none' 
                          : 'bg-gray-100 text-gray-800 rounded-tl-none'
                      }`}
                    >
                      <div className={`${message.user ? '' : 'font-medium cursor-pointer'}`} onClick={() => toggleTranslation(index)}>
                        <ReactMarkdown>{message.text}</ReactMarkdown>
                      </div>
                      
                      {message.translation && (
                        <div className="mt-2 pt-2 border-t border-gray-300 text-sm">
                          <p className="font-medium">Definition:</p>
                          <ReactMarkdown>{message.translation}</ReactMarkdown>
                          <div className="flex items-center gap-2 mt-2">
                            <button 
                              className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded"
                              onClick={() => {
                                navigator.clipboard.writeText(message.text);
                                toast({ title: "Copied to clipboard" });
                              }}
                            >
                              Copy
                            </button>
                            <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center gap-1">
                              <Volume2 size={12} />
                              Read aloud
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <div 
              className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-100"
              onClick={() => handleSuggestionClick("What is the meaning of Success?")}
            >
              + What is the meaning of Success?
            </div>
            <div 
              className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-100"
              onClick={() => handleSuggestionClick("How do I introduce myself?")}
            >
              + How do I introduce myself?
            </div>
            <div 
              className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-100"
              onClick={() => handleSuggestionClick(`Translate 'How are you?' to ${language}`)}
            >
              + Translate "How are you?"
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Ask Cake Buddy..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <CustomButton 
              onClick={handleSend}
              variant="gradient-blue"
              disabled={isLoading || !inputValue.trim()}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Send
            </CustomButton>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CakeBuddyPage;
