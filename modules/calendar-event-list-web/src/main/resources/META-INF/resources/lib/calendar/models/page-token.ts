export const DEFAULT_PAGE_TOKEN: PageToken = {
    start: 0,
    pageSize: 8
};

export interface PageToken {
    start: number;
    pageSize: number;
}
