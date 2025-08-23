import Avatar from "./Avatar";
import UserInfoItem from "./UserInfoItem";

const UserInfoAvatar = ({ avatar, title, subTitle }) => {
  return (
    <div className="flex items-start space-x-3 rtl:space-x-reverse">
      <div className="flex-none">
        <Avatar src={avatar} alt={title} />
      </div>
      <UserInfoItem title={title} subTitle={subTitle} />
    </div>
  );
};

export default UserInfoAvatar;
