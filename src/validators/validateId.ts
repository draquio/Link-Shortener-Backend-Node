import { ValidationError } from "@/errors/ValidationError";

export const validateId = (idParam: string | undefined) => {
    if(!idParam) throw new ValidationError("ID is required");
    const id = parseInt(idParam, 10);
    if(isNaN(id) || id <= 0) throw new ValidationError("Invalid ID");

    return id;
}