const quotes: string[] = [
    "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.",
    
    "The most beautiful experience we can have is the mysterious. It is the fundamental emotion that stands at the cradle of true art and true science. Whoever does not know it and can no longer wonder, no longer marvel, is as good as dead, and his eyes are dimmed.",
    
    "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
    
    "Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that. We must learn to live together as brothers or perish together as fools. In the end, we will remember not the words of our enemies, but the silence of our friends.",
    
    "In the depth of winter, I finally learned that within me there lay an invincible summer. And that makes me happy. For it says that no matter how hard the world pushes against me, within me, there's something stronger – something better, pushing right back."
];

export const generateQuote = (): string => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}