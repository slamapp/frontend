import { TIME_BLOCK_MINUTES } from "./constants";

export const getTimeFromIndex = (index: number) => {
  const startHours = Math.floor(index / 2)
    .toString()
    .padStart(2, "0");

  return index % 2 === 0 ? `${startHours}:00` : `${startHours}:30`;
};

export const getIndexFromDate = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return hours * 2 + (minutes === TIME_BLOCK_MINUTES ? 1 : 0);
};

export const getTimeSlotFromIndex = (index: number) =>
  `${getTimeFromIndex(index)} - ${getTimeFromIndex(index + 1)}`;
