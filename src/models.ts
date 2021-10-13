export type UserTokenRole = {
    id: string 
    role: string
    audiences: Array<string>
}

export type Token = {
    token: string
    refreshToken: string
    expiresIn: number
    type: string
}

export enum Role {
    ADMIN = "admin",
    BASIC = "basic"
}

export type User = {
    id: string
    email: string
    role: string
    lastName: string
    firstName: string
}

export interface PaginatationResponse {
    pageSize: number
    offset: number
    sortBy: string
    order: string
    total: number
    count: number
}

export interface UserList extends PaginatationResponse {
    users: Array<User>
}

export type MeResponse = {
    id: string
    role: string
}

export type CreateNFTResponse = {
    id: string
}

export type CreateNFTRequest = {
    name: string,
    assetAddress: string,
    slug: string,
    euroPriceInCents: number,
    liveAt: string,
    description: string,
    designerName: string,
    designerSlug: string,
    story: string,
    imageUrls: string[],
    coverVideoUrl: string,
    coverImageUrl: string,
    glbUrl: string,
    usdzUrl: string,
    ogImageUrl: string,
    meta: string
}


export type UpdateNFTRequest = {
    id: string,
    name: string,
    assetAddress: string,
    slug: string,
    euroPriceInCents: number,
    liveAt: string,
    description: string,
    designerName: string,
    designerSlug: string,
    story: string,
    imageUrls: string[],
    coverVideoUrl: string,
    coverImageUrl: string,
    glbUrl: string,
    usdzUrl: string,
    ogImageUrl: string,
    meta: string
}


export type CreateUCTRequest = {
    title: string;
    icon: string;
    productPageText: string;
    image: string;
    text: string;
    ctaLabel: string;
    ctaLink: string;
}



export type CreateUsecaseRequest = {
    templateId: string;
    title: string;
    icon: string;
    productPageText: string;
    image: string;
    text: string;
    ctaLabel: string;
    ctaLink: string;
}



export type Usecase = {
    id: string;
    itemId: string;
    templateId: string;
    title: string;
    icon: string;
    productPageText: string;
    image: string;
    text: string;
    ctaLabel: string;
    ctaLink: string;
}


export type UCT = {
    id: string;
    title: string;
    icon: string;
    productPageText: string;
    image: string;
    text: string;
    ctaLabel: string;
    ctaLink: string;
}


export type UpdateUCTRequest = {
    title: string;
    icon: string;
    productPageText: string;
    image: string;
    text: string;
    ctaLabel: string;
    ctaLink: string;
}


export type NFT = {
    id: string,
    name: string,
    assetAddress: string,
    slug: string,
    euroPriceInCents: number,
    liveAt: string,
    description: string,
    designerName: string,
    designerSlug: string,
    story: string,
    imageUrls: string[],
    coverVideoUrl: string,
    coverImageUrl: string,
    glbUrl: string,
    usdzUrl: string,
    ogImageUrl: string,
    meta: string
}
