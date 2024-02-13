import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prismadb';

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return new Response('Invalid request', { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword,
            },
        });
        
        return Response.json(user);
    } catch (e: any) {
        console.log(e, 'Register error');
        return new Response(e, { status: 500 });
    }
}
