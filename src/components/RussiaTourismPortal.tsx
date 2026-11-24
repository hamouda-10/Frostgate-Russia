import { useMemo, useState, type FormEvent } from 'react';
import {
  ArrowUp,
  ArrowUpLeft,
  ArrowUpRight,
  Check,
  ChevronDown,
  Expand,
  Globe,
  Plus,
} from 'lucide-react';
import {
  DESTINATIONS,
  GALLERY_ITEMS,
  GUIDE_TOPICS,
  SEASONS,
  SIGNATURE_ROUTES,
  type Destination,
  type Lang,
  type RegionKey,
} from '../data/russiaData';
import { RussiaPhoto } from './RussiaPhoto';
import { DestinationModal } from './DestinationModal';
import { GalleryLightbox } from './GalleryLightbox';

interface RussiaTourismPortalProps {
  lang: Lang;
  onToggleLang: () => void;
  onNavigateSection: (sectionId: string) => void;
}

type TravelStyle = 'cultural' | 'nature' | 'luxury' | 'family';

export function RussiaTourismPortal({
  lang,
  onToggleLang,
  onNavigateSection,
}: RussiaTourismPortalProps) {
  const isAr = lang === 'ar';

  // Destinations filter & detail modal
  const [regionFilter, setRegionFilter] = useState<RegionKey>('all');
  const [activeDestination, setActiveDestination] = useState<Destination | null>(null);

  // Gallery lightbox
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  // Signature routes active tab
  const [activeRouteId, setActiveRouteId] = useState<string>(SIGNATURE_ROUTES[0].id);

  // Seasons active tab
  const [activeSeasonId, setActiveSeasonId] = useState<(typeof SEASONS)[number]['id']>('winter');

  // Guide accordion
  const [openGuideId, setOpenGuideId] = useState<string>(GUIDE_TOPICS[0].id);

  // Interactive Trip Planner state
  const [selectedDestIds, setSelectedDestIds] = useState<string[]>(['moscow', 'st-petersburg', 'baikal']);
  const [travelers, setTravelers] = useState<number>(2);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>('cultural');
  const [preferredMonth, setPreferredMonth] = useState<string>('feb');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const filteredDestinations = useMemo(() => {
    if (regionFilter === 'all') return DESTINATIONS;
    return DESTINATIONS.filter((d) => d.region === regionFilter);
  }, [regionFilter]);

  const activeRoute = useMemo(
    () => SIGNATURE_ROUTES.find((r) => r.id === activeRouteId) || SIGNATURE_ROUTES[0],
    [activeRouteId],
  );

  const activeSeason = useMemo(
    () => SEASONS.find((s) => s.id === activeSeasonId) || SEASONS[0],
    [activeSeasonId],
  );

  const togglePlanDestination = (id: string) => {
    setSubmittedRef(null);
    setSelectedDestIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const loadRouteIntoPlanner = (destinationIds: string[]) => {
    setSelectedDestIds(destinationIds);
    setSubmittedRef(null);
    onNavigateSection('planner');
  };

  // Computed trip estimate
  const planSummary = useMemo(() => {
    const chosen = DESTINATIONS.filter((d) => selectedDestIds.includes(d.id));
    const totalDays = chosen.reduce((sum, d) => sum + d.recommendedDays, 0);
    const styleMultiplier =
      travelStyle === 'luxury' ? 1.55 : travelStyle === 'family' ? 1.15 : travelStyle === 'nature' ? 1.1 : 1;
    const estPerPerson = Math.round(
      chosen.reduce((sum, d) => sum + d.recommendedDays * d.dailyBudgetUsd, 0) * styleMultiplier,
    );
    const totalEst = estPerPerson * travelers;
    return { chosen, totalDays, estPerPerson, totalEst };
  }, [selectedDestIds, travelStyle, travelers]);

  const handlePlanSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selectedDestIds.length === 0) {
      setFormError(
        isAr ? 'يرجى اختيار وجهة واحدة على الأقل داخل روسيا.' : 'Please select at least one Russian destination.',
      );
      return;
    }
    if (!fullName.trim()) {
      setFormError(isAr ? 'يرجى إدخال الاسم الكامل.' : 'Please enter your full name.');
      return;
    }
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailValid) {
      setFormError(
        isAr ? 'يرجى إدخال بريد إلكتروني صحيح.' : 'Please enter a valid email address.',
      );
      return;
    }
    setFormError('');
    const code = `RU-${Math.floor(10000 + Math.random() * 89999)}`;
    setSubmittedRef(code);
  };

  const regionTabs: { key: RegionKey; label: { ar: string; en: string } }[] = [
    { key: 'all', label: { ar: 'كل الوجهات (10)', en: 'All Places (10)' } },
    { key: 'imperial', label: { ar: 'المدن الإمبراطورية', en: 'Imperial Cities' } },
    { key: 'siberia', label: { ar: 'سيبيريا والطبيعة', en: 'Siberia & Nature' } },
    { key: 'heritage', label: { ar: 'التراث والحلقة الذهبية', en: 'Golden Ring & Heritage' } },
    { key: 'arctic_caucasus', label: { ar: 'القطب الشمالي والقوقاز', en: 'Arctic & Caucasus' } },
  ];

  const travelStyles: { key: TravelStyle; label: { ar: string; en: string } }[] = [
    { key: 'cultural', label: { ar: 'ثقافي وتاريخي', en: 'Cultural & Heritage' } },
    { key: 'nature', label: { ar: 'طبيعة ومغامرة', en: 'Nature & Ice' } },
    { key: 'luxury', label: { ar: 'فخامة واسترخاء', en: 'Luxury Retreat' } },
    { key: 'family', label: { ar: 'رحلة عائلية', en: 'Family Journey' } },
  ];

  const months = [
    { key: 'jan', label: { ar: 'يناير — ذروة الشتاء', en: 'January — Deep Winter' } },
    { key: 'feb', label: { ar: 'فبراير — جليد بايكال والشفق', en: 'February — Baikal Ice & Aurora' } },
    { key: 'may', label: { ar: 'مايو — الربيع ونوافير بيترهوف', en: 'May — Spring & Peterhof' } },
    { key: 'jun', label: { ar: 'يونيو — الليالي البيضاء', en: 'June — White Nights' } },
    { key: 'aug', label: { ar: 'أغسطس — كامتشاتكا وألتاي', en: 'August — Kamchatka & Altai' } },
    { key: 'sep', label: { ar: 'سبتمبر — الخريف الذهبي', en: 'September — Golden Autumn' } },
  ];

  const ArrowIcon = isAr ? ArrowUpLeft : ArrowUpRight;

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className={`relative z-10 bg-[#f4f3f6] text-[#14182a] ${isAr ? 'font-arabic' : 'font-latin'}`}
    >
      {/* Sticky 3-Zone Top Bar Contract: [Wordmark] — [5 single-line nav links] — [1 primary CTA] */}
      <header className="sticky top-0 z-30 bg-[#f4f3f6]/92 backdrop-blur-md border-b border-[#14182a]/10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-8">
          <a
            href="#dive"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('top');
            }}
            className="text-base md:text-lg font-semibold tracking-tight text-[#14182a] whitespace-nowrap shrink-0"
          >
            {isAr ? 'بوابة الصقيع — روسيا' : 'Frostgate Russia'}
          </a>

          <nav
            aria-label={isAr ? 'التنقل السياحي' : 'Tourism navigation'}
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#454d66]"
          >
            <a
              href="#destinations"
              onClick={(e) => {
                e.preventDefault();
                onNavigateSection('destinations');
              }}
              className="hover:text-[#14182a] transition-colors whitespace-nowrap shrink-0"
            >
              {isAr ? 'أشهر الوجهات' : 'Destinations'}
            </a>
            <a
              href="#gallery"
              onClick={(e) => {
                e.preventDefault();
                onNavigateSection('gallery');
              }}
              className="hover:text-[#14182a] transition-colors whitespace-nowrap shrink-0"
            >
              {isAr ? 'معرض الصور' : 'Photo Gallery'}
            </a>
            <a
              href="#routes"
              onClick={(e) => {
                e.preventDefault();
                onNavigateSection('routes');
              }}
              className="hover:text-[#14182a] transition-colors whitespace-nowrap shrink-0"
            >
              {isAr ? 'المسارات' : 'Itineraries'}
            </a>
            <a
              href="#seasons"
              onClick={(e) => {
                e.preventDefault();
                onNavigateSection('seasons');
              }}
              className="hover:text-[#14182a] transition-colors whitespace-nowrap shrink-0"
            >
              {isAr ? 'الفصول' : 'Seasons'}
            </a>
            <a
              href="#guide"
              onClick={(e) => {
                e.preventDefault();
                onNavigateSection('guide');
              }}
              className="hover:text-[#14182a] transition-colors whitespace-nowrap shrink-0"
            >
              {isAr ? 'دليل السفر' : 'Travel Guide'}
            </a>
          </nav>

          <button
            type="button"
            onClick={() => onNavigateSection('planner')}
            className="px-4 py-2 text-xs md:text-sm font-medium bg-[#14182a] text-[#f4f3f6] hover:bg-[#232a47] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {isAr ? 'صمّم رحلتك' : 'Plan Your Trip'}
          </button>
        </div>
      </header>

      {/* Editorial Opening Monograph — seamless transition from the Pristine Lilac ice cave */}
      <section className="bg-gradient-to-b from-[#d5d4de] via-[#e6e4ea] to-[#f4f3f6] border-b border-[#14182a]/10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 pt-16 pb-16 md:pt-24 md:pb-20">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-[#14182a]/12">
            <div className="flex items-center gap-2 text-xs md:text-sm text-[#454d66]">
              <span>{isAr ? 'دليل السياحة الشامل في روسيا' : 'Complete Russia Tourism Guide'}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">
                {isAr ? '11 منطقة زمنية' : '11 Time Zones'}
              </span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">
                {isAr ? '14 صورة فوتوغرافية موثّقة' : '14 Verified Photographs'}
              </span>
            </div>

            <button
              type="button"
              onClick={onToggleLang}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#14182a] border border-[#14182a]/20 hover:bg-[#14182a]/6 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Globe className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{isAr ? 'Switch to English' : 'التبديل إلى العربية'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pt-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
              <div className="space-y-5">
                <h1
                  className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-[#14182a] leading-[1.2] [text-wrap:balance] ${
                    isAr ? 'font-editorial' : 'font-latin tracking-tight'
                  }`}
                >
                  {isAr
                    ? 'اكتشف روسيا: من قباب الساحة الحمراء إلى جليد بايكال والشفق القطبي'
                    : 'Discover Russia: From Red Square Domes to Lake Baikal Ice and Arctic Skies'}
                </h1>
                <p className="text-base md:text-lg text-[#3d455c] leading-relaxed max-w-xl">
                  {isAr
                    ? 'بوابتك المتكاملة للتعرف على أشهر الأماكن السياحية في روسيا بالصور الحقيقية، المسارات اليومية المقترحة، مواسم السفر، ومخطط الرحلات التفاعلي — من موسكو وسانت بطرسبرغ إلى سيبيريا والقوقاز وكامتشاتكا.'
                    : 'A complete editorial portal to Russia’s most celebrated landmarks with authentic photography, curated multi-day itineraries, seasonal advice, and an interactive route planner from Moscow to Siberia and Kamchatka.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigateSection('destinations')}
                  className="px-6 py-3 text-sm font-medium bg-[#14182a] text-[#f4f3f6] hover:bg-[#232a47] transition-colors cursor-pointer whitespace-nowrap"
                >
                  {isAr ? 'استكشف أشهر الأماكن' : 'Explore Famous Places'}
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateSection('gallery')}
                  className="px-6 py-3 text-sm font-medium text-[#14182a] border border-[#14182a]/25 hover:bg-[#14182a]/6 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {isAr ? 'تصفح معرض الصور' : 'Open Photo Gallery'}
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <button
                type="button"
                onClick={() => setActiveDestination(DESTINATIONS[0])}
                className="group relative block w-full h-full min-h-[290px] overflow-hidden bg-[#14182a] text-start cursor-pointer"
              >
                <RussiaPhoto
                  src="/src/assets/images/moscow_red_square.jpg"
                  alt={
                    isAr
                      ? 'كاتدرائية القديس باسيل في الساحة الحمراء بموسكو'
                      : 'Saint Basil’s Cathedral on Red Square, Moscow'
                  }
                  loading="eager"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#14182a]/85 via-[#14182a]/35 to-transparent p-6 text-[#f4f3f6]">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs text-[#e1dedf]/85">
                        {isAr ? 'المعلم الأبرز · موسكو' : 'Signature Landmark · Moscow'}
                      </p>
                      <p className="text-lg font-semibold mt-1">
                        {isAr ? 'الساحة الحمراء وكاتدرائية القديس باسيل' : 'Red Square & Saint Basil’s Cathedral'}
                      </p>
                    </div>
                    <ArrowIcon className="w-5 h-5 shrink-0 opacity-85 group-hover:opacity-100" />
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Full-width 4-column quantitative Russia overview row below hero split */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12 mt-12 border-t border-[#14182a]/12">
            <div>
              <p className="text-2xl md:text-3xl font-semibold text-[#14182a] font-latin tabular-nums">
                10
              </p>
              <p className="text-xs md:text-sm text-[#454d66] mt-1">
                {isAr ? 'وجهات روسية كبرى مغطاة بالتفصيل' : 'Major Russian destinations profiled'}
              </p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-semibold text-[#14182a] font-latin tabular-nums">
                31
              </p>
              <p className="text-xs md:text-sm text-[#454d66] mt-1">
                {isAr ? 'موقعاً مسجلاً في التراث العالمي لليونسكو' : 'UNESCO World Heritage sites nationwide'}
              </p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-semibold text-[#14182a] font-latin tabular-nums">
                1,642 m
              </p>
              <p className="text-xs md:text-sm text-[#454d66] mt-1">
                {isAr ? 'عمق بحيرة بايكال (أعمق بحيرة على الأرض)' : 'Depth of Lake Baikal, Earth’s deepest lake'}
              </p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-semibold text-[#14182a] font-latin tabular-nums">
                9,289 km
              </p>
              <p className="text-xs md:text-sm text-[#454d66] mt-1">
                {isAr ? 'طول خط سكة حديد سيبيريا الأسطوري' : 'Length of the Trans-Siberian Railway'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: DESTINATIONS EXPLORER (#destinations) */}
      <section id="destinations" className="py-20 md:py-28 border-b border-[#14182a]/10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#14182a]/10">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs font-medium text-[#454d66]">
                {isAr ? '01. الوجهات الرئيسية' : '01. Featured Destinations'}
              </p>
              <h2
                className={`text-2xl md:text-4xl font-bold text-[#14182a] [text-wrap:balance] ${
                  isAr ? 'font-editorial' : 'font-latin tracking-tight'
                }`}
              >
                {isAr ? 'أشهر الأماكن السياحية في روسيا' : 'Russia’s Most Famous Destinations'}
              </h2>
              <p className="text-sm md:text-base text-[#454d66] leading-relaxed">
                {isAr
                  ? 'اختر أي وجهة لعرض الصور عالية الدقة، أفضل موسم للزيارة، متوسط الحرارة، وأبرز المعالم مع إمكانية إضافتها مباشرة إلى خطة رحلتك.'
                  : 'Select any destination to view full photography, climate guidance, highlights, and culinary notes—or add it directly to your custom itinerary.'}
              </p>
            </div>

            {/* Interactive filter segmented tabs */}
            <div
              role="tablist"
              aria-label={isAr ? 'تصفية حسب الإقليم' : 'Filter by region'}
              className="flex flex-wrap items-center gap-1.5 p-1 bg-[#e5e3ea] border border-[#14182a]/10"
            >
              {regionTabs.map((tab) => {
                const active = regionFilter === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setRegionFilter(tab.key)}
                    className={`px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-[#14182a] text-[#f4f3f6]'
                        : 'text-[#3d455c] hover:text-[#14182a]'
                    }`}
                  >
                    {tab.label[lang]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Asymmetric Bento / Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 pt-10">
            {filteredDestinations.map((dest, index) => {
              const isWide = regionFilter === 'all' && (index === 0 || index === 2);
              const inPlan = selectedDestIds.includes(dest.id);

              return (
                <article
                  key={dest.id}
                  className={`group flex flex-col bg-[#faf9fb] border border-[#14182a]/11 overflow-hidden transition-colors hover:border-[#14182a]/30 ${
                    isWide ? 'lg:col-span-2' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveDestination(dest)}
                    className={`relative block w-full overflow-hidden bg-[#14182a] cursor-pointer text-start ${
                      isWide ? 'aspect-[16/9]' : 'aspect-[4/3]'
                    }`}
                  >
                    <RussiaPhoto
                      src={dest.photos[0].src}
                      alt={dest.name[lang]}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#14182a]/75 via-[#14182a]/20 to-transparent px-5 py-4 flex items-center justify-between text-[#f4f3f6]">
                      <span className="text-xs font-medium">{dest.city[lang]}</span>
                      <span className="text-xs font-latin tabular-nums opacity-85">
                        {dest.tempWinter} / {dest.tempSummer}
                      </span>
                    </div>
                  </button>

                  <div className="flex-1 flex flex-col justify-between p-6 space-y-5">
                    <div className="space-y-2.5">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#454d66]">
                        <span>{dest.bestSeason[lang]}</span>
                        {dest.unesco && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{isAr ? 'يونسكو' : 'UNESCO'}</span>
                          </>
                        )}
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">
                          {isAr ? `${dest.recommendedDays} أيام` : `${dest.recommendedDays} days`}
                        </span>
                      </div>

                      <h3
                        className={`text-lg md:text-xl font-bold text-[#14182a] leading-snug ${
                          isAr ? 'font-editorial' : 'font-latin'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setActiveDestination(dest)}
                          className="text-start hover:underline underline-offset-4 cursor-pointer"
                        >
                          {dest.name[lang]}
                        </button>
                      </h3>

                      <p className="text-sm text-[#454d66] leading-relaxed line-clamp-3">
                        {dest.summary[lang]}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#14182a]/10 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveDestination(dest)}
                        className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-[#14182a] hover:opacity-75 transition-opacity cursor-pointer whitespace-nowrap"
                      >
                        <span>{isAr ? 'التفاصيل والصور' : 'Details & Photos'}</span>
                        <ArrowIcon className="w-4 h-4" aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        onClick={() => togglePlanDestination(dest.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                          inPlan
                            ? 'bg-[#14182a] text-[#f4f3f6]'
                            : 'border border-[#14182a]/20 text-[#14182a] hover:bg-[#14182a]/6'
                        }`}
                      >
                        {inPlan ? (
                          <>
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>{isAr ? 'في رحلتك' : 'In Plan'}</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>{isAr ? 'أضف للرحلة' : 'Add'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 2: CURATED PHOTOGRAPHY GALLERY (#gallery) */}
      <section id="gallery" className="py-20 md:py-28 bg-[#e7e5ec] border-b border-[#14182a]/10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#14182a]/12">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs font-medium text-[#454d66]">
                {isAr ? '02. ألبوم المعالم الحقيقي' : '02. Curated Photography Monograph'}
              </p>
              <h2
                className={`text-2xl md:text-4xl font-bold text-[#14182a] [text-wrap:balance] ${
                  isAr ? 'font-editorial' : 'font-latin tracking-tight'
                }`}
              >
                {isAr ? 'صور لأشهر الأماكن والمعالم في روسيا' : 'Photographs of Russia’s Iconic Places'}
              </h2>
              <p className="text-sm md:text-base text-[#454d66] leading-relaxed">
                {isAr
                  ? 'أربع عشرة لقطة فوتوغرافية موثقة من موسكو وسانت بطرسبرغ وبيترهوف وسوزدال وقازان وبحيرة بايكال ومورمانسك وسوتشي وكيجي وكامتشاتكا وجبال ألتاي. اضغط على أي صورة للتكبير.'
                  : 'Fourteen verified photographs spanning Moscow, Saint Petersburg, Peterhof, Suzdal, Kazan, Lake Baikal, Murmansk, Sochi, Kizhi, Kamchatka, and Altai. Click any frame to inspect fullscreen.'}
              </p>
            </div>
            <p className="text-xs font-latin tabular-nums text-[#454d66]">
              {isAr ? `14 لقطة عالية الدقة · عرض تفاعلي` : `14 High-Res Frames · Lightbox Enabled`}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-10">
            {GALLERY_ITEMS.map((item, idx) => {
              const spanClass =
                item.aspect === 'wide' ? 'sm:col-span-2 aspect-[16/10]' : 'aspect-[4/3]';
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLightboxIdx(idx)}
                  className={`group relative block w-full overflow-hidden bg-[#14182a] text-start cursor-pointer ${spanClass}`}
                >
                  <RussiaPhoto
                    src={item.src}
                    alt={item.title[lang]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14182a]/85 via-[#14182a]/15 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between text-[#f4f3f6]">
                    <div className="flex items-center justify-between text-[11px] text-[#e1dedf]/85">
                      <span>{item.regionLabel[lang]}</span>
                      <Expand className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold leading-snug">{item.title[lang]}</p>
                      <div className="flex items-center gap-2 text-[11px] text-[#c3c3cd] mt-1">
                        <span>{item.place[lang]}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-latin tabular-nums">{item.coords}</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: SIGNATURE MULTI-DAY ROUTES (#routes) */}
      <section id="routes" className="py-20 md:py-28 border-b border-[#14182a]/10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="space-y-3 max-w-2xl pb-10 border-b border-[#14182a]/10">
            <p className="text-xs font-medium text-[#454d66]">
              {isAr ? '03. برامج ومسارات مجرّبة' : '03. Signature Journeys'}
            </p>
            <h2
              className={`text-2xl md:text-4xl font-bold text-[#14182a] [text-wrap:balance] ${
                isAr ? 'font-editorial' : 'font-latin tracking-tight'
              }`}
            >
              {isAr ? 'مسارات سياحية متكاملة عبر روسيا' : 'Curated Multi-Day Routes Across Russia'}
            </h2>
          </div>

          {/* Route selector tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
            {SIGNATURE_ROUTES.map((route) => {
              const active = route.id === activeRoute.id;
              return (
                <button
                  key={route.id}
                  type="button"
                  onClick={() => setActiveRouteId(route.id)}
                  className={`p-5 text-start border transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#14182a] text-[#f4f3f6] border-[#14182a]'
                      : 'bg-[#faf9fb] text-[#14182a] border-[#14182a]/12 hover:border-[#14182a]/35'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs opacity-75 mb-2">
                    <span className="font-latin tabular-nums">{route.index}</span>
                    <span>{route.duration[lang]}</span>
                  </div>
                  <p className={`text-base font-bold ${isAr ? 'font-editorial' : 'font-latin'}`}>
                    {route.title[lang]}
                  </p>
                  <p className="text-xs mt-1.5 opacity-80">
                    {route.season[lang]} · <span className="font-latin tabular-nums">{route.distance}</span>
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active route detail split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-between bg-[#faf9fb] border border-[#14182a]/11 overflow-hidden">
              <div className="aspect-[16/10] w-full overflow-hidden bg-[#14182a]">
                <RussiaPhoto
                  src={activeRoute.heroImage}
                  alt={activeRoute.title[lang]}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#454d66]">
                    <span>{activeRoute.duration[lang]}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-latin tabular-nums">{activeRoute.distance}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeRoute.season[lang]}</span>
                  </div>
                  <h3 className={`text-xl font-bold text-[#14182a] ${isAr ? 'font-editorial' : 'font-latin'}`}>
                    {activeRoute.title[lang]}
                  </h3>
                  <p className="text-sm text-[#454d66] leading-relaxed">
                    {activeRoute.summary[lang]}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => loadRouteIntoPlanner(activeRoute.destinationIds)}
                  className="w-full px-5 py-3 text-sm font-medium bg-[#14182a] text-[#f4f3f6] hover:bg-[#232a47] transition-colors cursor-pointer whitespace-nowrap"
                >
                  {isAr ? 'اعتماد هذا المسار في مخطط الرحلة' : 'Load This Route in Trip Planner'}
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#faf9fb] border border-[#14182a]/11 p-6 md:p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <h4 className="text-sm font-semibold text-[#454d66] pb-3 border-b border-[#14182a]/10">
                  {isAr ? 'البرنامج اليومي التفصيلي' : 'Day-by-Day Itinerary'}
                </h4>
                <ol className="divide-y divide-[#14182a]/10">
                  {activeRoute.days.map((step, i) => (
                    <li key={i} className="py-5 first:pt-0 last:pb-0 grid grid-cols-1 sm:grid-cols-12 gap-3">
                      <div className="sm:col-span-3 text-xs font-semibold text-[#454d66] tabular-nums pt-1">
                        {step.day[lang]}
                      </div>
                      <div className="sm:col-span-9 space-y-1.5">
                        <h5 className="text-base font-semibold text-[#14182a]">
                          {step.title[lang]}
                        </h5>
                        <p className="text-sm text-[#454d66] leading-relaxed">
                          {step.detail[lang]}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FOUR SEASONS OF RUSSIA (#seasons) */}
      <section id="seasons" className="py-20 md:py-28 bg-[#e7e5ec] border-b border-[#14182a]/10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#14182a]/12">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs font-medium text-[#454d66]">
                {isAr ? '04. توقيت السفر المثالي' : '04. Russia Across the Calendar'}
              </p>
              <h2
                className={`text-2xl md:text-4xl font-bold text-[#14182a] [text-wrap:balance] ${
                  isAr ? 'font-editorial' : 'font-latin tracking-tight'
                }`}
              >
                {isAr ? 'متى تزور روسيا؟ دليل الفصول الأربعة' : 'When to Visit Russia: Four Distinct Seasons'}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#d8d7e0] border border-[#14182a]/10">
              {SEASONS.map((s) => {
                const active = s.id === activeSeason.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveSeasonId(s.id)}
                    className={`px-4 py-2 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-[#14182a] text-[#f4f3f6]'
                        : 'text-[#3d455c] hover:text-[#14182a]'
                    }`}
                  >
                    {s.name[lang]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10 items-stretch">
            <div className="lg:col-span-6 overflow-hidden bg-[#14182a] min-h-[300px]">
              <RussiaPhoto
                src={activeSeason.image}
                alt={activeSeason.name[lang]}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-6 bg-[#f4f3f6] border border-[#14182a]/11 p-6 md:p-9 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#454d66]">
                  <span>{activeSeason.months[lang]}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-latin tabular-nums">{activeSeason.tempRange}</span>
                </div>
                <h3 className={`text-2xl font-bold text-[#14182a] leading-snug ${isAr ? 'font-editorial' : 'font-latin'}`}>
                  {activeSeason.headline[lang]}
                </h3>
                <p className="text-sm md:text-base text-[#454d66] leading-relaxed">
                  {activeSeason.description[lang]}
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-[#14182a]/10">
                <div>
                  <p className="text-xs font-semibold text-[#14182a] mb-1.5">
                    {isAr ? 'الوجهات الموصى بها في هذا الفصل' : 'Top Destinations This Season'}
                  </p>
                  <p className="text-sm text-[#454d66]">
                    {activeSeason.topPlaces.map((p) => p[lang]).join(' · ')}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#14182a] mb-1">
                    {isAr ? 'الظاهرة أو الحدث الأبرز' : 'Signature Highlight'}
                  </p>
                  <p className="text-sm text-[#454d66]">{activeSeason.phenomenon[lang]}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#14182a] mb-1">
                    {isAr ? 'ماذا تضع في حقيبتك' : 'Packing Essentials'}
                  </p>
                  <p className="text-sm text-[#454d66]">{activeSeason.packing[lang]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: INTERACTIVE TRIP PLANNER & INQUIRY (#planner) */}
      <section id="planner" className="py-20 md:py-28 border-b border-[#14182a]/10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="space-y-3 max-w-2xl pb-10 border-b border-[#14182a]/10">
            <p className="text-xs font-medium text-[#454d66]">
              {isAr ? '05. مخطط الرحلة التفاعلي' : '05. Interactive Trip Planner'}
            </p>
            <h2
              className={`text-2xl md:text-4xl font-bold text-[#14182a] [text-wrap:balance] ${
                isAr ? 'font-editorial' : 'font-latin tracking-tight'
              }`}
            >
              {isAr ? 'صمّم رحلتك الخاصة إلى روسيا' : 'Build Your Custom Russia Itinerary'}
            </h2>
            <p className="text-sm md:text-base text-[#454d66] leading-relaxed">
              {isAr
                ? 'اختر المدن والمعالم التي ترغب بزيارتها وسنحسب لك تلقائياً المدة المثالية والتكلفة التقديرية لتجهيز برنامجك.'
                : 'Select the cities and landmarks you want to visit—duration and estimated budget recalculate automatically as you build your route.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10 items-start">
            {/* Left/Start: Destination selector & trip options */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-[#14182a]">
                  {isAr ? '1. اختر الوجهات داخل روسيا' : '1. Select Russian Destinations'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DESTINATIONS.map((dest) => {
                    const checked = selectedDestIds.includes(dest.id);
                    return (
                      <button
                        key={dest.id}
                        type="button"
                        onClick={() => togglePlanDestination(dest.id)}
                        className={`flex items-center justify-between gap-3 px-4 py-3 text-start border transition-colors cursor-pointer ${
                          checked
                            ? 'bg-[#14182a] text-[#f4f3f6] border-[#14182a]'
                            : 'bg-[#faf9fb] text-[#14182a] border-[#14182a]/12 hover:border-[#14182a]/35'
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{dest.city[lang]}</p>
                          <p className={`text-xs mt-0.5 tabular-nums ${checked ? 'text-[#c3c3cd]' : 'text-[#454d66]'}`}>
                            {isAr ? `${dest.recommendedDays} أيام مقترحة` : `${dest.recommendedDays} days suggested`}
                          </p>
                        </div>
                        <span
                          className={`w-5 h-5 flex items-center justify-center border shrink-0 ${
                            checked ? 'border-[#f4f3f6] bg-[#f4f3f6] text-[#14182a]' : 'border-[#14182a]/30'
                          }`}
                        >
                          {checked && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2.5">
                  <label htmlFor="month-select" className="block text-sm font-semibold text-[#14182a]">
                    {isAr ? '2. الشهر المفضّل للسفر' : '2. Preferred Month'}
                  </label>
                  <select
                    id="month-select"
                    value={preferredMonth}
                    onChange={(e) => setPreferredMonth(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-[#faf9fb] text-[#14182a] border border-[#14182a]/18 cursor-pointer"
                  >
                    {months.map((m) => (
                      <option key={m.key} value={m.key}>
                        {m.label[lang]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2.5">
                  <span className="block text-sm font-semibold text-[#14182a]">
                    {isAr ? '3. عدد المسافرين' : '3. Number of Travelers'}
                  </span>
                  <div className="flex items-center border border-[#14182a]/18 bg-[#faf9fb]">
                    <button
                      type="button"
                      onClick={() => setTravelers((n) => Math.max(1, n - 1))}
                      aria-label={isAr ? 'تقليل العدد' : 'Decrease travelers'}
                      className="w-12 h-11 text-base font-medium hover:bg-[#14182a]/6 cursor-pointer"
                    >
                      −
                    </button>
                    <span className="flex-1 text-center text-sm font-semibold font-latin tabular-nums">
                      {travelers}
                    </span>
                    <button
                      type="button"
                      onClick={() => setTravelers((n) => Math.min(12, n + 1))}
                      aria-label={isAr ? 'زيادة العدد' : 'Increase travelers'}
                      className="w-12 h-11 text-base font-medium hover:bg-[#14182a]/6 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <span className="block text-sm font-semibold text-[#14182a]">
                  {isAr ? '4. طابع الرحلة' : '4. Travel Style'}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {travelStyles.map((st) => {
                    const active = travelStyle === st.key;
                    return (
                      <button
                        key={st.key}
                        type="button"
                        onClick={() => setTravelStyle(st.key)}
                        className={`px-3 py-2.5 text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                          active
                            ? 'bg-[#14182a] text-[#f4f3f6] border-[#14182a]'
                            : 'bg-[#faf9fb] text-[#14182a] border-[#14182a]/15 hover:border-[#14182a]/40'
                        }`}
                      >
                        {st.label[lang]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right/End: Live calculated itinerary card + validated request form */}
            <div className="lg:col-span-5 bg-[#faf9fb] border border-[#14182a]/14 p-6 md:p-8 space-y-6">
              <div className="space-y-1 pb-5 border-b border-[#14182a]/10">
                <p className="text-xs text-[#454d66]">
                  {isAr ? 'ملخص برنامجك التقديري' : 'Your Live Itinerary Summary'}
                </p>
                <div className="flex items-baseline justify-between gap-4 pt-1">
                  <span className="text-2xl font-bold font-latin tabular-nums text-[#14182a]">
                    ${planSummary.totalEst.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#454d66] tabular-nums">
                    {isAr
                      ? `${planSummary.totalDays} أيام · ${travelers} مسافر`
                      : `${planSummary.totalDays} days · ${travelers} travelers`}
                  </span>
                </div>
                <p className="text-xs text-[#454d66] tabular-nums">
                  {isAr
                    ? `نحو $${planSummary.estPerPerson.toLocaleString()} للشخص (فنادق، قطارات داخلية وجولات)`
                    : `~$${planSummary.estPerPerson.toLocaleString()} per person (hotels, domestic rail & tours)`}
                </p>
              </div>

              {planSummary.chosen.length > 0 ? (
                <div className="space-y-2 pb-5 border-b border-[#14182a]/10">
                  <p className="text-xs font-semibold text-[#14182a]">
                    {isAr ? 'المحطات المختارة' : 'Selected Stops'}
                  </p>
                  <p className="text-sm text-[#454d66] leading-relaxed">
                    {planSummary.chosen.map((d) => d.city[lang]).join(' · ')}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-[#454d66] pb-5 border-b border-[#14182a]/10">
                  {isAr ? 'اختر وجهة واحدة على الأقل لحساب البرنامج.' : 'Select at least one destination to calculate your trip.'}
                </p>
              )}

              {submittedRef ? (
                <div className="p-5 bg-[#e6e4ec] border border-[#14182a]/18 space-y-2">
                  <p className="text-sm font-bold text-[#14182a]">
                    {isAr ? 'تم استلام خطة رحلتك بنجاح' : 'Your Russia itinerary request is confirmed'}
                  </p>
                  <p className="text-xs text-[#454d66] leading-relaxed">
                    {isAr
                      ? `رقم المرجع: ${submittedRef}. تم حفظ اختيارك لـ ${planSummary.chosen.length} وجهات لمدة ${planSummary.totalDays} أيام، وسنرسل لك ملف البرنامج المفصّل على ${email}.`
                      : `Reference ${submittedRef}. Your ${planSummary.totalDays}-day route across ${planSummary.chosen.length} destinations has been logged for ${email}.`}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmittedRef(null)}
                    className="mt-2 text-xs font-semibold underline underline-offset-4 text-[#14182a] cursor-pointer"
                  >
                    {isAr ? 'تعديل البرنامج' : 'Edit itinerary'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePlanSubmit} noValidate className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="planner-name" className="block text-xs font-medium text-[#14182a]">
                      {isAr ? 'الاسم الكامل' : 'Full Name'}
                    </label>
                    <input
                      id="planner-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={isAr ? 'مثال: أحمد المنصور' : 'e.g. Alex Petrov'}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#f4f3f6] border border-[#14182a]/18 text-[#14182a] placeholder:text-[#454d66]/60"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="planner-email" className="block text-xs font-medium text-[#14182a]">
                      {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                    </label>
                    <input
                      id="planner-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      dir="ltr"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#f4f3f6] border border-[#14182a]/18 text-[#14182a] placeholder:text-[#454d66]/60"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="planner-notes" className="block text-xs font-medium text-[#14182a]">
                      {isAr ? 'ملاحظات إضافية (اختياري)' : 'Notes or preferences (optional)'}
                    </label>
                    <textarea
                      id="planner-notes"
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={
                        isAr
                          ? 'مثال: تفضيل رحلة قطار سابسان، جولة شفق قطبي، طعام حلال...'
                          : 'e.g. Sapsan rail class, northern lights tour, dietary needs...'
                      }
                      className="w-full px-3.5 py-2.5 text-sm bg-[#f4f3f6] border border-[#14182a]/18 text-[#14182a] placeholder:text-[#454d66]/60 resize-none"
                    />
                  </div>

                  {formError && (
                    <p role="alert" className="text-xs font-medium text-[#8b1e3f]">
                      {formError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full px-5 py-3 text-sm font-medium bg-[#14182a] text-[#f4f3f6] hover:bg-[#232a47] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {isAr ? 'احصل على خطة الرحلة المفصّلة' : 'Request Detailed Itinerary'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: PRACTICAL TRAVEL GUIDE (#guide) */}
      <section id="guide" className="py-20 md:py-28 bg-[#e7e5ec] border-b border-[#14182a]/10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 space-y-3">
              <p className="text-xs font-medium text-[#454d66]">
                {isAr ? '06. معلومات أساسية قبل السفر' : '06. Practical Handbook'}
              </p>
              <h2
                className={`text-2xl md:text-4xl font-bold text-[#14182a] [text-wrap:balance] ${
                  isAr ? 'font-editorial' : 'font-latin tracking-tight'
                }`}
              >
                {isAr ? 'دليل المسافر العملي إلى روسيا' : 'Essential Russia Travel Guide'}
              </h2>
              <p className="text-sm text-[#454d66] leading-relaxed">
                {isAr
                  ? 'كل ما تحتاج معرفته حول التأشيرة الإلكترونية، القطارات السريعة، التعامل بالروبل، والمأكولات الروسية الأصيلة.'
                  : 'Clear, practical essentials covering unified e-Visas, high-speed rail, local payments, and regional Russian dining.'}
              </p>
            </div>

            <div className="lg:col-span-8 divide-y divide-[#14182a]/12 border-t border-b border-[#14182a]/12">
              {GUIDE_TOPICS.map((topic) => {
                const isOpen = openGuideId === topic.id;
                return (
                  <div key={topic.id} className="py-5">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenGuideId(isOpen ? '' : topic.id)}
                      className="w-full flex items-center justify-between gap-4 text-start cursor-pointer"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="text-xs font-latin tabular-nums text-[#454d66]">
                          {topic.index}.
                        </span>
                        <span className="text-base md:text-lg font-semibold text-[#14182a]">
                          {topic.title[lang]}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-[#454d66] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {isOpen && (
                      <div className="pt-4 ps-8 space-y-3">
                        <p className="text-sm font-medium text-[#14182a]">
                          {topic.summary[lang]}
                        </p>
                        <ul className="space-y-2">
                          {topic.points.map((pt, i) => (
                            <li key={i} className="text-sm text-[#454d66] leading-relaxed">
                              — {pt[lang]}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* QUIET EDITORIAL FOOTER */}
      <footer className="bg-[#14182a] text-[#e1dedf]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <svg
                viewBox="0 0 48 22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-9 h-auto text-[#e1dedf]"
                aria-hidden="true"
              >
                <path d="M1 21 L15 4 L24 14 L31 7 L47 21" />
                <path d="M10 21 L15 15 L19 21" />
                <path d="M27 21 L31 16 L36 21" />
              </svg>
              <span className="text-base font-semibold tracking-tight">
                {isAr ? 'بوابة الصقيع — دليل السياحة في روسيا' : 'Frostgate Russia'}
              </span>
            </div>
            <p className="text-xs text-[#afb8ca] max-w-md leading-relaxed">
              {isAr
                ? 'منصة سياحية متكاملة تستعرض أشهر المعالم الروسية بصور فوتوغرافية حقيقية ومسارات سفر مقترحة طوال العام.'
                : 'A complete travel guide to Russia’s landmarks with authentic photography and year-round itineraries.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#c3c3cd]">
            <button
              type="button"
              onClick={() => onNavigateSection('destinations')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {isAr ? 'الوجهات' : 'Destinations'}
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection('gallery')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {isAr ? 'المعرض' : 'Gallery'}
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection('routes')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {isAr ? 'المسارات' : 'Routes'}
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection('planner')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {isAr ? 'خطط رحلتك' : 'Trip Planner'}
            </button>

            <button
              type="button"
              onClick={() => onNavigateSection('top')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-white/20 text-[#f4f3f6] hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap"
            >
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{isAr ? 'العودة للأعلى' : 'Back to Top'}</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Destination Editorial Modal */}
      <DestinationModal
        destination={activeDestination}
        lang={lang}
        isSelectedInPlan={
          activeDestination ? selectedDestIds.includes(activeDestination.id) : false
        }
        onTogglePlan={togglePlanDestination}
        onClose={() => setActiveDestination(null)}
      />

      {/* Fullscreen Photography Lightbox */}
      <GalleryLightbox
        items={GALLERY_ITEMS}
        activeIndex={lightboxIdx}
        lang={lang}
        onChangeIndex={setLightboxIdx}
        onClose={() => setLightboxIdx(null)}
      />
    </div>
  );
}
