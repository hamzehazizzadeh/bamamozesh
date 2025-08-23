const UserInfoItem = ({ title, subTitle, className = "" }) => {
  return (
    <div>
      <span
        className={`text-sm text-gray-600 dark:text-gray-300 capitalize block ${className}`}
      >
        {title}
      </span>
      {subTitle && (
        <span
          className="text-xs text-gray-500 dark:text-gray-400 font-light mt-[1px] block lowercase"
          dir="auto"
          title={subTitle}
        >
          {subTitle}
        </span>
      )}
    </div>
  );
};

export default UserInfoItem;
