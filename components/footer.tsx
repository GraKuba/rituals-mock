export default function Footer() {
  return (
    <footer className="w-full bg-foreground text-white py-16 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="text-lg font-serif mb-6">RITUALS...</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Transform daily moments into meaningful rituals. Premium self-care for the modern
              lifestyle.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-sans tracking-widest mb-6">SHOP</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition">
                  New
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Collections
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Gifts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Online Outlet
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-sans tracking-widest mb-6">SUPPORT</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h4 className="text-sm font-sans tracking-widest mb-6">FOLLOW</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Pinterest
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-300">
          <p>&copy; 2025 Rituals. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
