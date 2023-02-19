const router = require('express').Router();
const authController = require("../controllers/authController");
const { requireAuth } = require("../middlewares/auth.middleware");
const userController = require("../controllers/userController");
const uploadController = require('../controllers/upload.controller');
// import "multer" pout telecharger des fichier
const multer = require('multer');
const upload = multer();

// Authentification
router.post('/register', authController.signUp );
router.post('/login', authController.signIn );
router.get('/logout', requireAuth, authController.logout );

// user DB
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

// "patch" => mise a jour d'un tab a l'interieur d'un élément
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

// route "upload" ("/api/user/upload")
router.post("/upload", upload.single("file"), uploadController.uploadProfil);


module.exports = router;