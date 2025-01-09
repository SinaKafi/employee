import MyModal from "@/components/typographi/modal";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FindAddressFromMap from "./FindAddressFromMap";
import { Button, Text } from "@chakra-ui/react";
import CustomInput from "@/components/common/CustomInput";
import SVGChevronLeft from "@/components/svgs/SVGChevronLeft";
import useApi from "@/hooks/useQuery";
import { services } from "@/services";

type pageProps = {
  isOpen: boolean;
  onClose: () => void;
  id: null | number | string;
};
type formField = {
  name: "province" | "city" | "district" | "postcode" | "plaque" | "unit";
  label: string;
  placeholder: string;
  isRequired: boolean;
  isDisable?: boolean;
  type: string;
};
const EditAddressModal: React.FC<pageProps> = (props) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      province: "",
      city: "",
      district: "",
      postcode: "",
      plaque: "",
      unit: "",
      address: "",
      name: "",
      location: { lng: 0, lat: 0 },
      id: props.id ?? null,
    },
    reValidateMode: "onSubmit",
  });
  const isEdit = !!props.id;

  const { refetch, isLoading } = useApi({
    apiFetcher: isEdit
      ? services.companyServices.editAddress
      : services.companyServices.addAddress,
    options: {
      onSuccess() {
        reset();
        props.onClose();
      },
      autoFetch: false,
    },
  });
  const [itSubmitted, setItSubmitted] = useState(false);

  const formField: formField[] = [
    {
      name: "province",
      isDisable: true,
      label: "استان",
      placeholder: "استان",
      isRequired: true,
      type: "text",
    },
    {
      name: "city",
      isDisable: true,
      label: "شهر",
      placeholder: "شهر",
      isRequired: true,
      type: "text",
    },
    {
      name: "district",
      isDisable: true,
      label: "محله",
      placeholder: "محله",
      isRequired: true,
      type: "text",
    },
    {
      name: "postcode",
      label: "کد پستی",
      placeholder: "کد پستی",
      isRequired: true,
      type: "text",
    },
    {
      name: "plaque",
      label: "پلاک",
      placeholder: "پلاک",
      isRequired: true,
      type: "text",
    },
    {
      name: "unit",
      label: "واحد",
      placeholder: "واحد",
      isRequired: true,
      type: "text",
    },
  ];
  useEffect(() => {
    if (!props.isOpen) {
      reset();
      setItSubmitted(false);
    }
  }, [props.isOpen]);
  const renderFormField = (field: formField) => {
    const { name, label, placeholder, isRequired, type, isDisable } = field;

    return (
      <CustomInput
        key={name}
        {...register(name, { required: isRequired })}
        size="md"
        className="col-span-1"
        label={label}
        isDisabled={isDisable}
        required={isRequired}
        placeholder={placeholder}
        labelProps={{ variant: "sm-regular" }}
        type={type}
      />
    );
  };

  return (
    <MyModal
      isOpen={props.isOpen}
      onClose={props.onClose}
      size={"6xl"}
      header="ثبت آدرس جدید"
    >
      {itSubmitted ? (
        <form
          onSubmit={handleSubmit(() => {
            refetch({
              ...watch(),
              lat: String(watch("location.lat")),
              long: String(watch("location.lng")),
              id: String(props.id),
            });
          })}
          className="p-16 flex flex-col gap-1"
        >
          <div className="flex flex-col gap-8">
            <CustomInput
              {...register("address", { required: true })}
              size={"md"}
              className="w-full"
              label="نشانی پستی"
              required
              placeholder="نشانی پستی"
              labelProps={{
                variant: "sm-regular",
              }}
            />
            <Text
              className="mt-8 mb-48 cursor-pointer !text-primary-500 "
              onClick={() => setItSubmitted(false)}
            >
              اصلاح آدرس روی نقشه
              <SVGChevronLeft className="inline " />
            </Text>
          </div>

          <div className="w-full grid grid-cols-3 gap-32">
            <div className="col-span-3 grid grid-cols-2">
              <CustomInput
                {...register("name", { required: true })}
                size={"md"}
                className="col-span-1"
                label="اسم آدرس"
                required
                placeholder="اسم آدرس"
                labelProps={{
                  variant: "sm-regular",
                }}
              />
            </div>
            {formField.map(renderFormField)}
          </div>
          <div className="w-full mt-48 flex gap-10 justify-end">
            <Button
              className="!py-12 !px-60"
              variant={"outline"}
              onClick={() => {
                props.onClose();
              }}
            >
              <>انصراف</>
            </Button>
            <Button
              className="!px-60 !py-12"
              type="submit"
              isLoading={isLoading}
            >
              ثبت آدرس
            </Button>
          </div>
        </form>
      ) : (
        <div className="h-[70vh]">
          <FindAddressFromMap
            onSubmit={(value) => {
              setItSubmitted(true);
              setValue("address", value.address?.address);
              setValue("name", value.address?.penult);
              setValue("location", value.location);
              setValue("province", value.address?.province);
              setValue("city", value.address?.city);
              setValue("district", value.address?.district);
              setValue("postcode", value.address?.postal_code);
            }}
          />
        </div>
      )}
    </MyModal>
  );
};
export default EditAddressModal;
