# Troubleshooting Guide

## Error: "Uncaught SyntaxError: Unexpected token '<'"

This error typically occurs when:
1. HTML is being served instead of JavaScript
2. A 404 error returns HTML instead of the expected JS file
3. React Router client-side routing conflicts with server routing

### Solutions:

#### 1. Clear Cache and Restart
```bash
# Stop the dev server (Ctrl+C)
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear browser cache
# Or use incognito/private mode

# Restart dev server
npm run dev
```

#### 2. Check File Structure
Ensure your structure is:
```
frontend/
├── index.html       (in root)
├── package.json     (in root)
├── vite.config.js   (in root)
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   └── ...
└── node_modules/
```

#### 3. Verify index.html
The `index.html` should have:
```html
<script type="module" src="/src/main.jsx"></script>
```

#### 4. Check Browser Console
Open browser DevTools (F12) and check:
- Network tab: Are JS files loading correctly?
- Console tab: Any other errors?
- Check if files return 404 or HTML instead of JS

#### 5. Verify Vite is Running
- Check terminal for Vite server output
- Should see: "Local: http://localhost:3000"
- Should see: "[vite] connected" message

#### 6. Port Conflicts
If port 3000 is in use:
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in vite.config.js
server: {
  port: 3001  // Change to different port
}
```

#### 7. Check Import Paths
Ensure all imports use correct paths:
- ✅ `import App from './App'`
- ✅ `import { useAuth } from '../hooks/useAuth'`
- ❌ `import App from '/App'` (absolute paths without @ alias)

#### 8. Environment Variables
Check if `.env` file exists and has correct values:
```env
VITE_API_URL=http://localhost:5000/api
```

#### 9. Rebuild Dependencies
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Restart
npm run dev
```

#### 10. Check for Duplicate Files
If you have files in both `frontend/` and `frontend/public/`, remove the duplicate `public/` folder or ensure Vite is using the correct root.

### Common Causes:

1. **Wrong Working Directory**: Make sure you're running `npm run dev` from `frontend/` directory
2. **Old Build Files**: Delete `dist/` folder if it exists
3. **Browser Cache**: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
4. **Port Already in Use**: Another process might be using port 3000
5. **Missing Dependencies**: Run `npm install` to ensure all packages are installed

### Still Not Working?

1. Check Vite version compatibility:
   ```bash
   npm list vite
   ```

2. Try creating a minimal test:
   - Create a simple `test.jsx` file
   - Import it in `main.jsx`
   - See if the error persists

3. Check for syntax errors in your JSX files:
   ```bash
   npm run lint
   ```

4. Verify React and React-DOM versions match:
   ```bash
   npm list react react-dom
   ```

