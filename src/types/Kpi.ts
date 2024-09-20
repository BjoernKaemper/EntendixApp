/**
 * Language string type
 * @typedef {Object} LangString
 * @property {string} en - The English language string
 * @property {string} de - The German language string
 */
export type LangString = {
  en: string;
  de: string;
};

/**
 * Calculation value type
 * @typedef {Object} CalculationValue
 * @property {string} PhysicalUnit - The physical unit of the calculation value
 * @property {string} CalculationType - The calculation type of the calculation value
 * @property {number} PresentValue - The present value of the calculation value
 */
export type CalculationValue = {
  PhysicalUnit: string;
  CalculationType: string;
  PresentValue: number;
};

/**
 * Accumulated values type
 * @typedef {Object} AccumulatedValues
 * @property {CalculationValue} AnnualValue - The annual value of the accumulated values
 * @property {CalculationValue} MonthlyValue - The monthly value of the accumulated values
 * @property {CalculationValue} DailyValue - The daily value of the accumulated values
 */
export type AccumulatedValues = {
  AnnualValue: CalculationValue;
  MonthlyValue: CalculationValue;
  DailyValue: CalculationValue;
};

/**
 * Property references type
 * @typedef {Object} PropertyReferences
 * @property {Array} BuildingSurface - The building surface property references
 * @property {Array} Waterconsumption - The water consumption property references
 */
export type PropertyReferences = {
  BuildingSurface: Array<any>; // TODO: Define type
  Waterconsumption: Array<any>; // TODO: Define type
};

/**
 * Annotation type
 * @typedef {Object} Annotation
 * @property {string} AnnotationText - The annotation text
 * @property {string} TimestampOfCreation - The timestamp of creation of the annotation
 * @property {string} ReferringTimestamp - The referring timestamp of the annotation
 * @property {string} Creator - The creator of the annotation
 * @property {boolean} MadeByEntendix - The annotation was made by Entendix
 * @property {boolean} MadeByAi - The annotation was made by AI
 * @property {boolean} MadeByUser - The annotation was made by the user
 * @property {string} AnnotationType - The annotation type
 */
export type Annotation = {
  AnnotationText: string;
  TimestampOfCreation: string;
  ReferringTimestamp: string;
  Creator: string;
  MadeByEntendix: boolean;
  MadeByAi: boolean;
  MadeByUser: boolean;
  AnnotationType: string;
};

/**
 * KPI type
 * @typedef {Object} KPI
 * @property {string} id - The unique identifier of the KPI
 * @property {Object} data - The data of the KPI
 * @property {LangString} data.name - The name of the KPI
 * @property {LangString} data.context - The context of the KPI
 * @property {CalculationValue} data.value - The value of the KPI
 * @property {AccumulatedValues} data.AccumulatedValues - The accumulated values of the KPI
 * @property {Array} data.ConstantVariables - The constant variables of the KPI
 * @property {PropertyReferences} data.PropertyReferences - The property references of the KPI
 * @property {Array} data.Limits - The limits of the KPI
 * @property {number} data.CalculationCycle - The calculation cycle of the KPI
 * @property {Array} data.Annotations - The annotations of the KPI
 */
export type Kpi = {
  id: string;
  data: {
    Name: LangString;
    Context: LangString;
    Value: CalculationValue;
    AccumulatedValues: AccumulatedValues;
    ConstantVariables: Array<any>; // TODO: Define type
    PropertyReferences: PropertyReferences;
    Limits: Array<string>; // TODO: Define type
    CalculationCycle: number;
    Annotations: Array<Annotation>;
  };
};
