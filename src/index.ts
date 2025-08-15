import { Hono } from 'hono'

const app = new Hono()

const WEBHOOK_SECRET_PATH = process.env.WEBHOOK_SECRET_PATH;

if (!WEBHOOK_SECRET_PATH) {
  throw new Error('WEBHOOK_SECRET_PATH environment variable is not set.');
}

const welcomeStrings = [
  "Hello Hono!",
  "To learn more about Hono on Vercel, visit https://vercel.com/docs/frameworks/hono",
]

app.get('/', (c) => {
  return c.text(welcomeStrings.join('\n\n'))
})

app.post(`/${WEBHOOK_SECRET_PATH}`, async (c) => {
  const body = await c.req.json();
  console.log('Webhook received:', body);
  return c.json({ message: 'Webhook received successfully!' });
});

export default app
