/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: Bank account management
 */

/**
 * @swagger
 * /accounts:
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
 *             required: [accountType, balance]
 *             properties:
 *               accountType:
 *                 type: string
 *                 enum: [savings, current]
 *               balance:
 *                 type: number
 *     responses:
 *       201:
 *         description: Account created
 */

/**
 * @swagger
 * /accounts/update:
 *   patch:
 *     summary: Update an account (self or admin)
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountType:
 *                 type: string
 *                 enum: [savings, current]
 *               balance:
 *                 type: number
 *     responses:
 *       200:
 *         description: Account updated successfully
 *       404:
 *         description: Account not found
 */
