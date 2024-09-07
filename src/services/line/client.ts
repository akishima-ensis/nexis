import { messagingApi } from '@line/bot-sdk';
import { config } from '@/services/config';

export const generateLineBotClient = () => {
    return new messagingApi.MessagingApiClient({
        channelAccessToken: config.LINE_CHANNEL_ACCESS_TOKEN,
    });
};
