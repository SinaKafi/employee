import { sidebarMenu } from "@/constants/sidebar";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom"; // React Router
import SidebarItem from "./sidebarItem";
import { motion } from "motion/react";
import SVGCaretDownFilled from "../svgs/SVGCaretDownFilled";
import SVGChevronLeft from "../svgs/SVGChevronLeft";
const Sidebar = ({ mustCollapse }: { mustCollapse: boolean }) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
  const navigate = useNavigate();

  const sidebarVariants = {
    open: { width: "240px", transition: { duration: 0.3 } },
    collapsed: { width: "80px", transition: { duration: 0.3 } },
  };
  const location = useLocation(); // For getting the current path

  return (
    <motion.div
      className="bg-white flex flex-col p-16 px-24 relative"
      initial={isOpen ? "open" : "collapsed"}
      animate={isOpen ? "open" : "collapsed"}
      variants={sidebarVariants}
    >
      {mustCollapse && (
        <div
          className="absolute bg-greyBlue p-3 !rounded-full flex items-center justify-center  left-0 -translate-x-1/2 cursor-pointer top-40"
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: isOpen ? 0 : 0 }}
            style={{ marginLeft: "auto" }}
          >
            <SVGChevronLeft
              className={`  transition-all ${isOpen ? "rotate-180" : ""}`}
            />{" "}
          </motion.div>
        </div>
      )}

      {isOpen ? (
        <>
          <div className="flex flex-col w-full gap-y-lg my-24">
            {sidebarMenu.map((item) => {
              if (item.children) {
                return (
                  <Accordion
                    allowToggle
                    key={`sidebar-child-wrapper-${item?.route}-main`}
                  >
                    <AccordionItem border={"none"}>
                      {({ isExpanded }) => (
                        <>
                          <AccordionButton
                            onClick={(e) => e.stopPropagation()}
                            p={"0"}
                            rounded={"lg"}
                            _hover={{
                              bg: "alpha.sidebarMain",
                            }}
                          >
                            <SidebarItem {...item} />
                            <motion.div
                              initial={{ rotate: 0 }}
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              style={{ marginLeft: "auto" }}
                            >
                              <SVGCaretDownFilled />
                            </motion.div>
                          </AccordionButton>
                          {item.children?.map((child, index) => (
                            <AccordionPanel
                              key={`sidebar-item-children-${child?.route}-child`}
                              p={"0"}
                              pr={"4"}
                            >
                              <SidebarItem
                                {...child}
                                isChild
                                length={item.children?.length}
                                index={index + 1}
                              />
                            </AccordionPanel>
                          ))}
                        </>
                      )}
                    </AccordionItem>
                  </Accordion>
                );
              }

              return (
                <SidebarItem
                  key={`sidebar-item-${item?.route}-main`}
                  {...item}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex flex-col my-24 items-center justify-center">
          <div className="flex flex-col w-full gap-y-lg">
            {sidebarMenu.map((item) => {
              const { route, name, Icon, children } = item;
              const isActive =
                item.route == "/"
                  ? location.pathname == item.route
                  : location.pathname.includes(item.route); // Check if the route matches the current path
              if (children) {
                return (
                  <Menu key={`menu-${route}`} placement="right">
                    <MenuButton className="!border-none">
                      {Icon && <Icon width={32} height={32} />}
                    </MenuButton>
                    <MenuList>
                      {children.map((child) => (
                        <MenuItem
                          key={`menu-item-${child.route}`}
                          className="group flex  items-end"
                          onClick={() => navigate(child.route)} // React Router navigation
                        >
                          <Text className="group-hover:text-primary-500 !text-end">
                            {child.name}
                          </Text>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                );
              }
              return (
                <div className="cursor-pointer" key={`menu-item-${route}`}>
                  <Tooltip label={name}>
                    <Menu placement="right">
                      <MenuButton
                        className="!border-none"
                        onClick={() => navigate(route)}
                      >
                        {Icon && (
                          <Icon
                            width={32}
                            height={32}
                            className={`${isActive && "text-primary-500"}`}
                          />
                        )}
                      </MenuButton>
                    </Menu>
                  </Tooltip>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Sidebar;
