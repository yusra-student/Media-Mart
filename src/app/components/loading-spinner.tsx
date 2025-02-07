"use client"
import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative h-32 w-32">
        {/* Simple boxes that appear and disappear */}
        <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2">
          <div className="h-full w-full animate-[appear_1s_ease-in-out_infinite] rounded border-2 border-green-500 bg-black" />
        </div>
        <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2">
          <div className="h-full w-full animate-[appear_1s_ease-in-out_0.5s_infinite] rounded border-2 border-green-500 bg-black" />
        </div>
      </div>
    </div>
  )
}
