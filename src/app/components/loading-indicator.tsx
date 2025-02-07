"use client"
import React from 'react';

export function LoadingIndicator() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="text-green-500 text-2xl font-bold">Loading...</div>
    </div>
  )
}
