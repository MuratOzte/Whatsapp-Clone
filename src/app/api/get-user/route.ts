import { MongoClient } from 'mongodb';

export async function POST(req: Request) {
    let client;
    try {
        client = await MongoClient.connect(process.env.MONGODB_URI!);

        const data = await req.json();
        const db = client.db('wp-clone');

        const isUserExist = await db
            .collection('users')
            .findOne({ email: data.email, password: data.password });

        if (!isUserExist) {
            return new Response('User does not exist', { status: 400 });
        }

        return new Response('User found!', { status: 201 });
    } catch (e: any) {
        console.log(e);

        return new Response('An error occurred', {
            status: 500,
        });
    }
}
