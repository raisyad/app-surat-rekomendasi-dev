"use server"

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
// Handler untuk menyimpan atau memperbarui data pengguna
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { oldEmail, email, nama, no_sk, alamat } = body;

        if (oldEmail == null || email == null) throw new Error('oldEmail or email undefined');

        const existingUserWithEmail = await prisma.user.findUnique({
            where: { email: email }
        });
        
        // Check if the email is already used by another user
        if (existingUserWithEmail && existingUserWithEmail.email !== oldEmail) {
            return NextResponse.json({ error: 'Email is already in use' }, { status: 400 });
        }

        const cek_email = await prisma.user.findUnique({
            where: { email: oldEmail }
        });

        if (!cek_email) {
            // Handle case when the user with oldEmail is not found
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const updateUser = await prisma.user.update({
            where: {
                email: oldEmail,
            },
            data: {
                email: email,
                nama: nama,
                no_sk: no_sk,
                alamat: alamat,
            },
        });

        return NextResponse.json({ key: "value" }, { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error("Error during processing request:", error);
        return NextResponse.json({ error: `Internal Server Error: ${error}` }, { status: 500 });
    }
}
