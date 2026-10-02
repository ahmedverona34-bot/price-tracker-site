/* Bilingual copy for the site.
 *
 * One object per language, same keys, so a missing translation is a visible
 * undefined rather than a silently English line inside an Arabic page.
 *
 * Voice follows PRODUCT.md: plain language, no superlatives, no claim the app
 * does not actually deliver. Everything here is checkable against the code.
 */

export const copy = {
  ar: {
    dir: "rtl",
    locale: "ar-EG",
    langName: "العربية",
    otherLang: "English",

    brand: "متتبع الأسعار",
    nav: {
      how: "كيف يعمل",
      features: "المميزات",
      specs: "التفاصيل",
      download: "التحميل",
    },

    hero: {
      title: "اكتب كلمة واحدة، اقرأ أرخص سعر",
      lead:
        "يبحث البرنامج في متاجر الهواتف المصرية كلها في نفس الوقت، ويعرض السعر قبل وبعد الخصم وكود الكوبون في جدول واحد. يتجدد البحث كل عشر دقائق وينبّهك على أي انخفاض في السعر.",
      cta: "حمّل البرنامج",
      secondary: "تفاصيل النسخة",
      note: "مجانًا • ويندوز 10 و 11 • بدون صلاحيات مدير",
    },

    markTitle: "برنامج ويندوز",
    markBody:
      "برنامج مستقل يفتح بنقرة واحدة. لا يحتاج تثبيت بايثون ولا أي إعداد: اكتب الكلمة واقرأ الأسعار.",

    howTitle: "ثلاث خطوات، لا أكثر",
    howLead:
      "البرنامج مصمم لمن لا يقرأ الإنجليزية ولا يفتح ملفات الإعداد.",
    steps: [
      {
        title: "اكتب الكلمة",
        body: "اكتب اسم الموبايل في خانة البحث واضغط زر الاستخراج. لا شيء آخر مطلوب.",
      },
      {
        title: "تصل النتائج متتالية",
        body: "كل متجر يرسل منتجاته بمجرد انتهائه، فترى أسرع نتيجة خلال ثوانٍ بينما تكمل المتاجر الأخرى.",
      },
      {
        title: "افتح أو صدّر",
        body: "افتح أي منتج في المتجر، أو صدّر كل النتائج إلى ملف Excel بنقرة واحدة.",
      },
    ],

    featuresTitle: "ما الذي يفعله البرنامج فعليًا",
    featuresLead:
      "كل ميزة هنا تعمل في النسخة الحالية، وليست وصفًا عامًا.",
    features: [
      {
        title: "بحث في كل المتاجر معًا",
        body: "2B Egypt و Dubai Phone في نفس الوقت. فشل متجر واحد لا يوقف الباقي، وتعرف منظرًا أيهم أبطأ.",
      },
      {
        title: "السعر قبل وبعد الخصم",
        body: "السعر الأصلي مشطوب، والسعر الحالي تحته، ونسبة الخصم بجانبه. أرقام حقيقية كما يعرضها المتجر.",
      },
      {
        title: "حساب الكوبون",
        body: "بعض المتاجر تعرض كود خصم بدون أن تذكر كم يساوي. البرنامج يحسب السعر بعد الكوبون ويسجل الكود في نفس الصف.",
      },
      {
        title: "كشف انخفاض السعر",
        body: "يقارن كل بحث بالبحث السابق ويعلّم المنتجات التي انخفض سعرها بأسهم أخضر.",
      },
      {
        title: "ملف Excel دائم",
        body: "يُحفظ ملف prices.xlsx تلقائيًا بعد كل بحث، بتاريخ كل سطر وروابط المتاجر.",
      },
      {
        title: "تحديث تلقائي للبرنامج",
        body: "لا يغلق البرنامج فجأة. تحقق بنفسك من وجود نسخة جديدة وثبّتها من داخل النافذة.",
      },
    ],

    specsTitle: "تفاصيل النسخة",
    specsLead: "أرقام من ملفات البناء في المستودع، لا تقديرات.",
    specs: [
      ["حجم البرنامج", "25.4 ميجابايت"],
      ["حجم ملف التثبيت", "12.3 ميجابايت"],
      ["نظام التشغيل", "Windows 10 أو 11"],
      ["صلاحية مدير النظام", "لا يطلبها أبدًا"],
      ["الخط", "Thmanyah Sans — 5 أوزان"],
      ["اللغات", "العربية داخل البرنامج، المثبّت بالإنجليزية"],
    ],

    downloadTitle: "جاهز تجربته",
    downloadBody:
      "نزّل ملف التثبيت وشغّله. يختار بنفسه مكان التثبيت، ولا يطلب صلاحيات مدير، وبياناتك تبقى في مجلد خاص بك.",
    ctaDownload: "حمّل ملف التثبيت",

    footerBuilt: "برنامج مفتوح المصدر بـ Python و WebView2.",
    footerRepo: "المستودع على GitHub",
  },

  en: {
    dir: "ltr",
    locale: "en",
    langName: "English",
    otherLang: "العربية",

    brand: "Price Tracker",
    nav: {
      how: "How it works",
      features: "Features",
      specs: "Details",
      download: "Download",
    },

    hero: {
      title: "Type one word, read the lowest price",
      lead:
        "The app searches every Egyptian phone store at once and shows the price before the discount, the price after it, and the coupon code in one table. It re-checks every ten minutes and flags any price drop.",
      cta: "Download the app",
      secondary: "See the details",
      note: "Free • Windows 10 and 11 • Never asks for admin rights",
    },

    markTitle: "Windows app",
    markBody:
      "A standalone app that opens with one click. No Python to install, no setup file to edit: type the word, read the prices.",

    howTitle: "Three steps, no more",
    howLead:
      "Built for people who do not read English and never open a config file.",
    steps: [
      {
        title: "Type the word",
        body: "Put the phone name in the search field and press the extract button. Nothing else is asked of you.",
      },
      {
        title: "Results stream in",
        body: "Each store sends its products the moment it finishes, so the fast one lands in seconds while the others keep working.",
      },
      {
        title: "Open or export",
        body: "Open any product in its store, or export the whole table to Excel in one click.",
      },
    ],

    featuresTitle: "What the app actually does",
    featuresLead:
      "Every item below runs in the current build. None of it is aspirational.",
    features: [
      {
        title: "Every store at once",
        body: "2B Egypt and Dubai Phone together. One store failing never stops the others, and a status dot shows which is slow.",
      },
      {
        title: "Price before and after",
        body: "The original price struck through, the current price under it, the discount percentage beside it. Real numbers, as the store shows them.",
      },
      {
        title: "Coupon math",
        body: "Some stores show a discount code without saying what it is worth. The app computes the price after the coupon and records the code on the same row.",
      },
      {
        title: "Price drop detection",
        body: "Every search is compared against the previous one, and anything cheaper is marked with a green arrow.",
      },
      {
        title: "A permanent Excel record",
        body: "prices.xlsx is rewritten after each search, with a timestamp and store link on every line.",
      },
      {
        title: "Updates from inside the app",
        body: "It never closes on you. Check for a newer build yourself and install it from the settings page.",
      },
    ],

    specsTitle: "Build details",
    specsLead: "Numbers read from the build files in the repository, not estimates.",
    specs: [
      ["App size", "25.4 MB"],
      ["Setup file size", "12.3 MB"],
      ["Operating system", "Windows 10 or 11"],
      ["Administrator rights", "Never requested"],
      ["Typeface", "Thmanyah Sans — 5 weights"],
      ["Languages", "Arabic in the app, English in the installer"],
    ],

    downloadTitle: "Ready to try",
    downloadBody:
      "Download the setup and run it. It picks its own install folder, never asks for administrator rights, and keeps your data in a folder of its own.",
    ctaDownload: "Download the setup",

    footerBuilt: "Open source app built with Python and WebView2.",
    footerRepo: "Repository on GitHub",
  },
};
