const path = require('path');

// sendFile needs absolute paths
const root = path.dirname(require.main.filename)
const views = path.join(root, 'views');

// Send the index page
exports.sendHome = (req, res) => {
    res.sendFile(path.join(views, "index.html"));
}