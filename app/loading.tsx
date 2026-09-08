import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600 dark:text-primary-400" />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          YÃ¼kleniyor...
        </p>
      </div>
    </div>
  );
}
