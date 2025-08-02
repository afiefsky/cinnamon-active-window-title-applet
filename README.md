# Active Window Title Applet

A clean and elegant Cinnamon panel applet that displays the name of the currently focused window with smart formatting and truncation.

## ✨ Features

- **Pretty App Names**: Transforms raw window class names into readable display names
  - `firefox` → `Firefox`
  - `code` → `Visual Studio Code`
  - `gnome-terminal` → `Terminal`

- **Smart Text Truncation**: Automatically shortens long application names
  - Tries to cut at word boundaries when possible
  - Uses elegant ellipsis (`…`) for truncated text
  - Default limit: 25 characters (configurable)

- **Extensive App Database**: 289+ pre-configured application mappings in external JSON file

- **Fallback Support**: Automatically formats unmapped applications using titleCase

- **Clean & Maintainable**: App names stored in separate JSON file for easy editing

## 🚀 Installation

1. **Clone or download** this repository
2. **Copy the entire folder** to your Cinnamon applets directory:
   ```bash
   cp -r active-window-title@afief ~/.local/share/cinnamon/applets/
   ```
3. **Add to panel**: Right-click on your panel → "Applets" → Find "Active Window Title" → Add to panel

## 📁 Files

- `applet.js` - Main applet code
- `app-names.json` - Application name mappings (289+ apps)
- `metadata.json` - Applet metadata
- `README.md` - This file

## ⚙️ Configuration

### Adjusting Truncation Length

To change the maximum text length, edit the `truncateAppName` function in `applet.js`:

```javascript
// Change 25 to your preferred length
function truncateAppName(name, maxLength = 25) {
```

**Recommended lengths:**
- **20-25**: Compact panels
- **30-35**: Standard panels  
- **40+**: Wide panels

### Adding New Applications

Edit `app-names.json` to add or modify app name mappings:

```json
{
  "your-app-class": "Your Pretty App Name",
  "example-app": "Example Application"
}
```

The file is alphabetically sorted for easy maintenance.

## 🎯 How It Works

1. **Detects** when the focused window changes
2. **Gets** the window's WM_CLASS property
3. **Looks up** the pretty name in `app-names.json`
4. **Falls back** to titleCase formatting if not found
5. **Truncates** long names intelligently
6. **Updates** the panel display

## 🔧 Troubleshooting

### Applet not loading?
- Check Cinnamon logs: `~/.xsession-errors`
- Restart Cinnamon: `Alt+F2` → type `r` → Enter

### App name not appearing correctly?
- Find the app's WM_CLASS with: `xprop | grep WM_CLASS`
- Add it to `app-names.json`

### JSON file not loading?
- Check file permissions: `ls -la app-names.json`
- Verify JSON syntax: `python3 -m json.tool app-names.json`

## 🤝 Contributing

1. Fork the repository
2. Add your app mappings to `app-names.json`
3. Keep the file alphabetically sorted
4. Submit a pull request

## 📝 License

This project is open source. Feel free to use, modify, and distribute.

## 🐛 Issues

Found a bug or have a feature request? Please open an issue on the GitHub repository.

---

**Made with ❤️ for the Cinnamon desktop environment**
