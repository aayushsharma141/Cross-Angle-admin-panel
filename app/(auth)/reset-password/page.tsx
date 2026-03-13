'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { AuthCard } from '@/components/auth-card';
import { Logo } from '@/components/logo';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password && password === confirmPassword) {
      router.push('/reset-success');
    }
  };

  const requirements = [
    { text: 'Must be at least 8 characters', met: password.length >= 8 },
    { text: 'Must contain an uppercase letter', met: /[A-Z]/.test(password) },
    { text: 'Must contain a lowercase letter', met: /[a-z]/.test(password) },
    { text: 'Must contain a number or symbol', met: /[0-9!@#$%^&*]/.test(password) },
  ];

  return (
    <AuthCard>
      <div className="flex flex-col items-center mb-8">
        <Logo className="mb-4" />
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white transition-colors">Create new password</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
              placeholder="Confirm Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Password requirements:</p>
          <ul className="space-y-1">
            {requirements.map((req, i) => (
              <li key={i} className="flex items-center text-xs">
                <CheckCircle2 className={`w-4 h-4 mr-2 ${req.met ? 'text-emerald-500 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-600'}`} />
                <span className={req.met ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500'}>{req.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          disabled={!requirements.every(r => r.met) || password !== confirmPassword}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#8b3d66] to-[#a14777] hover:from-[#a14777] hover:to-[#b85288] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f1115] focus:ring-pink-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reset Password
        </button>
      </form>
    </AuthCard>
  );
}
