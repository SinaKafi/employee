import CustomInput from "@/components/common/CustomInput";
import SVGChevronLeft from "@/components/svgs/SVGChevronLeft";
import useApi from "@/hooks/useQuery";
import { services } from "@/services";
import { Button, Text } from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const EntryNumber = () => {
  const navigate = useNavigate();
  const number = localStorage.getItem("number");

  const { register, handleSubmit, watch, setError, setValue, trigger } =
    useForm({
      defaultValues: {
        phoneNumber: number ?? "",
      },
      reValidateMode: "onChange",
    });
  const { refetch, isLoading } = useApi({
    apiFetcher: services.loginServices.loginUser,
    options: {
      autoFetch: false,
      onSuccess: () => {
        localStorage.setItem("number", watch("phoneNumber"));
        navigate("/login/otp");
      },
    },
  });
  const submitHandler = ({ phoneNumber }: FieldValues) => {
    refetch({ mobile: phoneNumber });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-col gap-8 w-full h-full justify-between space-y-18">
        <Text className="!text-right text-[18px] font-medium">
          برای سفارش غذا شماره همراه خود را وارد کنید.
        </Text>
        <CustomInput
          size={"md"}
          type="number"
          label={"تلفن همراه"}
          description={
            <Text
              variant={"sm-regular"}
              onClick={async () => {
                const isValid = await trigger("phoneNumber");
                if (isValid) {
                  localStorage.setItem("number", watch("phoneNumber"));
                  navigate("/login/password");
                } else {
                  setError(
                    "phoneNumber",
                    {
                      message: "intervalue",
                      type: "required",
                    },
                    {
                      shouldFocus: true,
                    }
                  );
                }
              }}
              className="!text-primary-500 flex items-center gap-4 text-sm font-normal !cursor-pointer"
            >
              ورود با رمز عبور <SVGChevronLeft width={14} />
            </Text>
          }
          descriptionProps={{
            as: "div",
          }}
          labelProps={{
            variant: "sm-regular",
          }}
          placeholder="******912"
          {...register("phoneNumber", {
            required: "Phone number is required",
            minLength: {
              value: 11,
              message: "Phone number must be 11 digits long",
            },
            maxLength: {
              value: 11,
              message: "Phone number must be 11 digits long",
            },
          })}
          onChange={(e) => {
            let value = e.target.value;
            if (value.length <= 11) {
              setValue("phoneNumber", value, { shouldValidate: true });
            }
          }}
        />
        <Button
          size={"base"}
          isLoading={isLoading}
          type="submit"
          isDisabled={!watch("phoneNumber")?.length || isLoading}
        >
          ادامه
        </Button>
      </div>
    </form>
  );
};

export default EntryNumber;
