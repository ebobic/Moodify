import { PLAYLIST_DESCRIPTION_TEMPLATE } from "../constants/spotify";

export const generatePlaylistDescription = (context: string, mood: string): string => {
  return PLAYLIST_DESCRIPTION_TEMPLATE
    .replace("{context}", context.toLowerCase())
    .replace("{mood}", mood.toLowerCase());
};

export const generatePlaylistName = (context: string, mood: string): string => {
  return `Moodify - ${context} (${mood})`;
};
