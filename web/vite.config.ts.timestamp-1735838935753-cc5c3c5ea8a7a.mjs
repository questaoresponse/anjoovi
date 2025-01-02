// vite.config.ts
import { defineConfig } from "file:///C:/xampp/htdocs/anjoovi/web/node_modules/vite/dist/node/index.js";
import react from "file:///C:/xampp/htdocs/anjoovi/web/node_modules/@vitejs/plugin-react-swc/index.mjs";
import fs from "fs";
import builtins from "file:///C:/xampp/htdocs/anjoovi/web/node_modules/rollup-plugin-node-builtins/dist/rollup-plugin-node-builtins.cjs.js";
import sass from "file:///C:/xampp/htdocs/anjoovi/web/node_modules/sass/sass.node.mjs";
var __vite_injected_original_dirname = "C:\\xampp\\htdocs\\anjoovi\\web";
var builtinsPlugin = builtins({ crypto: true });
builtinsPlugin.name = "builtins";
var vite_config_default = defineConfig({
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
    react()
    // mkcert()
  ],
  optimizeDeps: {
    exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"]
  },
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass
      }
    }
  },
  server: {
    // port:3000,
    // host:"192.168.18.113",
    https: {
      key: fs.readFileSync(__vite_injected_original_dirname + "/ssl/anjoovi/key.pem"),
      cert: fs.readFileSync(__vite_injected_original_dirname + "/ssl/anjoovi/crt.pem")
    },
    host: "www.anjoovi.com",
    port: 3001,
    hmr: {
      host: "www.anjoovi.com",
      port: 3001
    },
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp"
      // 'Access-Control-Allow-Origin': 'https://192.168.18.113:9000',
    }
  },
  build: {
    outDir: __vite_injected_original_dirname + "/../public_html"
  }
  // server:{
  //   host:"192.168.18.113",
  //   port:3000,
  // }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx4YW1wcFxcXFxodGRvY3NcXFxcYW5qb292aVxcXFx3ZWJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHhhbXBwXFxcXGh0ZG9jc1xcXFxhbmpvb3ZpXFxcXHdlYlxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzoveGFtcHAvaHRkb2NzL2Fuam9vdmkvd2ViL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcclxuaW1wb3J0IGZzIGZyb20gJ2ZzJztcclxuLy8gaW1wb3J0IG1rY2VydCBmcm9tICd2aXRlLXBsdWdpbi1ta2NlcnQnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5pbXBvcnQgYnVpbHRpbnMgZnJvbSAncm9sbHVwLXBsdWdpbi1ub2RlLWJ1aWx0aW5zJztcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmltcG9ydCBzYXNzIGZyb20gJ3Nhc3MnO1xyXG5cclxuY29uc3QgYnVpbHRpbnNQbHVnaW4gPSBidWlsdGlucyh7Y3J5cHRvOiB0cnVlfSk7XHJcbmJ1aWx0aW5zUGx1Z2luLm5hbWUgPSAnYnVpbHRpbnMnO1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIC8vIHtcclxuICAgIC8vICAgbmFtZTogJ2xvZy1nZXQtcmVxdWVzdHMnLFxyXG4gICAgLy8gICBjb25maWd1cmVTZXJ2ZXIoc2VydmVyKSB7XHJcbiAgICAvLyAgICAgc2VydmVyLm1pZGRsZXdhcmVzLnVzZSgocmVxLCByZXMsIG5leHQpID0+IHtcclxuICAgIC8vICAgICAgIGlmIChyZXEubWV0aG9kID09PSAnR0VUJykge1xyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhgR0VUIFJlcXVlc3Q6ICR7cmVxLnVybH1gKTtcclxuICAgIC8vICAgICAgIH1cclxuICAgIC8vICAgICAgIG5leHQoKTsgLy8gQ29udGludWFyIGNvbSBvIHByb2Nlc3NhbWVudG8gcGFkclx1MDBFM29cclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgfSxcclxuICAgIC8vIH0sXHJcbiAgICByZWFjdCgpLFxyXG4gICAgLy8gbWtjZXJ0KClcclxuICBdLFxyXG4gIG9wdGltaXplRGVwczoge1xyXG4gICAgZXhjbHVkZTogW1wiQGZmbXBlZy9mZm1wZWdcIiwgXCJAZmZtcGVnL3V0aWxcIl0sXHJcbiAgfSxcclxuICBjc3M6IHtcclxuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgc2Nzczoge1xyXG4gICAgICAgIGltcGxlbWVudGF0aW9uOiBzYXNzLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHNlcnZlcjp7XHJcbiAgICAvLyBwb3J0OjMwMDAsXHJcbiAgICAvLyBob3N0OlwiMTkyLjE2OC4xOC4xMTNcIixcclxuICAgIGh0dHBzOiB7XHJcbiAgICAgIGtleTogZnMucmVhZEZpbGVTeW5jKF9fZGlybmFtZSArIFwiL3NzbC9hbmpvb3ZpL2tleS5wZW1cIiksXHJcbiAgICAgIGNlcnQ6IGZzLnJlYWRGaWxlU3luYyhfX2Rpcm5hbWUgKyBcIi9zc2wvYW5qb292aS9jcnQucGVtXCIpXHJcbiAgICB9LFxyXG4gICAgaG9zdDogXCJ3d3cuYW5qb292aS5jb21cIixcclxuICAgIHBvcnQ6IDMwMDEsXHJcbiAgICBobXI6IHtcclxuICAgICAgaG9zdDogJ3d3dy5hbmpvb3ZpLmNvbScsXHJcbiAgICAgIHBvcnQ6IDMwMDFcclxuICAgIH0sXHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgIFwiQ3Jvc3MtT3JpZ2luLU9wZW5lci1Qb2xpY3lcIjogXCJzYW1lLW9yaWdpblwiLFxyXG4gICAgICBcIkNyb3NzLU9yaWdpbi1FbWJlZGRlci1Qb2xpY3lcIjogXCJyZXF1aXJlLWNvcnBcIixcclxuICAgICAgLy8gJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICdodHRwczovLzE5Mi4xNjguMTguMTEzOjkwMDAnLFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgICAgb3V0RGlyOiBfX2Rpcm5hbWUrXCIvLi4vcHVibGljX2h0bWxcIiBcclxuICB9XHJcbiAgLy8gc2VydmVyOntcclxuICAvLyAgIGhvc3Q6XCIxOTIuMTY4LjE4LjExM1wiLFxyXG4gIC8vICAgcG9ydDozMDAwLFxyXG4gIC8vIH1cclxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUE2USxTQUFTLG9CQUFvQjtBQUMxUyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxRQUFRO0FBSWYsT0FBTyxjQUFjO0FBR3JCLE9BQU8sVUFBVTtBQVRqQixJQUFNLG1DQUFtQztBQVd6QyxJQUFNLGlCQUFpQixTQUFTLEVBQUMsUUFBUSxLQUFJLENBQUM7QUFDOUMsZUFBZSxPQUFPO0FBQ3RCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFZUCxNQUFNO0FBQUE7QUFBQSxFQUVSO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsa0JBQWtCLGNBQWM7QUFBQSxFQUM1QztBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBTztBQUFBO0FBQUE7QUFBQSxJQUdMLE9BQU87QUFBQSxNQUNMLEtBQUssR0FBRyxhQUFhLG1DQUFZLHNCQUFzQjtBQUFBLE1BQ3ZELE1BQU0sR0FBRyxhQUFhLG1DQUFZLHNCQUFzQjtBQUFBLElBQzFEO0FBQUEsSUFDQSxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixLQUFLO0FBQUEsTUFDSCxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsOEJBQThCO0FBQUEsTUFDOUIsZ0NBQWdDO0FBQUE7QUFBQSxJQUVsQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNILFFBQVEsbUNBQVU7QUFBQSxFQUN0QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
