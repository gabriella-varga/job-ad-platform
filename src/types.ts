export type UserType = 'employer' | 'applicant';

export interface User {
  id: string;
  username: string;
  type: UserType
  email: string;
  password: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  tags: string[];
  created: number;
  salary: {
    amount: number;
    currency: string;
  };
  employerId: string;
}
