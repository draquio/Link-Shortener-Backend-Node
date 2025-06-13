import {prisma} from "@/config/prismaClient"

import { CreateUserDTO, UpdateUserDTO } from "./user.dto";
class UserRepository {
    async getAll(page:number, pageSize:number, isDeleted:boolean) {
        const skip = (page - 1) * pageSize;
        const take = pageSize;
        const [users, total] = await Promise.all([
            prisma.user.findMany({ where: { isDeleted }, skip, take, orderBy: { createdAt: 'desc' } }),
            prisma.user.count({ where: {isDeleted}})
        ])
        return {users, total};
    }

    async getByid(id:number) {
        return prisma.user.findUnique({ where: { id }})
    }
    async create(data:CreateUserDTO){
        return prisma.user.create({ data })
    }
    async update(id:number, data:UpdateUserDTO){
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

export default new UserRepository();