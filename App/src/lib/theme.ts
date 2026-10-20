/**
 * SafeRoute Mobile Design System Tokens
 * Matched 1-to-1 with the provided UI mockups:
 * - Clean sky-white backdrop: #F4F9FD
 * - Pure White Cards: #FFFFFF
 * - Primary Vibrant Blue: #007AFF & #0284C7
 * - Mint / Emerald: #10B981 & #ECFDF5
 * - Amber / Chat: #F59E0B & #FEF3C7
 * - Purple / Education: #8B5CF6 & #F3E8FF
 * - Emergency Red: #EF4444 & #FEF2F2
 * - Slate Typography: #0F172A (900/800 bold), #64748B (subtitle), #94A3B8 (muted)
 */

export const colors = {
  // Brand Blue
  primary: '#007AFF',           // Primary iOS/Design Blue
  primaryVibrant: '#0284C7',    // Vibrant Sky/Royal
  primaryDark: '#0056B3',
  primaryLight: '#EBF4FF',      // Very light blue for active tabs & badges
  primarySubtle: '#F0F7FF',
  primaryBorder: '#D0E4FF',
  primaryGlow: 'rgba(0, 122, 255, 0.25)',

  // Neutral Canvas & Surfaces
  background: '#F4F9FD',        // Exact app background from mockups
  backgroundSubtle: '#EDF5FC',
  surface: '#FFFFFF',           // Pure white cards
  surfaceBorder: '#E6EFF7',     // Ultra-subtle card border
  surfaceSubtle: '#F8FAFC',

  // Typography
  textHeading: '#0F172A',       // Slate 900
  textPrimary: '#1E293B',       // Slate 800
  textSecondary: '#64748B',     // Slate 500
  textMuted: '#94A3B8',         // Slate 400
  textLight: '#CBD5E1',         // Slate 300
  textWhite: '#FFFFFF',

  // Status & Feature Colors from Mockups
  emerald: '#10B981',
  emeraldDark: '#059669',
  emeraldLight: '#E8FBF4',
  emeraldBorder: '#A7F3D0',

  purple: '#8B5CF6',
  purpleLight: '#F3E8FF',
  purpleBorder: '#DDD6FE',

  amber: '#F59E0B',
  amberDark: '#D97706',
  amberLight: '#FEF3C7',
  amberBorder: '#FDE68A',

  danger: '#EF4444',
  dangerDark: '#DC2626',
  dangerLight: '#FEF2F2',
  dangerBorder: '#FECACA',
  dangerGlow: 'rgba(239, 68, 68, 0.3)',

  // Floating dock
  dockBg: '#FFFFFF',
  dockShadow: 'rgba(15, 23, 42, 0.08)',
};

export const radii = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 20,
  xxl: 28,
  full: 9999,
};

export const shadows = {
  subtle: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  card: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHover: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  floatingDock: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  primaryGlow: {
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  dangerGlow: {
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.32,
    shadowRadius: 16,
    elevation: 8,
  },
};
