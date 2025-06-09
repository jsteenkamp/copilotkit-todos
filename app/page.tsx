"use client";

import { TasksList } from "@/components/TasksList";
import { TasksProvider } from "@/lib/hooks/use-tasks";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

// removed  runtimeUrl="/api/copilotkit"

export default function Home() {
  return (
    <>
      <CopilotKit publicApiKey="ck_pub_6d8aa6f01296d756f401ad05a81e14aa">
        <TasksProvider>
          <TasksList />
        </TasksProvider>
        <CopilotPopup />
      </CopilotKit>
    </>
  );
}
