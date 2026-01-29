"use client";

import { PasswordGeneratorFeature } from "@/features/password-generator";
import { Shield, Zap, Lock, Github } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="font-bold text-slate-900 dark:text-white">SecurePass</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link 
              href="https://github.com/Lordymine/password-generator" 
              target="_blank"
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Generate Secure Passwords
              <span className="block text-blue-600 dark:text-blue-400">In Seconds</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Create strong, unique passwords with our advanced generator. 
              Customize length, characters, and check strength in real-time.
            </p>
          </div>

          {/* Password Generator - Hero Center */}
          <div className="max-w-xl mx-auto mb-16">
            <PasswordGeneratorFeature />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 sm:py-20 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
            Why Use Our Generator?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-xl bg-slate-50 dark:bg-slate-800">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Instant Generation
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Generate secure passwords instantly with one click. 
                No waiting, no hassle.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-xl bg-slate-50 dark:bg-slate-800">
              <div className="w-12 h-12 mx-auto mb-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                <Lock className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Cryptographically Secure
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Uses browser-native crypto API for true randomness. 
                Your passwords are genuinely secure.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-xl bg-slate-50 dark:bg-slate-800">
              <div className="w-12 h-12 mx-auto mb-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Strength Analysis
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Real-time entropy calculation and crack time estimation. 
                Know exactly how strong your password is.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
            How It Works
          </h2>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Choose Your Options</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Select password length and character types. Include uppercase, lowercase, numbers, and symbols.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Generate Instantly</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Click generate and get your secure password immediately using cryptographic randomness.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Copy & Use</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  One-click copy to clipboard. Check the strength indicator to ensure maximum security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 px-4 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Secure Your Accounts?
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Start generating strong, unique passwords for all your accounts. 
            It's free and always will be.
          </p>
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            Generate Password Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 px-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-slate-400" />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              © 2026 SecurePass. Open source on{" "}
              <Link 
                href="https://github.com/Lordymine/password-generator"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                GitHub
              </Link>
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            No passwords are stored or transmitted. Everything runs in your browser.
          </p>
        </div>
      </footer>
    </div>
  );
}
