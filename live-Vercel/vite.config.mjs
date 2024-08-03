import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'src'), // Set the root directory to the 'src' folder
  publicDir: path.resolve(__dirname, 'public'), // Set the public directory to 'public'
  build: {
    outDir: path.resolve(__dirname, 'dist'), // Output the build to 'dist' directory
    emptyOutDir: true, // Empty the output directory before each build
    rollupOptions: {
      input: path.resolve(__dirname, 'src', 'index.html'), // Entry point for the app
    }
  },
  server: {
    open: true, // Automatically open the app in the browser on server start
  }
});
