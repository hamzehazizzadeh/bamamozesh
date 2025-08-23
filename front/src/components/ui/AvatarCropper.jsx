import Cropper from "react-easy-crop";
import { useState } from "react";

import Icon from "./Icon";
import Modal from "./Modal";
import Button from "./Button";
import { convertDataURLtoFile } from "../../utils";
import { hostname } from "../../services/configServices/config";

const AvatarCropper = ({
  value,
  onChange,
  onRemove,
  base64,
  isEditMode = true,
}) => {
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const handleOnChange = (file) => {
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        onImageSelected(reader.result);
      };
    }
    document.getElementById(`upload-avatar`).value = "";
  };

  const onImageSelected = (selectedImg) => {
    setImage(selectedImg);
  };

  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onCropDone = (imgCroppedArea) => {
    const canvasEle = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;
    canvasEle.height = imgCroppedArea.height;

    const context = canvasEle.getContext("2d");
    let imageObj1 = new Image();
    imageObj1.src = image;

    imageObj1.onload = () => {
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      );

      const dataURL = canvasEle.toDataURL("image/jpeg");

      if (base64) {
        onChange(base64);
      } else {
        onChange(convertDataURLtoFile(dataURL, fileName));
      }
    };

    onCropReset();
  };

  const onCropReset = () => {
    setImage("");
    setFileName("");
  };

  return (
    <>
      <div className="flex justify-center items-center mb-3">
        <div className="relative">
          {value && isEditMode && (
            <span
              className="w-10 h-10 bg-red-600 rounded-full flex justify-center items-center absolute top-0 left-0 cursor-pointer"
              onClick={onRemove}
            >
              <Icon
                icon="solar:trash-bin-minimalistic-broken"
                className="text-white text-xl"
              />
            </span>
          )}

          <label
            htmlFor="upload-avatar"
            className="rounded-full flex justify-center items-center cursor-pointer"
            style={{
              width: 150,
              height: 150,
              border: "4px solid #ddd",
            }}
          >
            {value ? (
              <img
                className="w-full h-full rounded-full object-cover"
                alt=""
                src={`${hostname}${value}`}
              />
            ) : (
              <Icon icon="solar:camera-outline" className="text-xl" />
            )}
            {isEditMode && (
              <input
                type="file"
                id="upload-avatar"
                className="hidden"
                accept="image/,.jpg,.jpeg,.png;capture=camera"
                onChange={(e) => {
                  const file = e.target.files[0];
                  handleOnChange(file);
                }}
              />
            )}
          </label>
        </div>
      </div>

      <Modal
        title="برش تصویر"
        activeModal={!!image}
        onClose={onCropReset}
        footerContent={
          <div className="grid grid-cols-3 gap-3">
            <Button
              type="button"
              text="انصراف"
              onClick={onCropReset}
              className="btn btn-danger col-span-1 text-center"
            />

            <Button
              type="button"
              text="برش و ثبت"
              className="btn btn-primary col-span-2 text-center"
              onClick={() => onCropDone(croppedArea)}
            />
          </div>
        }
      >
        <input
          type="range"
          min="1"
          max="5"
          step="0.05"
          className="w-full accent-blue-600"
          value={zoom}
          onChange={(e) => setZoom(+e.target.value)}
        />

        <div className="relative w-full h-[300px] my-4 overflow-hidden rounded-lg bg-gray-100">
          <Cropper
            image={image}
            aspect={1 / 1}
            crop={crop}
            zoom={zoom}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            cropShape="round"
            showGrid={false}
          />
        </div>
      </Modal>
    </>
  );
};

export default AvatarCropper;
