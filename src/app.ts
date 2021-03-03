import 'reflect-metadata';
import express from 'express';
import "express-async-errors";
import createConnection from "./database";
import { router } from './routes';
import { NextFunction } from 'connect';
import { AppError } from './errors/AppErros';
import { Request, Response } from 'express';


createConnection();
const app = express();

/**
 * GET => Busca
 * POST => Enviar, Salvar
 * PUT => Alterar
 * DELETE => Deletar
 * PATCH => Alteração específica
 */

app.use(express.json());

app.use(router);

app.use(
    (err: Error, request: Request, response: Response, _next: NextFunction) => {

        if (err instanceof AppError) {
            return response.status(err.statuscode).json(
                {
                    message: err.message,
                });
        }

        return response.status(500).json({
            status: "Error",
            message: `Internal server error ${err.message}`,
        });
    })




export { app };