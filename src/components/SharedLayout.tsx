'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import SplashCursor from '@/components/SplashCursor';
import Breadcrumb from '@/components/Breadcrumb';
import Navbar from '@/components/Navbar';

interface SharedLayoutProps {
  children: React.ReactNode;
  currentPath?: string;
}

export default function SharedLayout({ children, currentPath = '' }: SharedLayoutProps) {


  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden with-splash-cursor">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBzdHJva2Utb3BhY2l0eT0iLjEiIHN0cm9rZT0iI2ZmZiIvPjxwYXRoIGQ9Ik0zMCAwaDMwdjMwSDMweiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIiBzdHJva2U9IiNmZmYiLz48cGF0aCBkPSJNMCAzMGgzMHYzMEgweiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIiBzdHJva2U9IiNmZmYiLz48cGF0aCBkPSJNMCAwaDMwdjMwSDB6IiBzdHJva2Utb3BhY2l0eT0iLjEiIHN0cm9rZT0iI2ZmZiIvPjwvZz48L3N2Zz4=')]" style={{ opacity: 0.03 }}></div>
      
      {/* Navigation Bar */}
      <Navbar />
      
      {/* Splash Cursor Effect */}
      <SplashCursor />
      
      {/* Main Content with Breadcrumbs */}
      <div className="flex-1 relative z-10">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 pt-4">
          <Breadcrumb />
        </div>
        {children}
      </div>
      
      {/* Glow effects */}
      <div className="absolute top-1/4 -right-20 w-64 h-64 bg-accent rounded-full opacity-10 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-accent rounded-full opacity-10 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
    </div>
  );
} 