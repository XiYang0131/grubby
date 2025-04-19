"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageSquare, Send, Settings, Sparkles, Bot, Copy, Check, ArrowRight, Star, Users, Zap, Shield, MessageCircle, Brain, Code, FileText, Globe, Laptop, Lock, Rocket, Target } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface Conversation {
  id: string;
  messages: Message[];
  title: string;
  timestamp: number;
}

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager at TechCorp",
    content: "This AI assistant has revolutionized our workflow. It helps us write documentation, analyze user feedback, and even assists in product roadmap planning. The quality of insights has significantly improved our decision-making process.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&q=60"
  },
  {
    name: "Michael Chen",
    role: "Senior Software Engineer at CloudScale",
    content: "As a developer, having this AI assistant is like having a senior architect available 24/7. It helps with code reviews, architecture decisions, and even debugging complex issues. The technical accuracy is impressive.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop&q=60"
  },
  {
    name: "Emily Rodriguez",
    role: "Content Director at CreativeHub",
    content: "The AI assistant has transformed our content strategy. It helps generate ideas, optimize SEO, and ensure consistency across all our channels. We've seen a 300% increase in engagement since implementing it.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&auto=format&fit=crop&q=60"
  }
];

const features = [
  {
    title: "Advanced AI Understanding",
    description: "Powered by HumanizeAI, our AI understands context, nuance, and complex instructions with remarkable accuracy. Handle everything from simple queries to intricate technical discussions.",
    icon: Brain
  },
  {
    title: "Code Intelligence",
    description: "Get expert assistance with code review, debugging, and architecture design across 50+ programming languages. Includes syntax highlighting and context-aware suggestions.",
    icon: Code
  },
  {
    title: "Document Analysis",
    description: "Process and analyze documents, contracts, and research papers. Extract key insights, summarize content, and generate comprehensive reports automatically.",
    icon: FileText
  },
  {
    title: "Multi-language Support",
    description: "Communicate seamlessly in 95+ languages with native-level understanding and response. Perfect for global teams and international projects.",
    icon: Globe
  },
  {
    title: "Enterprise Security",
    description: "Bank-grade encryption, SOC 2 compliance, and custom data retention policies. Your sensitive information stays protected with advanced security protocols.",
    icon: Shield
  },
  {
    title: "Seamless Integration",
    description: "Connect with your existing tools through our robust API. Integrate with Slack, Microsoft Teams, GitHub, and other enterprise platforms.",
    icon: Zap
  },
  {
    title: "Knowledge Management",
    description: "Build and maintain your organization's knowledge base. The AI learns from your data to provide increasingly accurate and context-aware responses.",
    icon: Brain
  },
  {
    title: "Performance Analytics",
    description: "Track usage patterns, response quality, and team productivity with detailed analytics and customizable reports.",
    icon: Target
  }
];

const useCases = [
  {
    title: "Software Development",
    description: "Accelerate development with code assistance, review, and debugging support across multiple programming languages.",
    icon: Laptop
  },
  {
    title: "Content Creation",
    description: "Generate, edit, and optimize content while maintaining your brand voice and style guidelines.",
    icon: FileText
  },
  {
    title: "Customer Support",
    description: "Provide 24/7 intelligent support with context-aware responses and seamless human handoff when needed.",
    icon: MessageCircle
  },
  {
    title: "Research & Analysis",
    description: "Process large volumes of data and documents to extract insights and generate comprehensive reports.",
    icon: Target
  }
];

const faqs = [
  {
    question: "What makes your AI assistant different from others?",
    answer: "Our AI assistant is powered by Optimus Alpha, one of the most advanced language models available. It excels in understanding context, handling complex tasks, and providing detailed, accurate responses. Unlike other solutions, we offer enterprise-grade security, custom training capabilities, and deep integration options with your existing tools."
  },
  {
    question: "How do you ensure data security and privacy?",
    answer: "We implement multiple layers of security: end-to-end encryption, SOC 2 Type II compliance, custom data retention policies, and regular security audits. Your data is processed in isolated environments, and we offer options for data residency in specific regions. We never use customer data for model training without explicit consent."
  },
  {
    question: "Can I customize the AI for my specific needs?",
    answer: "Yes, we offer extensive customization options. You can train the AI on your company's documentation, implement custom workflows, define specific response patterns, and integrate with your existing tools and processes. Our enterprise plans include dedicated support for custom implementation."
  },
  {
    question: "What kind of support do you provide?",
    answer: "We offer 24/7 technical support through multiple channels (chat, email, phone). Enterprise customers get dedicated account managers, custom training sessions, and priority support with guaranteed response times. We also provide extensive documentation, tutorials, and regular webinars."
  },
  {
    question: "How do you handle system updates and maintenance?",
    answer: "We follow a zero-downtime deployment process for updates. System maintenance is scheduled during off-peak hours with advance notice. We maintain 99.99% uptime with redundant systems across multiple regions."
  },
  {
    question: "What are your API rate limits and pricing?",
    answer: "Rate limits vary by plan: Basic (100 requests/min), Pro (1000 requests/min), Enterprise (custom limits). Pricing is based on usage with volume discounts available. We offer flexible pricing models including pre-paid credits and pay-as-you-go options."
  }
];

export default function Home() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      messages: [],
      title: "New Conversation",
      timestamp: Date.now(),
    };
    setConversations([newConversation, ...conversations]);
    setCurrentConversation(newConversation.id);
    setMessages([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { 
      role: "user", 
      content: input,
      timestamp: Date.now()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messages,
          userMessage: { role: "user", content: input },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API request failed');
      }

      const data = await response.json();
      console.log("Response from API:", data);
      console.log("API response structure:", JSON.stringify(data, null, 2));

      // 检查响应格式是否符合预期
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        console.warn("Unexpected API response format, attempting to adapt:", data);
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.choices && data.choices[0] && data.choices[0].message 
          ? data.choices[0].message.content 
          : data.message || data.content || "Sorry, I couldn't generate a response.",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      
      if (currentConversation) {
        setConversations(conversations.map(conv => 
          conv.id === currentConversation 
            ? { ...conv, messages: [...conv.messages, userMessage, assistantMessage] }
            : conv
        ));
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      if (error instanceof Error) {
        console.error("Error details:", error.message, error.stack);
      }
      const errorMessage = error && typeof error === 'object' && 'message' in error 
        ? error.message as string 
        : "Failed to get response from AI";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const testApi = async () => {
    try {
      const response = await fetch("/api/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ test: true })
      });
      
      const data = await response.json();
      console.log("Test API response:", data);
      alert("API测试结果: " + JSON.stringify(data));
    } catch (error) {
      console.error("Test API error:", error);
      const errorMessage = error && typeof error === 'object' && 'message' in error 
        ? error.message as string 
        : "未知错误";
      alert("API测试错误: " + errorMessage);
    }
  };

  if (showChat) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <header className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                Grubby AI
              </h1>
            </div>
            <Button variant="outline" size="icon" onClick={() => setShowChat(false)}>
              <Settings className="w-4 h-4" />
            </Button>
          </header>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <Card className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">History</h2>
                  <Button variant="ghost" size="sm" onClick={createNewConversation}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    New Chat
                  </Button>
                </div>
                <ScrollArea className="h-[500px]">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      className={`p-3 rounded-lg mb-2 cursor-pointer hover:bg-gray-100 ${
                        currentConversation === conv.id ? "bg-blue-50" : ""
                      }`}
                      onClick={() => {
                        setCurrentConversation(conv.id);
                        setMessages(conv.messages);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4" />
                        <span className="text-sm font-medium truncate">{conv.title}</span>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </Card>
            </div>

            <div className="col-span-9">
              <Card className="mb-4">
                <ScrollArea className="h-[500px] p-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-6 ${
                        message.role === "user" ? "ml-auto" : ""
                      }`}
                    >
                      <div className={`flex items-start gap-3 max-w-[80%] ${
                        message.role === "user" ? "ml-auto flex-row-reverse" : ""
                      }`}>
                        <div className={`p-2 rounded-full ${
                          message.role === "user" ? "bg-blue-100" : "bg-gray-100"
                        }`}>
                          {message.role === "user" ? (
                            <MessageSquare className="w-5 h-5" />
                          ) : (
                            <Bot className="w-5 h-5" />
                          )}
                        </div>
                        <div className={`flex-1 p-4 rounded-lg ${
                          message.role === "user" 
                            ? "bg-blue-500 text-white" 
                            : "bg-white border"
                        }`}>
                          <p className="whitespace-pre-wrap">{message.content}</p>
                          <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                            <button 
                              onClick={() => copyToClipboard(message.content)}
                              className="hover:text-gray-700"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <span>
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-center justify-center p-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  )}
                </ScrollArea>
              </Card>

              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading}>
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold">Grubby AI</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#use-cases" className="text-gray-600 hover:text-gray-900">Use Cases</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">How it Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <Button onClick={() => setShowChat(true)}>Try Now</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              Transform Your Workflow with
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"> Grubby AI</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Experience the next generation of AI assistance with Grubby AI. Powered by Optimus Alpha, Grubby AI understands context, learns from feedback, and delivers accurate results in real-time.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => setShowChat(true)}>
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore Features
              </Button>
            </div>
            <div className="mt-12 flex justify-center gap-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-900">99.99%</h3>
                <p className="text-gray-600">Uptime</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-900">50M+</h3>
                <p className="text-gray-600">Queries Processed</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-900">10k+</h3>
                <p className="text-gray-600">Enterprise Users</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI assistant combines cutting-edge technology with practical features
              designed to enhance your productivity and decision-making capabilities.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="bg-blue-50 rounded-full p-3 w-fit mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Use Cases</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how our AI assistant can transform different aspects of your business
              with intelligent automation and support.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="bg-purple-50 rounded-full p-3 w-fit mb-4">
                  <useCase.icon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                <p className="text-gray-600">{useCase.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started with our AI assistant in three simple steps and transform
              your workflow immediately.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-6 inline-block mb-6">
                <Rocket className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">1. Quick Setup</h3>
              <p className="text-gray-600">
                Sign up and integrate with your existing tools in minutes. No complex
                configuration required.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-6 inline-block mb-6">
                <Brain className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">2. AI Learning</h3>
              <p className="text-gray-600">
                Our AI adapts to your needs and learns from interactions to provide
                increasingly relevant responses.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-6 inline-block mb-6">
                <Zap className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">3. Instant Results</h3>
              <p className="text-gray-600">
                Get immediate, accurate responses and solutions to boost your
                productivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how organizations are transforming their operations with our AI assistant.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-14 w-14 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your needs. All plans include core features
              with additional benefits as you scale.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Basic',
                price: '0',
                features: [
                  '100 messages/month',
                  'Basic AI model access',
                  'Email support',
                  'API access',
                  'Basic analytics'
                ]
              },
              {
                name: 'Pro',
                price: '29',
                features: [
                  '1000 messages/month',
                  'Advanced AI model access',
                  'Priority support',
                  'Full API access',
                  'Advanced analytics',
                  'Custom integrations',
                  'Team collaboration'
                ]
              },
              {
                name: 'Enterprise',
                price: '99',
                features: [
                  'Unlimited messages',
                  'Custom AI model training',
                  '24/7 dedicated support',
                  'Enterprise API access',
                  'Advanced security features',
                  'Custom integrations',
                  'Team collaboration',
                  'Dedicated account manager',
                  'Custom contracts'
                ]
              }
            ].map((plan, index) => (
              <Card 
                key={index} 
                className={`p-8 ${index === 1 ? 'border-blue-500 border-2 relative' : ''}`}
              >
                {index === 1 && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                    Popular
                  </div>
                )}
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={index === 1 ? "default" : "outline"}
                  size="lg"
                  onClick={() => setShowChat(true)}
                >
                  {index === 0 ? 'Start Free' : 'Get Started'}
                </Button>
              </Card>
            ))}
          </div>
          <p className="text-center mt-8 text-gray-600">
            Need a custom plan? <Button variant="link" className="text-blue-600">Contact us</Button>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Find answers to common questions about our AI assistant.
            </p>
          </div>
          <Card className="p-6">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Workflow?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are already using our AI assistant
              to enhance their productivity and decision-making.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => setShowChat(true)}
              >
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Grubby AI Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">About Grubby AI</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Grubby AI represents the next evolution in artificial intelligence assistants. Built on the powerful Optimus Alpha model, Grubby AI combines advanced natural language understanding with practical features designed for real-world applications.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Why Choose Grubby AI?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-1" />
                  <span>Superior understanding of context and nuance compared to other AI assistants</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-1" />
                  <span>Enterprise-grade security with end-to-end encryption</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-1" />
                  <span>Customizable to your specific industry needs and workflows</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-1" />
                  <span>Seamless integration with your existing tools and platforms</span>
                </li>
              </ul>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">The Grubby AI Difference</h3>
              <p className="mb-4">
                Unlike other AI solutions that offer generic responses, Grubby AI is designed to understand the specific context of your queries and provide tailored, actionable insights.
              </p>
              <p>
                Our continuous learning system means Grubby AI gets better with every interaction, adapting to your preferences and needs over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">Grubby AI</span>
              </div>
              <p className="text-gray-400">
                Next-generation AI assistant for businesses and individuals.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#use-cases" className="text-gray-400 hover:text-white">Use Cases</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">API Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Updates</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Partners</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Security</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Compliance</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Grubby AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}