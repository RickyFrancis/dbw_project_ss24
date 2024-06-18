import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { handleInputErrors } from './modules/middleware';
import { getSchulen } from './handlers/schulen';
import {
  createAddress,
  deleteAddress,
  deleteUser,
  getAddress,
  getCoordsDistance,
  getUserDetails,
  toggleFavoriteJugend,
  toggleFavoriteKinder,
  toggleFavoriteSchule,
  toggleFavoriteSozial,
  updateAddress,
  updateUser,
} from './handlers/user';
import { getSchulsozialarbeit } from './handlers/schulsozialarbeit';
import { getJugendberufshilfen } from './handlers/jugendberufshilfen';
import { getKindertageseinrichtungen } from './handlers/kindertageseinrichtungen';
import { getDistanceValidator, updateUserValidator } from './modules/validator';

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
 * User
 */
router.get('/user', getUserDetails);
router.put('/user', updateUserValidator, updateUser);
router.delete('/user', deleteUser);

router.post('/user/address', createAddress);
router.get('/user/address/:addressId', getAddress);
router.delete('/user/address/:addressId', deleteAddress);
router.put('/user/address/:addressId', updateAddress);

router.post(
  '/user/toggle-favorite-jugend/:jugendberufshilfe_id',
  toggleFavoriteJugend
);
router.post('/user/toggle-favorite-schule/:schule_id', toggleFavoriteSchule);
router.post('/user/toggle-favorite-kinder/:kinder_id', toggleFavoriteKinder);
router.post('/user/toggle-favorite-sozial/:sozial_id', toggleFavoriteSozial);

router.post('/user/get-distance', getDistanceValidator, getCoordsDistance);

/**
 * Schule
 */
router.get('/schule', getSchulen);
router.get('/schule/:id', () => {});

/**
 * schulsozialarbeit
 */
router.get('/schulsozialarbeit', getSchulsozialarbeit);
router.get('/schulsozialarbeit/:id', () => {});

/**
 * jugendberufshilfe
 */
router.get('/jugendberufshilfe', getJugendberufshilfen);
router.get('/jugendberufshilfe/:id', () => {});

/**
 * kindertageseinrichtung
 */
router.get('/kindertageseinrichtung', getKindertageseinrichtungen);
router.get('/kindertageseinrichtung/:id', () => {});

export default router;
