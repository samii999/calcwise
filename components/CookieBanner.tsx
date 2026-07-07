'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('cookieConsent');
    if (!hasAccepted) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowBanner(false);
    // Optionally enable analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
    }
  };

  const rejectCookies = () => {
    localStorage.setItem('cookieConsent', 'false');
    setShowBanner(false);
    // Optionally disable analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
      });
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:max-w-md bg-zinc-900 border border-zinc-800 text-zinc-200 p-4 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex flex-col gap-3">
        <p className="text-sm leading-relaxed">
          We use cookies to enhance your experience. By continuing to visit this site, 
          you agree to our use of cookies. Learn more in our{' '}
          <Link href="/privacy-policy" className="text-emerald-400 hover:text-emerald-300 underline">
            Privacy Policy
          </Link>.
        </p>
        <div className="flex justify-end gap-2 text-xs font-medium">
          <button 
            onClick={rejectCookies} 
            className="text-zinc-400 hover:text-zinc-200 px-3 py-2 rounded-lg transition-colors"
          >
            Decline
          </button>
          <button 
            onClick={acceptCookies} 
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}