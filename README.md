# JobBoard Application README

## Overview

This repository contains the source code for the JobBoard application. JobBoard is a platform designed to help users find job listings and post job offers. This README provides information on mock data, login credentials, and engineering decisions made during development.

## Mock Data

Mock data is used to simulate interactions with the application and ensure that features work as expected without requiring a live backend.

### Job Listings

The mock data for job listings includes the following fields:
- **id**: Unique identifier for the job.
- **title**: Job title.
- **description**: Detailed job description.
- **salary**: Object containing `amount` and `currency`.
- **tags**: Array of tags associated with the job (e.g., ['Angular', 'Java']).

Example:
```json
  {
    "id": "job_1",
    "title": "Frontend Developer",
    "description": "We are looking for a skilled Frontend Developer with experience in Vue.js.",
    "tags": ["Vue.js", "JavaScript", "HTML", "CSS"],
    "created": 1694073600000,
    "salary": {
      "amount": 60000,
      "currency": "USD"
    },
    "employerId": "user_1"
  }
```
## User Data
Mock user data is used to simulate authentication and authorization, example:

```json
  {
      "id": "user_1",
      "username": "employer1",
      "type": "employer",
      "email": "employer1@example.com",
      "password": "password123"
  }
```

## State Management
Vuex: Used for global state management. The store includes modules for authentication, job listings, and user data.

## Routing
Vue Router: Configured to handle different views and authentication routes.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## Deployed Application

You can access the deployed version of the JobBoard application at the following link:

[JobBoard Application](https://job-advertisement-platform-1.onrender.com)