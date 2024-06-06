import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { handleInputErrors } from './modules/middleware';
import { getSchulen } from './handlers/schulen';

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
router.get('/schule', getSchulen);

router.get('/schule/:id', () => {});
router.post(
  '/schule',
  [body('name').isString(), body('email').isEmail(), handleInputErrors],
  (req, res) => {}
);
router.put('/schule/:id', () => {});
router.delete('/schule/:id', () => {});

export default router;
