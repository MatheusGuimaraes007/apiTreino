const express = require('express');
const router = express.Router();
const multer = require('multer');
const login = require('../middleware/login');

const produtosController = require('../controllers/produtos-controller');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname,
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: fileFilter,
  },
});

router.get('/', produtosController.getProdutos);
router.post(
  '/',
  login.obrigatorio,
  upload.single('produto_imagem'),
  produtosController.postProdutos,
);

router.get('/:idprodutos', produtosController.getUmProduto);
router.patch('/', login.obrigatorio, produtosController.patchProduto);
router.delete('/', login.obrigatorio, produtosController.produtoDelete);

module.exports = router;
