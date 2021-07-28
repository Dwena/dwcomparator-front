export interface TrainingCenter{
    id: number;
    name: string;          //orsys
    baseSiteUrl: string;         //https://www.orsys.fr
    searchUrl: string;
    searchFormMethod: string;
    searchParameters: string;
    indexingFrequency: number;
    pricesIncludingTaxes: boolean;
    logoFilePath: string;
}
