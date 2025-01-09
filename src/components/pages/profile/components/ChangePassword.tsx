import { Button, Heading } from "@chakra-ui/react";
import CustomInput from "@/components/common/CustomInput";
import { useReducer } from "react";
import SVGEye from "@/components/svgs/SVGEye";
import SVGEyeClose from "@/components/svgs/SVGEyeClose";
import useApi from "@/hooks/useQuery";
import { services } from "@/services";
import { useForm } from "react-hook-form";
type ResetPasswordState = {
  ["old_password"]: boolean;
  ["new_password"]: boolean;
  ["confirm_password"]: boolean;
};
const ChangePassword = () => {
  const [isVisible, setIsVisible] = useReducer(
    (state: ResetPasswordState, partial: Partial<ResetPasswordState>) => ({
      ...state,
      ...partial,
    }),
    {
      ["old_password"]: false,
      ["new_password"]: false,
      ["confirm_password"]: false,
    }
  );

  const { refetch, isLoading } = useApi({
    apiFetcher: services.userServices.ChangePasswordFromApp,
    options: {
      enabled: false,
      autoFetch: false,
    },
  });

  const method = useForm({
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const onSubmit = () => {
    refetch({
      confirm_password: method.getValues("confirm_password"),
      new_password: method.getValues("new_password"),
      old_password: method.getValues("old_password"),
    });
  };

  return (
    <div className="bg-white py-20 gap-32 rounded-lg">
      <div className="gap-20 grid">
        <Heading className="!text-18 !font-bold px-24 mb-20">
          تغییر رمز عبور
        </Heading>
        <form
          className="px-24 flex flex-col gap-16"
          onSubmit={method.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-3 gap-20">
            <CustomInput
              placeholder="رمز عبور"
              size={"md"}
              label={"رمز عبور فعلی"}
              labelProps={{
                variant: "sm-regular",
              }}
              {...method.register("old_password")}
              type={isVisible["old_password"] ? "text" : "password"}
              leftElement={
                <div
                  className="cursor-pointer "
                  onClick={() =>
                    setIsVisible({
                      ["old_password"]: !isVisible["old_password"],
                    })
                  }
                >
                  {isVisible["old_password"] ? (
                    <SVGEye className="mb-6 !text-alpha-text10" />
                  ) : (
                    <SVGEyeClose className="mb-6 !text-alpha-text10" />
                  )}
                </div>
              }
            />
            <CustomInput
              placeholder="رمز عبور"
              size={"md"}
              label={"رمز عبور جدید"}
              labelProps={{
                variant: "sm-regular",
              }}
              {...method.register("new_password", {
                required: "رمز عبور جدید الزامی است",
              })}
              type={isVisible["new_password"] ? "text" : "password"}
              leftElement={
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    setIsVisible({
                      ["new_password"]: !isVisible["new_password"],
                    })
                  }
                >
                  {isVisible["new_password"] ? (
                    <SVGEye className="mb-6 !text-alpha-text10" />
                  ) : (
                    <SVGEyeClose className="mb-6 !text-alpha-text10" />
                  )}
                </div>
              }
            />
            <CustomInput
              placeholder="رمز عبور"
              size={"md"}
              label={"تکرار رمز عبور جدید"}
              labelProps={{
                variant: "sm-regular",
              }}
              {...method.register("confirm_password", {
                required: "تکرار رمز عبور جدید الزامی است",
                validate: (value) =>
                  value === method.getValues("new_password") ||
                  "رمز عبور و تکرار آن یکسان نیستند",
              })}
              type={isVisible["confirm_password"] ? "text" : "password"}
              leftElement={
                <div
                  className="cursor-pointer "
                  onClick={() =>
                    setIsVisible({
                      ["confirm_password"]: !isVisible["confirm_password"],
                    })
                  }
                >
                  {isVisible["confirm_password"] ? (
                    <SVGEye className="mb-6 !text-alpha-text10" />
                  ) : (
                    <SVGEyeClose className="mb-6 !text-alpha-text10" />
                  )}
                </div>
              }
            />
          </div>
          <div className="mr-auto">
            <Button
              className="!px-32 !py-12"
              type={"submit"}
              isLoading={isLoading}
            >
              ثبت
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ChangePassword;
