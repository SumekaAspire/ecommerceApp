import { textData } from "../constants/text";

export function getGreeting(): string{
    const hour = new Date().getHours();
    if(hour < 12) return textData.morning;
    if(hour < 16) return textData.afternoon;
    return textData.evening;
}