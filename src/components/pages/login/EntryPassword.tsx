import CustomInput from "@/components/common/CustomInput";
import SVGChevronLeft from "@/components/svgs/SVGChevronLeft";
import SVGEye from "@/components/svgs/SVGEye";
import SVGEyeClose from "@/components/svgs/SVGEyeClose";
import useApi from "@/hooks/useQuery";
import { services } from "@/services";
import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const EntryPassword = () => {
  const navigate = useNavigate();
  const [isVisible, setVisibility] = useState(false);

  const { register, handleSubmit } = useForm();
  const number = localStorage.getItem("number");

  const { refetch, isLoading } = useApi({
    apiFetcher: services.loginServices.loginByPassword,
    options: {
      autoFetch: false,
      onSuccess: (data) => {
        localStorage.removeItem("number");
        localStorage.setItem("token", data.data.access_token);
        navigate("/");
      },
    },
  });

  const submitHandler = ({ password }: FieldValues) => {
    refetch({ mobile: number, password: password });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-col gap-8 w-full h-full justify-between space-y-18">
        <Text className="!text-right text-[20px] font-medium">
          رمز عبور را وارد کنید{" "}
        </Text>
        <CustomInput
          labelProps={{
            variant: "sm-regular",
          }}
          size={"md"}
          type={isVisible ? "text" : "password"}
          leftElement={
            <div
              className="cursor-pointer "
              onClick={() => setVisibility(!isVisible)}
            >
              {isVisible ? (
                <SVGEye className="mb-6 !text-alpha-text10" />
              ) : (
                <SVGEyeClose className="mb-6 !text-alpha-text10" />
              )}
            </div>
          }
          description={
            <div className="flex flex-col">
              <Text
                variant={"sm-regular"}
                onClick={() => navigate("/login/otp")}
                className="!text-primary-500 flex items-center gap-4 text-sm font-normal !cursor-pointer"
              >
                ورود با رمز یکبار مصرف
                <SVGChevronLeft width={14} />
              </Text>
              <Text
                variant={"sm-regular"}
                onClick={() => navigate("/login/password/reset")}
                className="!text-primary-500 flex items-center gap-4 text-sm font-normal !cursor-pointer"
              >
                فراموشی رمز عبور
                <SVGChevronLeft width={14} />
              </Text>
            </div>
          }
          descriptionProps={{
            as: "div",
          }}
          {...register("password", { required: true })}
        />
        <Button size={"base"} type="submit" isLoading={isLoading}>
          تایید
        </Button>
      </div>
    </form>
  );
};

export default EntryPassword;
