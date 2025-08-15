import app from './index.js';
import { serve } from '@hono/node-server';

console.log('Starting server...');

serve(app);
