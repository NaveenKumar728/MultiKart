export interface IUser {
    id: string;
    fullName: string,
    email: string,
    role: string,
    address: IAddress[],
    createdAt: Date,
    updatedAt: Date,
}

export interface IAddress {
    
}