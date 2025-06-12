# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `pnpm dev` (starts Next.js dev server on http://localhost:3000)
- **Build**: `pnpm build` (builds the production application)
- **Lint**: `pnpm lint` (runs Next.js ESLint configuration)
- **Start production**: `pnpm start` (starts production server after build)

## Environment Setup

The application requires CopilotKit API configuration:
- Copy `.env.example` to `.env.local`
- Set `NEXT_PUBLIC_COPILOT_CLOUD_PUBLIC_API_KEY` with your CopilotKit Cloud API key

## Architecture

This is a Next.js todo application integrated with CopilotKit for AI-powered interactions.

### Core Structure
- **Next.js App Router**: Uses the modern app directory structure with TypeScript
- **CopilotKit Integration**: AI assistant functionality through `@copilotkit/react-core` and `@copilotkit/react-ui`
- **State Management**: React Context pattern in `lib/hooks/use-tasks.tsx` with CopilotKit actions
- **UI Components**: Radix UI primitives with Tailwind CSS styling in `components/ui/`

### Key Files
- `app/page.tsx`: Main application entry point with CopilotKit provider
- `app/api/copilotkit/route.ts`: CopilotKit API endpoint using OpenAI adapter
- `lib/hooks/use-tasks.tsx`: Task state management with CopilotKit integration
- `lib/tasks.types.ts`: TypeScript definitions for Task and TaskStatus

### CopilotKit Integration
The app exposes three CopilotKit actions:
- `addTask`: Creates new tasks
- `deleteTask`: Removes tasks
- `setTaskStatus`: Updates task completion status

Tasks are made readable to the AI through `useCopilotReadable` hook, allowing the assistant to understand current state.

### Path Aliases
Uses `@/*` alias pointing to root directory (configured in tsconfig.json).

### MCP Servers
- use the GitMCP `copilotkit-todos` MCP server that is configured in `.claude/settings.local.json` for additional project documentation.