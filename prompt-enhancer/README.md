# Prompt Enhancer

A powerful web application designed to enhance prompts for AI generation, featuring multi-LLM support (Local, OpenAI, Gemini) and a visual Camera Shot Cheat Sheet.

## Features

-   **Multi-Provider Support:** Switch seamlessly between:
    -   **Local LLM (Ollama):** Free, private, and runs entirely on your machine.
    -   **OpenAI (GPT-4o):** High-quality cloud enhancement (requires API Key).
    -   **Google Gemini:** Fast and efficient cloud enhancement (requires API Key).
    -   **Mock Mode:** For testing the UI without any external dependencies.
-   **Visual Cheat Sheet:** specialized sidebar for camera shots (Wide Shot, Close Up, Dutch Angle, etc.) that shows visual previews (GIFs) on hover.
-   **Local Storage:** API keys and preferences are saved securely in your browser's local storage—no backend database required.

## Prerequisites

Before you begin, ensure you have the following software installed:

1.  **Node.js & npm:** Required to run the web application.
    *   Download: [nodejs.org](https://nodejs.org/) (LTS version recommended).
    *   Verify: Run `node -v` and `npm -v` in your terminal.

2.  **Ollama (Optional - for Local LLM):** Required only if you want to use the "Local" provider option.
    *   Download: [ollama.com](https://ollama.com/)
    *   Setup: Install Ollama and run `ollama serve`.
    *   Pull a model: Run `ollama pull llama3` (or any other model you prefer).

## Installation

1.  Navigate to the project directory:
    ```bash
    cd prompt-enhancer
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

## Running the Application

1.  Start the development server:
    ```bash
    npm run dev
    ```

2.  Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).

## Configuration & Usage

### 1. Setting up the Provider
Click the **Settings (Gear Icon)** in the top right corner.

*   **Mock:** No setup required. Returns simulated data.
*   **Local (Ollama):**
    *   Ensure Ollama is running (`ollama serve`).
    *   Enter the model name you pulled (e.g., `llama3`, `mistral`).
    *   **Note on CORS:** If you encounter connection issues with Ollama, you may need to set the `OLLAMA_ORIGINS` environment variable to allow browser requests.
        *   Mac/Linux: `OLLAMA_ORIGINS="*" ollama serve`
        *   Windows (PowerShell): `$env:OLLAMA_ORIGINS="*"; ollama serve`
*   **OpenAI / Gemini:**
    *   Enter your valid API Key. Keys are saved only in your browser.

### 2. Using the Enhancer
1.  Type a basic prompt into the "Original Prompt" text area.
2.  Click **Enhance Prompt**.
3.  The result will appear in the right-hand panel. Copy it to your clipboard with one click.

### 3. Camera Cheat Sheet
*   Browse the list of camera shots on the right sidebar.
*   Hover over any shot name to see a visual GIF representation of what that angle looks like.
*   Use these terms in your prompts to get better image/video generation results.

## Building for Production

To create a production-ready build:

```bash
npm run build
```

The output will be in the `dist` folder, which can be deployed to any static site host (Netlify, Vercel, GitHub Pages, etc.).
