import "./globals.css";

export const metadata = {
  title: "متتبع الأسعار — Price Tracker",
  description:
    "برنامج ويندوز يبحث عن أسعار الهواتف في المتاجر المصرية ويعرض السعر قبل وبعد الخصم وكود الكوبون.",
  icons: {
    icon: "/icons/app-128.png",
  },
};

export const viewport = {
  themeColor: "#0c0e12",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
