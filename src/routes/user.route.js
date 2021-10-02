import express from 'express';
import * as userCtrl from '../controllers/user.controller';
import isAuthenticated from '../middlewares/authenticate';
import validate from '../config/joi.validate';
import userSchema from '../validators/user.validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: users
 *     description: User Operations
 */

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Unique identifier representing a specific user
 *       first_name:
 *         type: string
 *         description: first name of the user
 *         example: Krishna
 *       last_name:
 *         type: string
 *         description: last name of the user
 *         example: Timilsina
 *       email:
 *         type: string
 *         description: email of the user
 *         required: true
 *         example: test@gmail.com
 *       password:
 *         type: string
 *         description: password of the user
 *         required: true
 *         example: "123456"
 *       status:
 *         type: integer
 *         description: status of the user
 *         example: 1
 *       created_at:
 *         type: string
 *         format: date-time
 *         description: User creation datetime
 *       updated_at:
 *         type: string
 *         format: date-time
 *         description: User update datetime
 *   Error:
 *     type: object
 *     properties:
 *        message:
 *           type: string
 *        error:
 *           type: boolean
 *           default: true
 */
router.route('/confirmation').post((req, res) => {
  userCtrl.register(req, res);
});

router
  .route('/')

  /**
   * @swagger
   * /users:
   *   post:
   *     tags:
   *       - users
   *     summary: "Create a new user"
   *     security:
   *        - Bearer: []
   *     operationId: storeUser
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         description: Created user object
   *         required: true
   *         schema:
   *           $ref: "#/definitions/User"
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: "#/definitions/User"
   *       403:
   *          description: User not found
   *          schema:
   *             $ref: '#/definitions/Error'
   */

  .post(validate(userSchema.store), userCtrl.store)

  /**
   * @swagger
   * /users:
   *   get:
   *     tags:
   *       - users
   *     summary: "List all users"
   *     security:
   *        - Bearer: []
   *     operationId: findAll
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters: []
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *            type: object
   */

  .get(isAuthenticated, userCtrl.findAll);

router
  .route('/:id')

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     tags:
   *       - users
   *     summary: Find the user by ID
   *     security:
   *        - Bearer: []
   *     operationId: findById
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         description: id of user that needs to be fetched
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: "#/definitions/User"
   *       404:
   *          description: User not found
   *          schema:
   *             $ref: '#/definitions/Error'
   */

  .get(isAuthenticated, userCtrl.findById)

  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     tags:
   *       - users
   *     summary: "Update an existing user by ID"
   *     security:
   *       - Bearer: []
   *     operationId: update
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         description: id that need to be updated
   *         required: true
   *         type: integer
   *       - name: body
   *         in: body
   *         description: Updated user object
   *         required: true
   *         schema:
   *           $ref: "#/definitions/User"
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: "#/definitions/User"
   *       400:
   *         description: Invalid user
   */

  .put(isAuthenticated, validate(userSchema.update), userCtrl.update)

  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     tags:
   *       - users
   *     summary: Delete the user by ID
   *     security:
   *       - Bearer: []
   *     operationId: destroy
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         description: id of user that needs to be deleted
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: OK
   *       400:
   *          description: "Invalid ID"
   */

  .delete(isAuthenticated, userCtrl.destroy);

export default router;
