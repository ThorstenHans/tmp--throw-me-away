// For Hono documentation refer to https://hono.dev/docs/
import { Hono } from 'hono';
import { fire } from 'hono/service-worker';
import { logger } from 'hono/logger';

let app = new Hono();

// Logging to stdout via built-in middleware
app.use(logger());

// Example of a custom middleware to set HTTP response header
app.use(async (c, next) => {
    c.header('server', 'Spin CLI');
    await next();
})

app.get('/', (c) => c.text('Hello, Spin!'));
app.get('/hello/:name', (c) => {
    return c.json({ message: `Hello, ${c.req.param('name')}` });
});

fire(app);

