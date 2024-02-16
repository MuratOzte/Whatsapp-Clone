import { hasher } from '@/util/hasher';
import { MongoClient } from 'mongodb';

export async function POST(request: Request) {
    const { sender, receiver } = await request.json();

    const messageId = hasher(sender, receiver);

    const client = await MongoClient.connect(
        process.env.DATABASE_URL as string
    );

    const db = client.db();
    const conversationsCollection = db.collection('conversations');

    const conversation = await conversationsCollection.findOne({
        messageId,
    });

    return new Response(JSON.stringify(conversation), { status: 200 });
}
