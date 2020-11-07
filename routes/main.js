const express = require("express");
const router = express.Router();
const expressLayouts = require("express-ejs-layouts");
const { ensureAuth } = require("../middleware/auth");

//init ejs
router.use(expressLayouts);

//INDEX
//GET to /main/index
router.get("/index", ensureAuth, (req, res) => {
    res.render("./main/index", { 
        layout: "layoutMain",
        user: req.user,
    })
})

module.exports = router;
