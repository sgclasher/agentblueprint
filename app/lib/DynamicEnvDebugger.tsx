'use client';

import React, { useState, useEffect } from 'react';
import { EnvDebugger } from './EnvDebugger';

export default function DynamicEnvDebugger(): JSX.Element | null {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <EnvDebugger />;
} 