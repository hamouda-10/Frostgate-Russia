export type Lang = 'ar' | 'en';

export type RegionKey = 'all' | 'imperial' | 'siberia' | 'heritage' | 'arctic_caucasus';

export interface LocalizedText {
  ar: string;
  en: string;
}

export interface DestinationPhoto {
  src: string;
  caption: LocalizedText;
  location: LocalizedText;
  coords: string;
}

export interface Destination {
  id: string;
  region: Exclude<RegionKey, 'all'>;
  name: LocalizedText;
  subtitle: LocalizedText;
  city: LocalizedText;
  coords: string;
  unesco: boolean;
  bestSeason: LocalizedText;
  tempWinter: string;
  tempSummer: string;
  recommendedDays: number;
  dailyBudgetUsd: number;
  featured?: boolean;
  summary: LocalizedText;
  story: LocalizedText;
  highlights: LocalizedText[];
  cuisine: LocalizedText;
  travelTip: LocalizedText;
  photos: DestinationPhoto[];
}

export interface GalleryItem {
  id: string;
  src: string;
  title: LocalizedText;
  place: LocalizedText;
  regionLabel: LocalizedText;
  coords: string;
  aspect: 'wide' | 'standard' | 'tall';
}

export interface RouteDay {
  day: LocalizedText;
  title: LocalizedText;
  detail: LocalizedText;
}

export interface SignatureRoute {
  id: string;
  index: string;
  title: LocalizedText;
  duration: LocalizedText;
  distance: string;
  season: LocalizedText;
  summary: LocalizedText;
  destinationIds: string[];
  heroImage: string;
  days: RouteDay[];
}

export interface SeasonInfo {
  id: 'winter' | 'spring' | 'summer' | 'autumn';
  name: LocalizedText;
  months: LocalizedText;
  tempRange: string;
  headline: LocalizedText;
  description: LocalizedText;
  topPlaces: LocalizedText[];
  phenomenon: LocalizedText;
  packing: LocalizedText;
  image: string;
}

export interface GuideTopic {
  id: string;
  index: string;
  title: LocalizedText;
  summary: LocalizedText;
  points: LocalizedText[];
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'moscow',
    region: 'imperial',
    name: {
      ar: 'موسكو — الساحة الحمراء والكرملين',
      en: 'Moscow — Red Square & The Kremlin',
    },
    subtitle: {
      ar: 'قلب روسيا النابض وقباب القديس باسيل الأيقونية',
      en: 'Russia’s historic heart and Saint Basil’s iconic domes',
    },
    city: { ar: 'موسكو', en: 'Moscow' },
    coords: '55.7539° N, 37.6208° E',
    unesco: true,
    bestSeason: { ar: 'مايو – سبتمبر · ديسمبر – فبراير', en: 'May – Sep · Dec – Feb' },
    tempWinter: '-8°C',
    tempSummer: '+24°C',
    recommendedDays: 3,
    dailyBudgetUsd: 165,
    featured: true,
    summary: {
      ar: 'تلتقي في الساحة الحمراء قرونٌ من العمارة الروسية المهيبة؛ من قباب كاتدرائية القديس باسيل الملونة إلى أسوار الكرملين وممرات متجر غوم التاريخي ومحطات المترو الفاخرة.',
      en: 'Centuries of monumental Russian architecture converge on Red Square—from the swirling onion domes of Saint Basil’s Cathedral to the Kremlin walls, GUM arcade, and palatial metro halls.',
    },
    story: {
      ar: 'موسكو مدينة تتبدل ملامحها مع الضوء والثلج. في الصباح الباكر، يغطي الصقيع حجارة الساحة الحمراء بينما تنعكس القباب الذهبية لقصور الكرملين فوق نهر موسكفا المتجمد. وفي المساء، تتحول المدينة إلى مشهد ثقافي حيّ بين مسرح البولشوي ومتحف تريتياكوف والحدائق المضاءة.',
      en: 'Moscow transforms with every shift of snow and twilight. At dawn, frost dusts the cobblestones of Red Square while the golden cupolas of the Kremlin reflect across the frozen Moskva River. By evening, the city comes alive across the Bolshoi Theatre, Tretyakov Gallery, and lantern-lit boulevards.',
    },
    highlights: [
      { ar: 'كاتدرائية القديس باسيل والساحة الحمراء', en: 'Saint Basil’s Cathedral & Red Square' },
      { ar: 'مجمع الكرملين ومتحف الأسلحة القيصرية', en: 'Moscow Kremlin & Armoury Chamber' },
      { ar: 'مسرح البولشوي وجولة محطات المترو التاريخية', en: 'Bolshoi Theatre & Historic Metro Tour' },
      { ar: 'جسر حديقة زاريادي وإطلالة نهر موسكفا', en: 'Zaryadye Park Floating Bridge & Moskva River' },
    ],
    cuisine: {
      ar: 'بورش موسكو الدافئ، فطائر البليني بالكافيار الأحمر، وكعكة العسل الروسية (ميدوفيك).',
      en: 'Slow-simmered Moscow borscht, buckwheat blini with red caviar, and layered Medovik honey cake.',
    },
    travelTip: {
      ar: 'احجز تذاكر الكرملين ومسرح البولشوي مسبقاً عبر الإنترنت، واستقل المترو بين الساعة 10 صباحاً و3 عصراً للاستمتاع بالمحطات الرخامية بهدوء.',
      en: 'Reserve Kremlin Armoury and Bolshoi tickets ahead of time, and explore the marble metro stations mid-morning for uncrowded views.',
    },
    photos: [
      {
        src: '/src/assets/images/moscow_red_square.jpg',
        caption: { ar: 'كاتدرائية القديس باسيل في الساحة الحمراء، موسكو', en: 'Saint Basil’s Cathedral on Red Square, Moscow' },
        location: { ar: 'الساحة الحمراء، موسكو', en: 'Red Square, Moscow' },
        coords: '55.7525° N, 37.6231° E',
      },
      {
        src: '/src/assets/images/moscow_kremlin.jpg',
        caption: { ar: 'الكرملين وإطلالة الجليد فوق نهر موسكفا', en: 'Moscow Kremlin above the winter ice of Moskva River' },
        location: { ar: 'نهر موسكفا، موسكو', en: 'Moskva River, Moscow' },
        coords: '55.7510° N, 37.6176° E',
      },
    ],
  },
  {
    id: 'st-petersburg',
    region: 'imperial',
    name: {
      ar: 'سانت بطرسبرغ — الإرميتاج وكنيسة المخلص',
      en: 'Saint Petersburg — The Hermitage & Spilled Blood',
    },
    subtitle: {
      ar: 'فينيسيا الشمال وقصور القياصرة على ضفاف نهر نيفا',
      en: 'Venice of the North and imperial palaces along the Neva',
    },
    city: { ar: 'سانت بطرسبرغ', en: 'Saint Petersburg' },
    coords: '59.9398° N, 30.3146° E',
    unesco: true,
    bestSeason: { ar: 'مايو – يوليو (الليالي البيضاء) · الشتاء الثلجي', en: 'May – Jul (White Nights) · Winter Snow' },
    tempWinter: '-7°C',
    tempSummer: '+22°C',
    recommendedDays: 4,
    dailyBudgetUsd: 155,
    featured: true,
    summary: {
      ar: 'عاصمة الفن والعمارة الإمبراطورية: تضم متحف الإرميتاج في القصر الشتوي، وكنيسة المخلص على الدم بفسيفسائها الفريدة، وعشرات القنوات المائية والجسور المتحركة.',
      en: 'Russia’s imperial capital of art and canals—home to the Winter Palace Hermitage Museum, the mosaic-clad Church of the Savior on Spilled Blood, and sweeping Neva embankments.',
    },
    story: {
      ar: 'صُممت سانت بطرسبرغ لتكون نافذة روسيا الفنية على أوروبا، فامتزجت فيها القصور الباروكية بألوانها الهادئة مع القنوات المائية وجسور الحديد المزخرف. في يونيو لا تغرب الشمس كلياً خلال ظاهرة الليالي البيضاء، بينما يمنحها الشتاء سكوناً شاعرياً تحت الثلج.',
      en: 'Built as Russia’s grand window onto European art, Saint Petersburg pairs pastel Baroque facades with wrought-iron bridges and quiet canals. In June, twilight lingers all night during the White Nights; in winter, snow hushes its grand squares into a living painting.',
    },
    highlights: [
      { ar: 'القصر الشتوي ومتحف الإرميتاج (أكثر من 3 ملايين تحفة)', en: 'Winter Palace & State Hermitage Museum' },
      { ar: 'كنيسة المخلص على الدم وقناة غريبويدوف', en: 'Church of the Savior on Spilled Blood & Griboyedov Canal' },
      { ar: 'شارع نيفسكي بروسبكت وكاتدرائية كازان', en: 'Nevsky Prospekt & Kazan Cathedral' },
      { ar: 'مشاهدة فتح الجسور ليلاً فوق نهر نيفا', en: 'Midnight Drawbridge Openings over the Neva' },
    ],
    cuisine: {
      ar: 'بيف ستروغانوف الأصلي، حلوى بيشكا البطرسبرغية الدافئة، وسمك السلمون المدخن من بحر البلطيق.',
      en: 'Classic Beef Stroganoff, warm St. Petersburg pyshki pastries, and cold-smoked Baltic salmon.',
    },
    travelTip: {
      ar: 'يمكنك الوصول من موسكو إلى سانت بطرسبرغ في 4 ساعات فقط عبر قطار سابسان فائق السرعة.',
      en: 'Travel seamlessly from Moscow in under 4 hours aboard the high-speed Sapsan train.',
    },
    photos: [
      {
        src: '/src/assets/images/st_petersburg_spilled_blood.jpg',
        caption: { ar: 'كنيسة المخلص على الدم، سانت بطرسبرغ', en: 'Church of the Savior on Spilled Blood, Saint Petersburg' },
        location: { ar: 'قناة غريبويدوف، سانت بطرسبرغ', en: 'Griboyedov Canal, Saint Petersburg' },
        coords: '59.9401° N, 30.3289° E',
      },
      {
        src: '/src/assets/images/st_petersburg_hermitage.jpg',
        caption: { ar: 'القصر الشتوي ومتحف الإرميتاج الشهير', en: 'Winter Palace & State Hermitage Museum' },
        location: { ar: 'ساحة القصر، سانت بطرسبرغ', en: 'Palace Square, Saint Petersburg' },
        coords: '59.9398° N, 30.3146° E',
      },
    ],
  },
  {
    id: 'baikal',
    region: 'siberia',
    name: {
      ar: 'بحيرة بايكال وجزيرة أولخون',
      en: 'Lake Baikal & Olkhon Island',
    },
    subtitle: {
      ar: 'أعمق بحيرة عذبة في العالم ومملكة الجليد البلوري',
      en: 'The world’s deepest freshwater lake and crystal ice realm',
    },
    city: { ar: 'إيركوتسك، سيبيريا', en: 'Irkutsk, Siberia' },
    coords: '53.2044° N, 107.3396° E',
    unesco: true,
    bestSeason: { ar: 'فبراير – مارس (الجليد الشفاف) · يوليو – أغسطس', en: 'Feb – Mar (Crystal Ice) · Jul – Aug' },
    tempWinter: '-18°C',
    tempSummer: '+20°C',
    recommendedDays: 4,
    dailyBudgetUsd: 140,
    featured: true,
    summary: {
      ar: 'تحتضن بحيرة بايكال خُمس المياه العذبة السائلة على كوكب الأرض. وفي الشتاء تتجمد بصفاء مذهل يكشف عن تشققات فيروزية وكهوف جليدية تحيط بصخرة الشامان في جزيرة أولخون.',
      en: 'Holding a fifth of Earth’s unfrozen freshwater, Siberia’s sacred sea freezes each winter into glass-clear turquoise ice, sculpted caverns, and dramatic cliffs around Olkhon’s Shaman Rock.',
    },
    story: {
      ar: 'الوقوف على جليد بايكال في فبراير يشبه السير فوق مرآة سماوية عميقة. تلمع صخرة الشامان عند الغروب بألوان الليلكي والذهبي، بينما تنطلق المركبات البرمائية (الهوفر كرافت) بين الخلجان الجليدية وقرية ليستفيانكا وخط سكة حديد بايكال التاريخي.',
      en: 'Standing on Baikal’s February ice feels like walking across a luminous cosmic mirror. Shaman Rock glows lilac and amber at sunset while hovercraft glide between frosted grottoes, Listvyanka village, and the historic Circum-Baikal Railway.',
    },
    highlights: [
      { ar: 'صخرة الشامان ورأس خويبوي في جزيرة أولخون', en: 'Shaman Rock & Cape Khoboy on Olkhon Island' },
      { ar: 'الرحلات فوق الجليد الشفاف والكهوف الجليدية بالهوفر كرافت', en: 'Hovercraft Expeditions across Transparent Ice & Ice Caves' },
      { ar: 'قطار محيط بحيرة بايكال التاريخي', en: 'Historic Circum-Baikal Scenic Railway' },
      { ar: 'حمام البانيا السيبيري التقليدي على ضفة البحيرة', en: 'Traditional Siberian Banya beside the Lake' },
    ],
    cuisine: {
      ar: 'سمك الأومول المدخن الخاص ببحيرة بايكال، فطائر البوزي البورياتية بالبخار، وشاي الأعشاب السيبيرية.',
      en: 'Hot-smoked Baikal omul fish, steamed Buryat buuzy dumplings, and wild Siberian pine-cone tea.',
    },
    travelTip: {
      ar: 'ذروة صفاء الجليد وتشكيلات الفقاعات المتجمدة تكون بين منتصف فبراير ومنتصف مارس.',
      en: 'Peak crystal-clear ice and frozen methane bubble formations occur from mid-February to mid-March.',
    },
    photos: [
      {
        src: '/src/assets/images/lake_baikal_ice.jpg',
        caption: { ar: 'إطلالة بانورامية على بحيرة بايكال السيبيرية', en: 'Panoramic view across Siberia’s Lake Baikal' },
        location: { ar: 'بحيرة بايكال، سيبيريا', en: 'Lake Baikal, Siberia' },
        coords: '53.5587° N, 108.1650° E',
      },
      {
        src: '/src/assets/images/baikal_olkhon.jpg',
        caption: { ar: 'صخرة الشامان الشهيرة في جزيرة أولخون', en: 'Sacred Shaman Rock on Olkhon Island, Lake Baikal' },
        location: { ar: 'خوجير، جزيرة أولخون', en: 'Khuzhir, Olkhon Island' },
        coords: '53.2044° N, 107.3396° E',
      },
    ],
  },
  {
    id: 'peterhof',
    region: 'imperial',
    name: {
      ar: 'قصر بيترهوف والشلال الذهبي',
      en: 'Peterhof Grand Palace & Cascade',
    },
    subtitle: {
      ar: 'المقر الصيفي للقياصرة بحدائقه ونوافيره المذهبة',
      en: 'Imperial summer residence of gilded cascades and coastal gardens',
    },
    city: { ar: 'خليج فنلندا، قرب سانت بطرسبرغ', en: 'Gulf of Finland, near St. Petersburg' },
    coords: '59.8845° N, 29.9086° E',
    unesco: true,
    bestSeason: { ar: 'مايو – أكتوبر (موسم النوافير) · الشتاء الهادئ', en: 'May – Oct (Fountain Season) · Quiet Winter' },
    tempWinter: '-6°C',
    tempSummer: '+21°C',
    recommendedDays: 1,
    dailyBudgetUsd: 110,
    summary: {
      ar: 'أسسه القيصر بطرس الأكبر على شاطئ خليج فنلندا، ويضم أكثر من 150 نافورة تعمل بالجاذبية الطبيعية دون مضخات، يتصدرها الشلال الذهبي المهيب وحدائق القصر المتدرجة.',
      en: 'Commissioned by Peter the Great overlooking the Gulf of Finland, Peterhof dazzles with over 150 gravity-fed fountains led by the Grand Cascade and terraced royal parks.',
    },
    story: {
      ar: 'تصل إلى بيترهوف بالقارب السريع (الهيدروفويل) من أمام الإرميتاج خلال 35 دقيقة، فتستقبلك قناة مائية مستقيمة تقود بصرك نحو 64 نافورة ذهبية تتلألأ أسفل القصر الكبير.',
      en: 'Arrive by hydrofoil directly from the Hermitage pier in 35 minutes, stepping onto a manicured maritime promenade aligned straight toward the 64 gilded fountains of the Grand Cascade.',
    },
    highlights: [
      { ar: 'الشلال الكبير وتمثال شمشون المذهب', en: 'The Grand Cascade & Gilded Samson Fountain' },
      { ar: 'قاعات القصر الكبير وقاعة العرش', en: 'Grand Palace Ceremonial Halls & Throne Room' },
      { ar: 'الحديقة السفلى المطلة على خليج فنلندا', en: 'Lower Park overlooking the Gulf of Finland' },
    ],
    cuisine: {
      ar: 'مأكولات البلاط الروسي الكلاسيكية وشاي السماور مع فطائر البيروجكي.',
      en: 'Imperial-style tea service with samovar blends and baked pirozhki.',
    },
    travelTip: {
      ar: 'تعمل النوافير يومياً في الموسم الدافئ عند الساعة 11 صباحاً مع موسيقى كلاسيكية احتفالية.',
      en: 'During warm months, the Grand Cascade launches daily at 11:00 AM to classical symphonic music.',
    },
    photos: [
      {
        src: '/src/assets/images/peterhof_palace.jpg',
        caption: { ar: 'الشلال الكبير وقصر بيترهوف الإمبراطوري', en: 'Grand Cascade and Peterhof Palace' },
        location: { ar: 'بيترهوف، سانت بطرسبرغ', en: 'Peterhof, Saint Petersburg' },
        coords: '59.8845° N, 29.9086° E',
      },
    ],
  },
  {
    id: 'suzdal',
    region: 'heritage',
    name: {
      ar: 'سوزدال — جوهرة الحلقة الذهبية',
      en: 'Suzdal — Jewel of the Golden Ring',
    },
    subtitle: {
      ar: 'متحف مفتوح للأديرة البيضاء والقباب الزرقاء المرصعة بالنجوم',
      en: 'Open-air museum of white-stone monasteries and starry blue domes',
    },
    city: { ar: 'مقاطعة فلاديمير، الحلقة الذهبية', en: 'Vladimir Oblast, Golden Ring' },
    coords: '56.4193° N, 40.4488° E',
    unesco: true,
    bestSeason: { ar: 'ديسمبر – فبراير (سحر الثلج) · يونيو – سبتمبر', en: 'Dec – Feb (Winter Fairytale) · Jun – Sep' },
    tempWinter: '-10°C',
    tempSummer: '+23°C',
    recommendedDays: 2,
    dailyBudgetUsd: 115,
    summary: {
      ar: 'مدينة تاريخية خالية من المباني المرتفعة، تحفظ روح روسيا القديمة عبر كرملين سوزدال وكاتدرائية الميلاد بقبتها الزرقاء المرصعة بالنجوم الذهبية وبيوتها الخشبية المنحوتة.',
      en: 'A remarkably preserved town free of modern high-rises, safeguarding medieval Russia through the Suzdal Kremlin, star-studded blue cupolas, and carved wooden homesteads.',
    },
    story: {
      ar: 'في سوزدال يبطئ الزمن إيقاعه؛ تقع الأديرة البيضاء على ضفاف نهر كامينكا المتعرج، وتفوح في أزقتها رائحة خبز الجاودار الطازج ومشروب الميدوفوخا التقليدي بالعسل والأعشاب.',
      en: 'Time softens in Suzdal: whitewashed monasteries line the bends of the Kamenka River while crisp winter air carries the warmth of rye bread and spiced honey medovukha.',
    },
    highlights: [
      { ar: 'كرملين سوزدال وكاتدرائية الميلاد ذات القباب الزرقاء', en: 'Suzdal Kremlin & Cathedral of the Nativity' },
      { ar: 'متحف العمارة الخشبية الروسية المفتوح', en: 'Open-Air Museum of Wooden Architecture' },
      { ar: 'دير المخلص والقديس يوثيميوس وأجراسه التاريخية', en: 'Monastery of Saint Euthymius & Bell Concerts' },
    ],
    cuisine: {
      ar: 'حساء الششي في قدور الفخار، الخيار السوزدالي المتبل، ومشروب العسل الساخن (سبيتين).',
      en: 'Clay-pot shchi cabbage soup, famous local Suzdal pickles, and hot spiced sbiten.',
    },
    travelTip: {
      ar: 'تبعد سوزدال نحو 3.5 ساعات عن موسكو بالقطار إلى فلاديمير ثم 40 دقيقة بالسيارة.',
      en: 'Reach Suzdal in 3.5 hours from Moscow via express train to Vladimir plus a scenic 40-minute drive.',
    },
    photos: [
      {
        src: '/src/assets/images/suzdal_kremlin.jpg',
        caption: { ar: 'كرملين سوزدال بقبابه الزرقاء وسط ثلوج الشتاء', en: 'Suzdal Kremlin and starry blue domes in winter snow' },
        location: { ar: 'سوزدال، الحلقة الذهبية', en: 'Suzdal, Golden Ring' },
        coords: '56.4167° N, 40.4430° E',
      },
    ],
  },
  {
    id: 'kazan',
    region: 'heritage',
    name: {
      ar: 'قازان — مسجد قول شريف والكرملين الأبيض',
      en: 'Kazan — Kul Sharif Mosque & White Kremlin',
    },
    subtitle: {
      ar: 'ملتقى الثقافة التترية والروسية على ضفاف نهر الفولغا',
      en: 'Where Tatar and Russian heritage meet along the Volga',
    },
    city: { ar: 'قازان، جمهورية تتارستان', en: 'Kazan, Republic of Tatarstan' },
    coords: '55.7983° N, 49.1051° E',
    unesco: true,
    bestSeason: { ar: 'مايو – سبتمبر · ديسمبر', en: 'May – Sep · Dec' },
    tempWinter: '-11°C',
    tempSummer: '+25°C',
    recommendedDays: 2,
    dailyBudgetUsd: 120,
    summary: {
      ar: 'عاصمة تتارستان النابضة بالتعايش الثقافي؛ يتألق داخل كرملينها الأبيض المدرج في اليونسكو مسجد قول شريف بمآذنه الفيروزية إلى جانب الكاتدرائيات التاريخية وأسواق شارع باومان.',
      en: 'Capital of Tatarstan and emblem of cultural harmony: inside its UNESCO white-stone Kremlin stands the turquoise-domed Kul Sharif Mosque alongside historic cathedrals and vibrant Bauman Street.',
    },
    story: {
      ar: 'تقف قازان بشموخ عند التقاء نهري الفولغا وكازانكا، وتمنح الزائر تجربة فريدة تمزج بين المعمار الإسلامي التتري، الضيافة الشرقية، والمطبخ التتري الغني الذي تشتهر به على مستوى روسيا.',
      en: 'Poised at the confluence of the Volga and Kazanka rivers, Kazan pairs soaring Tatar-Islamic architecture with warm hospitality and one of Russia’s most beloved regional cuisines.',
    },
    highlights: [
      { ar: 'مسجد قول شريف وكرملين قازان الأبيض (يونسكو)', en: 'Kul Sharif Mosque & Kazan Kremlin (UNESCO)' },
      { ar: 'برج سيومبيكي المائل وإطلالة نهر الفولغا', en: 'Leaning Söyembikä Tower & Volga Panorama' },
      { ar: 'الحي التتري القديم وبحيرة كابان', en: 'Old Tatar Quarter & Lake Kaban Promenade' },
    ],
    cuisine: {
      ar: 'فطائر الإتشبوتشماك المثلثة، حلوى تشاك تشاك بالعسل، وشاي الأعشاب التتري.',
      en: 'Savory triangular echpochmak pastries, honey-glazed chak-chak, and fragrant Tatar herbal tea.',
    },
    travelTip: {
      ar: 'زر كرملين قازان قبل الغروب بنصف ساعة لتشاهد إضاءة مآذن مسجد قول شريف مع حلول المساء.',
      en: 'Visit Kazan Kremlin just before sunset to see Kul Sharif’s turquoise minarets illuminate against twilight.',
    },
    photos: [
      {
        src: '/src/assets/images/kazan_kul_sharif.jpg',
        caption: { ar: 'مسجد قول شريف المهيب داخل كرملين قازان', en: 'Kul Sharif Mosque inside the Kazan Kremlin' },
        location: { ar: 'كرملين قازان، تتارستان', en: 'Kazan Kremlin, Tatarstan' },
        coords: '55.7983° N, 49.1051° E',
      },
    ],
  },
  {
    id: 'murmansk',
    region: 'arctic_caucasus',
    name: {
      ar: 'مورمانسك وتيريبيركا — القطب الشمالي',
      en: 'Murmansk & Teriberka — The Russian Arctic',
    },
    subtitle: {
      ar: 'الشفق القطبي وسواحل بحر بارنتس عند حافة المحيط المتجمد',
      en: 'Aurora Borealis and Barents Sea cliffs at the edge of the Arctic',
    },
    city: { ar: 'شبه جزيرة كولا، مورمانسك', en: 'Kola Peninsula, Murmansk' },
    coords: '69.1642° N, 35.1404° E',
    unesco: false,
    bestSeason: { ar: 'نوفمبر – مارس (موسم الشفق القطبي)', en: 'Nov – Mar (Aurora Borealis Season)' },
    tempWinter: '-12°C',
    tempSummer: '+14°C',
    recommendedDays: 3,
    dailyBudgetUsd: 160,
    summary: {
      ar: 'أكبر مدينة شمال الدائرة القطبية الشمالية، وبوابتك إلى قرية تيريبيركا الساحلية الساحرة على بحر بارنتس حيث تلتقي صخور التندرا برقصات الشفق القطبي الأخضر والبنفسجي.',
      en: 'The world’s largest city north of the Arctic Circle and gateway to coastal Teriberka on the Barents Sea—where granite tundra meets swirling green and violet aurora skies.',
    },
    story: {
      ar: 'بفضل تيار الخليج الدافئ لا يتجمد ميناء مورمانسك أبداً، مما يجعل الرحلة إلى حافة المحيط المتجمد الشمالي ميسّرة على مدار الشتاء؛ من رحلات صيد الشفق القطبي ليلاً إلى شواطئ تيريبيركا ومزارع الرنة والهاسكي.',
      en: 'Kept ice-free by the warm North Atlantic drift, Murmansk makes the edge of the Arctic Ocean remarkably accessible—combining aurora-hunting nights, Barents Sea cliffs, and Sámi reindeer culture.',
    },
    highlights: [
      { ar: 'مطاردة الشفق القطبي في سهول شبه جزيرة كولا', en: 'Northern Lights Chasing across Kola Tundra' },
      { ar: 'قرية تيريبيركا وشاطئ بيض التنين وبحر بارنتس', en: 'Teriberka Village, Dragon’s Eggs Beach & Barents Sea' },
      { ar: 'كاسحة الجليد النووية التاريخية «لينين»', en: 'Historic Nuclear Icebreaker Lenin Museum' },
    ],
    cuisine: {
      ar: 'سلطعون البحر القطبي الطازج، المحار القطبي، ولحم الرنة المشوي بالتوت البري.',
      en: 'Fresh Barents king crab, Arctic sea urchin, and roasted venison with cloudberry glaze.',
    },
    travelTip: {
      ar: 'خصص ثلاث ليالٍ على الأقل في شبه جزيرة كولا لرفع فرص مشاهدة الشفق القطبي في سماء صافية.',
      en: 'Plan at least three nights on the Kola Peninsula to maximize clear-sky aurora sightings.',
    },
    photos: [
      {
        src: '/src/assets/images/murmansk_kola.jpg',
        caption: { ar: 'تيريبيركا على ساحل بحر بارنتس، مورمانسك', en: 'Teriberka coastline on the Barents Sea, Murmansk' },
        location: { ar: 'تيريبيركا، شبه جزيرة كولا', en: 'Teriberka, Kola Peninsula' },
        coords: '69.1642° N, 35.1404° E',
      },
    ],
  },
  {
    id: 'kamchatka',
    region: 'siberia',
    name: {
      ar: 'كامتشاتكا — أرض البراكين والجليد',
      en: 'Kamchatka — Land of Volcanoes & Ice',
    },
    subtitle: {
      ar: 'قمم بركانية شاهقة وينابيع حارة في أقصى الشرق الروسي',
      en: 'Soaring volcanic cones and thermal valleys of Russia’s Far East',
    },
    city: { ar: 'بتروبافلوفسك-كامتشاتسكي', en: 'Petropavlovsk-Kamchatsky' },
    coords: '53.3208° N, 158.7120° E',
    unesco: true,
    bestSeason: { ar: 'يوليو – سبتمبر · مارس – أبريل (التزلج)', en: 'Jul – Sep · Mar – Apr (Ski Touring)' },
    tempWinter: '-11°C',
    tempSummer: '+16°C',
    recommendedDays: 5,
    dailyBudgetUsd: 220,
    summary: {
      ar: 'شبه جزيرة أسطورية تضم أكثر من 300 بركان ووديان ينابيع فوارة وشواطئ رملية سوداء مطلة على المحيط الهادئ، يتقدمها بركانا كورياكسكي وأفاتشينسكي المكللان بالثلوج.',
      en: 'A mythical peninsula of over 300 volcanoes, steaming geyser valleys, and black Pacific beaches—crowned by the snow-cloaked cones of Koryaksky and Avachinsky.',
    },
    story: {
      ar: 'في كامتشاتكا تشعر بأنك على حافة العالم البكر؛ تشرق الشمس فوق قمم البراكين المتجمدة بينما تتصاعد الأبخرة الدافئة من الينابيع المعدنية وسط الأودية الجبلية الهادئة.',
      en: 'Kamchatka feels like the untamed edge of the earth: Pacific sunrises light up glaciated volcanic ridges while natural thermal springs steam softly across alpine valleys.',
    },
    highlights: [
      { ar: 'بركانا كورياكسكي وأفاتشينسكي المطلان على خليج أفاتشا', en: 'Koryaksky & Avachinsky Volcanoes above Avacha Bay' },
      { ar: 'وادي الينابيع الحارة الفوارة (فالي أوف غايزرز)', en: 'Valley of Geysers Helicopter Expedition' },
      { ar: 'شاطئ خالاكتيرسكي ذو الرمال البركانية السوداء', en: 'Khalaktyrsky Black Volcanic Sand Beach' },
    ],
    cuisine: {
      ar: 'السلمون البري الطازج، الكافيار الأحمر الكامتشاتكي، وشوربة أوخا الصيادين.',
      en: 'Wild Pacific salmon, fresh Kamchatka red caviar, and steaming fisherman’s ukha broth.',
    },
    travelTip: {
      ar: 'احجز رحلات المروحيات والرحلات الجبلية قبل شهرين على الأقل لموسم الصيف القصير.',
      en: 'Book helicopter excursions and volcano guides at least two months ahead for the peak summer window.',
    },
    photos: [
      {
        src: '/src/assets/images/kamchatka_volcano.jpg',
        caption: { ar: 'بركان كورياكسكي المهيب المغطى بالثلوج في كامتشاتكا', en: 'Snow-capped Koryaksky Volcano, Kamchatka Peninsula' },
        location: { ar: 'كامتشاتكا، الشرق الأقصى', en: 'Kamchatka, Russian Far East' },
        coords: '53.3208° N, 158.7120° E',
      },
    ],
  },
  {
    id: 'sochi',
    region: 'arctic_caucasus',
    name: {
      ar: 'سوتشي وروزا خوتور — قمم القوقاز',
      en: 'Sochi & Rosa Khutor — Caucasus Peaks',
    },
    subtitle: {
      ar: 'حيث يلتقي البحر الأسود بمنتجعات القوقاز الجبلية',
      en: 'Where the Black Sea meets alpine Caucasus ski resorts',
    },
    city: { ar: 'سوتشي وكراسنايا بوليانا', en: 'Sochi & Krasnaya Polyana' },
    coords: '43.6532° N, 40.3125° E',
    unesco: false,
    bestSeason: { ar: 'ديسمبر – أبريل (تزلج) · مايو – أكتوبر (جبال وبحر)', en: 'Dec – Apr (Ski) · May – Oct (Mountains & Sea)' },
    tempWinter: '+6°C / -4°C',
    tempSummer: '+27°C',
    recommendedDays: 3,
    dailyBudgetUsd: 145,
    summary: {
      ar: 'في يوم واحد يمكنك احتساء القهوة على كورنيش البحر الأسود ثم الصعود بالتلفريك إلى ارتفاع 2,320 متراً فوق قمة روزا بيك بين ثلوج وغابات القوقاز الخلابة.',
      en: 'Sip morning coffee beside Black Sea palms, then ascend by cable car to 2,320 meters atop Rosa Peak amid dramatic snow-draped Caucasus ridges.',
    },
    story: {
      ar: 'تجمع سوتشي بين سحر الريفييرا الهادئة وفخامة المنتجعات الجبلية العالمية في كراسنايا بوليانا وروزا خوتور، مما يجعلها وجهة مثالية للعائلات وعشاق الطبيعة في كل الفصول.',
      en: 'Sochi blends mild coastal promenades with world-class alpine chalets in Krasnaya Polyana and Rosa Khutor—an effortless year-round retreat for families and mountain lovers.',
    },
    highlights: [
      { ar: 'منتجع روزا خوتور وقمة روزا بيك بالتلفريك', en: 'Rosa Khutor Resort & Rosa Peak Cable Car' },
      { ar: 'حديقة دندراريوم سوتشي والواجهة البحرية', en: 'Sochi Arboretum & Black Sea Embankment' },
      { ar: 'شلالات مينديليخا ومسارات جبال القوقاز', en: 'Mendelikha Waterfalls & Caucasus Alpine Trails' },
    ],
    cuisine: {
      ar: 'خاتشابوري القوقاز بالجبن الدافئ، مشاوي الشاشليك، وعسل كستناء جبال كراسنايا بوليانا.',
      en: 'Warm Caucasus khachapuri, charcoal-grilled shashlik, and wild Krasnaya Polyana chestnut honey.',
    },
    travelTip: {
      ar: 'يربط قطار «لاستوتشكا» الحديث بين ساحل سوتشي وقرية روزا خوتور الجبلية خلال 45 دقيقة.',
      en: 'The modern Lastochka rail link connects the Sochi coastline to Rosa Khutor mountains in 45 minutes.',
    },
    photos: [
      {
        src: '/src/assets/images/sochi_rosa_khutor.jpg',
        caption: { ar: 'هضبة روزا بلاتو وقمم القوقاز الثلجية في سوتشي', en: 'Rosa Plato and snow-covered Caucasus peaks in Sochi' },
        location: { ar: 'كراسنايا بوليانا، سوتشي', en: 'Krasnaya Polyana, Sochi' },
        coords: '43.6532° N, 40.3125° E',
      },
    ],
  },
  {
    id: 'kizhi-altai',
    region: 'siberia',
    name: {
      ar: 'كاريليا (جزيرة كيجي) وجبال ألتاي',
      en: 'Kizhi Island (Karelia) & Altai Mountains',
    },
    subtitle: {
      ar: 'روائع العمارة الخشبية بلا مسامير وقمة بيلوخا المقدسة',
      en: 'Nail-free wooden masterpieces and Siberia’s sacred Mount Belukha',
    },
    city: { ar: 'كاريليا · جمهورية ألتاي', en: 'Karelia · Altai Republic' },
    coords: '62.0672° N, 35.2236° E',
    unesco: true,
    bestSeason: { ar: 'يونيو – سبتمبر', en: 'June – September' },
    tempWinter: '-14°C',
    tempSummer: '+21°C',
    recommendedDays: 3,
    dailyBudgetUsd: 135,
    summary: {
      ar: 'وجهتان أيقونيتان لروسيا البكر: جزيرة كيجي في بحيرة أونيغا بقبابها الـ22 المنحوتة من الخشب دون مسمار واحد، وجبال ألتاي الذهبية التي تتوجها قمة بيلوخا المهيبة (4,506م).',
      en: 'Two crown jewels of unspoiled Russia: Kizhi Island’s 22-dome wooden church built without a single nail on Lake Onega, and the Golden Mountains of Altai crowned by twin-peaked Mount Belukha (4,506m).',
    },
    story: {
      ar: 'تعكس كيجي عبقرية الحرفيين الروس في الشمال، بينما تمثل جبال ألتاي وبحيراتها الفيروزية «سويسرا سيبيريا» لمحبي المسارات الجبلية والتأمل وسط الطبيعة النقية.',
      en: 'Kizhi embodies centuries of northern Russian carpentry genius, while the turquoise glacial lakes and peaks of Altai form Siberia’s pristine alpine sanctuary.',
    },
    highlights: [
      { ar: 'مجمع كيجي بوغوست الخشبي المدرج في اليونسكو', en: 'Kizhi Pogost Wooden Ensemble (UNESCO)' },
      { ar: 'قمة جبل بيلوخا وبحيرة أكيم في ألتاي', en: 'Mount Belukha & Lake Akkem in Altai' },
      { ar: 'طريق تشويسكي البانورامي أحد أجمل طرق العالم', en: 'Chuysky Trakt — One of the World’s Most Scenic Drives' },
    ],
    cuisine: {
      ar: 'فطائر الكاليتكي الكاريلية بالتوت والشوفان، وعسل ألتاي الجبلي النقي.',
      en: 'Karelian kalitki rye pastries with forest berries and pure alpine Altai wildflower honey.',
    },
    travelTip: {
      ar: 'تصل إلى جزيرة كيجي برحلة بحرية سريعة من بيتروزافودسك عبر بحيرة أونيغا.',
      en: 'Reach Kizhi Island via hydrofoil across Lake Onega from Petrozavodsk.',
    },
    photos: [
      {
        src: '/src/assets/images/kizhi_karelia.jpg',
        caption: { ar: 'جزيرة كيجي التاريخية للعمارة الخشبية في كاريليا', en: 'Kizhi Island UNESCO wooden architecture, Karelia' },
        location: { ar: 'بحيرة أونيغا، كاريليا', en: 'Lake Onega, Karelia' },
        coords: '62.0672° N, 35.2236° E',
      },
      {
        src: '/src/assets/images/altai_mountains.jpg',
        caption: { ar: 'قمة جبل بيلوخا المغطاة بالجليد في جبال ألتاي', en: 'Snow-covered Mount Belukha, Altai Mountains' },
        location: { ar: 'جمهورية ألتاي، سيبيريا', en: 'Altai Republic, Siberia' },
        coords: '49.8069° N, 86.5897° E',
      },
    ],
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-moscow-red',
    src: '/src/assets/images/moscow_red_square.jpg',
    title: { ar: 'كاتدرائية القديس باسيل والساحة الحمراء', en: 'Saint Basil’s Cathedral & Red Square' },
    place: { ar: 'موسكو', en: 'Moscow' },
    regionLabel: { ar: 'المدن الإمبراطورية', en: 'Imperial Cities' },
    coords: '55.7525° N, 37.6231° E',
    aspect: 'wide',
  },
  {
    id: 'g-spb-blood',
    src: '/src/assets/images/st_petersburg_spilled_blood.jpg',
    title: { ar: 'كنيسة المخلص على الدم', en: 'Church of the Savior on Spilled Blood' },
    place: { ar: 'سانت بطرسبرغ', en: 'Saint Petersburg' },
    regionLabel: { ar: 'المدن الإمبراطورية', en: 'Imperial Cities' },
    coords: '59.9401° N, 30.3289° E',
    aspect: 'standard',
  },
  {
    id: 'g-baikal-pano',
    src: '/src/assets/images/lake_baikal_ice.jpg',
    title: { ar: 'بانوراما بحيرة بايكال المتجمدة', en: 'Lake Baikal Siberian Panorama' },
    place: { ar: 'سيبيريا', en: 'Siberia' },
    regionLabel: { ar: 'سيبيريا والطبيعة', en: 'Siberia & Nature' },
    coords: '53.5587° N, 108.1650° E',
    aspect: 'wide',
  },
  {
    id: 'g-suzdal',
    src: '/src/assets/images/suzdal_kremlin.jpg',
    title: { ar: 'كرملين سوزدال وسط ثلوج الشتاء', en: 'Suzdal Kremlin in Winter Snow' },
    place: { ar: 'الحلقة الذهبية', en: 'Golden Ring' },
    regionLabel: { ar: 'التراث الروسي', en: 'Russian Heritage' },
    coords: '56.4167° N, 40.4430° E',
    aspect: 'standard',
  },
  {
    id: 'g-hermitage',
    src: '/src/assets/images/st_petersburg_hermitage.jpg',
    title: { ar: 'القصر الشتوي ومتحف الإرميتاج', en: 'Winter Palace & The Hermitage' },
    place: { ar: 'سانت بطرسبرغ', en: 'Saint Petersburg' },
    regionLabel: { ar: 'المدن الإمبراطورية', en: 'Imperial Cities' },
    coords: '59.9398° N, 30.3146° E',
    aspect: 'standard',
  },
  {
    id: 'g-kazan',
    src: '/src/assets/images/kazan_kul_sharif.jpg',
    title: { ar: 'مسجد قول شريف وكرملين قازان', en: 'Kul Sharif Mosque & Kazan Kremlin' },
    place: { ar: 'قازان، تتارستان', en: 'Kazan, Tatarstan' },
    regionLabel: { ar: 'التراث الروسي', en: 'Russian Heritage' },
    coords: '55.7983° N, 49.1051° E',
    aspect: 'standard',
  },
  {
    id: 'g-peterhof',
    src: '/src/assets/images/peterhof_palace.jpg',
    title: { ar: 'الشلال الكبير في قصر بيترهوف', en: 'Grand Cascade at Peterhof Palace' },
    place: { ar: 'بيترهوف', en: 'Peterhof' },
    regionLabel: { ar: 'المدن الإمبراطورية', en: 'Imperial Cities' },
    coords: '59.8845° N, 29.9086° E',
    aspect: 'wide',
  },
  {
    id: 'g-kamchatka',
    src: '/src/assets/images/kamchatka_volcano.jpg',
    title: { ar: 'بركان كورياكسكي المغطى بالثلوج', en: 'Koryaksky Volcano Summit' },
    place: { ar: 'كامتشاتكا', en: 'Kamchatka' },
    regionLabel: { ar: 'الشرق الأقصى', en: 'Far East' },
    coords: '53.3208° N, 158.7120° E',
    aspect: 'standard',
  },
  {
    id: 'g-kremlin-ice',
    src: '/src/assets/images/moscow_kremlin.jpg',
    title: { ar: 'نهر موسكفا المتجمد أمام الكرملين', en: 'Frozen Moskva River & Kremlin' },
    place: { ar: 'موسكو', en: 'Moscow' },
    regionLabel: { ar: 'المدن الإمبراطورية', en: 'Imperial Cities' },
    coords: '55.7510° N, 37.6176° E',
    aspect: 'standard',
  },
  {
    id: 'g-olkhon',
    src: '/src/assets/images/baikal_olkhon.jpg',
    title: { ar: 'صخرة الشامان في جزيرة أولخون', en: 'Shaman Rock, Olkhon Island' },
    place: { ar: 'بحيرة بايكال', en: 'Lake Baikal' },
    regionLabel: { ar: 'سيبيريا والطبيعة', en: 'Siberia & Nature' },
    coords: '53.2044° N, 107.3396° E',
    aspect: 'standard',
  },
  {
    id: 'g-murmansk',
    src: '/src/assets/images/murmansk_kola.jpg',
    title: { ar: 'ساحل تيريبيركا القطبي وبحر بارنتس', en: 'Teriberka Arctic Coast & Barents Sea' },
    place: { ar: 'مورمانسك', en: 'Murmansk' },
    regionLabel: { ar: 'القطب الشمالي', en: 'Russian Arctic' },
    coords: '69.1642° N, 35.1404° E',
    aspect: 'wide',
  },
  {
    id: 'g-sochi',
    src: '/src/assets/images/sochi_rosa_khutor.jpg',
    title: { ar: 'منتجع روزا خوتور في جبال القوقاز', en: 'Rosa Khutor in the Caucasus Mountains' },
    place: { ar: 'سوتشي', en: 'Sochi' },
    regionLabel: { ar: 'القوقاز', en: 'Caucasus' },
    coords: '43.6532° N, 40.3125° E',
    aspect: 'standard',
  },
  {
    id: 'g-kizhi',
    src: '/src/assets/images/kizhi_karelia.jpg',
    title: { ar: 'مجمع كيجي الخشبي في كاريليا', en: 'Kizhi Pogost Wooden Architecture' },
    place: { ar: 'بحيرة أونيغا، كاريليا', en: 'Lake Onega, Karelia' },
    regionLabel: { ar: 'التراث الروسي', en: 'Russian Heritage' },
    coords: '62.0672° N, 35.2236° E',
    aspect: 'standard',
  },
  {
    id: 'g-altai',
    src: '/src/assets/images/altai_mountains.jpg',
    title: { ar: 'جبل بيلوخا في قلب جبال ألتاي', en: 'Mount Belukha in the Altai Mountains' },
    place: { ar: 'جمهورية ألتاي', en: 'Altai Republic' },
    regionLabel: { ar: 'سيبيريا والطبيعة', en: 'Siberia & Nature' },
    coords: '49.8069° N, 86.5897° E',
    aspect: 'standard',
  },
];

export const SIGNATURE_ROUTES: SignatureRoute[] = [
  {
    id: 'imperial-classic',
    index: '01',
    title: {
      ar: 'المسار الإمبراطوري الكلاسيكي',
      en: 'The Classic Imperial Route',
    },
    duration: { ar: '8 أيام · 7 ليالٍ', en: '8 Days · 7 Nights' },
    distance: '710 km',
    season: { ar: 'مناسب طوال العام', en: 'Year-round' },
    summary: {
      ar: 'الرحلة المثالية للزيارة الأولى إلى روسيا؛ تجمع بين عظمة موسكو التاريخية، سحر سوزدال في الحلقة الذهبية، والقصور الفاتنة في سانت بطرسبرغ وبيترهوف عبر قطار سابسان السريع.',
      en: 'The quintessential first journey across Russia—linking Moscow’s Kremlin and Red Square, snowy Suzdal in the Golden Ring, and the imperial palaces of Saint Petersburg and Peterhof via Sapsan high-speed rail.',
    },
    destinationIds: ['moscow', 'suzdal', 'st-petersburg', 'peterhof'],
    heroImage: '/src/assets/images/moscow_red_square.jpg',
    days: [
      {
        day: { ar: 'اليوم 1 – 2', en: 'Day 1 – 2' },
        title: { ar: 'موسكو: الساحة الحمراء والكرملين', en: 'Moscow: Red Square & The Kremlin' },
        detail: {
          ar: 'جولة سير صباحية في الساحة الحمراء وكاتدرائية القديس باسيل، زيارة الكرملين ومتحف الأسلحة، ومساءً جولة في محطات مترو موسكو التاريخية.',
          en: 'Morning walk across Red Square and Saint Basil’s, guided visit to the Kremlin Armoury, and an evening architectural tour of Moscow’s marble metro stations.',
        },
      },
      {
        day: { ar: 'اليوم 3', en: 'Day 3' },
        title: { ar: 'سوزدال والحلقة الذهبية', en: 'Suzdal & The Golden Ring' },
        detail: {
          ar: 'انطلاق صباحي نحو سوزدال لاستكشاف الكرملين الأبيض والقباب الزرقاء ومتحف العمارة الخشبية وتناول الغداء الروسي التقليدي.',
          en: 'Day excursion to Suzdal’s white-stone Kremlin, blue starry domes, wooden architecture museum, and a clay-pot Russian lunch.',
        },
      },
      {
        day: { ar: 'اليوم 4 – 6', en: 'Day 4 – 6' },
        title: { ar: 'قطار سابسان إلى سانت بطرسبرغ والإرميتاج', en: 'Sapsan Rail to Saint Petersburg & Hermitage' },
        detail: {
          ar: 'رحلة مريحة بقطار سابسان (4 ساعات)، ثم قضاء ثلاثة أيام بين متحف الإرميتاج، كنيسة المخلص على الدم، ورحلة بحرية في قنوات نيفا.',
          en: 'Four-hour high-speed Sapsan ride followed by three unhurried days exploring the Hermitage, Savior on Spilled Blood, and Neva canal cruises.',
        },
      },
      {
        day: { ar: 'اليوم 7 – 8', en: 'Day 7 – 8' },
        title: { ar: 'قصر بيترهوف والعودة', en: 'Peterhof Grand Palace & Farewell' },
        detail: {
          ar: 'زيارة قصور وحدائق بيترهوف على خليج فنلندا، وعشاء وداعي في شارع نيفسكي بروسبكت قبل المغادرة.',
          en: 'Hydrofoil excursion to Peterhof’s Grand Cascade and gardens overlooking the Gulf of Finland, ending with a farewell dinner off Nevsky Prospekt.',
        },
      },
    ],
  },
  {
    id: 'ice-aurora',
    index: '02',
    title: {
      ar: 'رحلة الجليد والشفق القطبي',
      en: 'Crystal Ice & Arctic Aurora Expedition',
    },
    duration: { ar: '10 أيام · 9 ليالٍ', en: '10 Days · 9 Nights' },
    distance: '5,900 km',
    season: { ar: 'فبراير – مارس (الشتاء الذهبي)', en: 'Feb – Mar (Peak Winter)' },
    summary: {
      ar: 'مغامرة شتوية استثنائية تبدأ من أضواء موسكو الشتوية نحو أقصى الشمال القطبي في مورمانسك وتيريبيركا، وتُختتم فوق الجليد البلوري لبحيرة بايكال في سيبيريا.',
      en: 'An extraordinary winter odyssey from snow-lit Moscow to the Barents Sea aurora skies of Murmansk and Teriberka, culminating across the crystal ice of Siberia’s Lake Baikal.',
    },
    destinationIds: ['moscow', 'murmansk', 'baikal'],
    heroImage: '/src/assets/images/lake_baikal_ice.jpg',
    days: [
      {
        day: { ar: 'اليوم 1 – 2', en: 'Day 1 – 2' },
        title: { ar: 'موسكو الشتوية', en: 'Winter Lights of Moscow' },
        detail: {
          ar: 'استقبال في موسكو، الساحة الحمراء تحت الثلج، وحلبة التزلج الشهيرة أمام متجر غوم التاريخي.',
          en: 'Arrival in Moscow, snow-dusted Red Square at blue hour, and evening strolls past illuminated GUM.',
        },
      },
      {
        day: { ar: 'اليوم 3 – 5', en: 'Day 3 – 5' },
        title: { ar: 'مورمانسك وتيريبيركا: مطاردة الشفق القطبي', en: 'Murmansk & Teriberka: Chasing the Aurora' },
        detail: {
          ar: 'طيران مباشر إلى مورمانسك، استكشاف ساحل بحر بارنتس في تيريبيركا، ورحلتان ليليتان لمشاهدة الشفق القطبي مع مرشد متخصص.',
          en: 'Direct flight north of the Arctic Circle, Barents Sea coast excursion in Teriberka, and two dedicated aurora-hunting nights.',
        },
      },
      {
        day: { ar: 'اليوم 6 – 10', en: 'Day 6 – 10' },
        title: { ar: 'إيركوتسك وجزيرة أولخون فوق جليد بايكال', en: 'Irkutsk & Olkhon Island on Frozen Baikal' },
        detail: {
          ar: 'التحرك نحو بحيرة بايكال، عبور الجليد الشفاف بالهوفر كرافت إلى صخرة الشامان والكهوف الجليدية، وتجربة البانيا السيبيرية الدافئة.',
          en: 'Fly to Irkutsk and glide by hovercraft across transparent blue ice to Olkhon’s Shaman Rock, frozen grottoes, and lakeside Siberian banya.',
        },
      },
    ],
  },
  {
    id: 'heritage-wild',
    index: '03',
    title: {
      ar: 'كنوز التراث والطبيعة البرية',
      en: 'Cultural Heritage & Wild Peaks',
    },
    duration: { ar: '12 يوماً · 11 ليلة', en: '12 Days · 11 Nights' },
    distance: '4,200 km',
    season: { ar: 'يونيو – سبتمبر (الصيف والخريف المبكر)', en: 'Jun – Sep (Summer & Early Autumn)' },
    summary: {
      ar: 'رحلة تجمع التنوع المذهل لروسيا: من مسجد قول شريف في قازان وجزيرة كيجي الخشبية في كاريليا، إلى قمم القوقاز في سوتشي أو جبال ألتاي وكامتشاتكا.',
      en: 'Experience Russia’s astonishing breadth—from Kazan’s Kul Sharif Mosque and Karelia’s wooden Kizhi Island to the Caucasus peaks of Sochi or the wild volcanoes of Kamchatka.',
    },
    destinationIds: ['kazan', 'kizhi-altai', 'sochi', 'kamchatka'],
    heroImage: '/src/assets/images/kazan_kul_sharif.jpg',
    days: [
      {
        day: { ar: 'اليوم 1 – 3', en: 'Day 1 – 3' },
        title: { ar: 'قازان: التراث التتري وضفاف الفولغا', en: 'Kazan: Tatar Heritage & Volga River' },
        detail: {
          ar: 'جولة في كرملين قازان ومسجد قول شريف، تذوق المطبخ التتري الأصيل، وجولة مسائية على بحيرة كابان.',
          en: 'Explore Kazan Kremlin and Kul Sharif Mosque, sample authentic Tatar pastries, and walk the Lake Kaban waterfront.',
        },
      },
      {
        day: { ar: 'اليوم 4 – 6', en: 'Day 4 – 6' },
        title: { ar: 'كاريليا وجزيرة كيجي (اليونسكو)', en: 'Karelia & Kizhi Island (UNESCO)' },
        detail: {
          ar: 'رحلة بالقارب السريع عبر بحيرة أونيغا إلى جزيرة كيجي لرؤية الكنائس الخشبية المبنية بلا مسامير وسط طبيعة الشمال.',
          en: 'Hydrofoil voyage across Lake Onega to Kizhi Pogost’s 22-dome nail-free wooden churches amid northern lakes.',
        },
      },
      {
        day: { ar: 'اليوم 7 – 12', en: 'Day 7 – 12' },
        title: { ar: 'قمم القوقاز (سوتشي) أو براكين كامتشاتكا', en: 'Caucasus Peaks (Sochi) or Kamchatka Volcanoes' },
        detail: {
          ar: 'اختيار مسار الجبال: إما استجمام جبلي وبحري في روزا خوتور بسوتشي، أو رحلة استكشافية إلى براكين وينابيع كامتشاتكا.',
          en: 'Choose your alpine finale: coastal-to-mountain luxury in Sochi’s Rosa Khutor, or volcanic ridges and thermal springs in Kamchatka.',
        },
      },
    ],
  },
];

export const SEASONS: SeasonInfo[] = [
  {
    id: 'winter',
    name: { ar: 'الشتاء الساحر', en: 'Winter Wonderland' },
    months: { ar: 'ديسمبر – مارس', en: 'December – March' },
    tempRange: '-5°C إلى -20°C',
    headline: {
      ar: 'جليد بايكال البلوري، الشفق القطبي، وأضواء الساحة الحمراء',
      en: 'Crystal Baikal ice, Arctic aurora, and snow-lit Red Square',
    },
    description: {
      ar: 'الشتاء هو الفصل الذي تبلغ فيه روسيا أقصى درجات شاعريتها: الثلج النقي يكسو قباب سوزدال والكرملين، وفي فبراير ومارس تتحول بحيرة بايكال إلى طريق جليدي شفاف بينما يضيء الشفق القطبي سماء مورمانسك.',
      en: 'Winter reveals Russia at its most poetic: crisp snow crowns Suzdal and the Kremlin, February turns Lake Baikal into transparent blue crystal, and northern lights ribbon above Murmansk.',
    },
    topPlaces: [
      { ar: 'بحيرة بايكال وجزيرة أولخون', en: 'Lake Baikal & Olkhon Island' },
      { ar: 'مورمانسك وتيريبيركا', en: 'Murmansk & Teriberka' },
      { ar: 'سوزدال وموسكو وسوتشي للتزلج', en: 'Suzdal, Moscow & Sochi Skiing' },
    ],
    phenomenon: {
      ar: 'موسم جليد بايكال الشفاف (فبراير–مارس) واحتفالات ماسلينيتسا الشتوية.',
      en: 'Baikal transparent ice season (Feb–Mar) and Maslenitsa winter festivals.',
    },
    packing: {
      ar: 'طبقات حرارية (Thermal)، معطف مبطن ضد الرياح، وأحذية شتوية عازلة ومقاومة للانزلاق.',
      en: 'Merino thermal base layers, windproof down parka, insulated waterproof winter boots.',
    },
    image: '/src/assets/images/suzdal_kremlin.jpg',
  },
  {
    id: 'spring',
    name: { ar: 'الربيع المزهر', en: 'Awakening Spring' },
    months: { ar: 'أبريل – مايو', en: 'April – May' },
    tempRange: '+6°C إلى +18°C',
    headline: {
      ar: 'ذوبان الأنهار، افتتاح نوافير بيترهوف، وهدوء المتاحف',
      en: 'Thawing rivers, Peterhof fountain launch, and serene museums',
    },
    description: {
      ar: 'فصل مثالي لعشاق الثقافة والتصوير دون ازدحام الذروة؛ تتفتح الحدائق الملكية في موسكو وسانت بطرسبرغ وتعود نوافير قصر بيترهوف الذهبية للعمل في منتصف مايو.',
      en: 'Ideal for architecture and museum lovers avoiding peak crowds: royal gardens bloom across Moscow and Saint Petersburg, and Peterhof’s gilded fountains launch in mid-May.',
    },
    topPlaces: [
      { ar: 'سانت بطرسبرغ وقصر بيترهوف', en: 'Saint Petersburg & Peterhof' },
      { ar: 'موسكو وقازان', en: 'Moscow & Kazan' },
      { ar: 'سواحل سوتشي الربيعية', en: 'Springtime Sochi Coast' },
    ],
    phenomenon: {
      ar: 'افتتاح موسم النوافير الكبير في بيترهوف وازدهار أشجار الليلك في الحدائق.',
      en: 'Grand Opening of the Peterhof Fountains and lilac blossoms across city parks.',
    },
    packing: {
      ar: 'معطف متوسط مقاوم للمطر، وشاح خفيف، وأحذية مريحة للمشي في الساحات.',
      en: 'Water-resistant trench or mid-weight jacket, light scarf, comfortable walking shoes.',
    },
    image: '/src/assets/images/peterhof_palace.jpg',
  },
  {
    id: 'summer',
    name: { ar: 'الليالي البيضاء الصيفية', en: 'White Nights Summer' },
    months: { ar: 'يونيو – أغسطس', en: 'June – August' },
    tempRange: '+18°C إلى +28°C',
    headline: {
      ar: 'سماء لا تنام في سانت بطرسبرغ، ومغامرات كامتشاتكا وألتاي',
      en: 'Endless twilight in Saint Petersburg, Kamchatka & Altai expeditions',
    },
    description: {
      ar: 'يبلغ النهار ذروته في الشمال مع ظاهرة الليالي البيضاء الساحرة في سانت بطرسبرغ، بينما تفتح مسارات البراكين في كامتشاتكا وجبال ألتاي ورحلات جزيرة كيجي في كاريليا أبوابها بالكامل.',
      en: 'Northern skies glow through midnight during Saint Petersburg’s White Nights, while Kamchatka’s volcanic trails, Altai’s turquoise lakes, and Kizhi’s hydrofoils open in full splendor.',
    },
    topPlaces: [
      { ar: 'سانت بطرسبرغ (الليالي البيضاء)', en: 'Saint Petersburg (White Nights)' },
      { ar: 'كامتشاتكا وجبال ألتاي', en: 'Kamchatka & Altai Mountains' },
      { ar: 'جزيرة كيجي وبحيرة بايكال الصيفية', en: 'Kizhi Island & Summer Baikal' },
    ],
    phenomenon: {
      ar: 'مهرجان الأشرعة القرمزية والليالي البيضاء في يونيو على نهر نيفا.',
      en: 'Scarlet Sails Festival and White Nights twilight concerts along the Neva.',
    },
    packing: {
      ar: 'ملابس صيفية خفيفة مع سترة مسائية لطيفة، ونظارات شمسية لقوة ضوء الشمال.',
      en: 'Breathable summer layers, a light evening cardigan, and sunglasses for long northern days.',
    },
    image: '/src/assets/images/st_petersburg_spilled_blood.jpg',
  },
  {
    id: 'autumn',
    name: { ar: 'الخريف الذهبي', en: 'Golden Russian Autumn' },
    months: { ar: 'سبتمبر – نوفمبر', en: 'September – November' },
    tempRange: '+2°C إلى +15°C',
    headline: {
      ar: 'غابات البتولا الذهبية، موسم الأوبرا والباليه، وألوان القوقاز',
      en: 'Golden birch forests, opera & ballet premieres, and Caucasus colors',
    },
    description: {
      ar: 'تتحول حدائق موسكو وسوزدال والحلقة الذهبية إلى لوحة من الأصفر والعنبر، فيما تبدأ مواسم الباليه والأوبرا الجديدة في مسرح البولشوي ومارينسكي بأسعار فنادق أكثر هدوءاً.',
      en: 'Birch groves across Moscow, Suzdal, and the Golden Ring blaze in amber gold while new ballet and opera seasons premiere at the Bolshoi and Mariinsky theatres.',
    },
    topPlaces: [
      { ar: 'موسكو وسوزدال', en: 'Moscow & Suzdal' },
      { ar: 'قازان ونهر الفولغا', en: 'Kazan & Volga River' },
      { ar: 'سوتشي وجبال القوقاز', en: 'Sochi & Caucasus Foothills' },
    ],
    phenomenon: {
      ar: '«الخريف الذهبي» في سبتمبر وأكتوبر وبداية موسم المسارح الروسية الكبرى.',
      en: '“Zolotaya Osen” golden foliage in September–October and grand theatre season openings.',
    },
    packing: {
      ar: 'كنزات صوفية، معطف دافئ مقاوم للرياح، ومظلة مدمجة.',
      en: 'Wool knits, structured windproof coat, and a compact travel umbrella.',
    },
    image: '/src/assets/images/kazan_kul_sharif.jpg',
  },
];

export const GUIDE_TOPICS: GuideTopic[] = [
  {
    id: 'visa',
    index: '01',
    title: { ar: 'التأشيرة الإلكترونية والدخول', en: 'Unified e-Visa & Entry' },
    summary: {
      ar: 'إجراءات مبسطة عبر التأشيرة الإلكترونية الموحدة المتاحة لمواطني أكثر من 55 دولة.',
      en: 'Streamlined entry via Russia’s Unified e-Visa available to citizens of 55+ countries.',
    },
    points: [
      {
        ar: 'تُصدر التأشيرة الإلكترونية رقمياً خلال 4 أيام عمل دون الحاجة لزيارة القنصلية، وتتيح إقامة حتى 16 يوماً.',
        en: 'Issued digitally within 4 calendar days without embassy visits, valid for stays up to 16 days.',
      },
      {
        ar: 'تأكد من صلاحية جواز السفر لمدة 6 أشهر على الأقل مع وثيقة تأمين سفر سارية داخل روسيا.',
        en: 'Ensure at least 6 months passport validity and travel medical insurance valid in Russia.',
      },
    ],
  },
  {
    id: 'rail',
    index: '02',
    title: { ar: 'القطارات السريعة والتنقل الداخلي', en: 'High-Speed Rail & Domestic Travel' },
    summary: {
      ar: 'شبكة سكك حديدية دقيقة تربط المدن الكبرى، إلى جانب رحلات جوية يومية لسيبيريا والقطب.',
      en: 'Punctual rail lines link historic cities alongside daily flights to Siberia and the Arctic.',
    },
    points: [
      {
        ar: 'يربط قطار «سابسان» بين وسط موسكو ووسط سانت بطرسبرغ خلال 3 ساعات و50 دقيقة بسرعة 250 كم/س.',
        en: 'The Sapsan express links central Moscow and Saint Petersburg in 3h 50m at up to 250 km/h.',
      },
      {
        ar: 'لتجربة كلاسيكية لا تُنسى، جرّب القطار الليلي الفاخر «السهم الأحمر» أو مقطع بحيرة بايكال من خط سيبيريا.',
        en: 'For timeless romance, board the overnight Red Arrow sleeper or the Lake Baikal stretch of the Trans-Siberian.',
      },
    ],
  },
  {
    id: 'currency',
    index: '03',
    title: { ar: 'العملة والمدفوعات الذكية', en: 'Currency & Payments' },
    summary: {
      ar: 'الروبل الروسي (RUB) هو العملة الرسمية؛ يوصى بحمل عملات نقدية قابلة للصرف.',
      en: 'The Russian Ruble (RUB) is the local currency; carry fresh convertible bank notes.',
    },
    points: [
      {
        ar: 'البطاقات الدولية (Visa / Mastercard الصادرة خارج روسيا) لا تعمل حالياً داخل روسيا، لذا اصطحب نقداً بالدولار أو اليورو لصرفه في البنوك الرسمية.',
        en: 'Foreign-issued Visa and Mastercard cards do not currently operate in Russia—bring crisp USD or EUR cash to exchange at official banks.',
      },
      {
        ar: 'تطبيقات الخرائط والتنقل مثل Yandex Maps وYandex Go (تعمل بالدفع النقدي) تسهّل التجوال في كل المدن.',
        en: 'Yandex Maps and Yandex Go (with cash payment enabled) make urban navigation effortless across all cities.',
      },
    ],
  },
  {
    id: 'cuisine',
    index: '04',
    title: { ar: 'المطبخ الروسي وضيافة البانيا', en: 'Russian Gastronomy & Banya' },
    summary: {
      ar: 'نكهات شتوية دافئة تجمع بين مطبخ القياصرة، المطبخ السيبيري، والمطبخ التتري والقوقازي.',
      en: 'Warm culinary traditions spanning imperial gastronomy, Siberian rivers, Tatar bakeries, and Caucasus grills.',
    },
    points: [
      {
        ar: 'لا تفوّت تذوق البورش الأصيل، البيلميني السيبيري، فطائر البليني بالكافيار، والإتشبوتشماك في قازان.',
        en: 'Must-try classics include traditional borscht, Siberian pelmeni, buckwheat blini, and Kazan’s echpochmak.',
      },
      {
        ar: 'تتوفر خيارات طعام حلال واسعة ومتنوعة في موسكو وسانت بطرسبرغ، وتُعد قازان من أغنى المدن الروسية بالمطاعم الحلال.',
        en: 'Halal dining is abundant across Moscow, Saint Petersburg, and especially Kazan and Sochi.',
      },
    ],
  },
];
