import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface QuickActionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
}

export const QuickAction = ({ icon: Icon, title, description, onClick }: QuickActionProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex flex-col items-start gap-2 p-4 rounded-xl bg-card/50 hover:bg-card border border-border/50 hover:border-border transition-all duration-200 text-left group"
    >
      <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-medium text-sm text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
    </motion.button>
  );
};
