export const DB_NAME = "trendwave";
export const options = {
    httpOnly: true, // Cookie cannot be accessed via client-side scripts
    secure: true, // Send cookie only over HTTPS in production
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
};
