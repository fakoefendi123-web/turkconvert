import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        <FileQuestion className="h-10 w-10 text-gray-400 dark:text-gray-500" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
        Sayfa Bulunamadı
      </h1>
      <p className="mt-3 max-w-md text-gray-500 dark:text-gray-400">
        Aradığınız sayfa mevcut değil veya taşınmış olabilir.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Ana Sayfaya Dön
        </Link>
        <Link href="/#araclar" className="btn-secondary">
          Araçlara Göz At
        </Link>
      </div>
    </div>
  );
}
