import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'

// Test the getHiddenMenuItems function
describe('AppConfig - Menu Visibility', () => {
    // Store original env
    const originalEnv = process.env

    beforeEach(() => {
        // Reset environment for each test
        process.env = { ...originalEnv }
    })

    afterEach(() => {
        // Restore original environment
        process.env = originalEnv
    })

    it('should return empty array when no environment variables are set', () => {
        // Clear any HIDE_MENU_ variables
        Object.keys(process.env).forEach(key => {
            if (key.startsWith('HIDE_MENU_')) {
                delete process.env[key]
            }
        })

        // Re-import to get fresh config
        jest.resetModules()
        const { appConfig } = require('./AppConfig')
        
        expect(appConfig.hiddenMenuItems).toEqual([])
    })

    it('should hide menu items when environment variables are set to true', () => {
        process.env.HIDE_MENU_APIKEY = 'true'
        process.env.HIDE_MENU_VARIABLES = 'true'

        jest.resetModules()
        const { appConfig } = require('./AppConfig')
        
        expect(appConfig.hiddenMenuItems).toContain('apikey')
        expect(appConfig.hiddenMenuItems).toContain('variables')
        expect(appConfig.hiddenMenuItems).toHaveLength(2)
    })

    it('should handle uppercase TRUE value', () => {
        process.env.HIDE_MENU_TOOLS = 'TRUE'

        jest.resetModules()
        const { appConfig } = require('./AppConfig')
        
        expect(appConfig.hiddenMenuItems).toContain('tools')
    })

    it('should not hide menu items when set to false', () => {
        process.env.HIDE_MENU_CREDENTIALS = 'false'

        jest.resetModules()
        const { appConfig } = require('./AppConfig')
        
        expect(appConfig.hiddenMenuItems).not.toContain('credentials')
        expect(appConfig.hiddenMenuItems).toHaveLength(0)
    })

    it('should not hide menu items when set to invalid values', () => {
        process.env.HIDE_MENU_CHATFLOWS = 'yes'
        process.env.HIDE_MENU_AGENTFLOWS = '1'
        process.env.HIDE_MENU_TOOLS = ''

        jest.resetModules()
        const { appConfig } = require('./AppConfig')
        
        expect(appConfig.hiddenMenuItems).toHaveLength(0)
    })

    it('should handle menu IDs with hyphens correctly', () => {
        process.env.HIDE_MENU_DOCUMENT_STORES = 'true'
        process.env.HIDE_MENU_LOGIN_ACTIVITY = 'true'

        jest.resetModules()
        const { appConfig } = require('./AppConfig')
        
        expect(appConfig.hiddenMenuItems).toContain('document-stores')
        expect(appConfig.hiddenMenuItems).toContain('login-activity')
    })

    it('should handle mixed valid and invalid settings', () => {
        process.env.HIDE_MENU_LOGS = 'true'
        process.env.HIDE_MENU_ACCOUNT = 'false'
        process.env.HIDE_MENU_USERS = 'TRUE'
        process.env.HIDE_MENU_ROLES = 'no'

        jest.resetModules()
        const { appConfig } = require('./AppConfig')
        
        expect(appConfig.hiddenMenuItems).toContain('logs')
        expect(appConfig.hiddenMenuItems).toContain('users')
        expect(appConfig.hiddenMenuItems).not.toContain('account')
        expect(appConfig.hiddenMenuItems).not.toContain('roles')
        expect(appConfig.hiddenMenuItems).toHaveLength(2)
    })
})