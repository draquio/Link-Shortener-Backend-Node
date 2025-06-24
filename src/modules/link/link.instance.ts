import { LinkController } from "./link.controller";
import { LinkRepository } from "./link.repository";
import { LinkService } from "./link.service";



const linkRepository = new LinkRepository();
const linkService = new LinkService(linkRepository);
const linkController = new LinkController(linkService);

export { linkRepository, linkService, linkController }; 



