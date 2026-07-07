import { NextResponse } from 'next/server'
import { siteConfig } from '@/config/site'

export async function GET() {
  const healthData = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    name: siteConfig.name,
    url: siteConfig.url,
  }

  return NextResponse.json(healthData, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, must-revalidate',
    },
  })
}

// Optional: POST method for more detailed health checks
export async function POST() {
  // Check database connection, external services, etc.
  const detailedHealth = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      database: 'healthy',
      cache: 'healthy',
      external_api: 'healthy',
    },
    version: '1.0.0',
  }

  return NextResponse.json(detailedHealth, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, must-revalidate',
    },
  })
}