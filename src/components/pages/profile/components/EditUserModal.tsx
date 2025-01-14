import CustomInput from "@/components/common/CustomInput";
import MyModal from "@/components/typographi/modal";
import useCurrentUser from "@/hooks/useCurrentUser";
import useApi from "@/hooks/useQuery";
import { services } from "@/services";
import useMyStore from "@/store/store";
import { Avatar, Button, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

type pageProps = {
  isOpen: boolean;
  onClose: () => void;
};
interface FormValues {
  name: string;
  family: string;
  image: string;
}

type names = "name" | "family" | "image";
interface formDatas {
  name: names;
  label: string;
  placeholder: string;
  type: string;
}
const EditUserModal: React.FC<pageProps> = (props) => {
  const { name, family, image } = useMyStore(
    (state) => state.userSlice.state.userData.profileData
  );
  const toast = useToast();
  const [isFromApi, setIsFromApi] = useState(true);
  const { refetch: uploadImage } = useApi({
    apiFetcher: services.userServices.saveImage,
    options: {
      autoFetch: false,
      onSuccess(data) {
        setValue("image", data.data[0]);
        setIsFromApi(true);
      },
      onError() {
        setIsFromApi(true);
        setValue("image", image);

        toast({
          title: " متاسفانه با خطا مواجح شد",
          status: "warning",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
      },
    },
  });

  const fileInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isDirty },
  } = useForm<FormValues>({
    defaultValues: {
      name: name ?? "",
      family: family ?? "",
      image: image ?? "",
    },
    reValidateMode: "onChange",
  });
  const formField: formDatas[] = [
    {
      name: "name",
      label: "نام ",
      placeholder: "نام ",
      type: "text",
    },
    {
      name: "family",
      label: " نام خانوادگی",
      placeholder: " نام خانوادگی",
      type: "text",
    },
    {
      name: "image",
      label: " نام خانوادگی",
      placeholder: " نام خانوادگی",
      type: "text",
    },
  ];
  const { refetch } = useCurrentUser();

  useEffect(() => {
    if (!props.isOpen) {
      reset();
    }
  }, [props.isOpen]);

  const { refetch: editUser, isLoading } = useApi({
    apiFetcher: services.userServices.editUser,
    options: {
      autoFetch: false,
      onSuccess() {
        refetch();
        props.onClose();
        reset();
      },
    },
  });
  return (
    <MyModal {...props} size={"2xl"} header="ویرایش اطلاعات" isCentered>
      <form
        className="flex flex-col gap-24 p-16"
        onSubmit={handleSubmit(() => {
          editUser({
            name: watch("name"),
            family: watch("family"),
            image: watch("image"),
          });
        })}
      >
        <div className="w-full grid grid-cols-2 gap-16">
          {formField.map((item) =>
            // item.name === "address" ? (
            //   <div className="col-span-2 flex flex-col w-full gap-sm">
            //     <Text className="!text-sm !relative max-w-fit">
            //       {item.label}
            //     </Text>
            //     <div>
            //       <CustomSelect
            //         placeholder={item.placeholder}
            //         onChange={(value) => {
            //           setValue(item.name, value);
            //         }}
            //         options={[
            //           {
            //             label:
            //               "تهران، سعادت آباد، بالاتر از میدان کاج، خیابان صفایی منش ، نبش کوچه مختاری ، بلوک 144 ، پلاک15 ، واحد  10 طبقه همکف",
            //             value: "1",
            //           },
            //         ]}
            //         value={watch(item.name)}
            //       />
            //     </div>
            //   </div>
            // ) :
            item.name == "image" ? (
              <div className="flex flex-col gap-5">
                <Text variant={"sm-regular"}>بارگزاری عکس</Text>
                <div className="flex ">
                  <Avatar
                    src={
                      isFromApi
                        ? `http://193.151.151.66/${watch("image")}`
                        : watch("image")
                    }
                    className="inline !rounded-lg !w-78 !h-78 ml-8 !cursor-pointer imageAvatar"
                    onClick={() => {
                      fileInputRef?.current?.click();
                    }}
                  />
                  <div className="flex flex-col items-start justify-end h-full">
                    <Text variant="sm-regular" className="!text-alpha-text20">
                      حداکثر حجم: 5MB
                    </Text>
                    <Text variant="sm-regular" className="!text-alpha-text20">
                      فایل های مجاز: jpg، png، zip، pdf
                    </Text>
                  </div>{" "}
                </div>
                <input
                  ref={fileInputRef}
                  className="hidden"
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        console.log(file.size);
                        if (reader.result && file.size) {
                          uploadImage({ image: file });
                          setValue("image", reader.result as string);
                          setIsFromApi(false);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />{" "}
              </div>
            ) : (
              <div className={"!col-span-1"}>
                <CustomInput
                  size={"md"}
                  {...item}
                  {...register(item.name, { required: true })}
                  className={"col-span-1"}
                />
              </div>
            )
          )}
        </div>
        <div className="w-full flex items-end ">
          <Button
            type="submit"
            className="!px-32 mr-auto"
            isDisabled={!isDirty}
            isLoading={isLoading}
          >
            ثبت تغییرات
          </Button>
        </div>
      </form>
    </MyModal>
  );
};
export default EditUserModal;
