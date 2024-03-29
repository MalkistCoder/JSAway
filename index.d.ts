export default ProfanityDetector {
    constructor(profanities?: Array<string>);
    
    get profanities(): Array<string>;
    set profanities(profanities: Array<string>);

    addProfanity(profanity: string): string;
    removeProfanity(profanity: string): void;

    bounds(string: string): [number, number] | null;

    extract(string: string): string | null;
    extractAll(string: string): Array<string>;

    has(string: string): boolean;

    censor(string: string, censorCharacter?: string, includeFirstLetter?: boolean, includeLastLetter?: boolean): string;
}

export default ProfanityDetector
