import { NextResponse, NextRequest } from 'next/server';

export const POST = async(req: NextRequest) => {
    return NextResponse.json({ method: 'POST' });
}