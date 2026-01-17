
export interface PlanProp {
  id: number;
  name: string;
  price: number;
  roi: number;
  maximumReturn: number;
  validity: number;
  active: boolean;
  idxOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlanSettingProp {
  id: number;
  maxActivePlanLimit: number;
  referralDepthLevel: number;
  firstRoiIncome: number;
  roiIncomeDay: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ReferralSettingProp {
  id: number;
  level: number;
  percentage: number;
  createdAt: Date;
  updatedAt: Date;
}
