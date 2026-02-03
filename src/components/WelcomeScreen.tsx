import { motion } from "framer-motion";
import { Mic, FileText, Target, Sparkles } from "lucide-react";
import { QuickAction } from "./QuickAction";

interface WelcomeScreenProps {
  onActionClick: (prompt: string) => void;
}

export const WelcomeScreen = ({ onActionClick }: WelcomeScreenProps) => {
  const actions = [
    {
      icon: Mic,
      title: "Подготовка к интервью",
      description: "Отработать ответы и подачу",
      prompt: "Помоги подготовиться к собеседованию. Какие вопросы мне стоит отработать?"
    },
    {
      icon: FileText,
      title: "Улучшить текст",
      description: "Резюме, письмо или пост",
      prompt: "Хочу улучшить текст для профессиональной презентации. Помоги сделать его сильнее."
    },
    {
      icon: Target,
      title: "Создать план действий",
      description: "Из идеи в конкретные шаги",
      prompt: "У меня есть цель, но не знаю с чего начать. Помоги превратить её в план действий."
    },
    {
      icon: Sparkles,
      title: "Развить идею",
      description: "Доработать и структурировать",
      prompt: "У меня есть сырая идея, хочу её развить и понять, стоит ли она внимания."
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-4">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          С чем работаем сегодня?
        </h1>
        <p className="text-muted-foreground max-w-md">
          Опиши задачу своими словами или выбери направление ниже
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg"
      >
        {actions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
          >
            <QuickAction
              icon={action.icon}
              title={action.title}
              description={action.description}
              onClick={() => onActionClick(action.prompt)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
