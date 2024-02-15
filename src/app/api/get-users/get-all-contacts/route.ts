import prisma from '@/app/libs/prismadb';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return new Response('Invalid request', { status: 400 });
        }

        const user = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            where: {
                NOT: {
                    email: email,
                },
            },
        });

        return Response.json(user);
    } catch (e: any) {
        console.log(e, 'Register error');
        return new Response(e, { status: 500 });
    }
}
