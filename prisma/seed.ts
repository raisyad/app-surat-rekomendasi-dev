import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const admin = await prisma.user.upsert({
        where: { email: 'admin@bpsdmjabar.go.id'},
        update: {},
        create: {
            email: '0',
            nama: 'Administrator',
            no_sk: '123',
            password: '123',
            no_telp: '0812345678',
            setuju: 'YA',
            isVerifikasi: 'terVerifikasi',
            isRole: 'ADMIN',  
        },
    });
    console.log({admin});
}

main().then(async () => {
    await prisma.$disconnect()
}). catch (async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
});
