import { motion } from "framer-motion";

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg" | "xl";
    color?: string;
    text?: string;
}

export function LoadingSpinner({
    size = "md",
    color = "indigo",
    text
}: LoadingSpinnerProps) {
    const sizes = {
        sm: "w-4 h-4",
        md: "w-8 h-8",
        lg: "w-12 h-12",
        xl: "w-16 h-16"
    };

    const textSizes = {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-lg"
    };

    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <motion.div
                className={`${sizes[size]} border-4 border-${color}-500/30 border-t-${color}-500 rounded-full`}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            {text && (
                <p className={`text-slate-400 ${textSizes[size]}`}>{text}</p>
            )}
        </div>
    );
}

export function PageLoader() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="mesh-background" />
            <LoadingSpinner size="xl" text="Loading..." />
        </div>
    );
}

export function CardLoader() {
    return (
        <div className="glass-card p-8 flex items-center justify-center">
            <LoadingSpinner size="md" />
        </div>
    );
}
