import { useSelector } from "react-redux";

const ThemeButton = () => {
  const theme = useSelector((state) => state.theme.theme);
  return theme === "dark" ? "classes.DarkTheme" : "classes.LightTheme";
};

export default ThemeButton;
