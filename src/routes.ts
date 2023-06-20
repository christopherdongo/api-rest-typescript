import express, { Express, Request, Response } from "express";
import {
  createProductHandler,
  getProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "./controller/product.controller";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./schema/product.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

const router = express.Router();


export const routes = (app: Express) => {

  app.use('/api/v1',router)

  router.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  router.post("/users", validateResource(createUserSchema), createUserHandler);

  router.post(
    "/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  router.get("/sessions", requireUser, getUserSessionsHandler);

  router.delete("/sessions", requireUser, deleteSessionHandler);

  router.post(
    "/products",
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
  );

  router.put(
    "/products/:productId",
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  );

  router.get(
    "/products/:productId",
    validateResource(getProductSchema),
    getProductHandler
  );

  router.delete(
    "/products/:productId",
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
  );
}

