import { Message } from '@/models/Conversations';
import { MongoClient } from 'mongodb';
import { hasher } from '@/util/hasher';

export async function POST(request: Request) {
    const body: Message = await request.json();

    const messageId = hasher(body.sender, body.receiver);


    const client = await MongoClient.connect(
        process.env.DATABASE_URL as string
    );

    const db = client.db();
    const conversationsCollection = db.collection('conversations');
    const existingConversation = await conversationsCollection.findOne({
        messageId,
    });

    if (existingConversation) {
    } else {
        const newConversation = {
            messageId: messageId,
            messages: [],
        };
        await conversationsCollection.insertOne(newConversation);
    }

    return new Response(JSON.stringify(body), { status: 201 });
}

export async function PATCH(request: Request) {
    const body: Message = await request.json();

    const messageId = hasher(body.sender, body.receiver);

    const date = new Date();
    const optionsa = {
        timeZone: 'Europe/Istanbul',
        year: 'numeric' as const,
        month: '2-digit' as const,
        day: 'numeric' as const,
        hour: '2-digit' as const,
        minute: '2-digit' as const,
        second: '2-digit' as const,
    };
    const formattedDate = date.toLocaleString('tr-TR', optionsa);


    const client = await MongoClient.connect(
        process.env.DATABASE_URL as string
    );

    const db = client.db();
    const conversationsCollection = db.collection('conversations');

    const existingConversation = await conversationsCollection.findOne({
        messageId: messageId,
    });

    if (existingConversation) {
        await conversationsCollection.updateOne(
            { messageId: messageId },
            {
                $push: {
                    messages: {
                        text: body.text,
                        sender: body.sender,
                        receiver: body.receiver,
                        date: formattedDate,
                    },
                },
            }
        );
    } else {
    }

    return new Response(JSON.stringify(body), { status: 201 });
}


