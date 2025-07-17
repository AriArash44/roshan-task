const pad = (n: number) => n.toString().padStart(2, "0");

export function secToTime(sec: number): string {
  const totalSec = Math.floor(sec);
  const minutes = Math.floor(totalSec / 60);
  const seconds = totalSec % 60;
  return `${pad(minutes)}:${pad(seconds)}`;
}

export function emitHourMili(time: string): string {
  const parts = time.split(":");
  const minute = parseInt(parts[1]);
  const second = parseInt(parts[2]);
  return `${pad(minute)}:${pad(second)}`;
}