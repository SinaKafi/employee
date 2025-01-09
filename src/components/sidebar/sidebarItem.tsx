import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // React Router
import { Text } from "@chakra-ui/react";
import { IbaseMenuItem } from "@/constants/sidebar";

interface ComponentProps {
  id: string | number;
  name: string;
  route: string;
  Icon?: React.ComponentType<{
    width: number;
    height: number;
    className?: string;
  }>;
  children?: IbaseMenuItem[];
  isChild?: boolean;
  length?: number;
  index?: number;
}

const SidebarItem: React.FC<ComponentProps> = (item) => {
  const location = useLocation(); // For getting the current path
  const navigate = useNavigate(); // For navigation
  const isActive =
    item.route == "/"
      ? location.pathname == item.route
      : location.pathname.includes(item.route); // Check if the route matches the current path
  const { name, route, Icon, isChild, length, index } = item;

  return (
    <div
      className={`group w-full grid grid-cols-6 items-center rounded-lg h-full px-lg gap-xs
        ${isChild == undefined && "hover:!bg-primary-opacity-5"}
        ${isActive && "bg-alpha-sidebarMain !text-primary-500"}
      `}
      onClick={() => navigate(route)} // React Router's navigate function
    >
      {Icon && (
        <Text className={`${isActive && " !text-primary-500"} col-span-2`}>
          <Icon
            width={32}
            height={32}
            className=" group-hover:!text-primary-500"
          />
        </Text>
      )}
      <Text
        variant={"md"}
        className={`whitespace-nowrap w-full col-span-4 flex items-start justify-start cursor-pointer  p-10 rounded-lg group-hover:!text-primary-500
        ${isChild == undefined && "group-hover:!bg-bg-primary-opacity-5"}
         ${isActive && "!text-primary-500"}

        `}
      >
        {name}
      </Text>

      {isChild && (
        <div
          className={`w-6 h-50 group-hover:bg-primary-300 bg-alpha-sidebarMain group-hover:rounded-t-lg group-hover:rounded-b-lg ${
            index === 1
              ? "rounded-t-lg mt-4"
              : index === length
                ? "rounded-b-lg mb-4"
                : ""
          } ${isActive && "bg-primary-500"}`}
        ></div>
      )}
    </div>
  );
};

export default SidebarItem;
