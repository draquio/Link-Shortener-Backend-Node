import { ShortCodeValidator } from "@/validators/shortCode.validator";
import { VisitService } from "./visit.service";
import { Request, Response } from "express";
import { VisitRegisterDTO } from "./visit.dto";
import { ResponseHelper } from "@/helpers/responseHelper";

export class VisitController {
    constructor(private readonly visitService: VisitService){}

    async processVisit(req: Request, res: Response){
        const shortCode = ShortCodeValidator.parse(req.params.shortcode);

        const userInfo: VisitRegisterDTO = {
            ip: req.ip,
            userAgent: req.headers["user-agent"],
            referrer: req.headers["referer"],
        }
        const link:string = await this.visitService.processVisit(shortCode, userInfo);
        const response = ResponseHelper.success(link, "URL retrieved successfully");
        res.status(200).json(response);
    }
}