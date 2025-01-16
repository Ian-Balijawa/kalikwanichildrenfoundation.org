export const decodeBase64 = (encodedString: string): string | null => {
	try {
		const decoded = atob(encodedString.replace(/-/g, '+').replace(/_/g, '/'));
		return decoded;
	} catch (e) {
		console.error('Error decoding Base64:', e);
		return null;
	}
};
