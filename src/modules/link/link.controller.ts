import { Request, Response } from "express";
import { LinkService } from "./link.service";
import { LinkCreateDTO, LinkUpdateDTO } from "./link.dto";
import { Pagination, RequestWithUser } from "@/types/Responses";
import { ResponseHelper } from "@/helpers/responseHelper";
import { IdValidator } from "@/validators/id.validator";
import { LinkQueryValidator } from "@/validators/link.validator";

export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  async create(req: Request, res: Response) {
    const linkCreateDTO = req.body satisfies LinkCreateDTO;
    const { userId } = (req as RequestWithUser).user;
    const linkDTO = await this.linkService.create(userId, linkCreateDTO);
    const response = ResponseHelper.success(
      linkDTO,
      "Link created successfully"
    );
    res.status(201).json(response);
  }

  async getAll(req: Request, res: Response) {
    const { page, pageSize, isActive } = LinkQueryValidator.parse(req.query);
    const { userId } = (req as RequestWithUser).user;
    const {links, total} = await this.linkService.getAll(userId, page, pageSize, isActive);
    const totalPages = Math.ceil(total / pageSize);
    const pagination: Pagination = { page, pageSize, totalResults: total, totalPages };
    const response = ResponseHelper.success(
      links,
      "Links retrieved successfully",
      pagination
    );
    res.status(200).json(response);
  }

  async update(req: Request, res: Response) {
    const { userId } = (req as RequestWithUser).user;
    const id = IdValidator.parse(req.params.id);
    const dto = req.body satisfies LinkUpdateDTO;
    
    const updated = await this.linkService.update(userId, id, dto);
    const response = ResponseHelper.success(
      updated,
      "Link updated successfully"
    );
    res.status(200).json(response);
  }

  async delete(req: Request, res: Response) {
    const { userId } = (req as RequestWithUser).user;
    const id = IdValidator.parse(req.params.id);
    await this.linkService.delete(userId, id);
    res.status(204).send();
  }
}
