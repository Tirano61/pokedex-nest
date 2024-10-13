
export interface HttpAdapter{
    get<T>(ulr: string): Promise<T>; 
}