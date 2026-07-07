interface IconProps {
  name: string
  className?: string
  style?: React.CSSProperties
}

export function Icon({ name, className = '', style }: IconProps) {
  return (
    <img
      src={`/icons/${name}.svg`}
      alt={name}
      className={className}
      style={style}
      width={24}
      height={24}
    />
  )
}
