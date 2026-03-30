import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.json({
    message: 'API workspace is prepared. Add routes here as the project grows.',
  })
})

export default router
