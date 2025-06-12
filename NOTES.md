# Notes

## Manual Testing Chat and Actions

AI cannot take actions in a workflow. For example "add task: test task and mark it as completed" will add the task and the response will say it is marked as completed but it is not marked as completed. However "mark task 8 as not completed and delete it" will delete the task (not sure if it was marked as not completed). Something more complex does not work either: "Add task: TEST TASK, wait 5 seconds, then mark it as completed, wait 5 seconds and then delete it".

Prompt "delete 5" will successfully delete TASK-5 but the AI will respond with "There is no task with the ID 5 in your todo list. Would you like me to assist you with anything else?" which does not make sense as it should know task 5 was just deleted. How can I improve the AI response? How can I test it (evals)?

Added custom instructions to the CopilotKit chat popup `<CopilotPopup instructions="Do not create a duplicate todo task is there is already a todo with the same task. There should only be one todo for a specific task. If a task already exists for an action use it." />`, these instructions are added to the system message. Tested the workflow chat again "Add task: TEST TASK, wait 5 seconds, then mark it as completed, wait 5 seconds and then delete it". This gave correct result with no duplicates but still responded with: "I notice this task already exists in the todo list (id: 6), so I'll work with that one instead of creating a duplicate." 

Tested again with "Add a new task: TEST TASK, then wait 10 seconds, then mark it as completed and wait 10 seconds before deleting it" and it worked correctly with response "I notice this task already exists in the todo list with ID 6. I'll proceed with marking it as done and then deleting it, using that existing task instead of the duplicate we tried to create."

I tested variations of the custom instructions, the first two failed and added additional duplicate tasks:

"Do not create duplicate tasks. Do not create a task is there is already a task with the same title. There should only be one task for a specific title."

"Do not create a todo task is there is already a todo with the same task. There should only be one todo for a specific task"

This one worked perfectly and also returned "[Waiting for 10 seconds...]" on each wait. The key thing I did was keep it simple and specifically stated `todo list` as this is used in the description of the useCopilotReadable which passes state to the LLM

"Do not create a duplicate task if there is already a task in the todo list the same title"

```javascript
useCopilotReadable({
    description: "The state of the todo list containing all tasks",
    value: JSON.stringify(tasks),
});
```
This was also correct when I added a "TEST TASK" todo before running the query "I notice that "TEST TASK" already exists in the todo list (task id: 6), so I won't create a duplicate. I'll proceed with marking the existing task as done and then deleting it."

How are unrelated prompts handled: "What is CopilotKit?", response: "I cannot provide specific information about CopilotKit as I don't have direct access to verified information about it. The only tools available to me are related to managing a todo list (adding, deleting, and updating task statuses).

If you'd like to learn about CopilotKit, I recommend:
1. Visiting its official documentation or website
2. Checking its GitHub repository if available
3. Consulting its official documentation

Would you like to add a task related to learning about CopilotKit to your todo list?"

Responding "yes" added a new task: "Research CopilotKit"

### Anthropic Claude

In CopilotKit Cloud (Project 1) I configure the LLM to use Claude and generated and added an API key 'copilotkit-cloud' from Anthropic. I used the Anthropic Default workspace (I should setup a workspace for each project), the default workspace uses claude-3-5-sonnet. [Claude models](https://docs.anthropic.com/en/docs/about-claude/models/overview) are: Opus > Sonnet > Haiku

Testing "delete 5" worked as before and did not return a "There is no task response" which is better. A complex workflow "Add task: Test Task 9. Wait 5 seconds. Mark the added task as completed. Wait 5 seconds. Then delete the added task." result was better but still incorrect. The added task was correctly handled but two new "Test Task 9" tasks were created during the process. Possibly this is due to local state? Deleting multiple tasks "delete tasks: 10, 11, 12, 14" works but is performed sequentially, not in batch, this will be due to there only being a `deleteTask` action and no `deleteTasks` action.

## GitMCP

Setup GitMCP server `https://gitmcp.io/jsteenkamp/copilotkit-todos`

## Claude Code

Start `claude` (CMD + ESC or in termnial) and run `/init`, this did not create the `./claude/settings.local.json` file for me - not sure why. Copied it from copilotkit-standard project where somehow it was created yesterday. Added the GitMCP server:

```json
{
  "enableAllProjectMcpServers": false,
  "mcpServers": {
    "copilotkit-todos Docs": {
      "url": "https://gitmcp.io/jsteenkamp/copilotkit-todos"
    }
  }
}
```
Not clear to me what the GitMCP server is adding yet, but research indicated it should provide more and different context. [Using GitMCP with Claude Code](https://claude.ai/share/49d99198-826d-4507-8c8d-c3aa486ef275)

## JetBrains MCP Proxy

Configure this plugin and added to Claude Desktop. Confirmed it works - you have to be explicit in prompt mentioning "my project" otherwise Claude does web search. It is slow and repeats searches through folders/files. Shows why using GitMCP makes sense. Does not seem to offer anything over Claude Code. Claude Code is more recent and available in the IDE (WebStorm, PyCharm).  

## Styling

[Class Variance Authority (CVA)](https://cva.style/docs)


