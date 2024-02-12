import { MongoClient } from 'mongodb';

export async function POST(req: Request) {
    let client;
    try {
        client = await MongoClient.connect(process.env.MONGODB_URI!);

        const data = await req.json();
        const db = client.db('wp-clone');

        const isUserExist = await db
            .collection('users')
            .findOne({ email: data.email });
        if (isUserExist) {
            return new Response('User already exist', { status: 400 });
        }
        const prodcutsCollection = db.collection('users');
        await prodcutsCollection.insertOne(data);
        client.close;

        return new Response('User Created', { status: 201 });
    } catch (e: any) {
        console.log(e);

        return new Response('An error occurred', {
            status: 500,
        });
    }
}
