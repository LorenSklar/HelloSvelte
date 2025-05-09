# Project Rules and Structure

## Tech Stack
- Frontend: Svelte (hosted on Vercel)
- Backend: Flask (hosted on Render)

## Project Structure
```
hello_svelte/
├── src/
│   ├── lib/           # Shared components and utilities
│   ├── routes/        # Page components
│   └── app.html       # Main HTML template
├── static/            # Static assets
├── tests/             # Test files
└── package.json       # Dependencies and scripts
```

## Development Preferences
**Code Style**
- Use 2 spaces for indentation
- Follow Svelte's recommended practices
- Use explicit variable and function names so future me can understand the logic
- Most logic does not need comments but do comment on why a certain decision was made and how it might need to be adapted for future versions

## Current Scope (v1)
- Local web app with "hello" text
- Text cycles through rainbow colors on click
- Text moves with arrow key navigation
- No backend integration yet

## Future Scope
- Subitizing practice game
- Backend integration for user progress
- User authentication
- Progress tracking
- Customizable difficulty levels 