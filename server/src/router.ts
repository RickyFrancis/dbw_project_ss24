import { Router } from 'express';

const router = Router();

/**
 * Entity
 */
router.get('/entity', () => {});
router.get('/entity/:id', () => {});
router.post('/entity', () => {});
router.put('/entity/:id', () => {});
router.delete('/entity/:id', () => {});

/**
 * Schule
 */
router.get('/schule', (req, res) => {
  console.log('hello from schule');
  res.status(200);
  res.json({
    message: 'Hello from schule!',
  });
});
router.get('/schule/:id', () => {});
router.post('/schule', () => {});
router.put('/schule/:id', () => {});
router.delete('/schule/:id', () => {});

export default router;
