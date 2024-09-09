import { User, Job } from '@/types';

export const users: User[] = [
  {
    id: 'user_1',
    username: 'employer1',
    type: 'employer',
    email: 'employer1@example.com',
    password: 'password123',
  },
  {
    id: 'user_2',
    username: 'employer2',
    type: 'employer',
    email: 'employer2@example.com',
    password: 'password123',
  },
  {
    id: 'user_3',
    username: 'applicant1',
    type: 'applicant',
    email: 'applicant1@example.com',
    password: 'password123',
  },
  {
    id: 'user_4',
    username: 'applicant2',
    type: 'applicant',
    email: 'applicant2@example.com',
    password: 'password123',
  },
];

export const jobs: Job[] = [
  {
    id: 'job_1',
    title: 'Frontend Developer',
    description: 'We are looking for a skilled Frontend Developer with experience in Vue.js.',
    tags: ['Vue.js', 'JavaScript', 'HTML', 'CSS'],
    created: 1694073600000,
    salary: {
      amount: 60000,
      currency: 'USD',
    },
    employerId: 'user_1',
  },
  {
    id: 'job_2',
    title: 'Backend Developer',
    description: 'Join our team as a Backend Developer working with Node.js and Express.',
    tags: ['Node.js', 'Express', 'MongoDB'],
    created: 1694150000000,
    salary: {
      amount: 70000,
      currency: 'USD',
    },
    employerId: 'user_2',
  },
  {
    id: 'job_3',
    title: 'Full Stack Developer',
    description: 'We need a Full Stack Developer experienced in both frontend and backend technologies.',
    tags: ['Vue.js', 'Node.js', 'Full Stack'],
    created: 1694226400000,
    salary: {
      amount: 80000,
      currency: 'USD',
    },
    employerId: 'user_1',
  },
];
