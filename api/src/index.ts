import Fastify from 'fastify'
const app = Fastify()
app.get('/health', async () => ({ status: 'ok', env: process.env.NODE_ENV }))
app.listen({ port: 3000, host: '0.0.0.0' })
