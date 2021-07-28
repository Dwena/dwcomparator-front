import { TrainingCenter } from "./trainingCenter";

export interface urlToCrawl {
  id: number;
  version: number;
  trainingCenter: TrainingCenter;
  url: string;
  newUrl: false,
  preActions: null,
  preSessionsActions: null,
  subLevelNumber: number,
  searchExpressionByLevel: Object,
  referenceSearchExpression: string,
  titleSearchExpression: string,
  durationSearchExpression: string,
  priceSearchExpression: string,
  referenceReplaceExpression: string,
  titleReplaceExpression: string,
  durationReplaceExpression: string,
  priceReplaceExpression: string,
  trainingProgramSearchExpression: string,
  objectivesSearchExpression: string,
  prerequisitesSearchExpression: string,
  audienceSearchExpression: string,
  certificationSearchExpression: string,
  eligibleForCPFSearchExpression: string,
  trainingProgramReplaceExpression: string,
  objectivesReplaceExpression: string,
  prerequisitesReplaceExpression: string,
  audienceReplaceExpression: string,
  certificationReplaceExpression: string,
  eligibleForCPFReplaceExpression: string,
  startDateSearchExpression: string,
  endDateSearchExpression: string,
  locationSearchExpression: string,
  subscriptionUrlSearchExpression: string,
  sessionsReplaceExpression: string,
  startDateReplaceExpression: string,
  endDateReplaceExpression: string,
  locationReplaceExpression: string,
  subscriptionUrlReplaceExpression: string,
  fullUrl: string

}
