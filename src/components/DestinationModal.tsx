import { useEffect, useState } from 'react';
import { X, Check, Plus, MapPin, Calendar, Thermometer, Utensils, Compass } from 'lucide-react';
import type { Destination, Lang } from '../data/russiaData';
import { RussiaPhoto } from './RussiaPhoto';

interface DestinationModalProps {
  destination: Destination | null;
  lang: Lang;
  isSelectedInPlan: boolean;
  onTogglePlan: (id: string) => void;
  onClose: () => void;
}

export function DestinationModal({
  destination,
  lang,
  isSelectedInPlan,
  onTogglePlan,
  onClose,
}: DestinationModalProps) {
  const [photoIdx, setPhotoIdx] = useState(0);

  useEffect(() => {
    setPhotoIdx(0);
  }, [destination?.id]);

  useEffect(() => {
    if (!destination) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [destination, onClose]);

  if (!destination) return null;

  const isAr = lang === 'ar';
  const activePhoto = destination.photos[photoIdx] || destination.photos[0];

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dest-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#14182a]/80 backdrop-blur-sm p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#f4f3f6] text-[#14182a] border border-[#14182a]/15 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar inside modal */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-[#f4f3f6]/95 backdrop-blur-md border-b border-[#14182a]/10">
          <div className="flex items-center gap-3 text-xs text-[#454d66] min-w-0">
            <span className="font-medium text-[#14182a] truncate">
              {destination.city[lang]}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-latin tabular-nums shrink-0">{destination.coords}</span>
            {destination.unesco && (
              <>
                <span aria-hidden="true">·</span>
                <span className="shrink-0">{isAr ? 'تراث عالمي — اليونسكو' : 'UNESCO World Heritage'}</span>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={isAr ? 'إغلاق النافذة' : 'Close dialog'}
            className="inline-flex items-center justify-center w-10 h-10 text-[#14182a] hover:bg-[#14182a]/8 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero photograph with multi-photo switcher */}
        <div className="relative bg-[#14182a]">
          <div className="aspect-[16/9] w-full overflow-hidden">
            <RussiaPhoto
              src={activePhoto.src}
              alt={activePhoto.caption[lang]}
              loading="eager"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#14182a]/85 via-[#14182a]/35 to-transparent px-6 py-5 flex flex-wrap items-end justify-between gap-4 text-[#f4f3f6]">
            <div>
              <p className="text-sm font-medium">{activePhoto.caption[lang]}</p>
              <p className="text-xs text-[#e1dedf]/85 mt-0.5 flex items-center gap-2">
                <span>{activePhoto.location[lang]}</span>
                <span aria-hidden="true">·</span>
                <span className="font-latin tabular-nums">{activePhoto.coords}</span>
              </p>
            </div>
            {destination.photos.length > 1 && (
              <div className="flex items-center gap-2">
                {destination.photos.map((photo, idx) => (
                  <button
                    key={photo.src}
                    type="button"
                    onClick={() => setPhotoIdx(idx)}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      idx === photoIdx
                        ? 'bg-[#f4f3f6] text-[#14182a]'
                        : 'bg-[#14182a]/60 text-[#f4f3f6] hover:bg-[#14182a]/85'
                    }`}
                  >
                    {isAr ? `صورة ${idx + 1}` : `Photo ${idx + 1}`}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 md:p-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 pb-8 border-b border-[#14182a]/10">
            <div className="space-y-2 max-w-2xl">
              <h2
                id="dest-modal-title"
                className={`text-2xl md:text-3xl font-bold text-[#14182a] leading-tight ${
                  isAr ? 'font-editorial' : 'font-latin tracking-tight'
                }`}
              >
                {destination.name[lang]}
              </h2>
              <p className="text-base text-[#454d66] leading-relaxed">
                {destination.story[lang]}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onTogglePlan(destination.id)}
              className={`inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                isSelectedInPlan
                  ? 'bg-[#8294b3] text-[#14182a] hover:bg-[#9ba9c2]'
                  : 'bg-[#14182a] text-[#f4f3f6] hover:bg-[#232946]'
              }`}
            >
              {isSelectedInPlan ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{isAr ? 'مضافة إلى مسار رحلتك' : 'Added to Your Itinerary'}</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>{isAr ? 'أضف إلى مسار رحلتي' : 'Add to My Itinerary'}</span>
                </>
              )}
            </button>
          </div>

          {/* Key climate & logistics row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-8 border-b border-[#14182a]/10">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#454d66]">
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{isAr ? 'أفضل موسم للزيارة' : 'Best Season'}</span>
              </div>
              <p className="text-sm font-semibold text-[#14182a]">
                {destination.bestSeason[lang]}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#454d66]">
                <Thermometer className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{isAr ? 'متوسط الحرارة (شتاء / صيف)' : 'Average Temp (Winter / Summer)'}</span>
              </div>
              <p className="text-sm font-semibold text-[#14182a] font-latin tabular-nums">
                {destination.tempWinter} / {destination.tempSummer}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#454d66]">
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{isAr ? 'المدة المقترحة والتكلفة اليومية' : 'Suggested Stay & Daily Avg'}</span>
              </div>
              <p className="text-sm font-semibold text-[#14182a] tabular-nums">
                {isAr
                  ? `${destination.recommendedDays} أيام · نحو $${destination.dailyBudgetUsd} يومياً`
                  : `${destination.recommendedDays} days · ~$${destination.dailyBudgetUsd}/day`}
              </p>
            </div>
          </div>

          {/* Highlights & Culinary/Tips split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-[#14182a]">
                {isAr ? 'أبرز المعالم والتجارب' : 'Signature Landmarks & Experiences'}
              </h3>
              <ul className="space-y-3">
                {destination.highlights.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-baseline gap-3 text-sm text-[#14182a]/90 leading-relaxed"
                  >
                    <span className="font-latin text-xs text-[#454d66] tabular-nums shrink-0">
                      0{idx + 1}.
                    </span>
                    <span>{item[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#14182a]">
                  <Utensils className="w-4 h-4 text-[#454d66]" aria-hidden="true" />
                  <span>{isAr ? 'تذوّق من المطبخ المحلي' : 'Local Culinary Specialties'}</span>
                </div>
                <p className="text-sm text-[#454d66] leading-relaxed">
                  {destination.cuisine[lang]}
                </p>
              </div>

              <div className="space-y-2 pt-5 border-t border-[#14182a]/10">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#14182a]">
                  <Compass className="w-4 h-4 text-[#454d66]" aria-hidden="true" />
                  <span>{isAr ? 'نصيحة خبير السفر' : 'Traveler Note'}</span>
                </div>
                <p className="text-sm text-[#454d66] leading-relaxed">
                  {destination.travelTip[lang]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
