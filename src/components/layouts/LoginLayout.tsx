import { Image, Text } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SVGChevronLeft from "../svgs/SVGChevronLeft";

export default function LoginLayout({ children }: PropsWithChildren) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen max-h-screen overflow-hidden grid grid-cols-1 lg:grid-cols-10 ">
      <div className="col-span-3  h-full bg-error-100 relative loginForm flex flex-col">
        <div className="h-170  flex items-start justify-end w-full max-w-[95%]">
          {location.pathname !== "/login" && (
            <Text
              onClick={() => navigate(-1)}
              className="!text-primary-500 flex items-center mt-50 gap-4 text-sm font-normal !cursor-pointer"
            >
              بازگشت <SVGChevronLeft width={14} />
            </Text>
          )}
        </div>
        <div className="p-10 w-full flex flex-col  space-y-60 h-full">
          <Image src="/logo.svg" alt="Logo" className="h-82" />
          <div className="flex flex-col gap-4  mx-auto  justify-start mb-8 w-[85%] ">
            {children}
          </div>
        </div>
      </div>
      <div className="col-span-7 relative">
        <Image
          loading="lazy"
          src="/cover.png"
          className="object-cover min-w-full h-full absolute top-0 left-0"
          alt="Cover Image"
        />
      </div>
    </div>
  );
}
