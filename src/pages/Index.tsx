import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { Sparkles } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isAgent: boolean;
  timestamp: Date;
}

const agentResponses: Record<string, string> = {
  interview: `Понял, готовимся к собеседованию.

**Начнём с базы:**

1. **Расскажи о себе** — это всегда первый вопрос. Нужна версия на 60-90 секунд
2. **Почему эта компания/позиция** — покажи, что ты понимаешь, куда идёшь
3. **Сложная ситуация и как её решил** — конкретный кейс с результатом

**Следующий шаг:**
Напиши, на какую позицию готовишься — подберу релевантные вопросы и разберём структуру ответов.`,
  
  text: `Давай улучшим текст.

**Чтобы дать точную обратную связь, мне нужно:**
- Сам текст (можешь вставить прямо сюда)
- Контекст: для кого он и какая цель

**Пока жду, общие принципы сильного текста:**
1. Первое предложение — самое важное
2. Конкретика вместо абстракций
3. Активный залог, короткие предложения

Вставляй текст — разберём.`,

  plan: `Хорошо, превращаем цель в план.

**Для начала:**
Опиши цель одним предложением — что именно хочешь получить в результате?

Пример: "Хочу найти работу product-менеджером в IT за 2 месяца" или "Хочу запустить свой подкаст".

**Дальше разложим на:**
- Ключевые этапы
- Конкретные действия на неделю
- Метрики прогресса

Что за цель?`,

  idea: `Давай разберём идею.

**Опиши её в свободной форме** — даже если пока сырая, это нормально. 

Я помогу:
- Структурировать мысль
- Найти сильные стороны
- Увидеть слабые места
- Понять, какие шаги сделают её реализуемой

Что за идея?`
};

const getAgentResponse = (userMessage: string): string => {
  const lower = userMessage.toLowerCase();
  
  if (lower.includes("интервью") || lower.includes("собеседован")) {
    return agentResponses.interview;
  }
  if (lower.includes("текст") || lower.includes("письм") || lower.includes("резюме")) {
    return agentResponses.text;
  }
  if (lower.includes("план") || lower.includes("цел")) {
    return agentResponses.plan;
  }
  if (lower.includes("идея") || lower.includes("идею")) {
    return agentResponses.idea;
  }
  
  return `Понял. Давай разберёмся.

Расскажи подробнее:
- Какой результат хочешь получить?
- Что уже пробовал?

Так смогу дать конкретные рекомендации.`;
};

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isAgent: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate agent thinking
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const agentMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: getAgentResponse(content),
      isAgent: true,
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, agentMessage]);
  };

  const handleQuickAction = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border/50 glass">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground">Персональный коуч</h1>
            <p className="text-xs text-muted-foreground">Развитие и самопрезентация</p>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {messages.length === 0 ? (
            <WelcomeScreen onActionClick={handleQuickAction} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-4 p-4 max-w-3xl mx-auto"
            >
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  content={message.content}
                  isAgent={message.isAgent}
                  timestamp={message.timestamp}
                />
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse-soft" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse-soft" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse-soft" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span className="text-xs">Думаю...</span>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="max-w-3xl mx-auto w-full">
        <ChatInput onSend={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
};

export default Index;
