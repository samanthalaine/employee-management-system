export type Employee = {
  employee_id: number;
  name: string;
  age: number;
  country: string;
  position: string;
  wage: number;
};

const defaultEmployees: Employee[] = [
  { employee_id: 1, name: "Kayla Winston", age: 30, country: "USA", position: "Engineer", wage: 85000 },
  { employee_id: 2, name: "Sam Lee", age: 27, country: "Canada", position: "Designer", wage: 72000 },
];

const KEY = "mock_employees";

export function loadEmployees(): Employee[] {
  const raw = localStorage.getItem(KEY);
  if (raw) return JSON.parse(raw);
  localStorage.setItem(KEY, JSON.stringify(defaultEmployees));
  return defaultEmployees;
}

export function saveEmployees(list: Employee[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function nextId(list: Employee[]) {
  return (list.reduce((m, e) => Math.max(m, e.employee_id), 0) || 0) + 1;
}
