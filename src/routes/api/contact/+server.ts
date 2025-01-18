import { json } from '@sveltejs/kit';
import { PRIVATE_TELEGRAM_BOT_TOKEN, PRIVATE_TELEGRAM_CHAT_ID } from '$env/static/private';

const TELEGRAM_API = `https://api.telegram.org/bot${PRIVATE_TELEGRAM_BOT_TOKEN}/sendMessage`;

// Simple in-memory rate limiting
const RATE_LIMIT_WINDOW = 3600000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_WINDOW = 5; // 5 requests per hour
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const requests = requestLog.get(ip) || [];
    
    // Clean up old requests
    const recentRequests = requests.filter(time => now - time < RATE_LIMIT_WINDOW);
    
    // Check if rate limited
    if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
        return true;
    }
    
    // Update request log
    recentRequests.push(now);
    requestLog.set(ip, recentRequests);
    return false;
}

export async function POST({ request, getClientAddress }) {
    const clientIp = getClientAddress();

    // Check rate limit
    if (isRateLimited(clientIp)) {
        return json(
            { success: false, message: 'Too many requests. Please try again later.' },
            { status: 429 }
        );
    }

    try {
        const data = await request.json();
        const { name, email, phone, message, preferredTime, honeypot } = data;

        // Check honeypot field
        if (honeypot) {
            // Silently reject spam without notifying the spammer
            return json({ success: true, message: 'Message sent successfully' });
        }

        // Basic validation
        if (!name || !email || !phone || !message) {
            return json({ success: false, message: 'All fields are required' }, { status: 400 });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return json({ success: false, message: 'Invalid email format' }, { status: 400 });
        }

        // Validate phone format (basic US format)
        const phoneRegex = /^\+?[\d\s-()]{10,}$/;
        if (!phoneRegex.test(phone)) {
            return json({ success: false, message: 'Invalid phone format' }, { status: 400 });
        }

        const telegramMessage = `
🚐 New RV Viewing Request

👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone}
🕒 Preferred Time: ${preferredTime || 'Not specified'}
🌐 IP: ${clientIp}

💬 Message:
${message}

Sent from arv.sale contact form
`.trim();

        const response = await fetch(TELEGRAM_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: PRIVATE_TELEGRAM_CHAT_ID,
                text: telegramMessage,
                parse_mode: 'HTML'
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Telegram API error:', error);
            return json(
                { success: false, message: 'Failed to send message' },
                { status: 500 }
            );
        }

        return json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        return json(
            { success: false, message: 'Failed to process request' },
            { status: 500 }
        );
    }
}