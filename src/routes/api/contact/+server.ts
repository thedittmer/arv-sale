import { json } from '@sveltejs/kit';
import { PRIVATE_TELEGRAM_BOT_TOKEN, PRIVATE_TELEGRAM_CHAT_ID } from '$env/static/private';

const TELEGRAM_API = `https://api.telegram.org/bot${PRIVATE_TELEGRAM_BOT_TOKEN}/sendMessage`;

export async function POST({ request }) {
    try {
        const data = await request.json();
        const { name, email, phone, message, preferredTime } = data;

        if (!name || !email || !phone || !message) {
            return json({ success: false, message: 'All fields are required' }, { status: 400 });
        }

        const telegramMessage = `
🚐 New RV Viewing Request

👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone}
🕒 Preferred Time: ${preferredTime || 'Not specified'}

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