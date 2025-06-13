export class NotFoundError extends Error {
    constructor(resource: string = "Resource", id?: number | string){
        const message = id ? `${resource} with ID ${id} not found` : `${resource} not found`;
        super(message),
        this.name= "Not Found Error"
    }
}