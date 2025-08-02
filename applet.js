const Applet = imports.ui.applet;
const St = imports.gi.St;
const Main = imports.ui.main;
const Cinnamon = imports.gi.Cinnamon;
const GLib = imports.gi.GLib;
const Meta = imports.gi.Meta;

// 💅 Load app name mappings from external JSON file
let appNameMap = {};
try {
    // Use a hardcoded path since we know where the applet is installed
    const jsonPath = GLib.get_home_dir() + '/.local/share/cinnamon/applets/active-window-title@afief/app-names.json';
    const [success, contents] = GLib.file_get_contents(jsonPath);
    if (success) {
        appNameMap = JSON.parse(contents.toString());
        global.log('Active Window Title: Successfully loaded ' + Object.keys(appNameMap).length + ' app mappings');
    } else {
        global.logError('Active Window Title: Failed to read app-names.json file at: ' + jsonPath);
    }
} catch (e) {
    global.logError('Active Window Title: Failed to load app-names.json: ' + e);
    // Fallback to empty object if loading fails
    appNameMap = {};
}

// 🧠 Title Case helper: turns "zapzap" → "ZapZap"
function titleCase(str) {
    return str.replace(/\w\S*/g, txt =>
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
}

// ✂️ Truncate long app names with elegant ellipsis
// Suggested max length: 25 characters (good balance for most panels)
function truncateAppName(name, maxLength = 25) {
    if (name.length <= maxLength) {
        return name;
    }
    
    // Try to cut at a word boundary if possible
    const truncated = name.substring(0, maxLength - 1);
    const lastSpaceIndex = truncated.lastIndexOf(' ');
    
    // If we can cut at a word boundary and it's not too short, do that
    if (lastSpaceIndex > maxLength * 0.6) {
        return truncated.substring(0, lastSpaceIndex) + '…';
    }
    
    // Otherwise, just cut and add ellipsis
    return truncated + '…';
}

function MyApplet(metadata, orientation, panelHeight, instanceId) {
    this._init(metadata, orientation, panelHeight, instanceId);
}

MyApplet.prototype = {
    __proto__: Applet.TextApplet.prototype,

    _init: function(metadata, orientation, panelHeight, instanceId) {
        Applet.TextApplet.prototype._init.call(this, orientation, panelHeight, instanceId);

        this.set_applet_label("");
        this._windowTracker = Cinnamon.WindowTracker.get_default();

        this._windowChangedId = global.display.connect('notify::focus-window', () => this._updateTitle());
        this._updateTitle();
    },

    _updateTitle: function() {
        let win = global.display.focus_window;
        if (win && win.get_wm_class) {
            let rawClass = win.get_wm_class();
            let rawName = rawClass.toLowerCase();
            let prettyName = appNameMap[rawName] || titleCase(rawName);
            
            // ✂️ Truncate long names to keep panel clean
            let displayName = truncateAppName(prettyName);
            this.set_applet_label(displayName);
        } else {
            this.set_applet_label("");
        }
    },

    on_applet_removed_from_panel: function() {
        if (this._windowChangedId) {
            global.display.disconnect(this._windowChangedId);
            this._windowChangedId = null;
        }
    }
};

function main(metadata, orientation, panelHeight, instanceId) {
    return new MyApplet(metadata, orientation, panelHeight, instanceId);
}
