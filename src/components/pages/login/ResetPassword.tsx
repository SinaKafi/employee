import CustomInput from "@/components/common/CustomInput";
import useApi from "@/hooks/useQuery";
import { services } from "@/services";
import { Button, Text } from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  const number = localStorage.getItem("number");

  const { refetch, isLoading } = useApi({
    apiFetcher: services.loginServices.forgetPassword,
    options: {
      autoFetch: false,
      onSuccess: () => {
        localStorage.setItem("number", watch("phoneNumber"));
        navigate("/login/password/new");
      },
    },
  });

  const { handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      phoneNumber: number ?? "",
    },
    reValidateMode: "onChange",
  });

  const submitHandler = ({ phoneNumber }: FieldValues) => {
    refetch({ mobile: phoneNumber });
  };
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-col gap-8 w-full h-full justify-between space-y-33">
        <Text className="!text-right text-[18px] font-medium">
          تغییر رمز عبور{" "}
        </Text>
        <CustomInput
          size={"md"}
          type="number"
          labelProps={{
            variant: "sm-regular",
          }}
          label={`برای تغییر رمز عبور، شماره موبایل خود را وارد کنید`}
          placeholder="******912"
          onChange={(e) => {
            const number = e.target.value;
            if (number.length <= 11) {
              setValue("phoneNumber", number);
            }
          }}
          value={watch("phoneNumber")}
        />
        <Button size={"base"} type="submit" isLoading={isLoading}>
          تایید
        </Button>
      </div>
    </form>
  );
};

export default ResetPassword;
