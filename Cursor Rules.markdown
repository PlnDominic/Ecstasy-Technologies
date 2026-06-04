# Cursor AI Rules for Ecstasy Software Service SaaS

## Overview
These rules guide Cursor AI in generating code for the Ecstasy Software Service SaaS, ensuring consistency, scalability, and alignment with project requirements. Place this file in `.cursor/rules` to provide context for AI-driven coding.

## General Guidelines
- **Context Awareness**: Always reference the PRD (`Project Requirements Document.mdc`) and Technical Specifications (`Technical Specifications.mdc`) in `.cursor/rules` for feature details and tech stack.
- **Code Quality**: Follow ESLint (Airbnb) and Prettier standards. Use TypeScript optionally for interfaces but default to JavaScript for MVP speed.
- **Modularity**: Write reusable components (React) and modular backend functions (Express.js).
- **Error Handling**: Include try-catch for async operations and return user-friendly error messages.
- **Testing**: Generate unit tests for critical functions using Jest. Include at least one test case per endpoint or component.

## Feature-Specific Rules
### Project Management
- Generate React components for project creation, task assignment, and progress visualization.
- Use Tailwind CSS for Kanban board and Gantt chart layouts.
- Implement API endpoints (`/api/projects`, `/api/tasks`) with Sequelize for CRUD operations.
- Example Prompt: "Create a React component for a Kanban board using Tailwind CSS, fetching tasks from /api/projects/:id/tasks."

### Client Portal
- Restrict client-facing components to read-only views unless explicitly allowed (e.g., comments, approvals).
- Use Clerk’s `useUser` hook for role-based rendering (client role).
- Example Prompt: "Generate a client portal page showing project status and a comment form, using Clerk for authentication."

### Time Tracking
- Create a time tracking component with start/stop buttons and a log history table.
- Implement `/api/time-logs` endpoint to store and retrieve logs, validating input (e.g., positive hours).
- Example Prompt: "Build a time tracking component with a timer and log submission form, integrated with /api/time-logs."

### Code Integration
- Use GitHub API to fetch repository data (commits, pull requests).
- Generate components to display commit history with pagination.
- Example Prompt: "Create a React component to display GitHub commit history for a project, using axios to call the GitHub API."

### Collaboration Tools
- Implement real-time chat using Socket.IO, with rooms per project.
- Support markdown in comment fields using a library like `react-markdown`.
- Example Prompt: "Generate a chat interface with Socket.IO for real-time messaging, supporting markdown in messages."

### Analytics Dashboard
- Use a charting library (e.g., Chart.js) for metrics visualization.
- Fetch data from `/api/analytics` endpoint, aggregating project and time log data.
- Example Prompt: "Create a dashboard component with Chart.js to display project completion rates, fetching data from /api/analytics."

## Prompting Guidelines
- **Clarity**: Use specific prompts, e.g., “Generate a React component for X using Y” rather than “Build an app.”
- **Context**: Include file references, e.g., “Using @docs/PRD, implement feature Z.”
- **Validation**: After generating code, validate syntax and run ESLint/Prettier.
- **Iteration**: If code is incorrect, refine the prompt with additional constraints, e.g., “Fix the component to handle edge case A.”

## Common Mistakes to Avoid
- **Hallucinated Imports**: Verify all imports exist in `package.json`.
- **Inconsistent Naming**: Ensure file and variable names follow kebab-case and camelCase conventions.
- **Missing Error Handling**: Always include try-catch for API calls and database operations.
- **Overcomplicating Logic**: Prioritize simple, maintainable code for the MVP.

## Example Prompt
```
Using @docs/Technical Specifications.mdc, generate a React component named ProjectView to display project details and tasks, fetching data from /api/projects/:id. Use Tailwind CSS for styling and Clerk for role-based access. Include error handling and a loading state.
```

## References
- CodeGuide’s AI coding documentation practices (CodeGuide Twitter).
- SaaS development guidelines from SolveIt and Digiteum.