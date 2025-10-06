export enum ThemeMode {
    LIGHT = 'light',
    DARK = 'dark'
}

export interface useThemeStoreType {
    theme: ThemeMode
    toggleTheme: () => void
}