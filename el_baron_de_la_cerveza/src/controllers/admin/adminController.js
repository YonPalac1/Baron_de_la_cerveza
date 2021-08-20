module.exports = {
    admin: (req, res) => {
        res.render("admin/admin", {
        	
        })
    },
    users:(req, res) => {
        res.render("admin/users")
    }
}