import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  MapPin, 
  BookOpen,
  TrendingUp,
  Clock
} from 'lucide-react';

interface ChatBotProps {
  userData: any;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export function ChatBot({ userData }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm your AI Career Counselor. I've analyzed your profile and assessment results. I can help you with career guidance, skill development planning, and answering any questions about your career path. What would you like to know?",
      timestamp: new Date(),
      suggestions: [
        "How do I become a Data Scientist?",
        "What skills should I learn first?",
        "Tell me about salary expectations",
        "How long will it take to transition?"
      ]
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const quickActions = [
    { icon: MapPin, text: "Career Roadmap", color: "bg-blue-100 text-blue-600" },
    { icon: BookOpen, text: "Learning Resources", color: "bg-green-100 text-green-600" },
    { icon: TrendingUp, text: "Salary Insights", color: "bg-purple-100 text-purple-600" },
    { icon: Clock, text: "Timeline Planning", color: "bg-orange-100 text-orange-600" }
  ];

  const generateBotResponse = (userMessage: string): Message => {
    const message = userMessage.toLowerCase();
    let response = "";
    let suggestions: string[] = [];

    if (message.includes('skill')) {
      response = `Based on your skill gap analysis, here are your priority learning areas:

**High Priority Skills (Start Immediately):**
- Python Programming (Gap: ${userData.skillGaps?.find((s: any) => s.skill === 'Python')?.required - userData.skillGaps?.find((s: any) => s.skill === 'Python')?.current || 30} points)
- Machine Learning (Gap: ${userData.skillGaps?.find((s: any) => s.skill === 'Machine Learning')?.required - userData.skillGaps?.find((s: any) => s.skill === 'Machine Learning')?.current || 45} points)

**Learning Strategy:**
1. Focus on one skill at a time for better retention
2. Practice with real projects, not just tutorials
3. Join communities (Reddit, Stack Overflow, Kaggle)
4. Build a portfolio showcasing each skill

**Time Investment:** Plan for 10-15 hours per week for optimal progress.`;
      suggestions = [
        "Show me Python learning resources",
        "How do I practice machine learning?",
        "What projects should I build?",
        "How to balance learning with work?"
      ];
    } else {
      response = `I understand you're asking about "${userMessage}". Based on your career profile, I can provide guidance on career planning, skill development, or salary insights.`;
      suggestions = [
        "Tell me about Data Scientist career path",
        "What skills should I prioritize?",
        "Show me salary expectations",
        "Help me plan my learning timeline"
      ];
    }

    return {
      id: Date.now().toString(),
      type: 'bot',
      content: response,
      timestamp: new Date(),
      suggestions
    };
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(messageText);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
      {/* Chat Interface */}
      <div className="lg:col-span-2 order-1">
        <Card className="h-[80vh] lg:h-[600px] flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-base lg:text-lg">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              <span>AI Career Counselor</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Online
              </Badge>
            </CardTitle>
            <CardDescription className="text-xs lg:text-sm">
              Get personalized career advice based on your profile and assessment
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col space-y-4">
            <ScrollArea className="flex-1 pr-2 lg:pr-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex items-start space-x-3 ${message.type === 'user' ? 'justify-end' : ''}`}>
                    {message.type === 'bot' && (
                      <Avatar className="w-7 h-7 lg:w-8 lg:h-8">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className={`max-w-[85%] space-y-2 ${message.type === 'user' ? 'order-first' : ''}`}>
                      <div className={`p-2 lg:p-3 rounded-lg text-sm lg:text-base ${
                        message.type === 'user' 
                          ? 'bg-blue-600 text-white ml-auto' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="whitespace-pre-line">{message.content}</p>
                      </div>
                      
                      {message.suggestions && (
                        <div className="flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs h-7"
                              onClick={() => handleSendMessage(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                      
                      <p className="text-[10px] lg:text-xs text-gray-500">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    {message.type === 'user' && (
                      <Avatar className="w-7 h-7 lg:w-8 lg:h-8">
                        <AvatarFallback className="bg-gray-200 text-gray-600">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-7 h-7 lg:w-8 lg:h-8">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 text-gray-900 p-2 lg:p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about your career path..."
                className="flex-1 text-sm lg:text-base"
              />
              <Button 
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="order-2 space-y-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-base lg:text-lg">
              <Lightbulb className="h-5 w-5" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm lg:text-base">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleSendMessage(action.text)}
                >
                  <div className={`w-7 h-7 lg:w-8 lg:h-8 rounded-lg flex items-center justify-center mr-3 ${action.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  {action.text}
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Profile Context */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base lg:text-lg">Your Profile Context</CardTitle>
            <CardDescription className="text-xs lg:text-sm">
              Information I'm using to personalize advice
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm lg:text-base">
            <div>
              <p className="font-medium">Top Career Match:</p>
              <p className="text-gray-600">
                {userData.careerRecommendations?.[0]?.title || 'Data Scientist'} 
                ({userData.careerRecommendations?.[0]?.match || 92}% match)
              </p>
            </div>
            
            <div>
              <p className="font-medium">Key Strengths:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                <Badge variant="secondary" className="text-xs">Analytical</Badge>
                <Badge variant="secondary" className="text-xs">Problem Solving</Badge>
                <Badge variant="secondary" className="text-xs">Technical</Badge>
              </div>
            </div>
            
            <div>
              <p className="font-medium">Priority Skills:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {userData.skillGaps?.slice(0, 3).map((skill: any, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill.skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Suggested Questions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base lg:text-lg">Suggested Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              "How do I transition to data science?",
              "What's the job market like?",
              "Should I get a certification?",
              "How to build a portfolio?",
              "What about remote opportunities?",
              "Industry salary benchmarks?"
            ].map((question, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left h-auto p-2 text-xs lg:text-sm"
                onClick={() => handleSendMessage(question)}
              >
                {question}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
