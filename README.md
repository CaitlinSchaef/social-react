# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

@vitejs/plugin-react uses Babel for Fast Refresh
@vitejs/plugin-react-swc uses SWC for Fast Refresh
production deploy to Vercel [https://vercel.com/]

## Vercel setup
create Vercel account
import git repo
configure project
override output directory to 'dist'
Routing via React-Router (lets you do browser router: https://reactrouter.com/en/main/start/tutorial)
npm create vite@latest name-of-your-project -- --template react (only if vite isn't installed)


npm install react-router-dom In Main.jsx at top: import { createBrowserRouter, RouterProvider, } from "react-router-dom"; Above bottom: const router = createBrowserRouter([ { path: "/", element:
Hello world!
, }, ]); 
In createRoot:

## Install bootstrap
npm install react-bootstrap bootstrap

## deploy
from branch 'main':
$ npm run build
add changes and push to repo