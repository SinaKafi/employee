import CustomInput from "@/components/common/CustomInput";
import SVGChevronLeft from "@/components/svgs/SVGChevronLeft";
import useApi from "@/hooks/useQuery";
import { services } from "@/services";
import { Button, Text } from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const EntryOtp = () => {
  const number = localStorage.getItem("number");
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue } = useForm();
  const { refetch, isLoading } = useApi({
    apiFetcher: services.loginServices.checkOtp,
    options: {
      autoFetch: false,
      onSuccess: (data) => {
        localStorage.removeItem("number");
        localStorage.setItem("token", data.data.access_token);
        navigate("/");
      },
    },
  });
  const submitHandler = ({ otp }: FieldValues) => {
    refetch({ mobile: number, otp: otp });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-col gap-8 w-full h-full justify-between space-y-18">
        <Text className="!text-right text-[20px] font-medium">
          کد تایید را وارد کنید{" "}
        </Text>
        <CustomInput
          size={"md"}
          labelProps={{
            variant: "sm-regular",
          }}
          label={`کد تایید برای شماره ${number} را وارد کنید`}
          description={
            <Text
              variant={"sm-regular"}
              onClick={() => navigate("/login/password")}
              className="!text-primary-500 flex items-center gap-4 text-sm font-normal !cursor-pointer"
            >
              ورود با رمز عبور <SVGChevronLeft width={14} />
            </Text>
          }
          descriptionProps={{
            as: "div",
          }}
          placeholder="ورودی"
          {...register("otp", {
            required: "otp is required",
            minLength: {
              value: 6,
              message: "otp must be 11 digits long",
            },
            maxLength: {
              value: 6,
              message: "otp must be 11 digits long",
            },
          })}
          value={watch("otp")}
          onChange={(e) => {
            let value = e.target.value;
            if (value.length <= 6) {
              setValue("otp", value, { shouldValidate: true });
            }
          }}
        />
        <div className="w-full flex flex-col  gap-8">
          <Text
            className="text-center !text-alpha-text20 "
            variant={"sm-regular"}
          >
            ارسال مجدد کد
          </Text>
          <Button
            isLoading={isLoading}
            isDisabled={isLoading || watch("otp")?.length != 6}
            size={"base"}
            type="submit"
          >
            ورود
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EntryOtp;
