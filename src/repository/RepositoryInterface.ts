
export interface RepositoryInterface<T> {
    findById(id:string): Promise<T>;
    findAll(): Promise<Array<T>>;
} 