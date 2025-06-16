import express from 'express'
import appConfigController from '../../controllers/app-config'

const router = express.Router()

// GET /api/v1/app-config
router.get('/', appConfigController.getAppConfig)

export default router