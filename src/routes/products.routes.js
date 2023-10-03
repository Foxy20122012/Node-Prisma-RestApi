import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
console.log('New message');
const prisma = new PrismaClient();

//Metodo para la Lectura de Datos en formato json desde la base de datos.
router.get('/products', async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

// Método para Insertar (Método POST).
router.post('/products', async (req, res) => {
  try {
    const newProduct = await prisma.product.create({
      data: req.body,
    });
    res.json(newProduct); // Usar 'res.json()' en lugar de 'req.json()'
  } catch (error) {
    console.error('Error al crear un nuevo producto:', error);
    res.status(500).json({ error: 'Error al crear un nuevo producto' });
  }
});

router.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: { id: Number(id) }, // Elimina $scalars: true y selecciona solo category
  });

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json(product);
});




router.delete('/products/:id', async (req, res) => {
  const productDelete = await prisma.product.delete({
    where: { 
      id: Number(req.params.id) 
    },
  });
  res.json(productDelete);
});

router.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const updatedProduct = await prisma.product.update({
    where: { id: Number(id) },
    data: req.body,
  });
  res.json(updatedProduct);
});

  export { router };
