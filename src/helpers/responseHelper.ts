import { ApiResponse, Pagination } from "@/types/Responses";

export class ResponseHelper {
    static success<T>(data:T, message = "Success", pagination?: Pagination): ApiResponse<T> {
        return {
            success: true,
            message,
            data,
            pagination
        }
    }

    static error(message: string, errors?:any): ApiResponse<null> {
        return {
            success: false,
            message,
            data: null,
            errors
        }
    }
}