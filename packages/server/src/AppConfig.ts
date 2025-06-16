export const appConfig = {
    showCommunityNodes: process.env.SHOW_COMMUNITY_NODES ? process.env.SHOW_COMMUNITY_NODES.toLowerCase() === 'true' : false,
    // todo: add more config options here like database, log, storage, credential and allow modification from UI
    
    // Menu visibility configuration
    hiddenMenuItems: getHiddenMenuItems()
}

// Get hidden menu items from environment variables
function getHiddenMenuItems(): string[] {
    const hiddenItems: string[] = []
    const menuIds = [
        // Primary group
        'chatflows', 'agentflows', 'executions', 'assistants', 'marketplaces', 
        'tools', 'credentials', 'variables', 'apikey', 'document-stores',
        // Evaluations group
        'datasets', 'evaluators', 'evaluations',
        // Management group
        'sso', 'roles', 'users', 'workspaces', 'login-activity',
        // Others group
        'logs', 'account'
    ]
    
    menuIds.forEach(id => {
        const envKey = `HIDE_MENU_${id.toUpperCase().replace(/-/g, '_')}`
        if (process.env[envKey] && process.env[envKey].toLowerCase() === 'true') {
            hiddenItems.push(id)
        }
    })
    
    return hiddenItems
}
