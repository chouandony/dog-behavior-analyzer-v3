'use client'

export default function PawPrints() {
  return (
    <div className="flex gap-2 opacity-20">
      {[0, 1, 2, 3].map(i => (
        <svg key={i} width="20" height="20" viewBox="0 0 60 60" fill="none" className="animate-paw-walk" style={{ animationDelay: `${i * 0.3}s` }}>
          <ellipse cx="30" cy="35" rx="12" ry="10" fill="#8B7D6B" />
          <ellipse cx="18" cy="20" rx="5" ry="6" fill="#8B7D6B" />
          <ellipse cx="30" cy="15" rx="5" ry="6" fill="#8B7D6B" />
          <ellipse cx="42" cy="20" rx="5" ry="6" fill="#8B7D6B" />
        </svg>
      ))}
    </div>
  )
}
