import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryItem, Lang } from '../data/russiaData';
import { RussiaPhoto } from './RussiaPhoto';

interface GalleryLightboxProps {
  items: GalleryItem[];
  activeIndex: number | null;
  lang: Lang;
  onChangeIndex: (idx: number) => void;
  onClose: () => void;
}

export function GalleryLightbox({
  items,
  activeIndex,
  lang,
  onChangeIndex,
  onClose,
}: GalleryLightboxProps) {
  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onChangeIndex((activeIndex + 1) % items.length);
      } else if (e.key === 'ArrowLeft') {
        onChangeIndex((activeIndex - 1 + items.length) % items.length);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, items.length, onChangeIndex, onClose]);

  if (activeIndex === null) return null;
  const item = items[activeIndex];
  if (!item) return null;

  const isAr = lang === 'ar';
  const prevIdx = (activeIndex - 1 + items.length) % items.length;
  const nextIdx = (activeIndex + 1) % items.length;

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      role="dialog"
      aria-modal="true"
      aria-label={item.title[lang]}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#14182a]/95 backdrop-blur-md text-[#f4f3f6] p-4 md:p-8"
      onClick={onClose}
    >
      {/* Top controls */}
      <div
        className="flex items-center justify-between gap-4 max-w-6xl w-full mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 text-xs text-[#c3c3cd]">
          <span className="font-latin tabular-nums text-[#f4f3f6] font-medium">
            {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
          <span aria-hidden="true">·</span>
          <span>{item.regionLabel[lang]}</span>
          <span aria-hidden="true">·</span>
          <span className="font-latin tabular-nums">{item.coords}</span>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label={isAr ? 'إغلاق المعرض' : 'Close lightbox'}
          className="inline-flex items-center justify-center w-11 h-11 text-[#f4f3f6] hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main photograph + prev/next controls */}
      <div
        className="relative flex-1 flex items-center justify-center my-4 max-w-6xl w-full mx-auto min-h-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => onChangeIndex(isAr ? nextIdx : prevIdx)}
          aria-label={isAr ? 'الصورة التالية' : 'Previous photo'}
          className="hidden sm:inline-flex items-center justify-center w-12 h-12 text-[#f4f3f6] hover:bg-white/10 transition-colors cursor-pointer shrink-0 mx-2"
        >
          {isAr ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
        </button>

        <div className="relative w-full h-full max-h-[72vh] flex items-center justify-center">
          <RussiaPhoto
            src={item.src}
            alt={item.title[lang]}
            loading="eager"
            className="max-h-[72vh] max-w-full w-auto h-auto object-contain shadow-2xl"
          />
        </div>

        <button
          type="button"
          onClick={() => onChangeIndex(isAr ? prevIdx : nextIdx)}
          aria-label={isAr ? 'الصورة السابقة' : 'Next photo'}
          className="hidden sm:inline-flex items-center justify-center w-12 h-12 text-[#f4f3f6] hover:bg-white/10 transition-colors cursor-pointer shrink-0 mx-2"
        >
          {isAr ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
        </button>
      </div>

      {/* Caption & mobile prev/next */}
      <div
        className="max-w-6xl w-full mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-white/12 pt-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h3 className={`text-lg md:text-xl font-semibold ${isAr ? 'font-editorial' : 'font-latin'}`}>
            {item.title[lang]}
          </h3>
          <p className="text-sm text-[#c3c3cd] mt-0.5">{item.place[lang]}</p>
        </div>

        <div className="flex sm:hidden items-center gap-3">
          <button
            type="button"
            onClick={() => onChangeIndex(prevIdx)}
            className="px-4 py-2 text-xs font-medium border border-white/20 text-[#f4f3f6] cursor-pointer"
          >
            {isAr ? 'السابق' : 'Prev'}
          </button>
          <button
            type="button"
            onClick={() => onChangeIndex(nextIdx)}
            className="px-4 py-2 text-xs font-medium border border-white/20 text-[#f4f3f6] cursor-pointer"
          >
            {isAr ? 'التالي' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
