import { Router } from "express";
import { Prisma, PrismaClient } from "@prisma/client";


const router = Router();
const prisma = new PrismaClient();

router.get('/categories', async (req, res) => {
    const categories = await prisma.category.findMany();
    res.json(categories);
});



export { router };