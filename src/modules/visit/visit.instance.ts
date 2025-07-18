import { geoService } from "../geo/geo.instance";
import { linkRepository } from "../link/link.instance";
import { redisService } from "../redis/redis.instance";
import { VisitController } from "./visit.controller";
import { VisitRepository } from "./visit.repository";
import { VisitService } from "./visit.service";

const visitRepository = new VisitRepository();
const visitService = new VisitService(visitRepository, linkRepository, geoService, redisService);
const visitController = new VisitController(visitService);

export { visitRepository, visitService, visitController }