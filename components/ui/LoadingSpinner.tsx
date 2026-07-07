interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'white' | 'gray'
  className?: string
  label?: string
}

export function LoadingSpinner({
  size = 'md',
  color = 'primary',
  className = '',
  label = 'Loading...',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
    xl: 'w-12 h-12 border-4',
  }

  const colorClasses = {
    primary: 'border-primary/30 border-t-primary',
    white: 'border-white/30 border-t-white',
    gray: 'border-gray-300 border-t-gray-600',
  }

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div
        className={`
          ${sizeClasses[size]}
          ${colorClasses[color]}
          rounded-full animate-spin
        `}
        role="status"
        aria-label={label}
      />
      {label && (
        <span className="text-sm text-gray-500">{label}</span>
      )}
    </div>
  )
}

// Full page loading spinner
export function FullPageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <LoadingSpinner size="xl" label="Loading..." />
    </div>
  )
}

// Inline loading spinner
export function InlineLoader({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="flex items-center gap-3">
      <LoadingSpinner size="sm" />
      <span className="text-sm text-gray-500">{text}</span>
    </div>
  )
}