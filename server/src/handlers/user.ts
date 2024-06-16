import { Prisma } from '@prisma/client';
import prisma from '../db';
import { comparePasswords, createJWT, hashPassword } from '../modules/auth';

export const createNewUser = async (req, res) => {
  try {
    // Find if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User with this email already exists' });
    }

    const hash = await hashPassword(req.body.password);

    // Prepare the addresses for creation
    const addressData = req.body.addresses.map((address) => ({
      street: address.street,
      street2: address.street2 || null, // Optional field
      city: address.city,
      state: address.state || null, // Optional field
      postalCode: address.postalCode,
      country: address.country,
      primaryAddress: address.primaryAddress || false,
    }));

    // Include address in the user creation process
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        password: hash,
        addresses: {
          create: addressData, // Correctly formatted to directly pass address objects
        },
      },
      include: {
        addresses: true,
        favoriteSozial: true,
        favoriteJugend: true,
        favoriteSchules: true,
        favoriteKinder: true,
      },
    });

    const token = createJWT(user);

    // Return user data excluding the password field
    const { password, ...userData } = user;
    return res.status(200).json({ ...userData, token: token });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
      include: {
        addresses: true,
        favoriteSozial: true,
        favoriteJugend: true,
        favoriteSchules: true,
        favoriteKinder: true,
      },
    });

    if (!user) {
      res.status(401);
      res.json({
        message: 'Invalid username or password',
      });
      return;
    }

    const isPasswordValid = await comparePasswords(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      res.status(401);
      res.json({
        message: 'Invalid username or password',
      });
      return;
    }

    const token = createJWT(user);
    // Return user data excluding the password field
    const { password, ...userData } = user;
    return res.status(200).json({ ...userData, token: token });
  } catch (error) {
    res.status(500);
    res.json({ message: 'Internal server error' });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.user.email },
      include: {
        addresses: true,
        favoriteSozial: true,
        favoriteJugend: true,
        favoriteSchules: true,
        favoriteKinder: true,
      },
    });

    if (!user) {
      // Check if the user was not found and return a 404 status code
      return res.status(404).json({ message: 'User not found' });
    } else {
      // Return user data excluding the password field
      const { password, ...userData } = user;
      return res.status(200).json(userData);
    }
  } catch (error) {
    console.error('Error retrieving user details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.user.email },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.user.email !== user.email) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Start a transaction to ensure both operations complete successfully
    const transaction = await prisma.$transaction([
      // Delete the address associated with the user first
      prisma.address.deleteMany({
        where: { userId: req.user.id },
      }),
      // Then delete the user
      prisma.user.delete({
        where: { email: req.user.email },
      }),
    ]);

    console.log('Transaction result:', transaction);
    res.json({ message: 'User and address deleted' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
};

export const updateUser = async (req, res) => {
  try {
    let hashedPassword;
    if (req.body.password) {
      hashedPassword = await hashPassword(req.body.password);
    }

    const updatedUser = await prisma.user.update({
      where: { email: req.user.email },
      data: {
        email: req.body.email,
        name: req.body.name,
        ...(hashedPassword && { password: hashedPassword }), // Conditionally include password if it's provided
      },
      include: {
        addresses: true,
        favoriteSozial: true,
        favoriteJugend: true,
        favoriteSchules: true,
        favoriteKinder: true,
      }, // Include the address in the returned user data
    });

    const token = req.body.password ? createJWT(updatedUser) : null;

    // Return user data excluding the password field
    const { password, ...userData } = updatedUser;
    return res.status(200).json({ ...userData, ...(token && { token }) });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createAddress = async (req, res) => {
  try {
    const {
      street,
      street2,
      city,
      state,
      postalCode,
      country,
      primaryAddress,
    } = req.body;

    const address = await prisma.address.create({
      data: {
        userId: parseInt(req.user.id),
        street,
        street2,
        city,
        state,
        postalCode,
        country,
        primaryAddress: primaryAddress || false,
      },
    });

    return res.status(201).json(address);
  } catch (error) {
    console.error('Error creating address:', error);

    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const {
      street,
      street2,
      city,
      state,
      postalCode,
      country,
      primaryAddress,
    } = req.body;

    const addressOwner = parseInt(req.user.id);

    const address = await prisma.address.findUnique({
      where: { id: parseInt(addressId) },
    });

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    if (address.userId !== addressOwner) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updatedAddress = await prisma.address.update({
      where: { id: parseInt(addressId) },
      data: {
        ...(street && { street }),
        ...(street2 !== undefined && { street2 }),
        ...(city && { city }),
        ...(state && { state }),
        ...(postalCode && { postalCode }),
        ...(country && { country }),
        ...(primaryAddress !== undefined && { primaryAddress }),
      },
    });

    return res.status(200).json(updatedAddress);
  } catch (error) {
    console.error('Error updating address:', error);
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const addressId = parseInt(req.params.addressId);
    const addressOwner = parseInt(req.user.id);

    // Check for the primary address or critical dependency before deletion
    const address = await prisma.address.findUnique({
      where: { id: addressId },
      include: { user: true },
    });

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    if (address.userId !== addressOwner) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Implement logic if the address is primary or critical
    if (address.primaryAddress) {
      // Optionally, update another address to be the primary or inform the user
      return res.status(400).json({
        message:
          'Cannot delete primary address. Update another address to primary first.',
      });
    }

    // Proceed with deletion
    await prisma.address.delete({
      where: { id: addressId },
    });

    return res.status(200).send({ message: 'Address deleted' });
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAddress = async (req, res) => {
  const addressId = parseInt(req.params.addressId); // Convert the address ID from string to integer
  const addressOwner = parseInt(req.user.id);

  try {
    // Query the database for the address
    const address = await prisma.address.findUnique({
      where: { id: addressId },
    });

    // Check if the address was found
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    if (address.userId !== addressOwner) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Return the found address
    return res.status(200).json(address);
  } catch (error) {
    console.error('Error retrieving address:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const toggleFavoriteJugend = async (req, res) => {
  try {
    const userId = parseInt(req.user.id);
    const jugendberufshilfe_id = parseInt(req.params.jugendberufshilfe_id);
    // Retrieve the user and their favorite Jugendberufshilfe to check current status
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        addresses: true,
        favoriteSozial: true,
        favoriteJugend: true,
        favoriteSchules: true,
        favoriteKinder: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isFavorite = user.favoriteJugend.some(
      (jugend) => jugend.id === jugendberufshilfe_id
    );

    if (isFavorite) {
      // Remove the Jugendberufshilfe from the user's favorites
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          favoriteJugend: {
            disconnect: { id: jugendberufshilfe_id }, // Disconnects relation if it's currently a favorite
          },
        },
        include: {
          addresses: true,
          favoriteSozial: true,
          favoriteJugend: true,
          favoriteSchules: true,
          favoriteKinder: true,
        },
      });
      return res.status(200).json({
        message: 'Jugendberufshilfe removed from favorites successfully.',
        updatedUser,
      });
    } else {
      // Add the Jugendberufshilfe to the user's favorites
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          favoriteJugend: {
            connect: { id: jugendberufshilfe_id }, // Connects relation if it's not a favorite
          },
        },
        include: {
          addresses: true,
          favoriteSozial: true,
          favoriteJugend: true,
          favoriteSchules: true,
          favoriteKinder: true,
        },
      });
      return res.status(201).json({
        message: 'Jugendberufshilfe added to favorites successfully.',
        updatedUser,
      });
    }
  } catch (error) {
    console.error('Error toggling Jugendberufshilfe favorite status:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const toggleFavoriteSchule = async (req, res) => {
  try {
    const userId = parseInt(req.user.id);
    const schule_id = parseInt(req.params.schule_id);
    // Retrieve the user and their favorite Schule to check current status
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        addresses: true,
        favoriteSozial: true,
        favoriteJugend: true,
        favoriteSchules: true,
        favoriteKinder: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isFavorite = user.favoriteSchules.some(
      (favoriteSchule) => favoriteSchule.id === schule_id
    );

    if (isFavorite) {
      // Remove the Schule from the user's favorites
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          favoriteSchules: {
            disconnect: { id: schule_id }, // Disconnects relation if it's currently a favorite
          },
        },
        include: {
          addresses: true,
          favoriteSozial: true,
          favoriteJugend: true,
          favoriteSchules: true,
          favoriteKinder: true,
        },
      });
      return res.status(200).json({
        message: 'Schule removed from favorites successfully.',
        updatedUser,
      });
    } else {
      // Add the Schule to the user's favorites
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          favoriteSchules: {
            connect: { id: schule_id }, // Connects relation if it's not a favorite
          },
        },
        include: {
          addresses: true,
          favoriteSozial: true,
          favoriteJugend: true,
          favoriteSchules: true,
          favoriteKinder: true,
        },
      });
      return res.status(201).json({
        message: 'Schule added to favorites successfully.',
        updatedUser,
      });
    }
  } catch (error) {
    console.error('Error toggling Schule favorite status:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const toggleFavoriteKinder = async (req, res) => {
  try {
    const userId = parseInt(req.user.id);
    const kinder_id = parseInt(req.params.kinder_id);
    // Retrieve the user and their favorite Kinder to check current status
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        addresses: true,
        favoriteSozial: true,
        favoriteJugend: true,
        favoriteSchules: true,
        favoriteKinder: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isFavorite = user.favoriteKinder.some(
      (favoriteKinder) => favoriteKinder.id === kinder_id
    );

    if (isFavorite) {
      // Remove the Kinder from the user's favorites
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          favoriteKinder: {
            disconnect: { id: kinder_id }, // Disconnects relation if it's currently a favorite
          },
        },
        include: {
          addresses: true,
          favoriteSozial: true,
          favoriteJugend: true,
          favoriteSchules: true,
          favoriteKinder: true,
        },
      });
      return res.status(200).json({
        message: 'Kinder removed from favorites successfully.',
        updatedUser,
      });
    } else {
      // Add the Kinder to the user's favorites
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          favoriteKinder: {
            connect: { id: kinder_id }, // Connects relation if it's not a favorite
          },
        },
        include: {
          addresses: true,
          favoriteSozial: true,
          favoriteJugend: true,
          favoriteSchules: true,
          favoriteKinder: true,
        },
      });
      return res.status(201).json({
        message: 'Kinder added to favorites successfully.',
        updatedUser,
      });
    }
  } catch (error) {
    console.error('Error toggling Kinder favorite status:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const toggleFavoriteSozial = async (req, res) => {
  try {
    const userId = parseInt(req.user.id);
    const sozial_id = parseInt(req.params.sozial_id);
    // Retrieve the user and their favorite Sozial to check current status
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        addresses: true,
        favoriteSozial: true,
        favoriteJugend: true,
        favoriteSchules: true,
        favoriteKinder: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isFavorite = user.favoriteSozial.some(
      (favoriteSozial) => favoriteSozial.id === sozial_id
    );

    if (isFavorite) {
      // Remove the Sozial from the user's favorites
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          favoriteSozial: {
            disconnect: { id: sozial_id }, // Disconnects relation if it's currently a favorite
          },
        },
        include: {
          addresses: true,
          favoriteSozial: true,
          favoriteJugend: true,
          favoriteSchules: true,
          favoriteKinder: true,
        },
      });
      return res.status(200).json({
        message: 'Sozial removed from favorites successfully.',
        updatedUser,
      });
    } else {
      // Add the Sozial to the user's favorites
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          favoriteSozial: {
            connect: { id: sozial_id }, // Connects relation if it's not a favorite
          },
        },
        include: {
          addresses: true,
          favoriteSozial: true,
          favoriteJugend: true,
          favoriteSchules: true,
          favoriteKinder: true,
        },
      });
      return res.status(201).json({
        message: 'Sozial added to favorites successfully.',
        updatedUser,
      });
    }
  } catch (error) {
    console.error('Error toggling Sozial favorite status:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
