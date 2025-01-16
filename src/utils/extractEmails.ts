export const extractCCEmails = (input: string): string[] => {
	const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

	const emails = (input.match(emailRegex) || []).filter(
		(email, index, self) =>
			self.indexOf(email) === index && email.length > 5 && email.includes('@')
	);

	return emails;
};

export const extractToEmails = (input: string): string[] => {
	const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

	const emails = (input.match(emailRegex) || []).filter(
		(email, index, self) =>
			self.indexOf(email) === index && email.length > 5 && email.includes('@')
	);

	return emails;
};
