const ALLOWED_EXTERNAL_HOSTS: ReadonlySet<string> = new Set([
    'forms.gle',
    'docs.google.com',
    'wa.me',
    'api.whatsapp.com',
    'todosparauno.org',
    'www.todosparauno.org',
    'fundacionflag.org',
    'www.fundacionflag.org',
    'instagram.com',
    'www.instagram.com',
    'facebook.com',
    'www.facebook.com',
    'linkedin.com',
    'www.linkedin.com',
    'youtube.com',
    'www.youtube.com',
]);

export function getSafeExternalUrl(rawUrl: string): string {
    if (rawUrl.startsWith('mailto:contacto@fundacionflag.org')) {
        return rawUrl;
    }
    try {
        const parsed = new URL(rawUrl);
        if (parsed.protocol !== 'https:') return '#';
        if (!ALLOWED_EXTERNAL_HOSTS.has(parsed.hostname)) return '#';
        return parsed.toString();
    } catch {
        return '#';
    }
}

export function buildSafeWhatsAppUrl(phone: string, message: string): string {
    const cleanPhone = phone.replace(/[^\d]/g, '');
    const encodedMsg = encodeURIComponent(message.trim());
    return getSafeExternalUrl(`https://wa.me/${cleanPhone}?text=${encodedMsg}`);
}