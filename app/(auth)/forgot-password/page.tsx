'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { AuthCard } from '@/components/auth-card';
import { Logo } from '@/components/logo';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      router.push('/check-email');
    }
  };

  return (
    <AuthCard>
      <div className="flex flex-col items-center mb-6 text-center">
        <Logo className="mb-4" />
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2 transition-colors">Forgot your password?</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs transition-colors">
          Enter your email address below and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
            placeholder="Email Address"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#8b3d66] to-[#a14777] hover:from-[#a14777] hover:to-[#b85288] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f1115] focus:ring-pink-500 transition-all"
        >
          Send Reset Link
        </button>

        <div className="flex items-center justify-center pt-2">
          <Link href="/login" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            Back to Login
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}
