const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

const app = next({ 
  dev,
  hostname, 
  port,
  conf: {
    reactStrictMode: true,
    poweredByHeader: false,
    compress: true
  }
})
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    createServer(async (req, res) => {
      try {
        // Parse the URL
        const parsedUrl = parse(req.url, true)
        
        // Security headers
        res.setHeader('X-Content-Type-Options', 'nosniff')
        res.setHeader('X-Frame-Options', 'DENY')
        res.setHeader('X-XSS-Protection', '1; mode=block')
        
        // Let Next.js handle the request
        await handle(req, res, parsedUrl)
        
      } catch (err) {
        console.error('Error occurred handling', req.url, err)
        res.statusCode = 500
        res.end('Internal server error')
      }
    })
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://${hostname}:${port} - env ${process.env.NODE_ENV}`)
    })
  })
  .catch((err) => {
    console.error('Error occurred starting server:', err)
    process.exit(1)
  })