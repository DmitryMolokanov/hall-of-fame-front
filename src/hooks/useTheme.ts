import { useThemeStore } from "@/store/ThemeStore";
import { useEffect } from "react";

const useTheme = () => {

    const { theme } = useThemeStore()

    useEffect(() => {
        const root = document.documentElement
        root.setAttribute('data-theme', theme)
    }, [theme])

    return (theme)

};

export default useTheme
