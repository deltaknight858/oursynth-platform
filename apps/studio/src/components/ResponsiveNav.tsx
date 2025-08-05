'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled, { css } from 'styled-components';
import Logo from './Logo';

// SVG Icons
const StorefrontIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2L3 6v14c0 1.1.9 2 2 2h14c0-1.1-.9-2-2-2V6l-3-4H6z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);

const GridViewIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
  </svg>
);

const AppsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
  </svg>
);

const StyledNav = styled.nav`
  background: var(--glass-background);
  backdrop-filter: var(--glass-backdrop-filter);
  border-bottom: var(--glass-border);
  padding: var(--spacing-sm) var(--spacing-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: var(--shadow-medium);
  transition: background-color var(--transition-normal);

  &:hover {
    background: var(--glass-background-light);
  }
`;

const NavList = styled.div<{ $isMobile?: boolean }>`
  display: flex;
  gap: var(--spacing-md);
  align-items: center;

  ${props => props.$isMobile && css`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--glass-background);
    backdrop-filter: var(--glass-backdrop-filter-strong);
    padding: var(--spacing-sm);
    justify-content: space-around;
    border-top: var(--glass-border);
    box-shadow: var(--shadow-strong);
  `}
`;

const StyledLink = styled(Link)<{ $active?: boolean }>`
  color: ${props => props.$active ? 'var(--accent-color)' : 'var(--text-secondary)'};
  text-decoration: none;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--glass-border-radius);
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-weight: ${props => props.$active ? 600 : 400};

  &:hover {
    background: var(--glass-background-light);
    color: var(--text-primary);
    box-shadow: var(--shadow-glow);
  }

  svg {
    width: 20px;
    height: 20px;
    transition: transform var(--transition-fast);
  }

  &:hover svg {
    transform: scale(1.1);
  }

  /* Special styles for logo */
  &.logo {
    padding: var(--spacing-xs);
    
    &:hover {
      background: transparent;
      box-shadow: var(--shadow-glow-strong);
    }
  }
`;

// Custom hook to mimic useMediaQuery
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

export default function ResponsiveNav() {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const pathname = usePathname();

  const isActiveLink = (href: string) => pathname === href;

  // Navigation links data
  const links = [
    { title: 'Marketplace', href: '/marketplace', icon: <StorefrontIcon /> },
    { title: 'Templates', href: '/templates', icon: <GridViewIcon /> },
    { title: 'My Apps', href: '/apps', icon: <AppsIcon /> },
  ];

  const navigationLinks = links.map(link => (
    <StyledLink key={link.href} href={link.href} $active={isActiveLink(link.href)} title={link.title}>
      {link.icon}
      {!isMobile && <span>{link.title}</span>}
    </StyledLink>
  ));

  return (
    <StyledNav>
      <StyledLink href="/" $active={pathname === '/'} className="logo">
        <Logo />
      </StyledLink>
      <NavList $isMobile={isMobile}>
        {navigationLinks}
      </NavList>
    </StyledNav>
  );
}
