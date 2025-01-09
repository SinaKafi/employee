import Map from "@/components/common/map";
import SearchableInput from "@/components/common/SearchableSelect";
import SVGSearch from "@/components/svgs/SVGSearch";
import useDebounceEffect from "@/hooks/useDeboounceEffect";
import useApi from "@/hooks/useQuery";
import { services } from "@/services";
import { AddressData } from "@/services/map/map";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

let Inital_location = {
  lng: 51.34263372509213,
  lat: 35.70033241597743,
};
interface address extends AddressData {
  shortAddress: string;
}
type onSumbit = {
  itSubmitted: boolean;
  location: { lng: number; lat: number };
  address: address;
};
type pageProps = {
  onSubmit: (_: onSumbit) => void;
};
const FindAddressFromMap: React.FC<pageProps> = ({ onSubmit }) => {
  const [location, setLocation] = useState(Inital_location);
  const [inputValue, setInputValue] = useState(null);
  const [inInpuFocused, setInInpuFocused] = useState(null);

  const { refetch: refetchMapReverse, isLoading: reverseIsLoading } = useApi(
    {
      apiFetcher: services.mapServices.reversAddress,
      options: {
        params: {
          ...location,
          long: location.lng,
        },
        onSuccess(data) {
          setInputValue({ shortAddress: data.address_compact, ...data });
        },
      },
    },
    [location]
  );

  const {
    data: searchedData,
    refetch,
    isLoading: searchIsLoading,
  } = useApi({
    apiFetcher: services.mapServices.searchAddress,
    options: {
      autoFetch: false,
      onSuccess() {
        setInInpuFocused(false);
      },
    },
  });

  useDebounceEffect(
    () => {
      if (inputValue && inInpuFocused) {
        refetch({
          text: inputValue?.shortAddress,
        });
      }
    },
    [inputValue, inInpuFocused],
    300
  );
  useDebounceEffect(
    () => {
      if (location && location != Inital_location) {
        refetchMapReverse({
          long: location.lng,
          lat: location.lat,
        });
      }
    },
    [location],
    300
  );
  return (
    <div className="relative h-[70vh] w-full flex flex-col gap-16">
      <div className="absolute w-full top-25 z-[99] bg-white max-w-[75%] left-1/2 -translate-x-1/2 rounded-lg">
        <SearchableInput
          placeholder={inputValue?.shortAddress || "آدرس خود را وارد کنید"}
          value={inputValue?.shortAddress}
          onChange={(e) => {
            setInInpuFocused(true);

            setInputValue({ shortAddress: e.target.value });
          }}
          rightElement={<SVGSearch />}
          options={
            searchedData?.value?.map((item) => ({
              title: item.address,
              detail: item.title,
              value: item.geom,
            })) || []
          }
          onBlur={() => {
            setInInpuFocused(false);
          }}
          onResultSelect={(value) => {
            setLocation({
              lng: value.coordinates[0],
              lat: value.coordinates[1],
            });
          }}
          isLoading={searchIsLoading || reverseIsLoading}
        />
      </div>
      <div>
        <Map
          initialLocation={location}
          onLocationChange={(location) => setLocation(location)}
        />
      </div>
      <div className="w-full flex justify-end">
        <Button
          onClick={() => {
            onSubmit({
              itSubmitted: true,
              location: location,
              address: inputValue,
            });
          }}
        >
          ثبت آدرس
        </Button>
      </div>
    </div>
  );
};

export default FindAddressFromMap;
