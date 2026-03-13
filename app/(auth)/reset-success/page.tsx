'use client';

import React from 'react';
import Link from 'next/link';
import { MailCheck } from 'lucide-react';
import { AuthCard } from '@/components/auth-card';

export default function ResetSuccessPage() {
  return (
    <AuthCard>
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-2">
          <MailCheck className="w-8 h-8 text-emerald-400" />
        </div>
        
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white transition-colors">Password Reset Successful</h1>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs transition-colors">
          Your password has successfully updated. You can now log in with your new password.
        </p>

        <Link
          href="/login"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#8b3d66] to-[#a14777] hover:from-[#a14777] hover:to-[#b85288] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f1115] focus:ring-pink-500 transition-all mt-6"
        >
          Go to Login
        </Link>
      </div>
    </AuthCard>
  );
}
