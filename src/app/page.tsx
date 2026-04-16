'use client'

import React, { useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { SoftwareGrid } from '@/components/SoftwareGrid'
import { AuthModal } from '@/components/AuthModal'

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Cyberpunk Background */}
      <div className="cyber-bg" />
      
      {/* Main Layout */}
      <div className="relative z-10 flex h-screen">
        {/* Left Sidebar */}
        <Sidebar isAuthenticated={isAuthenticated} onLogout={() => setIsAuthenticated(false)} />
        
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2 neon-blue">
                Software Library
              </h1>
              <p className="text-gray-300 text-lg">
                Secure downloads with blockchain verification
              </p>
            </div>
            
            {/* Software Grid */}
            <SoftwareGrid 
              isAuthenticated={isAuthenticated}
              onAuthRequired={() => setIsAuthModalOpen(true)}
            />
          </div>
        </main>
      </div>
      
      {/* Authentication Modal */}
      {isAuthModalOpen && (
        <AuthModal 
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={() => {
            setIsAuthenticated(true)
            setIsAuthModalOpen(false)
          }}
        />
      )}
    </div>
  )
}
