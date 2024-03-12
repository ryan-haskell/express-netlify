import path from 'path'
import express from 'express'

const indexHtmlFilepath = path.join(process.cwd(), 'frontend', 'index.html')
const port = process.env.PORT || 3000

const app = express()

// API endpoints
app.use('/api', express.json())
app.get('/api', (req, res) => res.json({ route: 'API' }))
app.get('/api/recipes', (req, res) => res.json({ route: 'Recipes' }))
app.get('/api/recipes/:id', (req, res) => res.json({ route: 'Recipe ' + req.params.id }))
app.use('/api', (req, res) => res.status(404).json({ message: 'API route not found...' }))
app.use('/api', (err, req, res, next) => res.status(500).json({ message: 'Something went wrong!' }))

// Static Frontend 
// 1️⃣ Serve any files exactly matching URL
app.use(express.static('frontend'))
// 2️⃣ Redirect all other requests to index.html (Single page app)
app.get('*', (req, res, next) => res.sendFile(indexHtmlFilepath))

// Runs the express server
app.listen(port, () => console.info(`🚀 Ready at http://localhost:${port}`))

export default app