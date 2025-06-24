# VS Code AI Chat Assistant

A Visual Studio Code extension that integrates a React-based web chat interface, supporting contextual code awareness, file/image attachments, and AI-powered code generation using Hugging Face models.

---

## ✨ Features

- **React Web UI**: Clean, minimal chat panel rendered with React inside a VS Code WebView.
- **Markdown & Syntax Highlighting**: Supports markdown, code blocks, and scrolling chat history.
- **Context Awareness**: AI can access the current file’s name and content for more relevant answers.
- **File & Image Attachment**: Use `@filename` in chat to attach files or images from your workspace.
- **AI Code Generation**: Generates or manipulates code using the Hugging Face Zephyr-7B model.
- **No OpenAI Key Needed**: Uses your Hugging Face API token for free (see below).

---

## 🛠️ Tech Stack

- **Language**: TypeScript
- **Frontend**: React (in VS Code WebView)
- **Backend/API**: Node.js (VS Code Extension API)
- **AI Model**: [HuggingFaceH4/zephyr-7b-beta](https://huggingface.co/HuggingFaceH4/zephyr-7b-beta)
- **Tools**: VS Code Extension API, WebView API

---

## 🚀 Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/lobhasap/codingjr.git
cd codingjr/ai-chat-assistant/ext
```

### 2. Install dependencies

```sh
npm install
cd webview-ui
npm install
npm run build
cd ..
```

### 3. Add your Hugging Face API token

Edit `src/extension.ts` and replace the value in the `Authorization` header with your Hugging Face token:

```ts
'Authorization': 'Bearer YOUR_HF_TOKEN'
```

You can get a free token at: https://huggingface.co/settings/tokens

### 4. Build the extension backend

```sh
npm run compile
```

### 5. Launch in VS Code

- Open the `ai-chat-assistant/ext` folder in VS Code.
- Press `F5` to launch the Extension Development Host.
- Open the Command Palette (`Ctrl+Shift+P`), type `Open AI Chat Assistant`, and run the command.

---

## 🖼️ Demo

![Chat Demo Screenshot](../demo-screenshot.png)

---

## 📦 Features in Action

- **Chat with AI**: Ask for code, explanations, or help.
- **Attach files/images**: Type `@filename` to attach and send files.
- **Contextual answers**: AI can see your current file for better help.

---

## 📝 License

MIT

---

## 🙋‍♂️ Author

- [lobhasap](https://github.com/lobhasap)

---

## 📧 Internship Assignment

This project was developed as part of the Coding Juniors internship assignment.  
For more info, see the assignment brief in `Thank you for your interest in our.txt`.
