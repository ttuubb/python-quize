# Python 测验应用程序

欢迎来到 Python 测验应用程序！本项目旨在通过互动测验帮助您测试和提高您的 Python 知识。它使用 Next.js 构建前端，并结合 AI 能力来生成问题和提示。

[阅读此 README 的英文版 (English Version)](./README.md)

## ✨ 功能

*   **互动测验**：参与各种 Python 问题。
*   **AI 驱动的问题生成**：问题是动态生成的，提供全新的体验。
*   **智能提示**：当您遇到困难时，获取由 AI 提供支持的有用提示。
*   **用户友好界面**：使用 Shadcn UI 组件构建的简洁直观的设计。

## 🚀 开始

按照以下步骤在您的本地机器上启动并运行项目。

### 先决条件

在开始之前，请确保您已安装以下软件：

*   **Node.js**：本项目使用 Node.js（包含 npm）。您可以从 [nodejs.org](https://nodejs.org/) 下载。建议使用 LTS 版本。
*   **npm** (Node Package Manager) 或 **Yarn**：npm 随 Node.js 一起提供。如果您更喜欢 Yarn，可以通过 `npm install -g yarn` 安装。

### 安装

1.  **克隆仓库**：
    打开您的终端或命令提示符，运行以下命令将项目克隆到您的本地机器：
    ```bash
    git clone https://github.com/your-username/python-quize.git
    # 如果不同，请将 `your-username/python-quize` 替换为实际的仓库 URL
    ```
2.  **进入项目目录**：
    ```bash
    cd python-quize
    ```
3.  **安装依赖**：
    使用 npm 或 Yarn 安装所需的包：
    ```bash
    npm install
    # 或
    yarn install
    ```

### 运行应用程序

安装完依赖后，您可以启动开发服务器：

```bash
npm run dev
# 或
yarn dev
```

此命令将启动 Next.js 开发服务器。然后您可以在浏览器中打开 `http://localhost:3000` 查看应用程序的运行情况。

## 📂 项目结构

以下是本项目主要目录的简要概述：

*   `src/app/`：包含主要的 Next.js 应用程序页面和布局。
*   `src/components/`：可重用的 React 组件，包括来自 Shadcn UI 的 UI 组件 (`src/components/ui/`)。
*   `src/ai/`：包含 AI 相关逻辑，包括 Genkit 配置和用于问题和提示生成的 AI 流。
*   `src/lib/`：实用函数、类型和问题数据。
*   `public/`：静态资产，如图像和 `favicon.ico`。

## 🤝 贡献

我们欢迎贡献！如果您想贡献，请遵循以下步骤：

1.  Fork 仓库。
2.  创建一个新分支 (`git checkout -b feature/your-feature-name`)。
3.  进行您的更改。
4.  提交您的更改 (`git commit -m 'feat: Add new feature'`)。
5.  推送到分支 (`git push origin feature/your-feature-name`)。
6.  打开一个 Pull Request。

## 📄 许可证

本项目根据 MIT 许可证授权 - 有关详细信息，请参阅 `LICENSE` 文件（如果适用，如果不存在则创建一个）。
