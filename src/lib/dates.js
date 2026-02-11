export function toDateTimeLocal(value = new Date()) {
	const d = new Date(value);

	const pad = (n) => String(n).padStart(2, '0');

	return (
		d.getFullYear() +
		'-' +
		pad(d.getMonth() + 1) +
		'-' +
		pad(d.getDate()) +
		'T' +
		pad(d.getHours()) +
		':' +
		pad(d.getMinutes())
	);
}

export const DAYS_OF_WEEK = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
];

export function getDayOfWeek(date) {
	return DAYS_OF_WEEK[new Date(date).getDay()];
}

export function timeSince(date) {
	const now = new Date();
	const diffMs = now - date;

	const seconds = Math.floor(diffMs / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (days > 0) return `${days}d ago`;
	if (hours > 0) return `${hours}h ago`;
	if (minutes > 0) return `${minutes}m ago`;
	return 'just now';
}
