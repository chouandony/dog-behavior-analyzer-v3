'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, BookOpen, BarChart3, ClipboardList } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: '首頁', icon: Home },
  { href: '/questionnaire/', label: '評估', icon: ClipboardList },
  { href: '/abc/', label: '分析', icon: Search },
  { href: '/techniques/', label: '技術', icon: BookOpen },
  { href: '/tracker/', label: '追蹤', icon: BarChart3 },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-earth-200">
      <div className="max-w-2xl mx-auto px-2">
        <div className="flex justify-around py-2">
          {navItems.map(item => {
            const isActive = pathname === item.href || pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors',
                  isActive ? 'text-warm-600' : 'text-earth-400 hover:text-earth-500'
                )}
              >
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
