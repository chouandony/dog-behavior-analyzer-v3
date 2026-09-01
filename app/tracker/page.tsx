'use client'

import { useState, useEffect, useMemo } from 'react'
import { Plus, Trash2, AlertCircle, Filter } from 'lucide-react'
import { behaviors } from '@/data/behaviors'
import ProgressChart from '@/components/ProgressChart'
import BorderCollieSVG from '@/components/BorderCollieSVG'

interface Record {
  id: string
  behaviorId: string
  behaviorName: string
  date: string
  count: number
  intensity: number
  recovery: number
  note: string
}

function getTodayString() {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const STORAGE_KEY = 'dog-behavior-tracker-v2'

export default function TrackerPage() {
  const [records, setRecords] = useState<Record[]>([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    behaviorId: 'barking',
    customName: '',
    date: getTodayString(),
    count: 1,
    intensity: 3,
    recovery: 5,
    note: ''
  })
  const [error, setError] = useState('')
  const [activeFilter, setActiveFilter] = useState<string>('all')

  useEffect(() => {
    const savedV2 = localStorage.getItem(STORAGE_KEY)
    if (savedV2) {
      try {
        setRecords(JSON.parse(savedV2))
        return
      } catch { /* ignore */ }
    }
    const savedV1 = localStorage.getItem('dog-behavior-tracker')
    if (savedV1) {
      try {
        const oldRecords = JSON.parse(savedV1)
        const migrated = oldRecords.map((r: any) => ({
          ...r,
          behaviorId: r.behaviorId || 'uncategorized',
          behaviorName: r.behaviorName || '未分類',
        }))
        setRecords(migrated)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated))
      } catch { /* ignore */ }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
  }, [records])

  const isCustom = form.behaviorId === 'custom'
  const currentBehaviorName = isCustom
    ? (form.customName.trim() || '自訂行為')
    : (behaviors.find(b => b.id === form.behaviorId)?.name || '未分類')

  const addRecord = () => {
    setError('')
    if (!form.date) {
      setError('請選擇日期')
      return
    }
    if (form.count < 0) {
      setError('發生次數不能為負數')
      return
    }
    if (isCustom && !form.customName.trim()) {
      setError('請輸入自訂行為名稱')
      return
    }
    const newRecord: Record = {
      id: Date.now().toString(),
      behaviorId: form.behaviorId,
      behaviorName: currentBehaviorName,
      date: form.date,
      count: Number(form.count),
      intensity: Number(form.intensity),
      recovery: Number(form.recovery),
      note: form.note,
    }
    setRecords(prev => [...prev, newRecord])
    setForm({ behaviorId: 'barking', customName: '', date: getTodayString(), count: 1, intensity: 3, recovery: 5, note: '' })
    setShowForm(false)
    setError('')
  }

  const deleteRecord = (id: string) => {
    setRecords(prev => prev.filter(r => r.id !== id))
  }

  const allBehaviorIds = useMemo(() => {
    const ids = new Set(records.map(r => r.behaviorId))
    return Array.from(ids)
  }, [records])

  const filteredRecords = useMemo(() => {
    if (activeFilter === 'all') return records
    return records.filter(r => r.behaviorId === activeFilter)
  }, [records, activeFilter])

  const sortedRecords = useMemo(() => {
    return [...filteredRecords].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [filteredRecords])

  const stats = useMemo(() => {
    if (filteredRecords.length === 0) return null
    const avgIntensity = filteredRecords.reduce((a, b) => a + b.intensity, 0) / filteredRecords.length
    const avgRecovery = filteredRecords.reduce((a, b) => a + b.recovery, 0) / filteredRecords.length
    const totalCount = filteredRecords.reduce((a, b) => a + b.count, 0)
    return { avgIntensity: avgIntensity.toFixed(1), avgRecovery: avgRecovery.toFixed(1), totalCount }
  }, [filteredRecords])

  const chartTitle = useMemo(() => {
    if (activeFilter === 'all') return '全部趨勢'
    const found = behaviors.find(b => b.id === activeFilter)
    if (found) return `${found.emoji} ${found.name} 趨勢`
    const custom = records.find(r => r.behaviorId === activeFilter)
    return custom ? `${custom.behaviorName} 趨勢` : '趨勢'
  }, [activeFilter, records])

  const getBehaviorDisplay = (id: string, name: string) => {
    const preset = behaviors.find(b => b.id === id)
    if (preset) return { emoji: preset.emoji, name: preset.name }
    return { emoji: '📝', name: name || '自訂' }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BorderCollieSVG size={48} pose="standing" />
        <div>
          <h1 className="text-xl font-bold text-earth-500">進度追蹤</h1>
          <p className="text-sm text-earth-400 mt-1">記錄每日數據，觀察行為改善趨勢</p>
        </div>
      </div>

      {records.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeFilter === 'all'
                ? 'bg-warm-500 text-white'
                : 'bg-white border border-earth-200 text-earth-500 hover:border-warm-300'
            }`}
          >
            全部
          </button>
          {behaviors.map(b => (
            <button
              key={b.id}
              onClick={() => setActiveFilter(b.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeFilter === b.id
                  ? 'bg-warm-500 text-white'
                  : 'bg-white border border-earth-200 text-earth-500 hover:border-warm-300'
              }`}
            >
              {b.emoji} {b.name}
            </button>
          ))}
          {allBehaviorIds.filter(id => !behaviors.some(b => b.id === id) && id !== 'uncategorized').map(id => {
            const name = records.find(r => r.behaviorId === id)?.behaviorName || '自訂'
            return (
              <button
                key={id}
                onClick={() => setActiveFilter(id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeFilter === id
                    ? 'bg-warm-500 text-white'
                    : 'bg-white border border-earth-200 text-earth-500 hover:border-warm-300'
                }`}
              >
                📝 {name}
              </button>
            )
          })}
          {allBehaviorIds.includes('uncategorized') && (
            <button
              onClick={() => setActiveFilter('uncategorized')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeFilter === 'uncategorized'
                  ? 'bg-warm-500 text-white'
                  : 'bg-white border border-earth-200 text-earth-500 hover:border-warm-300'
              }`}
            >
              ❓ 未分類
            </button>
          )}
        </div>
      )}

      {stats && (
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl border border-earth-200 p-3 text-center">
            <p className="text-xs text-earth-400">總次數</p>
            <p className="text-xl font-bold text-warm-600">{stats.totalCount}</p>
          </div>
          <div className="bg-white rounded-xl border border-earth-200 p-3 text-center">
            <p className="text-xs text-earth-400">平均強度</p>
            <p className="text-xl font-bold text-red-500">{stats.avgIntensity}</p>
          </div>
          <div className="bg-white rounded-xl border border-earth-200 p-3 text-center">
            <p className="text-xs text-earth-400">平均恢復(分)</p>
            <p className="text-xl font-bold text-forest-600">{stats.avgRecovery}</p>
          </div>
        </div>
      )}

      <ProgressChart records={filteredRecords} title={chartTitle} />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-earth-500 flex items-center gap-2">
            <Filter size={16} className="text-earth-400" />
            記錄列表
            {activeFilter !== 'all' && (
              <span className="text-xs font-normal text-earth-400">
                ({filteredRecords.length} 筆)
              </span>
            )}
          </h2>
          <button
            onClick={() => { setShowForm(!showForm); setError('') }}
            className="flex items-center gap-1 text-sm bg-warm-500 hover:bg-warm-600 text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            <Plus size={16} />
            新增
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl border border-earth-200 p-4 space-y-3">
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <div>
              <label className="text-xs text-earth-400 block mb-1.5">追蹤項目 <span className="text-red-500">*</span></label>
              <select
                value={form.behaviorId}
                onChange={e => setForm({ ...form, behaviorId: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-earth-200 text-sm focus:outline-none focus:border-warm-400 bg-white"
              >
                {behaviors.map(b => (
                  <option key={b.id} value={b.id}>{b.emoji} {b.name}</option>
                ))}
                <option value="custom">✏️ 其他（自訂）</option>
              </select>
            </div>

            {isCustom && (
              <div>
                <label className="text-xs text-earth-400 block mb-1">自訂名稱 <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={form.customName}
                  onChange={e => setForm({ ...form, customName: e.target.value })}
                  placeholder="例如：追貓、對吸塵器反應..."
                  className="w-full px-3 py-2 rounded-lg border border-earth-200 text-sm focus:outline-none focus:border-warm-400"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-earth-400 block mb-1">日期 <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-earth-200 text-sm focus:outline-none focus:border-warm-400"
                />
              </div>
              <div>
                <label className="text-xs text-earth-400 block mb-1">發生次數</label>
                <input
                  type="number"
                  min={0}
                  value={form.count}
                  onChange={e => setForm({ ...form, count: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border border-earth-200 text-sm focus:outline-none focus:border-warm-400"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-earth-400 block mb-1">強度 (1-5)</label>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={form.intensity}
                  onChange={e => setForm({ ...form, intensity: Number(e.target.value) })}
                  className="w-full accent-warm-500"
                />
                <div className="text-center text-sm font-medium text-earth-500">{form.intensity}</div>
              </div>
              <div>
                <label className="text-xs text-earth-400 block mb-1">恢復時間(分鐘)</label>
                <input
                  type="number"
                  min={0}
                  value={form.recovery}
                  onChange={e => setForm({ ...form, recovery: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border border-earth-200 text-sm focus:outline-none focus:border-warm-400"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-earth-400 block mb-1">備註（選填）</label>
              <input
                type="text"
                value={form.note}
                onChange={e => setForm({ ...form, note: e.target.value })}
                placeholder="例如：遇到大型犬、下雨天人少..."
                className="w-full px-3 py-2 rounded-lg border border-earth-200 text-sm focus:outline-none focus:border-warm-400"
              />
            </div>
            <button
              onClick={addRecord}
              className="w-full bg-forest-500 hover:bg-forest-600 text-white font-bold py-2.5 rounded-lg transition-colors"
            >
              儲存記錄
            </button>
          </div>
        )}

        <div className="space-y-2">
          {sortedRecords.length === 0 && (
            <div className="bg-white rounded-xl border border-earth-200 p-8 text-center">
              <div className="flex justify-center mb-3 opacity-50">
                <BorderCollieSVG size={80} pose="sleeping" />
              </div>
              <p className="text-earth-400">
                {activeFilter === 'all' ? '尚無記錄' : '此項目尚無記錄'}
              </p>
            </div>
          )}
          {sortedRecords.map(r => {
            const display = getBehaviorDisplay(r.behaviorId, r.behaviorName)
            return (
              <div key={r.id} className="bg-white rounded-xl border border-earth-200 p-3 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm">{display.emoji}</span>
                    <span className="text-sm font-medium text-earth-500">{display.name}</span>
                    <span className="text-xs text-earth-400">{r.date}</span>
                  </div>
                  <p className="text-xs text-earth-400 truncate">
                    次數: {r.count} | 強度: {r.intensity} | 恢復: {r.recovery}分
                    {r.note && ` | ${r.note}`}
                  </p>
                </div>
                <button onClick={() => deleteRecord(r.id)} className="p-2 text-earth-300 hover:text-red-500 transition-colors shrink-0">
                  <Trash2 size={16} />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
