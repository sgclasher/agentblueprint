import React, { ReactNode } from 'react';

interface TimelineLayoutProps {
    children: ReactNode;
}

export default function TimelineLayout({ children }: TimelineLayoutProps) {
  return <>{children}</>;
} 