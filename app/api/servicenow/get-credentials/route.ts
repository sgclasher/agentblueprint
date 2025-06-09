import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    instanceUrl: process.env.SERVICENOW_INSTANCE_URL || '',
    scopeId: process.env.SERVICENOW_SCOPE_ID || ''
  });
} 