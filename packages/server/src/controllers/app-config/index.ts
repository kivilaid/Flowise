import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { appConfig } from '../../AppConfig'

const getAppConfig = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const config = {
            hiddenMenuItems: appConfig.hiddenMenuItems
        }
        return res.json(config)
    } catch (error) {
        next(error)
    }
}

export default {
    getAppConfig
}