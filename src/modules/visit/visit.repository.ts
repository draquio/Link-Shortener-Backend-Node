import { prisma } from "@/config/prismaClient";
import { VisitEntity } from "./visit.entity";


export class VisitRepository {
    async create(data:VisitEntity){
        return await prisma.visit.create({ data });
    }
}