'use client'

import { useEffect } from 'react'

/**
 * 量測底部導覽列（#site-navbar）與免責聲明（#site-disclaimer）的實際高度，
 * 寫入 CSS 變數 --navbar-height / --disclaimer-height。
 * 所有 fixed 底部元素用 calc() 動態避開，任何螢幕寬度、字體載入、安全區都不會有縫隙或遮蔽。
 */
export default function DisclaimerMeasure() {
  useEffect(() => {
    const navbar = document.getElementById('site-navbar')
    const disclaimer = document.getElementById('site-disclaimer')
    if (!navbar || !disclaimer) return

    const update = () => {
      document.documentElement.style.setProperty('--navbar-height', `${navbar.offsetHeight}px`)
      document.documentElement.style.setProperty('--disclaimer-height', `${disclaimer.offsetHeight}px`)
    }

    update()

    const ro = new ResizeObserver(update)
    ro.observe(navbar)
    ro.observe(disclaimer)
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [])

  return null
}