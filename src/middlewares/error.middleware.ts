import { BadRequestError } from "@/errors/BadRequestError";
import { NotFoundError } from "@/errors/NotFoundError";
import { UnauthorizedError } from "@/errors/UnauthorizedError";
import { ValidationError } from "@/errors/ValidationError";
import { ResponseHelper } from "@/helpers/responseHelper";
import { Prisma } from "@prisma/client";
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    if(err instanceof SyntaxError && "body" in err){
        const response = ResponseHelper.error("Invalid JSON format");
        res.status(400).json(response);
        return;
    }

    if (err instanceof ZodError) {
        const errors = err.errors.reduce((acc: Record<string, string>, curr) => {
        const path = curr.path.join(".");
        acc[path] = curr.message;
        return acc;
    }, {});

    const response = ResponseHelper.error("Validation failed", errors);
    res.status(400).json(response);
    return;
  }

    if (err instanceof ValidationError) {
        const response = ResponseHelper.error(err.message);
        res.status(400).json(response);
        return;
    }
    
    if(err instanceof NotFoundError){
        const response = ResponseHelper.error(err.message);
        res.status(404).json(response);
        return;
    }

    if(err instanceof UnauthorizedError){
        const response = ResponseHelper.error(err.message);
        res.status(401).json(response);
        return;
    }

    if (err instanceof BadRequestError) {
        const response = ResponseHelper.error(err.message);
        res.status(400).json(response);
        return;
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002":
            res.status(400).json(ResponseHelper.error("Email or username already exists"));
            return;
            case "P2025":
            res.status(404).json(ResponseHelper.error("Resource not found"));
            return; 
        }
    }   
    const response = ResponseHelper.error("Internal server error");
    res.status(500).json(response);
}