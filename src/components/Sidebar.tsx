'use client'

import React from 'react'
import { 
  Home, 
  Newspaper, 
  User, 
  LogOut, 
  MessageCircle, 
  Youtube, 
  Send 
} from 'lucide-react'

interface SidebarProps {
  isAuthenticated: boolean
  onLogout: () => void
}

export function Sidebar({ isAuthenticated, onLogout }: SidebarProps) {
  const [activeTab, setActiveTab] = useState('library')

  return (
    <div className="w-80 glass-dark border-r border-glass-border flex flex-col">
      {/* Social Icons */}
      <div className="p-6 border-b border-glass-border">
        <div className="flex justify-center space-x-4">
          <div className="p-3 glass rounded-full hover:glass-hover transition-all cursor-pointer group">
            <MessageCircle className="w-5 h-5 text-cyber-blue group-hover:text-white" />
          </div>
          <div className="p-3 glass rounded-full hover:glass-hover transition-all cursor-pointer group">
            <Youtube className="w-5 h-5 text-red-500 group-hover:text-white" />
          </div>
          <div className="p-3 glass rounded-full hover:glass-hover transition-all cursor-pointer group">
            <Send className="w-5 h-5 text-cyber-blue group-hover:text-white" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <button
            onClick={() => setActiveTab('library')}
            className={`w-full p-4 rounded-lg transition-all flex items-center space-x-3 ${
              activeTab === 'library' 
                ? 'glass-hover neon-red border border-red-500/30' 
                : 'glass hover:glass-hover'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Library</span>
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`w-full p-4 rounded-lg transition-all flex items-center space-x-3 ${
              activeTab === 'news' 
                ? 'glass-hover neon-blue border border-cyber-blue/30' 
                : 'glass hover:glass-hover'
            }`}
          >
            <Newspaper className="w-5 h-5" />
            <span className="font-medium">News</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full p-4 rounded-lg transition-all flex items-center space-x-3 ${
              activeTab === 'profile' 
                ? 'glass-hover neon-purple border border-cyber-purple/30' 
                : 'glass hover:glass-hover'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="font-medium">Profile</span>
          </button>
        </div>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-glass-border">
        {isAuthenticated ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyber-blue to-cyber-purple p-0.5">
                <div className="w-full h-full rounded-full bg-cyber-black flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">Cyber User</p>
                <p className="text-gray-400 text-sm">Premium Access</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="w-full p-3 glass hover:glass-hover rounded-lg flex items-center justify-center space-x-2 text-red-400 hover:text-red-300 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Guest User</p>
            <p className="text-xs mt-1">Login to access all features</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Add useState import
import { useState } from 'react'
