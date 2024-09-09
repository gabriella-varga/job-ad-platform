import { Job, User } from '@/types';
import { jobs as mockJobs, users as mockUsers } from '@/mocks/mockData';

const JOBS_STORAGE_KEY = 'jobs';
const USERS_STORAGE_KEY = 'users';

export function getFromLocalStorage<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

function saveToLocalStorage<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getJobs(): Job[] {
  return getFromLocalStorage<Job[]>(JOBS_STORAGE_KEY) || [];
}

export function saveJobs(jobs: Job[]): void {
  saveToLocalStorage(JOBS_STORAGE_KEY, jobs);
}

export function getUsers(): User[] {
  return getFromLocalStorage<User[]>(USERS_STORAGE_KEY) || [];
}

export function saveUsers(users: User[]): void {
  saveToLocalStorage(USERS_STORAGE_KEY, users);
}

export function initializeMockData() {
  const existingJobs = getFromLocalStorage<Job[]>(JOBS_STORAGE_KEY);
  const existingUsers = getFromLocalStorage<User[]>(USERS_STORAGE_KEY);

  if (!existingJobs) {
    saveJobs(mockJobs);
  }

  if (!existingUsers) {
    saveUsers(mockUsers);
  }
}

export default {
  getJobs,
  saveJobs,
};
