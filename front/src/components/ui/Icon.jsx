import { Icon as Ic } from "@iconify/react";

const Icon = ({ icon, className, width, rotate, hFlip, vFlip }) => {
  return (
    <>
      <Ic
        width={width}
        rotate={rotate}
        hFlip={hFlip}
        icon={icon}
        className={className}
        vFlip={vFlip}
      />
    </>
  );
};

export default Icon;
