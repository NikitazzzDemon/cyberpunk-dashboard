'use client'

import React, { useState } from 'react'
import { X, Send, Lock, User, Shield, Check } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [step, setStep] = useState(1)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) return null

  const handleTelegramLogin = () => {
    setIsLoading(true)
    // Simulate Telegram OAuth
    setTimeout(() => {
      setIsLoading(false)
      setStep(2)
    }, 2000)
  }

  const handleBindAccount = () => {
    setIsLoading(true)
    // Simulate account binding
    setTimeout(() => {
      setIsLoading(false)
      onSuccess()
    }, 1500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md glass-card p-8 animate-float">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 glass rounded-full hover:glass-hover transition-all"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 glass rounded-full mb-4">
            <Shield className="w-6 h-6 text-cyber-blue" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 neon-blue">
            Secure Authentication
          </h2>
          <p className="text-gray-400 text-sm">
            Connect safely with blockchain verification
          </p>
        </div>

        {/* Step 1: Telegram Login */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-300 mb-6">
                Authenticate with your Telegram account for secure access
              </p>
              
              <button
                onClick={handleTelegramLogin}
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-cyber-blue to-blue-600 rounded-lg font-medium text-white flex items-center justify-center space-x-3 hover:shadow-lg hover:shadow-cyber-blue/50 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Connecting to Telegram...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Login with Telegram</span>
                  </>
                )}
              </button>
            </div>

            {/* Security Features */}
            <div className="space-y-3 pt-4 border-t border-glass-border">
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <Lock className="w-4 h-4 text-cyber-green" />
                <span>End-to-end encryption</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <Shield className="w-4 h-4 text-cyber-blue" />
                <span>Multi-factor authentication</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <Check className="w-4 h-4 text-cyber-green" />
                <span>Blockchain verified</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Bind Account */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Connection Line */}
            <div className="relative">
              <div className="absolute left-1/2 top-0 w-0.5 h-8 bg-gradient-to-b from-cyber-blue to-transparent transform -translate-x-1/2" />
              <div className="flex justify-center mt-2">
                <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse" />
              </div>
            </div>

            <div className="text-center">
              <p className="text-cyber-blue text-sm font-medium mb-2">
                Telegram Connected Successfully
              </p>
              <p className="text-gray-400 text-sm">
                Create your secure account credentials
              </p>
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Create Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 cyber-input rounded-lg text-white placeholder-gray-400"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 cyber-input rounded-lg text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Bind Account Button */}
            <button
              onClick={handleBindAccount}
              disabled={!username || !password || isLoading}
              className="w-full py-3 bg-gradient-to-r from-neon-red to-red-600 rounded-lg font-medium text-white flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-red-500/50 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Binding Account...</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  <span>Bind Account</span>
                </>
              )}
            </button>

            {/* Security Notice */}
            <div className="text-center text-xs text-gray-500">
              <p>Your credentials are encrypted and stored securely</p>
              <p className="mt-1">2FA will be enabled automatically</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
