import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import MyModal from "@/components/typographi/modal";
import useApi from "@/hooks/useQuery";
import { services } from "@/services";
import useMyStore from "@/store/store";
import { Button, Text, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type pageProps = {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
};
const AddUserModal: React.FC<pageProps> = (props) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const {
    state: {
      userData: { companyData },
    },
  } = useMyStore((state) => state.userSlice);

  const formField = [
    {
      name: "name",
      label: "نام",
      placeholder: "نام را وارد کنید",
      type: "text",
    },
    {
      name: "family",
      label: "نام خانوادگی",
      placeholder: "نام خانوادگی",
      type: "text",
    },
    {
      name: "code",
      label: "شماره پرسنلی",
      placeholder: "شماره پرسنلی را وارد کنید",
      type: "number",
    },
    {
      name: "mobile",
      label: "شماره موبایل",
      placeholder: "شماره موبایل را وارد کنید",
      type: "number",
    },
    {
      name: "address_id",
      label: "آدرس شرکت",
      placeholder: "ادرس خود را وارد کنید",
      type: "select",
    },
  ];
  useEffect(() => {
    if (!props.isOpen) {
      reset();
    }
  }, [props.isOpen]);
  const toast = useToast();

  const { refetch, isLoading } = useApi({
    apiFetcher: services.userServices.addEmployeeList,
    options: {
      params: {
        name: watch("name"),
        family: watch("family"),
        code: watch("code"),
        mobile: watch("mobile"),
        address_id: watch("address_id"),
      },
      autoFetch: false,
      onSuccess(data) {
        toast({
          title: `${data.messages[0]}`,
          position: "top",
          isClosable: true,
        });
        props.refetch();
        reset();
        props.onClose();
      },
    },
  });

  return (
    <MyModal {...props} size={"4xl"} header="افزودن پرسنل جدید">
      <div className="flex flex-col gap-24 px-8 py-4">
        <div className="w-full grid grid-cols-2 gap-16">
          {formField.map((item) =>
            item.type === "select" ? (
              <div
                className="col-span-2 flex flex-col w-full gap-sm"
                key={item.name}
              >
                <Text className="!text-sm !relative max-w-fit">
                  {item.label}
                </Text>
                <div>
                  <CustomSelect
                    placeholder={item.placeholder}
                    onChange={(value) => {
                      setValue(item.name, value);
                    }}
                    options={
                      companyData?.map((item) => ({
                        label: item.address,
                        value: String(item.id),
                      })) || []
                    }
                    value={watch(item.name)}
                  />
                </div>
              </div>
            ) : (
              <CustomInput
                key={item.name}
                className="!col-span-1"
                size={"md"}
                {...item}
                {...register(item.name, { required: true })}
              />
            )
          )}
        </div>
        <div className="w-full flex items-end ">
          <Button
            type="submit"
            className="!px-32 mr-auto"
            isLoading={isLoading}
            disabled={
              !watch("name") ||
              !watch("family") ||
              !watch("code") ||
              !watch("mobile") ||
              !watch("address_id")
            }
            onClick={handleSubmit(() => {
              refetch();
            })}
          >
            ثبت
          </Button>
        </div>
      </div>
    </MyModal>
  );
};

export default AddUserModal;
