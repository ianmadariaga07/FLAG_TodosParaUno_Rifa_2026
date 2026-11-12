export type StarVariant = 'yellow' | 'pink' | 'jaffa' | 'blueberry';

export interface TicketPackOption {
    readonly count: number;
    readonly label: string;
    readonly tag: string;
    readonly star: StarVariant;
}

export interface PrizeItem {
    readonly id: string;
    readonly place: string;
    readonly badge: string;
    readonly title: string;
    readonly highlight: string;
    readonly description: string;
    readonly details: readonly string[];
    readonly theme: 'mariachi' | 'alexa' | 'amazon';
}

export interface OrganizerMember {
    readonly id: string;
    readonly name: string;
    readonly whatsappNumber: string;
    readonly defaultMessage: string;
}

export interface FaqItem {
    readonly question: string;
    readonly answer: string;
}

export interface LegalSection {
    readonly numeral: string;
    readonly title: string;
    readonly paragraphs: readonly string[];
}