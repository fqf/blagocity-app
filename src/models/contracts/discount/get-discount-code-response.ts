type TGetDiscountCodeResponse = {
  data: {
    code: string;
    end_date: string;
  };
  message: string;
  status: "success" | "error";
};

export default TGetDiscountCodeResponse;
