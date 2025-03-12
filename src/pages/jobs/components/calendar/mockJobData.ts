
// Mock job events for the calendar
export const mockJobEvents = [
  { date: new Date(2023, 7, 12), count: 3 },
  { date: new Date(2023, 7, 15), count: 1 },
  { date: new Date(2023, 7, 20), count: 2 },
  { date: new Date(2023, 7, 22), count: 4 },
  { date: new Date(2023, 7, 28), count: 2 },
];

// Today and the next 2 days always have some jobs for demo purposes
const today = new Date();
mockJobEvents.push({ date: today, count: 3 });
mockJobEvents.push({ date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1), count: 2 });
mockJobEvents.push({ date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2), count: 1 });

export function getMockJobDetailsForDate(date: Date, count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Job #${i + 1} on ${date.toLocaleDateString()}`,
    time: `${9 + i}:00 ${i < 3 ? 'AM' : 'PM'}`,
    client: `Client ${String.fromCharCode(65 + i)}`,
    status: i % 3 === 0 ? "scheduled" : i % 3 === 1 ? "in-progress" : "pending",
    location: `${i + 1}23 Main St, City ${i+1}`,
    vehicle: `Truck ${101 + i}`
  }));
}
