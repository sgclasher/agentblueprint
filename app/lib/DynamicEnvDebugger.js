'use client';

import React, { useState, useEffect } from 'react';
import { EnvDebugger } from './env-check';

export default function DynamicEnvDebugger() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <EnvDebugger />;
} 