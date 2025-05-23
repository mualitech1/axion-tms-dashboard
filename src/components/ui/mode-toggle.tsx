import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import { Button } from "./button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "relative group rounded-full w-10 h-10 flex items-center justify-center",
        "transition-colors duration-300 ease-in-out",
        theme === "dark" 
          ? "bg-aximo-darker hover:bg-aximo-darker/80" 
          : "bg-white hover:bg-slate-50"
      )}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-full opacity-30 transition-transform duration-500",
          "group-hover:opacity-50",
          theme === "dark" 
            ? "bg-indigo-500/20" 
            : "bg-yellow-300/20"
        )}
      />
      
      <div className="relative">
        {theme === "dark" ? (
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Moon className="h-5 w-5 text-indigo-200" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: 30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Sun className="h-5 w-5 text-yellow-500" />
          </motion.div>
        )}
      </div>
      
      <span className="sr-only">Toggle theme</span>
      
      {/* Glowing background effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-full -z-10 blur-md transition-all duration-300",
          theme === "dark" 
            ? "bg-indigo-900/10" 
            : "bg-yellow-300/10"
        )}
      />
    </Button>
  )
} 