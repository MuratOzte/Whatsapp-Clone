import { Message } from '@/models/Conversations';
import { MongoClient } from 'mongodb';
import { hasher } from '@/util/hasher';

export async function POST(request: Request) {
    const body: Message = await request.json();

    const messageId = hasher(body.sender, body.receiver);

    console.log(messageId);

    const client = await MongoClient.connect(
        process.env.DATABASE_URL as string
    );

    const db = client.db();
    const conversationsCollection = db.collection('conversations');
    const existingConversation = await conversationsCollection.findOne({
        messageId,
    });

    if (existingConversation) {
        console.log('Conversation already exists');
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

    console.log(formattedDate);

    const client = await MongoClient.connect(
        process.env.DATABASE_URL as string
    );

    const db = client.db();
    const conversationsCollection = db.collection('conversations');

    // Check if the conversation exists
    const existingConversation = await conversationsCollection.findOne({
        messageId: messageId, // Assuming messageId is present in the body
    });

    if (existingConversation) {
        // If conversation exists, update the messages array
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
        console.log('Message added to existing conversation');
    } else {
        console.log('Conversation not found');
    }

    return new Response(JSON.stringify(body), { status: 201 });
}
