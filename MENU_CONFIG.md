# Menu Visibility Configuration

This document explains how to hide menu items in Flowise using environment variables.

## Overview

Flowise allows administrators to hide specific menu items from the UI by setting environment variables. This is useful for:
- Customizing the UI for different deployments
- Hiding features that are not needed
- Simplifying the interface for specific user groups

## How to Use

### Hiding Menu Items

To hide a menu item, set the corresponding environment variable to `true`:

```bash
# Hide API Keys menu
export HIDE_MENU_APIKEY=true

# Hide Variables menu
export HIDE_MENU_VARIABLES=true

# Hide multiple menu items
export HIDE_MENU_APIKEY=true
export HIDE_MENU_VARIABLES=true
export HIDE_MENU_TOOLS=true
```

### Available Menu Items

You can hide any of the following menu items:

#### Primary Menu Items
- `HIDE_MENU_CHATFLOWS` - Chatflows
- `HIDE_MENU_AGENTFLOWS` - Agentflows
- `HIDE_MENU_EXECUTIONS` - Executions
- `HIDE_MENU_ASSISTANTS` - Assistants
- `HIDE_MENU_MARKETPLACES` - Marketplaces
- `HIDE_MENU_TOOLS` - Tools
- `HIDE_MENU_CREDENTIALS` - Credentials
- `HIDE_MENU_VARIABLES` - Variables
- `HIDE_MENU_APIKEY` - API Keys
- `HIDE_MENU_DOCUMENT_STORES` - Document Stores

#### Evaluations Menu Items
- `HIDE_MENU_DATASETS` - Datasets
- `HIDE_MENU_EVALUATORS` - Evaluators
- `HIDE_MENU_EVALUATIONS` - Evaluations

#### User & Workspace Management Menu Items
- `HIDE_MENU_SSO` - SSO Config
- `HIDE_MENU_ROLES` - Roles
- `HIDE_MENU_USERS` - Users
- `HIDE_MENU_WORKSPACES` - Workspaces
- `HIDE_MENU_LOGIN_ACTIVITY` - Login Activity

#### Other Menu Items
- `HIDE_MENU_LOGS` - Logs
- `HIDE_MENU_ACCOUNT` - Account Settings

## Example Configuration

### Using .env File

Add the following to your `.env` file in the `packages/server` directory:

```env
# Hide API Keys and Variables menus
HIDE_MENU_APIKEY=true
HIDE_MENU_VARIABLES=true
```

### Using Docker

When running Flowise with Docker, pass the environment variables:

```bash
docker run -d \
  -e HIDE_MENU_APIKEY=true \
  -e HIDE_MENU_VARIABLES=true \
  -p 3000:3000 \
  flowise
```

### Using Docker Compose

Add to your `docker-compose.yml`:

```yaml
services:
  flowise:
    image: flowise
    environment:
      - HIDE_MENU_APIKEY=true
      - HIDE_MENU_VARIABLES=true
    ports:
      - "3000:3000"
```

## Testing

To test the menu hiding functionality:

1. Set the environment variables
2. Start the server
3. Navigate to the UI
4. Verify that the specified menu items are hidden

Example test script:

```bash
#!/bin/bash
export HIDE_MENU_APIKEY=true
export HIDE_MENU_VARIABLES=true
cd packages/server
pnpm start
```

## Notes

- Menu visibility is checked on app initialization
- Changes to environment variables require a server restart
- Hidden menu items are completely removed from the UI
- This feature works alongside existing permission and feature flag systems
- Menu items hidden by environment variables cannot be made visible through other means