export function parseNumber(value: unknown, fallback: number): number {
    const parsed = Number(value);
    return isNaN(parsed) ? fallback : parsed;
}
