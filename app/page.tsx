"use client";

import { TasksList } from "@/components/TasksList";
import { TasksProvider } from "@/lib/hooks/use-tasks";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export default function Home() {
  return (
    <>
      <CopilotKit publicApiKey={process.env.NEXT_PUBLIC_COPILOT_API_KEY} showDevConsole={true}>
        <TasksProvider>
          <TasksList />
        </TasksProvider>
        <CopilotPopup
          labels={{
            title: "To Do Assistant",
            initial: "Hi! 👋 How can I assist you today?",
          }}
        />
      </CopilotKit>
    </>
  );
}
