import { NextRequest, NextResponse } from 'next/server';
import { getRepositoryStats } from '@/lib/github';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const owner = searchParams.get('owner') || 'OpenHands';
  const repo = searchParams.get('repo') || 'OpenHands';

  try {
    const stats = await getRepositoryStats(owner, repo);
    return NextResponse.json(stats);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch repository data' },
      { status: 500 }
    );
  }
}
