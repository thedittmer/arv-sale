import { json } from '@sveltejs/kit';
import { PRIVATE_EMAIL, PRIVATE_SENDGRID_API_KEY } from '$env/static/private';

export function GET() {
    return json({
        email: PRIVATE_EMAIL ? 'set' : 'missing',
        apiKey: PRIVATE_SENDGRID_API_KEY ? 'set' : 'missing'
    });
} 