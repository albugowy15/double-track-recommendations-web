import { type AlternativeResponse } from "./alternative";

export interface SettingsResponse
  extends Omit<AlternativeResponse, "description"> {
  total_open_jobs: number;
  salary: number;
  entrepreneurship_opportunity: number;
}
