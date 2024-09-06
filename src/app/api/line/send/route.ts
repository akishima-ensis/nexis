import { NextResponse, NextRequest } from 'next/server';
import { generateLineBotClient } from '../../../../services/line';
import { type webhook, validateSignature, LINE_SIGNATURE_HTTP_HEADER_NAME } from '@line/bot-sdk';

const lineBotClient = generateLineBotClient();

export const POST = async(req: NextRequest) => {
  const body: webhook.CallbackRequest = await req.json();
  const signature = req.headers.get(LINE_SIGNATURE_HTTP_HEADER_NAME);
  const channelSecret = process.env.LINE_CHANNEL_SECRET;

  if (channelSecret == null) {
    return NextResponse.json({ method: 'POST', error: 'channelSecret is not set', staus: 500 });
  }

  if (signature == null) {
    return NextResponse.json({ method: 'POST', error: 'signature is not set', status: 400 });
  }
  
  const isValid = validateSignature(JSON.stringify(body), channelSecret, signature);
  if (!isValid) {
    return NextResponse.json({ method: 'POST', error: 'invalid signature', status: 401 });
  }  

  const events: webhook.Event[] = body.events!;

  events.forEach(async(event) => {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return;
    }

    if (event.replyToken == null) {
      return;
    }

    await lineBotClient.replyMessage({
      replyToken:event.replyToken,
      messages: [{
        type: 'text',
        text: event.message.text,
      }],
    });
  })

  return NextResponse.json({ method: 'POST' });
};
