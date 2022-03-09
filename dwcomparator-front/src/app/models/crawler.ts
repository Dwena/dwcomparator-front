import { TrainingCenter } from "./trainingCenter";

export interface Crawler{
    id: number;
    version: number;
    startDate: Date;
    endDate: Date;
    indexedPages: number;
    trainingCenter: TrainingCenter;
    errorLog: string;
}

