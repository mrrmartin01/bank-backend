/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: Bank account management
 */

/**
 * @swagger
 * /account/create:
 *   post:
 *     summary: Create a new account
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [accountType]
 *             properties:
 *               accountType:
 *                 type: string
 *                 enum: [savings, current, checking, credit]
 *               balance:
 *                 type: number
 *     responses:
 *       201:
 *         description: Account created
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /account/update/{id}:
 *   patch:
 *     summary: Update your own account
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Account ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountType:
 *                 type: string
 *                 enum: [savings, current, checking, credit]
 *               balance:
 *                 type: number
 *     responses:
 *       200:
 *         description: Account updated successfully
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Account not found
 */

/**
 * @swagger
 * /account/admin-update/{id}:
 *   patch:
 *     summary: Admin update any account
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Account ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountType:
 *                 type: string
 *                 enum: [savings, current, checking, credit]
 *               balance:
 *                 type: number
 *     responses:
 *       200:
 *         description: Account updated successfully
 *       403:
 *         description: Admin access only
 *       404:
 *         description: Account not found
 */

/**
 * @swagger
 * /account/:
 *   get:
 *     summary: Get all accounts for the logged-in user
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's accounts
 */

/**
 * @swagger
 * /account/all:
 *   get:
 *     summary: Get all accounts (admin only)
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all accounts
 *       403:
 *         description: Admin access only
 */
