'use client'

import React, { useState } from 'react'
import { 
  Download, 
  Lock, 
  Shield, 
  Cpu, 
  Zap, 
  Package,
  Loader2
} from 'lucide-react'

interface SoftwareGridProps {
  isAuthenticated: boolean
  onAuthRequired: () => void
}

interface SoftwareItem {
  id: string
  name: string
  version: string
  category: string
  tags: string[]
  description: string
  isDownloading?: boolean
  downloadProgress?: number
}

export function SoftwareGrid({ isAuthenticated, onAuthRequired }: SoftwareGridProps) {
  const [softwareList, setSoftwareList] = useState<SoftwareItem[]>([
    {
      id: '1',
      name: 'Cyber Kernel',
      version: 'v2.4.1',
      category: 'System',
      tags: ['Kernel', 'Injector'],
      description: 'Advanced system kernel injection tool',
      isDownloading: false,
      downloadProgress: 0
    },
    {
      id: '2',
      name: 'Quantum Injector',
      version: 'v1.8.0',
      category: 'Tools',
      tags: ['Injector', 'Quantum'],
      description: 'Quantum-level process injection framework',
      isDownloading: false,
      downloadProgress: 0
    },
    {
      id: '3',
      name: 'Neural Shield',
      version: 'v3.2.0',
      category: 'Security',
      tags: ['Shield', 'AI'],
      description: 'AI-powered security protection system',
      isDownloading: false,
      downloadProgress: 0
    },
    {
      id: '4',
      name: 'Matrix Loader',
      version: 'v4.1.2',
      category: 'Loader',
      tags: ['Loader', 'Matrix'],
      description: 'Advanced matrix-based application loader',
      isDownloading: false,
      downloadProgress: 0
    },
    {
      id: '5',
      name: 'Cyber Package',
      version: 'v1.5.3',
      category: 'Package',
      tags: ['Package', 'Bundle'],
      description: 'Complete cyber security package bundle',
      isDownloading: false,
      downloadProgress: 0
    },
    {
      id: '6',
      name: 'Turbo CPU',
      version: 'v2.0.1',
      category: 'Performance',
      tags: ['CPU', 'Turbo'],
      description: 'High-performance CPU optimization tool',
      isDownloading: false,
      downloadProgress: 0
    }
  ])

  const handleDownload = (id: string) => {
    if (!isAuthenticated) {
      onAuthRequired()
      return
    }

    setSoftwareList(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, isDownloading: true, downloadProgress: 0 }
      }
      return item
    }))

    // Simulate download progress
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        
        setTimeout(() => {
          setSoftwareList(prev => prev.map(item => {
            if (item.id === id) {
              return { ...item, isDownloading: false, downloadProgress: 0 }
            }
            return item
          }))
        }, 1000)
      }
      
      setSoftwareList(prev => prev.map(item => {
        if (item.id === id) {
          return { ...item, downloadProgress: progress }
        }
        return item
      }))
    }, 500)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'System': return <Cpu className="w-4 h-4" />
      case 'Security': return <Shield className="w-4 h-4" />
      case 'Tools': return <Zap className="w-4 h-4" />
      default: return <Package className="w-4 h-4" />
    }
  }

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Kernel': return 'text-cyber-blue border-cyber-blue'
      case 'Injector': return 'text-cyber-purple border-cyber-purple'
      case 'Shield': return 'text-cyber-green border-cyber-green'
      case 'AI': return 'text-yellow-400 border-yellow-400'
      default: return 'text-gray-400 border-gray-400'
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {softwareList.map((software) => (
        <div
          key={software.id}
          className="glass-card p-6 hover:scale-105 transition-all duration-300"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 glass rounded-lg">
                {getCategoryIcon(software.category)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{software.name}</h3>
                <p className="text-sm text-gray-400">{software.version}</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Lock className="w-4 h-4 text-cyber-green" />
              <span className="text-xs text-cyber-green">Secure</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {software.tags.map((tag, index) => (
              <span
                key={index}
                className={`px-2 py-1 text-xs border rounded-full ${getTagColor(tag)}`}
              >
                [{tag}]
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-6">
            {software.description}
          </p>

          {/* Download Section */}
          {software.isDownloading ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-cyber-blue" />
                  <span className="text-cyber-blue">
                    {(software.downloadProgress || 0) < 50 
                      ? 'Generating Secure Token...' 
                      : 'Downloading...'}
                  </span>
                </div>
                <span className="text-white">
                  {Math.round(software.downloadProgress || 0)}%
                </span>
              </div>
              
              <div className="w-full bg-cyber-dark rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyber-blue to-cyber-purple transition-all duration-300"
                  style={{ width: `${software.downloadProgress || 0}%` }}
                />
              </div>
              
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
                <Shield className="w-3 h-3" />
                <span>Encrypted Transfer</span>
                <Lock className="w-3 h-3" />
              </div>
            </div>
          ) : (
            <button
              onClick={() => handleDownload(software.id)}
              className="w-full py-3 cyber-button rounded-lg text-white font-medium flex items-center justify-center space-x-2 hover:neon-blue"
            >
              <Download className="w-4 h-4" />
              <span>{isAuthenticated ? 'Download' : 'Login to Download'}</span>
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
