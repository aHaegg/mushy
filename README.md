# Static web app in Azure

A static web app for Azure with a React frontend (Vite) and a Node.js backend (Azure Functions API). Both parts use TypeScript.

[Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps/overview) allows you to easily build [React](https://reactjs.org/) apps in minutes.  
This project uses [Vite](https://vitejs.dev/) for the frontend and Azure Functions for the backend.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [npm](https://www.npmjs.com/)
- [Azure Functions Core Tools](https://docs.microsoft.com/azure/azure-functions/functions-run-local) (`npm install -g azure-functions-core-tools@4 --unsafe-perm true`)
- [Azure Static Web Apps CLI](https://aka.ms/swa-cli) (`npm install -g @azure/static-web-apps-cli`)
- [Git](https://git-scm.com/)

---

## Project Structure

```
/
├── api/                   # Azure Functions backend (TypeScript)
│   ├── src/               # Function source code
│   │   └── functions/     # Individual Azure Functions (e.g., hello.ts)
│   ├── dist/              # Compiled JavaScript output
│   ├── host.json          # Azure Functions host configuration
│   ├── local.settings.json# Local settings for Azure Functions (not committed)
│   └── package.json       # API dependencies and scripts
├── app/                   # Main HTML entry for React frontend app
├── src/                   # React frontend source (TypeScript)
│   ├── App.tsx
│   └── ...
├── index.html             # Main HTML entry for Vite
├── notloggedin.html       # Redirect page for Azure Static Web Apps
├── package.json           # Frontend dependencies and scripts
├── vite.config.ts         # Vite configuration
├── staticwebapp.config.json # Azure Static Web Apps configuration
└── README.md

---

## Install Dependencies

### Frontend

```bash
npm install
```

### API

```bash
cd api
npm install
cd ..
```

---

## Running Locally

### 1. **Frontend Only (Vite Dev Server)**

```bash
npm run dev
```
- Open [http://localhost:5173](http://localhost:5173) in your browser.

---

### 2. **API Only (Azure Functions)**

To enable hot-reload for Azure Functions during local development, use two terminals in the `api` folder:

**Terminal 1:**  
Watches and recompiles TypeScript:
```bash
npm run watch
```

**Terminal 2:**  
Runs the Azure Functions host (auto-restarts on JS changes):
```bash
npm run start
```

- The API will be available at [http://localhost:7071/api/hello](http://localhost:7071/api/hello)

---

### 3. **Full Stack (Frontend + API) with Azure SWA CLI**

This is the recommended way to run both frontend and API together, simulating the Azure environment.

```bash
# In the project root
swa start http://localhost:5173 --api-devserver-url http://localhost:7071
```
- This will:
  - Link the Vite dev server (run `npm run dev` in another terminal, see Frontend instructions above)
  - Link the Azure Functions backend at [http://localhost:7071](http://localhost:7071)
  - Serve both under a single local endpoint (usually [http://localhost:4280](http://localhost:4280))

---

## Building for Production

### Frontend

```bash
npm run build
```
- Output will be in the `dist` folder (or `app/` if configured in `vite.config.ts`).

### API

```bash
cd api
npm run build
cd ..
```
- Output will be in `api/dist`.

---

## Deployment

- Push your code to GitHub.
- Create an Azure Static Web App in the Azure Portal and link your GitHub repo.
- Set:
  - **App location**: `app`
  - **API location**: `api`
  - **Output location**: `dist`
- Azure will auto-generate a GitHub Actions workflow for CI/CD.

---

## Useful Scripts

| Command                | Description                          |
|------------------------|--------------------------------------|
| `npm run dev`          | Start Vite dev server                |
| `npm run build`        | Build frontend for production        |
| `npm run preview`      | Preview production build locally     |
| `cd api && npm run watch` | Watch and compile API TypeScript |
| `cd api && npm run start` | Start Azure Functions host        |
| `swa start ...`        | Run full stack locally (see above)   |

---

## References

- [Azure Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps/)
- [Vite Documentation](https://vitejs.dev/)
- [Azure Functions Documentation](https://docs.microsoft.com/azure/azure-functions/)
