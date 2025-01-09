import CustomInput from "@/components/common/CustomInput";
import SVGEye from "@/components/svgs/SVGEye";
import SVGEyeClose from "@/components/svgs/SVGEyeClose";
import useApi from "@/hooks/useQuery";
import { services } from "@/services";
import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const NewPassword = () => {
  const navigate = useNavigate();
  const [isVisible, setVisibility] = useState({ main: false, repeat: false });
  const form = useForm();

  const number = localStorage.getItem("number");

  const { refetch, isLoading } = useApi({
    apiFetcher: services.loginServices.ResetPassword,
    options: {
      autoFetch: false,
      onSuccess: () => {
        navigate("/login");
      },
    },
  });

  function submitHandler({ newPassword, otp }: FieldValues) {
    refetch({ mobile: number, newPassword, otp });
  }

  return (
    <form onSubmit={form.handleSubmit(submitHandler)}>
      <div className="flex flex-col gap-8 w-full h-full justify-between space-y-34">
        <div className="w-full flex flex-col space-y-24">
          {" "}
          <Text className="!text-right text-[20px] font-medium">
            تغییر رمز عبور{" "}
          </Text>
          <CustomInput
            required
            size={"md"}
            label={"رمز عبور جدید"}
            labelProps={{
              variant: "sm-regular",
            }}
            {...form.register("newPassword", { required: true })}
            type={isVisible.main ? "text" : "password"}
            leftElement={
              <div
                className="cursor-pointer "
                onClick={() =>
                  setVisibility((prev) => ({ ...prev, main: !prev.main }))
                }
              >
                {isVisible.main ? (
                  <SVGEye className="mb-6 !text-alpha-text10" />
                ) : (
                  <SVGEyeClose className="mb-6 !text-alpha-text10" />
                )}
              </div>
            }
          />
          <CustomInput
            labelProps={{
              variant: "sm-regular",
            }}
            size={"md"}
            showStar
            // {...form.register("otp", { required: true })}
            {...form.register("otp", {
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
            onChange={(e) => {
              let value = e.target.value;
              if (value.length <= 6) {
                form.setValue("otp", value);
              }
            }}
            value={form?.watch("otp")}
            label={"کد ارسالی "}
          />
        </div>
        <div className="w-full flex flex-col space-y-24">
          <Button
            size={"base"}
            type="submit"
            isLoading={isLoading}
            isDisabled={
              isLoading ||
              !form?.watch("otp")?.length ||
              !form?.watch("newPassword")?.length
            }
          >
            تغییر رمز
          </Button>
        </div>
      </div>
    </form>
  );
};

export default NewPassword;
