import dbConnect from '@/lib/db';
import Client from '@/models/Client';
import { NextResponse } from 'next/server';

export async function GET() {
    await dbConnect();
    try {
        const clients = await Client.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: clients });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(req) {
    await dbConnect();
    try {
        const body = await req.json();
        const client = await Client.create(body);
        return NextResponse.json({ success: true, data: client }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
