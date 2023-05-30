const tokenBlacklist = new Set()
const logout = function(req, res) {
    const token = req.headers['authorization'];
    // Add the token to the blacklist (invalidate the token)
    tokenBlacklist.add(token);
  
    res.json({ message: 'Logged out successfully' });
}
module.exports = {logout, tokenBlacklist}