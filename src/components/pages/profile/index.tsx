import ChangePassword from "./components/ChangePassword";
import ProfileInfo from "./components/profileInfo";

const ProfileDetail = () => {
  return (
    <div className=" max-h-[95vh] min-h-[95vh] overflow-scroll rounded-lg">
      <div className="w-full flex flex-col justify-between gap-24 min-h-fit pb-64">
        <ProfileInfo />
        <ChangePassword />
      </div>
    </div>
  );
};
export default ProfileDetail;
