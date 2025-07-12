# Python Quiz Application

Welcome to the Python Quiz Application! This project is designed to help you test and improve your Python knowledge through interactive quizzes. It's built using Next.js for the frontend and incorporates AI capabilities to generate questions and hints.

[Read this README in Chinese (中文版)](./README.zh-CN.md)

## ✨ Features

*   **Interactive Quizzes**: Engage with a variety of Python questions.
*   **AI-Powered Question Generation**: Questions are dynamically generated to provide a fresh experience.
*   **Intelligent Hints**: Get helpful hints when you're stuck, powered by AI.
*   **User-Friendly Interface**: A clean and intuitive design built with Shadcn UI components.

## 🚀 Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Before you begin, ensure you have the following software installed:

*   **Node.js**: This project uses Node.js (which includes npm). You can download it from [nodejs.org](https://nodejs.org/). It's recommended to use the LTS version.
*   **npm** (Node Package Manager) or **Yarn**: npm comes with Node.js. If you prefer Yarn, you can install it via `npm install -g yarn`.

### Installation

1.  **Clone the repository**:
    Open your terminal or command prompt and run the following command to clone the project to your local machine:
    ```bash
    git clone https://github.com/your-username/python-quize.git
    # Replace `your-username/python-quize` with the actual repository URL if different
    ```
2.  **Navigate into the project directory**:
    ```bash
    cd python-quize
    ```
3.  **Install dependencies**:
    Use npm or Yarn to install the required packages:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application

Once the dependencies are installed, you can start the development server:

```bash
npm run dev
# or
yarn dev
```

This command will start the Next.js development server. You can then open your web browser and navigate to `http://localhost:3000` to see the application in action.

## 📂 Project Structure

Here's a brief overview of the main directories in this project:

*   `src/app/`: Contains the main Next.js application pages and layout.
*   `src/components/`: Reusable React components, including UI components from Shadcn UI (`src/components/ui/`).
*   `src/ai/`: Houses the AI-related logic, including Genkit configurations and AI flows for question and hint generation.
*   `src/lib/`: Utility functions, types, and question data.
*   `public/`: Static assets like images and `favicon.ico`.

## 🤝 Contributing

We welcome contributions! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'feat: Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details (if applicable, create one if not present).
