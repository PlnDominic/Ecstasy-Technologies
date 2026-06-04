# Technical Specifications for Ecstasy Software Service SaaS

## System Architecture
- **Architecture Type**: Monolithic with modular components, designed for future microservices migration.
- **Components**:
  - **Frontend**: React.js SPA with Tailwind CSS for styling, hosted on Vercel.
  - **Backend**: Node.js/Express.js server with RESTful APIs and WebSocket endpoints, hosted on AWS Elastic Beanstalk.
  - **Database**: PostgreSQL with multi-tenant schema, managed via Supabase for real-time subscriptions.
  - **Authentication**: Clerk for OAuth, JWT-based sessions, and role-based access control.
  - **Storage**: Supabase for file uploads (e.g., client requirements, designs).
  - **Caching**: Redis for API response caching and session management.

## File Structure
```
/ecstasy-saas
├── /client
│   ├── /src
│   │   ├── /components    # Reusable React components
│   │   ├── /pages         # Page components (e.g., Dashboard, ProjectView)
│   │   ├── /styles       # Tailwind CSS configurations
│   │   ├── /utils        # Utility functions and API calls
│   │   └── /hooks        # Custom React hooks
├── /server
│   ├── /src
│   │   ├── /controllers  # API route handlers
│   │   ├── /models       # Database models (Sequelize)
│   │   ├── /routes       # Express routes
│   │   ├── /middleware   # Authentication, error handling
│   │   ├── /sockets      # WebSocket handlers
│   │   └── /config       # Environment variables, database config
├── /.cursor
│   └── /rules            # .mdc files for Cursor AI
├── /docs                 # Project documentation
└── /tests                # Unit and integration tests
```

## Coding Standards
- **Language**: JavaScript (ES6+) with TypeScript optional for future scalability.
- **Formatting**: Prettier with 2-space indentation, single quotes, and trailing commas.
- **Linting**: ESLint with Airbnb style guide for JavaScript/React.
- **Naming Conventions**:
  - Files: kebab-case (e.g., `project-view.js`).
  - Components: PascalCase (e.g., `ProjectView`).
  - Variables: camelCase (e.g., `projectId`).
- **Error Handling**: Use try-catch for async operations, return standardized error responses (e.g., `{ error: "Message", status: 400 }`).
- **Comments**: JSDoc for functions, inline comments for complex logic.

## API Endpoints (Sample)
- **POST /api/projects**: Create a new project (admin/developer only).
  - Request: `{ "name": "Client Website", "clientId": 123, "deadline": "2025-06-01" }`
  - Response: `{ "projectId": 456, "name": "Client Website", ... }`
- **GET /api/projects/:id**: Retrieve project details.
  - Response: `{ "projectId": 456, "tasks": [...], "status": "In Progress" }`
- **POST /api/time-logs**: Log time for a task.
  - Request: `{ "taskId": 789, "hours": 2.5, "date": "2025-04-25" }`
  - Response: `{ "logId": 101, "hours": 2.5 }`

## Database Schema (Sample)
- **Projects**: `id (PK), name, clientId (FK), deadline, status`
- **Tasks**: `id (PK), projectId (FK), assigneeId (FK), title, status`
- **TimeLogs**: `id (PK), taskId (FK), userId (FK), hours, date`
- **Users**: `id (PK), email, role (admin/developer/client), clerkId`
- **Clients**: `id (PK), name, email, projectIds`

## Cursor AI Rules
- Generate code following the above file structure and coding standards.
- Use React functional components with hooks for frontend.
- Implement RESTful APIs with Express.js, using Sequelize for database operations.
- Include error handling and input validation for all API endpoints.
- Reference the PRD for feature requirements and prioritize MVP features.
- When generating UI, use Tailwind CSS classes for styling, ensuring WCAG 2.1 compliance.
- For real-time features, use Socket.IO and test WebSocket connections.

## Dependencies
- **Frontend**: `react`, `react-dom`, `axios`, `tailwindcss`, `@clerk/clerk-react`
- **Backend**: `express`, `sequelize`, `pg`, `socket.io`, `redis`
- **Dev Tools**: `eslint`, `prettier`, `jest`, `supertest`

## References
- SaaS architecture best practices from Digiteum.
- CodeGuide’s file structure for AI coding projects (CodeGuide Twitter).