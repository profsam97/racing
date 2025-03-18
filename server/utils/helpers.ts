const quotes: string[] = [
    "In three words I can sum up everything I have learned about life: it goes on. It reminds us to keep moving, even when it's hard.",
    "The only way to do great work is to love what you do. Don't settle until you find it. You'll know when you do.",
    "The best and most beautiful things must be felt with the heart. True beauty is within emotions and connections.",
    "Life is what happens when you're busy making other plans. Appreciate the spontaneity of the present.",
    "You only live once, but if you do it right, once is enough. Make the most of your time and pursue your passions.",
    "Do not go where the path may lead, instead leave a trail. Challenge the status quo and forge your own unique path.",
];

export const generateQuote = (): string => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}