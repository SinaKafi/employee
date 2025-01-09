import {
  Heading,
  Text,
  Button,
  useDisclosure,
  Skeleton,
} from "@chakra-ui/react";
import SVGMapPinPlus from "@/components/svgs/SVGMapPinPlus";

import SVGTrash from "@/components/svgs/SVGTrash";
import SVGCurrentLocation from "@/components/svgs/SVGCurrentLocation";
import SVGEdit from "@/components/svgs/SVGEdit";
import EditAddressModal from "./EditAddressModal";
import { useState } from "react";
import useApi from "@/hooks/useQuery";
import { services } from "@/services";
import MyModal from "@/components/typographi/modal";
import useMyStore from "@/store/store";
const Address = () => {
  const addUserDisclosure = useDisclosure();
  const deleteUserDisclosure = useDisclosure();
  const {
    action,
    state: {
      userData: { companyData },
    },
  } = useMyStore((state) => state.userSlice);

  const [editId, setEditId] = useState(null);

  const { refetch, isLoading } = useApi(
    {
      apiFetcher: services.companyServices.addressList,
      options: {
        enabled: true,
        onSuccess(data) {
          action.setCompanyAddress(data.data);
        },
      },
    },
    [addUserDisclosure.isOpen]
  );

  const { refetch: deleteAdress, isLoading: deleteIsLoading } = useApi({
    apiFetcher: services.companyServices.deleteAddress,
    options: {
      autoFetch: false,
      onSuccess() {
        deleteUserDisclosure.onClose();
        refetch();
      },
    },
  });
  return (
    <div className="bg-white px-24 py-16 grid rounded-lg gap-24">
      <div className="flex justify-between items-start pb-16">
        <Heading className="!text-18 !font-medium">مدیریت آدرس ها</Heading>
        <Button variant={"outline"} onClick={addUserDisclosure.onToggle}>
          <SVGMapPinPlus /> افزودن ادرس جدید
        </Button>
      </div>
      <div className="grid gap-16">
        {(companyData || [1, 1, 1, 1, 1, 1, 1])?.map((item) => {
          return (
            <Skeleton
              isLoaded={!isLoading}
              key={item.id + "address" + item.name}
            >
              <div className="flex items-start justify-between border-b py-8">
                <div className="flex justify-between flex-col gap-4 max-w-[80%]">
                  <Text variant={"md"}>
                    <SVGCurrentLocation className="!text-primary-500 inline" />{" "}
                    {item.name}
                  </Text>

                  <Text variant={"md-regular"}>{item.address} </Text>
                </div>
                <div>
                  <SVGEdit
                    onClick={() => {
                      setEditId(item.id);
                      addUserDisclosure.onOpen();
                    }}
                    className="inline cursor-pointer ml-8 text-alpha-text20"
                  />
                  <SVGTrash
                    onClick={() => {
                      setEditId(item.id);
                      deleteUserDisclosure.onOpen();
                    }}
                    className="inline cursor-pointer text-alpha-text20"
                  />
                </div>
              </div>
            </Skeleton>
          );
        })}
      </div>
      <EditAddressModal {...addUserDisclosure} id={editId} />
      <MyModal {...deleteUserDisclosure} header=" حذف ادرس">
        <div className="w-full h-full flex flex-col items-center">
          <div>ابا از حدف مطمعن هستید؟</div>
          <div className="flex w-full items-center justify-center p-16 gap-16">
            <Button
              variant={"outline"}
              className="w-full"
              onClick={() => {
                deleteAdress({ id: editId });
              }}
              isLoading={deleteIsLoading}
            >
              بلی
            </Button>
            <Button
              className="w-full"
              onClick={() => deleteUserDisclosure.onClose()}
            >
              خیر
            </Button>
          </div>
        </div>
      </MyModal>
    </div>
  );
};
export default Address;
