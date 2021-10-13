export declare type UserTokenRole = {
    id: string;
    role: string;
    audiences: Array<string>;
};
export declare type Token = {
    token: string;
    refreshToken: string;
    expiresIn: number;
    type: string;
};
export declare enum Role {
    ADMIN = "admin",
    BASIC = "basic"
}
export declare type User = {
    id: string;
    email: string;
    role: string;
    lastName: string;
    firstName: string;
};
export interface PaginatationResponse {
    pageSize: number;
    offset: number;
    sortBy: string;
    order: string;
    total: number;
    count: number;
}
export interface UserList extends PaginatationResponse {
    users: Array<User>;
}
export declare type MeResponse = {
    id: string;
    role: string;
};
export declare type CreateNFTResponse = {
    id: string;
};
export declare type CreateNFTRequest = {
    name: string;
    assetAddress: string;
    slug: string;
    euroPriceInCents: number;
    liveAt: string;
    description: string;
    designerName: string;
    designerSlug: string;
    story: string;
    imageUrls: string[];
    coverVideoUrl: string;
    coverImageUrl: string;
    glbUrl: string;
    usdzUrl: string;
    ogImageUrl: string;
    meta: string;
};
export declare type UpdateNFTRequest = {
    id: string;
    name: string;
    assetAddress: string;
    slug: string;
    euroPriceInCents: number;
    liveAt: string;
    description: string;
    designerName: string;
    designerSlug: string;
    story: string;
    imageUrls: string[];
    coverVideoUrl: string;
    coverImageUrl: string;
    glbUrl: string;
    usdzUrl: string;
    ogImageUrl: string;
    meta: string;
};
export declare type CreateUCTRequest = {
    title: string;
    icon: string;
    productPageText: string;
    image: string;
    text: string;
    ctaLabel: string;
    ctaLink: string;
};
export declare type CreateUsecaseRequest = {
    templateId: string;
    title: string;
    icon: string;
    productPageText: string;
    image: string;
    text: string;
    ctaLabel: string;
    ctaLink: string;
};
export declare type Usecase = {
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
};
export declare type UCT = {
    id: string;
    title: string;
    icon: string;
    productPageText: string;
    image: string;
    text: string;
    ctaLabel: string;
    ctaLink: string;
};
export declare type UpdateUCTRequest = {
    title: string;
    icon: string;
    productPageText: string;
    image: string;
    text: string;
    ctaLabel: string;
    ctaLink: string;
};
export declare type NFT = {
    id: string;
    name: string;
    assetAddress: string;
    slug: string;
    euroPriceInCents: number;
    liveAt: string;
    description: string;
    designerName: string;
    designerSlug: string;
    story: string;
    imageUrls: string[];
    coverVideoUrl: string;
    coverImageUrl: string;
    glbUrl: string;
    usdzUrl: string;
    ogImageUrl: string;
    meta: string;
};
