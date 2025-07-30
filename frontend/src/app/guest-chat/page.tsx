'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChatInput, ChatInputHandles } from '@/components/thread/chat-input/chat-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { KortixLogo } from '@/components/sidebar/kortix-logo';
import { ArrowLeft, Sparkles, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const PENDING_PROMPT_KEY = 'pendingAgentPrompt';
const GUEST_MESSAGES_KEY = 'guestChatMessages';

// Sample responses for guest mode
const sampleResponses = [
  "I'm Suna, your AI assistant! I'd love to help you with that. However, as a guest user, you're experiencing a limited demo version. To get full AI responses and save your conversations, please sign up for a free account!",
  "That's an interesting question! In guest mode, I can only provide this sample response. For personalized AI assistance, detailed answers, and conversation history, please create your free account.",
  "I understand what you're asking about! To give you the comprehensive help you deserve and access to all my capabilities, you'll need to sign up. It's completely free and takes just a moment!",
  "Great question! While I'd love to provide a detailed response, guest mode only allows basic interactions. Sign up for free to unlock my full potential and get real AI assistance!"
];

export default function GuestChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const chatInputRef = useRef<ChatInputHandles>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load existing messages from localStorage
    const savedMessages = localStorage.getItem(GUEST_MESSAGES_KEY);
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
      } catch (error) {
        console.error('Error parsing saved messages:', error);
      }
    }

    // Check for pending prompt from dashboard
    const pendingPrompt = localStorage.getItem(PENDING_PROMPT_KEY);
    if (pendingPrompt) {
      setInputValue(pendingPrompt);
      localStorage.removeItem(PENDING_PROMPT_KEY);
      // Auto-submit after a short delay
      setTimeout(() => {
        handleSubmit(pendingPrompt);
      }, 500);
    }
  }, []);

  useEffect(() => {
    // Save messages to localStorage whenever they change
    if (messages.length > 0) {
      localStorage.setItem(GUEST_MESSAGES_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message.trim(),
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const handleSignUp = () => {
    router.push('/auth?mode=signup');
  };

  const handleBackToDashboard = () => {
    router.push('/');
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(GUEST_MESSAGES_KEY);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToDashboard}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <KortixLogo className="h-6 w-6" />
              <span className="font-semibold">Suna Guest Chat</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={clearChat}
              className="text-muted-foreground"
            >
              Clear Chat
            </Button>
            <Button
              onClick={handleSignUp}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            >
              <Sparkles className="h-4 w-4 mr-1" />
              Sign Up Free
            </Button>
          </div>
        </div>
      </div>

      {/* Guest Mode Notice */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-b border-blue-200 dark:border-blue-800 px-4 py-2">
        <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
          <User className="h-4 w-4" />
          <span>You're in guest mode - responses are limited. Sign up for full AI capabilities!</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="mb-4">
                <KortixLogo className="h-16 w-16 mx-auto text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Welcome to Suna Guest Chat</h2>
              <p className="text-muted-foreground mb-4">
                Try out our AI assistant with limited functionality. Sign up for the full experience!
              </p>
            </div>
          )}
          
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}
                
                <Card className={`max-w-[80%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <CardContent className="p-3">
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <div className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </CardContent>
                </Card>
                
                {message.role === 'user' && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 justify-start"
            >
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              </div>
              <Card className="bg-muted">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-xs text-muted-foreground">Suna is thinking...</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <div className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4">
        <div className="max-w-4xl mx-auto">
          <ChatInput
            ref={chatInputRef}
            onSubmit={handleSubmit}
            loading={isLoading}
            placeholder="Ask Suna anything... (Guest mode - limited responses)"
            value={inputValue}
            onChange={setInputValue}
            hideAttachments={true}
            hideAgentSelection={true}
            isLoggedIn={false}
          />
        </div>
      </div>
    </div>
  );
}