'use strict';
// Retained link-page languages; only current, relevant descriptions are translated.
const linkLocales = {
  "langs": [
    {
      "code": "en",
      "name": "English"
    },
    {
      "code": "vi",
      "name": "Tiếng Việt"
    },
    {
      "code": "zh",
      "name": "中文 (简体)"
    },
    {
      "code": "es",
      "name": "Español"
    },
    {
      "code": "ar",
      "name": "العربية"
    },
    {
      "code": "fr",
      "name": "Français"
    },
    {
      "code": "pt",
      "name": "Português"
    },
    {
      "code": "ru",
      "name": "Русский"
    },
    {
      "code": "ja",
      "name": "日本語"
    },
    {
      "code": "de",
      "name": "Deutsch"
    },
    {
      "code": "ko",
      "name": "한국어"
    },
    {
      "code": "hi",
      "name": "हिन्दी"
    },
    {
      "code": "id",
      "name": "Bahasa Indonesia"
    },
    {
      "code": "th",
      "name": "ไทย"
    },
    {
      "code": "it",
      "name": "Italiano"
    },
    {
      "code": "tr",
      "name": "Türkçe"
    },
    {
      "code": "tl",
      "name": "Filipino"
    },
    {
      "code": "pl",
      "name": "Polski"
    },
    {
      "code": "nl",
      "name": "Nederlands"
    },
    {
      "code": "fa",
      "name": "فارسی"
    }
  ],
  "dict": {
    "vi": {
      "set.title": "cài đặt",
      "set.lang": "ngôn ngữ",
      "set.theme": "giao diện",
      "set.text": "cỡ chữ",
      "set.motion": "giảm chuyển động",
      "th.auto": "tự động",
      "th.light": "sáng",
      "th.dark": "tối",
      "th.mono": "đơn sắc",
      "h.tag": "ẩm thực thuần thực vật, được làm thật đẹp",
      "g.work": "hợp tác với mình",
      "c.kofi_s": "hũ tip nhỏ — không bao giờ bắt buộc, luôn trân trọng",
      "c.collab_s": "phạm vi, quyền sử dụng và những giới hạn mình không vượt qua",
      "c.email_t": "email",
      "c.site_t": "ghé trang chính",
      "guide.status": "Cẩm nang đang được phát triển. Chưa mở bán."
    },
    "zh": {
      "set.title": "设置",
      "set.lang": "语言",
      "set.theme": "主题",
      "set.text": "字号",
      "set.motion": "减少动效",
      "th.auto": "自动",
      "th.light": "浅色",
      "th.dark": "深色",
      "th.mono": "单色",
      "h.tag": "植物性美食，做得美丽",
      "g.work": "与我合作",
      "c.kofi_s": "小小打赏罐 — 从不强求，永远感激",
      "c.collab_s": "范围、授权，以及我不会越过的界线",
      "c.email_t": "邮箱",
      "c.site_t": "访问完整网站",
      "guide.status": "指南正在编写中，尚未开售。"
    },
    "es": {
      "set.title": "ajustes",
      "set.lang": "idioma",
      "set.theme": "tema",
      "set.text": "tamaño del texto",
      "set.motion": "reducir movimiento",
      "th.auto": "auto",
      "th.light": "claro",
      "th.dark": "oscuro",
      "th.mono": "mono",
      "h.tag": "comida vegetal, hecha hermosa",
      "g.work": "trabaja conmigo",
      "c.kofi_s": "un botecito de propinas — nunca esperado, siempre agradecido",
      "c.collab_s": "alcance, uso y los límites que no cruzo",
      "c.email_t": "correo",
      "c.site_t": "visita el sitio completo",
      "guide.status": "Guía en desarrollo. Aún no está a la venta."
    },
    "ar": {
      "set.title": "الإعدادات",
      "set.lang": "اللغة",
      "set.theme": "المظهر",
      "set.text": "حجم النص",
      "set.motion": "تقليل الحركة",
      "th.auto": "تلقائي",
      "th.light": "فاتح",
      "th.dark": "داكن",
      "th.mono": "أحادي",
      "h.tag": "طعام نباتي، مصنوع بجمال",
      "g.work": "اعمل معي",
      "c.kofi_s": "صندوق إكرامية صغير — غير متوقع أبداً، ومقدَّر دائماً",
      "c.collab_s": "النطاق، وحقوق الاستخدام، والحدود التي لا أتجاوزها",
      "c.email_t": "البريد الإلكتروني",
      "c.site_t": "زر الموقع الكامل",
      "guide.status": "الدليل قيد الإعداد. غير متاح للبيع بعد."
    },
    "fr": {
      "set.title": "réglages",
      "set.lang": "langue",
      "set.theme": "thème",
      "set.text": "taille du texte",
      "set.motion": "réduire les animations",
      "th.auto": "auto",
      "th.light": "clair",
      "th.dark": "sombre",
      "th.mono": "mono",
      "h.tag": "la cuisine végétale, en toute beauté",
      "g.work": "travaillons ensemble",
      "c.kofi_s": "un petit pot à pourboires — jamais attendu, toujours apprécié",
      "c.collab_s": "périmètre, droits d'usage et les limites que je ne franchis pas",
      "c.email_t": "e-mail",
      "c.site_t": "voir le site complet",
      "guide.status": "Guide en préparation. Pas encore en vente."
    },
    "pt": {
      "set.title": "definições",
      "set.lang": "idioma",
      "set.theme": "tema",
      "set.text": "tamanho do texto",
      "set.motion": "reduzir movimento",
      "th.auto": "auto",
      "th.light": "claro",
      "th.dark": "escuro",
      "th.mono": "mono",
      "h.tag": "comida vegetal, feita com beleza",
      "g.work": "trabalhe comigo",
      "c.kofi_s": "um potinho de gorjetas — nunca esperado, sempre apreciado",
      "c.collab_s": "âmbito, uso e os limites que não ultrapasso",
      "c.email_t": "e-mail",
      "c.site_t": "visite o site completo",
      "guide.status": "Guia em desenvolvimento. Ainda não está à venda."
    },
    "ru": {
      "set.title": "настройки",
      "set.lang": "язык",
      "set.theme": "тема",
      "set.text": "размер текста",
      "set.motion": "меньше движения",
      "th.auto": "авто",
      "th.light": "светлая",
      "th.dark": "тёмная",
      "th.mono": "моно",
      "h.tag": "растительная еда, сделанная красивой",
      "g.work": "работать со мной",
      "c.kofi_s": "маленькая баночка чаевых — никогда не жду, всегда благодарна",
      "c.collab_s": "объём, права на использование и границы, которые я не перехожу",
      "c.email_t": "почта",
      "c.site_t": "открыть весь сайт",
      "guide.status": "Руководство в разработке. Пока не продаётся."
    },
    "ja": {
      "set.title": "設定",
      "set.lang": "言語",
      "set.theme": "テーマ",
      "set.text": "文字サイズ",
      "set.motion": "動きを減らす",
      "th.auto": "自動",
      "th.light": "ライト",
      "th.dark": "ダーク",
      "th.mono": "モノクロ",
      "h.tag": "植物性の食を、美しく",
      "g.work": "一緒に仕事をする",
      "c.kofi_s": "小さなチップジャー — 決して求めず、いつも感謝",
      "c.collab_s": "範囲、二次利用、そして越えない一線",
      "c.email_t": "メール",
      "c.site_t": "サイト全体を見る",
      "guide.status": "ガイドは制作中です。まだ販売していません。"
    },
    "de": {
      "set.title": "Einstellungen",
      "set.lang": "Sprache",
      "set.theme": "Design",
      "set.text": "Textgröße",
      "set.motion": "Bewegung reduzieren",
      "th.auto": "auto",
      "th.light": "hell",
      "th.dark": "dunkel",
      "th.mono": "mono",
      "h.tag": "pflanzliches Essen, schön gemacht",
      "g.work": "mit mir arbeiten",
      "c.kofi_s": "ein kleines Trinkgeldglas — nie erwartet, immer geschätzt",
      "c.collab_s": "Umfang, Nutzungsrechte und die Grenzen, die ich nicht überschreite",
      "c.email_t": "E-Mail",
      "c.site_t": "zur ganzen Website",
      "guide.status": "Der Guide entsteht gerade. Noch nicht erhältlich."
    },
    "ko": {
      "set.title": "설정",
      "set.lang": "언어",
      "set.theme": "테마",
      "set.text": "글자 크기",
      "set.motion": "모션 줄이기",
      "th.auto": "자동",
      "th.light": "라이트",
      "th.dark": "다크",
      "th.mono": "모노",
      "h.tag": "식물성 음식을, 아름답게",
      "g.work": "함께 일해요",
      "c.kofi_s": "작은 팁 항아리 — 바라지 않지만, 언제나 감사해요",
      "c.collab_s": "범위, 사용 권한, 그리고 넘지 않는 선",
      "c.email_t": "이메일",
      "c.site_t": "전체 사이트 보기",
      "guide.status": "가이드를 준비하고 있어요. 아직 판매하지 않습니다."
    },
    "hi": {
      "set.title": "सेटिंग्स",
      "set.lang": "भाषा",
      "set.theme": "थीम",
      "set.text": "टेक्स्ट का आकार",
      "set.motion": "गति कम करें",
      "th.auto": "ऑटो",
      "th.light": "हल्का",
      "th.dark": "गहरा",
      "th.mono": "मोनो",
      "h.tag": "पौध-आधारित भोजन, सुंदर बनाया हुआ",
      "g.work": "मेरे साथ काम करें",
      "c.kofi_s": "छोटा-सा टिप जार — कभी अपेक्षित नहीं, हमेशा आभार",
      "c.collab_s": "दायरा, उपयोग के अधिकार, और वे सीमाएँ जो मैं नहीं लाँघती",
      "c.email_t": "ईमेल",
      "c.site_t": "पूरी साइट देखें",
      "guide.status": "गाइड तैयार की जा रही है। अभी बिक्री के लिए उपलब्ध नहीं है।"
    },
    "id": {
      "set.title": "pengaturan",
      "set.lang": "bahasa",
      "set.theme": "tema",
      "set.text": "ukuran teks",
      "set.motion": "kurangi gerak",
      "th.auto": "otomatis",
      "th.light": "terang",
      "th.dark": "gelap",
      "th.mono": "mono",
      "h.tag": "makanan nabati, dibuat indah",
      "g.work": "bekerja sama denganku",
      "c.kofi_s": "toples tip kecil — tak pernah diharapkan, selalu dihargai",
      "c.collab_s": "cakupan, hak pakai, dan batas yang tak kulewati",
      "c.email_t": "surel",
      "c.site_t": "kunjungi situs lengkap",
      "guide.status": "Panduan sedang dikembangkan. Belum dijual."
    },
    "th": {
      "set.title": "การตั้งค่า",
      "set.lang": "ภาษา",
      "set.theme": "ธีม",
      "set.text": "ขนาดตัวอักษร",
      "set.motion": "ลดการเคลื่อนไหว",
      "th.auto": "อัตโนมัติ",
      "th.light": "สว่าง",
      "th.dark": "มืด",
      "th.mono": "โมโน",
      "h.tag": "อาหารจากพืช ทำให้งดงาม",
      "g.work": "ร่วมงานกับฉัน",
      "c.kofi_s": "กระปุกทิปเล็ก ๆ — ไม่เคยคาดหวัง ขอบคุณเสมอ",
      "c.collab_s": "ขอบเขต สิทธิ์การใช้งาน และเส้นที่ฉันไม่ข้าม",
      "c.email_t": "อีเมล",
      "c.site_t": "ไปที่เว็บไซต์เต็ม",
      "guide.status": "คู่มืออยู่ระหว่างการจัดทำ ยังไม่เปิดจำหน่าย"
    },
    "it": {
      "set.title": "impostazioni",
      "set.lang": "lingua",
      "set.theme": "tema",
      "set.text": "dimensione del testo",
      "set.motion": "riduci il movimento",
      "th.auto": "auto",
      "th.light": "chiaro",
      "th.dark": "scuro",
      "th.mono": "mono",
      "h.tag": "cibo vegetale, reso bello",
      "g.work": "lavora con me",
      "c.kofi_s": "un barattolino per le mance — mai atteso, sempre apprezzato",
      "c.collab_s": "ambito, diritti d'uso e i limiti che non supero",
      "c.email_t": "e-mail",
      "c.site_t": "visita il sito completo",
      "guide.status": "Guida in preparazione. Non ancora in vendita."
    },
    "tr": {
      "set.title": "ayarlar",
      "set.lang": "dil",
      "set.theme": "tema",
      "set.text": "yazı boyutu",
      "set.motion": "hareketi azalt",
      "th.auto": "otomatik",
      "th.light": "açık",
      "th.dark": "koyu",
      "th.mono": "mono",
      "h.tag": "bitkisel yemek, güzelleştirilmiş",
      "g.work": "benimle çalış",
      "c.kofi_s": "küçük bir bahşiş kavanozu — asla beklenmez, her zaman kıymetlidir",
      "c.collab_s": "kapsam, kullanım hakları ve aşmadığım sınırlar",
      "c.email_t": "e-posta",
      "c.site_t": "tüm siteyi gez",
      "guide.status": "Rehber hazırlanıyor. Henüz satışta değil."
    },
    "tl": {
      "set.title": "mga setting",
      "set.lang": "wika",
      "set.theme": "tema",
      "set.text": "laki ng teksto",
      "set.motion": "bawasan ang galaw",
      "th.auto": "awto",
      "th.light": "maliwanag",
      "th.dark": "madilim",
      "th.mono": "mono",
      "h.tag": "pagkaing halaman-base, ginawang maganda",
      "g.work": "makipagtulungan sa akin",
      "c.kofi_s": "maliit na tip jar — hindi kailanman inaasahan, laging pinahahalagahan",
      "c.collab_s": "saklaw, karapatang gamitin, at mga linyang hindi ko tinatawid",
      "c.email_t": "email",
      "c.site_t": "bisitahin ang buong site",
      "guide.status": "Ginagawa pa ang gabay. Hindi pa ito ibinebenta."
    },
    "pl": {
      "set.title": "ustawienia",
      "set.lang": "język",
      "set.theme": "motyw",
      "set.text": "rozmiar tekstu",
      "set.motion": "ogranicz ruch",
      "th.auto": "auto",
      "th.light": "jasny",
      "th.dark": "ciemny",
      "th.mono": "mono",
      "h.tag": "roślinne jedzenie, uczynione pięknym",
      "g.work": "współpracuj ze mną",
      "c.kofi_s": "mały słoiczek na napiwki — nigdy nieoczekiwany, zawsze doceniany",
      "c.collab_s": "zakres, prawa do użycia i granice, których nie przekraczam",
      "c.email_t": "e-mail",
      "c.site_t": "zobacz całą stronę",
      "guide.status": "Przewodnik jest w przygotowaniu. Jeszcze nie jest w sprzedaży."
    },
    "nl": {
      "set.title": "instellingen",
      "set.lang": "taal",
      "set.theme": "thema",
      "set.text": "tekstgrootte",
      "set.motion": "minder beweging",
      "th.auto": "auto",
      "th.light": "licht",
      "th.dark": "donker",
      "th.mono": "mono",
      "h.tag": "plantaardig eten, mooi gemaakt",
      "g.work": "werk met mij",
      "c.kofi_s": "een klein fooienpotje — nooit verwacht, altijd gewaardeerd",
      "c.collab_s": "omvang, gebruiksrechten en de grenzen die ik niet overschrijd",
      "c.email_t": "e-mail",
      "c.site_t": "bekijk de hele site",
      "guide.status": "De gids is in ontwikkeling. Nog niet te koop."
    },
    "fa": {
      "set.title": "تنظیمات",
      "set.lang": "زبان",
      "set.theme": "پوسته",
      "set.text": "اندازهٔ متن",
      "set.motion": "کاهش حرکت",
      "th.auto": "خودکار",
      "th.light": "روشن",
      "th.dark": "تیره",
      "th.mono": "تک‌رنگ",
      "h.tag": "غذای گیاهی، به‌زیبایی",
      "g.work": "با من کار کنید",
      "c.kofi_s": "یک شیشهٔ کوچک انعام — هرگز انتظار نمی‌رود، همیشه قدردانی می‌شود",
      "c.collab_s": "دامنه، حق استفاده، و خط‌هایی که از آن‌ها نمی‌گذرم",
      "c.email_t": "ایمیل",
      "c.site_t": "دیدن سایت کامل",
      "guide.status": "راهنما در حال آماده‌سازی است. هنوز برای فروش نیست."
    }
  }
};
(() => {
 const select = document.querySelector('#language');
 if (!select) return;
 const nodes = [...document.querySelectorAll('[data-i18n]')];
 const english = new Map(nodes.map(node => [node, node.textContent]));
 for (const language of linkLocales.langs) {
  const option = document.createElement('option'); option.value = language.code; option.textContent = language.name; select.append(option);
 }
 function apply(code) {
  if (!linkLocales.langs.some(language => language.code === code)) code = 'en';
  const dictionary = linkLocales.dict[code] || {};
  for (const node of nodes) node.textContent = dictionary[node.dataset.i18n] || english.get(node);
  document.documentElement.lang = code;
  document.documentElement.dir = ['ar', 'fa'].includes(code) ? 'rtl' : 'ltr';
  select.value = code;
  try { localStorage.setItem('sb-lang', code); } catch (_) {}
 }
 let saved = 'en'; try { saved = localStorage.getItem('sb-lang') || 'en'; } catch (_) {}
 apply(saved);
 document.querySelector('.language-control').hidden = false;
 select.addEventListener('change', () => apply(select.value));
})();
