import { Either } from "purify-ts/Either";
import Exception from "./errors/Exception";

// Define a interface for use cases.
export default interface UseCase<Type, Params> {
    call(params: Params): Promise<Either<Exception, Type>>;
}