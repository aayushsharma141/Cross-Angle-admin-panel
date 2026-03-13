'use client';

import React from 'react';
import Link from 'next/link';
import { MailCheck } from 'lucide-react';
import { AuthCard } from '@/components/auth-card';

export default function CheckEmailPage() {
  return (
    <AuthCard>
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-2">
          <MailCheck className="w-8 h-8 text-cyan-400" />
        </div>
        
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white transition-colors">Check your email</h1>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
            We&apos;ve sent a password reset link to:
          </p>
          
          <div className="px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white transition-colors">
            admin@yourcompany.com
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
            Please check your inbox, including spam.
          </p>
        </div>

        <Link
          href="/login"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#8b3d66] to-[#a14777] hover:from-[#a14777] hover:to-[#b85288] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f1115] focus:ring-pink-500 transition-all mt-6"
        >
          Back to Login
        </Link>
        
        <div className="pt-4">
          <Link href="/reset-password" className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            (Simulate clicking link in email)
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
