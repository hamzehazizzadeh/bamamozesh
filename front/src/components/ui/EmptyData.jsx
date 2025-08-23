import Icon from "./Icon";

const EmptyData = ({ title = "داده ای برای نمایش یافت نشد" }) => {
  return (
    <div className="flex justify-center">
      <div className="w-full sm:w-8/12 md:w-6/12 lg:w-4/12">
        <div className="text-center py-4 mt-4 rounded-lg text-gray-500">
          <Icon icon="solar:cloud-cross-broken" className="text-6xl" />

          <p className="mt-3 font-bold">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyData;
