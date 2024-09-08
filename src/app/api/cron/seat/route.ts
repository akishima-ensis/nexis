import { NextResponse, NextRequest } from 'next/server';

export const POST = async(req: NextResponse) => {
    return NextResponse.json({ method: 'POST' });
}