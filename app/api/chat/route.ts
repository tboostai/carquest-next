import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { action, message, sessionId } = body;

  try {
    if (action === 'create-session') {
      const response = await fetch('https://api.tboostai.com/chat/create-chat-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.text();
      return NextResponse.json({ sessionId: data });
    } 
    else if (action === 'send-message') {
      const response = await fetch('https://api.tboostai.com/chat/submit-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          message
        })
      });
      const data = await response.json();
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}