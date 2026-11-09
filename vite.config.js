import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dns from 'node:dns'

// Resolve "localhost" to 127.0.0.1 first so the dev server is reachable at
// both http://localhost:5173 and http://127.0.0.1:5173 (Node otherwise binds IPv6 only).
dns.setDefaultResultOrder('ipv4first')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})


// 

