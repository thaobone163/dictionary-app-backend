const express = require('express');
const router = express.Router();

const wordRouter = require('../controllers/words');

router.get("/search/:word", wordRouter.search);
router.get("/lookUp/:word", wordRouter.lookUp);
router.get("/favorite", wordRouter.showFavorite);
router.get("/yourWord", wordRouter.showYourWord);
router.put("/like/:word", wordRouter.like);
router.put("/unlike/:word", wordRouter.unlike);
router.get("/recent", wordRouter.recent);
router.post("/add", wordRouter.add);
router.delete("/delete/:word", wordRouter.delete);
router.put("/update/:currentWord", wordRouter.update);

module.exports = router;
