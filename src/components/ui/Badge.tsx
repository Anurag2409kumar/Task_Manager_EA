import React from 'react';

type BadgeVariant =
  | 'pending' | 'in_progress' | 'completed'
  | 'low' | 'medium' | 'high'
  | 'admin' | 'member'
  | 'overdue' | 'active' | 'archived' | 'default';

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  pending:    { background: "#fff7ed", color: "#c2410c", border: "1px solid #fed7aa" },
  in_progress:{ background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe" },
  completed:  { background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" },
  low:        { background: "#f8fafc", color: "#475569", border: "1px solid #e2e8f0" },
  medium:     { background: "#fff7ed", color: "#c2410c", border: "1px solid #fed7aa" },
  high:       { background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" },
  admin:      { background: "#faf5ff", color: "#7e22ce", border: "1px solid #e9d5ff" },
  member:     { background: "#ecfeff", color: "#0e7490", border: "1px solid #a5f3fc" },
  overdue:    { background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" },
  active:     { background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" },
  archived:   { background: "#f8fafc", color: "#64748b", border: "1px solid #e2e8f0" },
  default:    { background: "#f8fafc", color: "#475569", border: "1px solid #e2e8f0" },
};

const Badge: React.FC<BadgeProps> = ({ variant, children }) => {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "3px 9px", borderRadius: "999px",
      fontSize: "11px", fontWeight: 700,
      textTransform: "capitalize", whiteSpace: "nowrap",
      ...variantStyles[variant]
    }}>
      {children}
    </span>
  );
};

export default Badge;
