module.exports = async (kernel) => {
  const port = await kernel.port()
  return {
    requires: {
      bundle: "ai",
    },
    daemon: true,
    run: [
      {
        method: "shell.run",
        params: {
          venv: "venv",
          path: "app",
          message: [
            `python gradio_demo.py --port ${port}`,
          ],
          on: [{
            "event": "/http:\/\/[0-9.:]+/",
            "done": true
          }]
        }
      },
      {
        method: "local.set",
        params: {
          url: "{{input.event[0]}}"
        }
      }
    ]
  }
}
