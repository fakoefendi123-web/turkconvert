import { Loader2 } from "lucide-react";

interface ConversionProgressProps {
  message?: string;
}

export function ConversionProgress({
  message = "Dosyanız dönüştürülüyor...",
}: ConversionProgressProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <Loader2 className="h-8 w-8 animate-spin text-primary-600 dark:text-primary-400" />
      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
        {message}
      </p>
    </div>
  );
}
