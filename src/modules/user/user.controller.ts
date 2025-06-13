import userService from "./user.service";
import { Request, Response } from "express";

class UserController {
  /**
   * @swagger
   * /api/v1/users:
   *   get:
   *     summary: Get all users
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *         description: Page number
   *       - in: query
   *         name: pageSize
   *         schema:
   *           type: integer
   *         description: Page size
   *       - in: query
   *         name: isDeleted
   *         schema:
   *           type: boolean
   *         description: Filter deleted users
   *     responses:
   *       200:
   *         description: A list of users.
   *
   */
  async getAll(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const isDeleted = req.query.isDeleted === "true";
      const users = await userService.getAll(page, pageSize, isDeleted);
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * @swagger
   * /api/v1/users/id:
   *   get:
   *     summary: Get user by ID
   *     parameters:
   *       - in: query
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the user
   *     responses:
   *       200:
   *         description: A single user object
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal server error
   */
  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.query.id);
      const user = await userService.getById(id);
      res.json(user);
    } catch (error: any) {
      if (error.message === "User not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  /**
   * @swagger
   * /api/v1/users:
   *   post:
   *     summary: Create a new user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 example: "user@example.com"
   *               username:
   *                 type: string
   *                 example: "johndoe"
   *               password:
   *                 type: string
   *                 example: "StrongPassword123"
   *               membershipId:
   *                 type: integer
   *                 nullable: true
   *                 example: 1
   *     responses:
   *       201:
   *         description: User created successfully
   *       500:
   *         description: Internal server error
   */
  async create(req: Request, res: Response) {
    try {
      const user = await userService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
 * @swagger
 * /api/v1/users/id:
 *   put:
 *     summary: Update a user
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "updated_username"
 *               email:
 *                 type: string
 *                 example: "updated@example.com"
 *               isActive:
 *                 type: boolean
 *                 example: true
 *               membershipId:
 *                 type: integer
 *                 nullable: true
 *                 example: 2
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.query.id);
      const data = req.body;
      const user = await userService.update(id, data);
      res.json(user);
    } catch (error: any) {
      if (error.message === "User not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  /**
 * @swagger
 * /api/v1/users/id:
 *   delete:
 *     summary: Delete a user (soft delete)
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to delete
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.query.id);
      await userService.delete(id);
      res.status(204).send();
    } catch (error: any) {
      if (error.message === "User not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}

export default new UserController();
