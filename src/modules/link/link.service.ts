import { generateShortCode } from "@/utils/shortCode";
import { LinkCreateDTO, LinkResponseDTO, LinkUpdateDTO } from "./link.dto";
import { LinkRepository } from "./link.repository";
import { LinkMapper } from "./link.mapper";
import { NotFoundError } from "@/errors/NotFoundError";
import { UnauthorizedError } from "@/errors/UnauthorizedError";

type GetLinksAndTotal = {links: LinkResponseDTO[]; total: number}
export class LinkService {
    constructor(private readonly linkRepository: LinkRepository){}

    async create(userId: number, linkDTO: LinkCreateDTO): Promise<LinkResponseDTO>{
        const shortCode = generateShortCode(4);
        const linkEntity = { ...linkDTO, shortCode };
        const link = await this.linkRepository.create(linkEntity, userId);
        return LinkMapper.toDTO(link);
    }

    async getAll(userId: number, page:number, pageSize:number, isActive?:boolean): Promise<GetLinksAndTotal> {
        const {links, total} = await this.linkRepository.getAllByUserId(userId, page, pageSize, isActive);
        const linksDTO = LinkMapper.toDTOList(links)
        return {links: linksDTO, total};
    }

    async delete(userId: number, linkId:number) {
        const link = await this.linkRepository.getById(linkId);
        if (!link) throw new NotFoundError("Link");
        if(link.userId !== userId) throw new UnauthorizedError("You do not have permission to delete this link");
        await this.linkRepository.delete(linkId);
    }
    async update(userId: number, linkId: number, linkDTO: LinkUpdateDTO){
        const link = await this.linkRepository.getById(linkId);
        if (!link) throw new NotFoundError("Link");
        if(link.userId !== userId) throw new UnauthorizedError("You do not have permission to update this link");
        const data = LinkMapper.toUpdateEntity(linkDTO);
        const linkUpdated = await this.linkRepository.update(linkId, data);
        return LinkMapper.toDTO(linkUpdated);
    }
}