const { Router } = require('express');
const router = Router();
const Contenedor = require('../../src/contenedor')
const contenedor = new Contenedor.Contenedor('./src/productos.txt')


router.get('/', async (req, res) => {
  const productos = await contenedor.getData()
  res.render('form.handlebars',{ ListProduct: productos})
});

router.get('/productos', async (req, res) => {
  const productos = await contenedor.getData()
  res.render('products.handlebars', { ListProduct: productos })
})

router.post('/productos', (req, res) => {
  contenedor.save(req.body)
  res.redirect('/productos')
})

module.exports = router;