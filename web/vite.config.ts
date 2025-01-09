import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs';
// import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
import builtins from 'rollup-plugin-node-builtins';

// https://vitejs.dev/config/
import sass from 'sass';

const builtinsPlugin = builtins({crypto: true});
builtinsPlugin.name = 'builtins';
export default defineConfig({
  plugins: [
    // {
    //   name: 'log-get-requests',
    //   configureServer(server) {
    //     server.middlewares.use((req, res, next) => {
    //       if (req.method === 'GET') {
    //         console.log(`GET Request: ${req.url}`);
    //       }
    //       next(); // Continuar com o processamento padrão
    //     });
    //   },
    // },
    react(),
    // mkcert()
  ],
  optimizeDeps: {
    exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
  },
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
  server:{
    // port:3000,
    // host:"192.168.18.113",
    https: {
      key: fs.readFileSync(__dirname + "/ssl/anjoovi/key.pem"),
      cert: fs.readFileSync(__dirname + "/ssl/anjoovi/crt.pem")
    },
    host: "www.anjoovi.com",
    port: 3001,
    hmr: {
      host: 'www.anjoovi.com',
      port: 3001
    }
  },
  build: {
      outDir: __dirname+"/../public_html" 
  }
  // server:{
  //   host:"192.168.18.113",
  //   port:3000,
  // }
});