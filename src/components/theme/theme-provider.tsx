import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";
type ColorAccent = "blue" | "purple" | "green";

interface ThemePreferences {
	theme: Theme;
	fontSize: number;
	reducedMotion: boolean;
	colorAccent: ColorAccent;
}

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

type ThemeProviderState = {
	preferences: ThemePreferences;
	setTheme: (theme: Theme) => void;
	setFontSize: (size: number) => void;
	setReducedMotion: (reduced: boolean) => void;
	setColorAccent: (accent: ColorAccent) => void;
};

const initialPreferences: ThemePreferences = {
	theme: "system",
	fontSize: 16,
	reducedMotion: false,
	colorAccent: "blue",
};

const initialState: ThemeProviderState = {
	preferences: initialPreferences,
	setTheme: () => null,
	setFontSize: () => null,
	setReducedMotion: () => null,
	setColorAccent: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
	children,
	defaultTheme = "system",
	storageKey = "ui-theme-preferences",
	...props
}: ThemeProviderProps) {
	const [preferences, setPreferences] = useState<ThemePreferences>(() => {
		const storedPreferences = localStorage.getItem(storageKey);
		if (storedPreferences) {
			return JSON.parse(storedPreferences);
		}
		return { ...initialPreferences, theme: defaultTheme };
	});

	useEffect(() => {
		const root = window.document.documentElement;

		// Apply theme
		root.classList.remove("light", "dark");
		if (preferences.theme === "system") {
			const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
			root.classList.add(systemTheme);
		} else {
			root.classList.add(preferences.theme);
		}

		// Apply font size
		root.style.fontSize = `${preferences.fontSize}px`;

		// Apply reduced motion
		root.style.setProperty(
			"--reduce-motion",
			preferences.reducedMotion ? "reduce" : "no-preference"
		);

		// Apply color accent
		root.setAttribute("data-accent", preferences.colorAccent);

		// Save preferences
		localStorage.setItem(storageKey, JSON.stringify(preferences));
	}, [preferences, storageKey]);

	const value = {
		preferences,
		setTheme: (theme: Theme) => setPreferences((prev) => ({ ...prev, theme })),
		setFontSize: (fontSize: number) => setPreferences((prev) => ({ ...prev, fontSize })),
		setReducedMotion: (reducedMotion: boolean) =>
			setPreferences((prev) => ({ ...prev, reducedMotion })),
		setColorAccent: (colorAccent: ColorAccent) =>
			setPreferences((prev) => ({ ...prev, colorAccent })),
	};

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
	const context = useContext(ThemeProviderContext);

	if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

	return context;
};
