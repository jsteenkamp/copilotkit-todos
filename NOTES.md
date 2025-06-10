# Notes

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