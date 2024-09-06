import { messagingApi } from '@line/bot-sdk';

export const generateLineBotClient = () => {
    const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
    if (channelAccessToken == null) {
        throw new Error('LINE_CHANNEL_ACCESS_TOKEN is not set');   
    }

    return new messagingApi.MessagingApiClient({channelAccessToken});
};
