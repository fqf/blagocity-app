export type TGetAccessibilityResponse = {
  guid: string;
  code: string;
  name: string;
  maxPoints: number;
  sortOrder: number;
};

type TGetAccessibilityListResponse = TGetAccessibilityResponse[];

export default TGetAccessibilityListResponse;
