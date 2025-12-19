import dbConnect from '@/lib/db';
import Newsletter from '@/models/Newsletter';
import { NextResponse } from 'next/server';

export async function GET() {
    await dbConnect();
    try {
        const subscribers = await Newsletter.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: subscribers });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(req) {
    await dbConnect();
    try {
        const body = await req.json();
        // Check if email already exists
        const existing = await Newsletter.findOne({ email: body.email });
        if (existing) {
            return NextResponse.json({ success: false, error: 'Email already subscribed' }, { status: 400 });
        }
        const subscriber = await Newsletter.create(body);
        return NextResponse.json({ success: true, data: subscriber }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
