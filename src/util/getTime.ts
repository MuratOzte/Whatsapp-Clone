export default function getTurkeyDateTime() {
    const options = {
        timeZone: 'Europe/Istanbul',
        hour12: false,
        weekday: 'long' as const,
        year: 'numeric' as const,
        month: 'long' as const,
        day: 'numeric' as const,
        hour: '2-digit' as const,
        minute: '2-digit' as const,
        second: '2-digit' as const,
    };

    const turkeyDateTime = new Date().toLocaleString('en-US', options);
    return turkeyDateTime;
}
