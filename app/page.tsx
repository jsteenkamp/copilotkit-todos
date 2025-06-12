"use client";

import { TasksList } from "@/components/TasksList";
import { TasksProvider } from "@/lib/hooks/use-tasks";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export default function Home() {
  return (
    <>
      <CopilotKit publicApiKey={process.env.NEXT_PUBLIC_COPILOT_API_KEY}>
        <TasksProvider>
          <TasksList />
        </TasksProvider>
        <CopilotPopup instructions="Do not create a duplicate task if there is already a task in the todo list the same title" />
      </CopilotKit>
    </>
  );
}
