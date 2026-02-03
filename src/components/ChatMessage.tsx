import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ChatMessageProps {
  content: string;
  isAgent: boolean;
  timestamp?: Date;
}

export const ChatMessage = ({ content, isAgent, timestamp }: ChatMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "flex w-full",
        isAgent ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3",
          isAgent
            ? "bg-card text-card-foreground"
            : "bg-primary text-primary-foreground"
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        {timestamp && (
          <span className="text-xs opacity-50 mt-1 block">
            {timestamp.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
          </span>
        )}
      </div>
    </motion.div>
  );
};
