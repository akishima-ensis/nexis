const getEnv = (key: string) => {
    const value = process.env[key];
    if (value == null) {
        throw new Error(`${key} is not set`);
    }
    return value;
}

export const config = {
    LINE_CHANNEL_ACCESS_TOKEN: getEnv('LINE_CHANNEL_ACCESS_TOKEN'),
    LINE_CHANNEL_SECRET: getEnv('LINE_CHANNEL_SECRET'),
} as const;
