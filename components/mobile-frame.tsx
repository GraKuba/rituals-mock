export default function MobileFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-[90vh] md:min-h-screen bg-gray-300 p-4">
      <div className="relative w-full max-w-sm">
        {/* iPhone Bezel - Single frame border */}
        <div className="relative bg-black rounded-3xl shadow-2xl overflow-hidden" style={{ aspectRatio: '9/19.5' }}>
          
          {/* Status Bar - Left side (Time) */}
          <div className="absolute top-0 left-0 z-50 px-4 py-2.5 flex items-center">
            <span className="text-white text-sm font-semibold">14:28</span>
          </div>

          {/* Notch - Center */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-50 w-36 h-6 bg-black rounded-b-3xl"></div>

          {/* Status Bar - Right side (Battery, WiFi, Signal) */}
          <div className="absolute top-0 right-0 z-50 px-4 py-2.5 flex items-center gap-1.5 text-white">
            {/* Signal Strength */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12L5 12.01M12 8L12 12.01M19 4L19 12" strokeLinecap="round"/>
            </svg>
            {/* WiFi */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12.55a11 11 0 0 1 14.08 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {/* Battery */}
            <svg className="w-6 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="18" height="10" rx="2" ry="2"/>
              <line x1="22" y1="11" x2="22" y2="13" strokeLinecap="round"/>
              <rect x="4" y="9" width="14" height="6" fill="currentColor"/>
            </svg>
          </div>

          {/* Screen Content - No top padding, content goes under status bar */}
          <div className="h-full bg-white flex flex-col overflow-hidden">
            {children}
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black rounded-full z-50"></div>
        </div>
      </div>
    </div>
  )
}
