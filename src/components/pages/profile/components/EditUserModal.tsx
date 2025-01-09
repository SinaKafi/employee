import CustomInput from "@/components/common/CustomInput";
import MyModal from "@/components/typographi/modal";
import useMyStore from "@/store/store";
import { Avatar, Button, Text } from "@chakra-ui/react";
import { ExecOptionsWithStringEncoding } from "child_process";
import React, { useEffect, useRef } from "react";
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

  const fileInputRef = useRef(null);
  const { register, handleSubmit, reset, setValue, watch } =
    useForm<FormValues>({
      defaultValues: {
        name: name ?? "",
        family: family ?? "",
        image: image ?? "",
      },
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
  useEffect(() => {
    if (!props.isOpen) {
      reset();
    }
  }, [props.isOpen]);

  return (
    <MyModal {...props} size={"2xl"} header="ویرایش اطلاعات" isCentered>
      <form
        className="flex flex-col gap-24 p-16"
        onSubmit={handleSubmit(() => {})}
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
                    src={watch("image")}
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
                        if (reader.result) {
                          setValue("image", reader.result as string);
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
          <Button type="submit" className="!px-32 mr-auto">
            ثبت تغییرات
          </Button>
        </div>
      </form>
    </MyModal>
  );
};
export default EditUserModal;
