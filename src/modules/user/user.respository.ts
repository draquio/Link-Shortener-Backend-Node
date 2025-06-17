import { prisma } from "@/config/prismaClient"
import { Prisma } from "@prisma/client";

export class UserRepository {
    async getAll(page:number, pageSize:number, isDeleted:boolean) {
        const skip = (page - 1) * pageSize;
        const take = pageSize;
        const [users, total] = await Promise.all([
            prisma.user.findMany({ where: { isDeleted }, skip, take, orderBy: { createdAt: 'asc' } }),
            prisma.user.count({ where: {isDeleted}})
        ])
        return {users, total};
    }

    async getById(id:number) {
        return prisma.user.findUnique({ where: { id }})
    }
    async getByEmail(email:string) {
        return prisma.user.findUnique({ where: { email }})
    }
    async create(data:Prisma.UserCreateInput){
        return prisma.user.create({ data })
    }
    async update(id:number, data:Prisma.UserUpdateInput){
        return prisma.user.update({
            where: { id },
            data
        })
    }
    async softDelete(id:number){
        return prisma.user.update({
            where: { id },
            data: { isDeleted: true }
        })
    }
}
