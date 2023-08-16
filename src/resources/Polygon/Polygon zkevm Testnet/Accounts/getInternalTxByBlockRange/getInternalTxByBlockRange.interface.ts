export interface ApiParams {
    module: string;
    action: string;
    startblock: number;
    endblock: number;
    page: number;
    offset: number;
    sort: string;
    apiKey: string;
}