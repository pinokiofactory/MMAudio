module.exports = {
  requires: {
    bundle: "ai",
  },
  run: [
    {
      when: "{{!exists('app')}}",
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/hkchengrex/MMAudio.git app",
        ]
      }
    },
    {
      when: "{{exists(app/env)}}",
      method: "fs.rm",
      params: {
        path: "app/env"
      }
    },
    {
      method: "shell.run",
      params: {
        venv_python: "3.11",
        venv: "venv",
        path: "app",
        message: [
          "uv pip install -r pyproject.toml",
          "uv pip install huggingface_hub==0.36.0 hf-xet"
        ]
      }
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "venv",
          path: "app",
          // xformers: true
        }
      }
    }
  ]
}
