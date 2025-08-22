import { useDispatch } from "react-redux";

import { validateFile } from "../utils";
import { uploadTypeItems } from "../utils/enum";
import { toastErrorMessage } from "../utils/toastMessage/toastMessage";
import {
  setLoadingFalseAction,
  setLoadingTrueAction,
} from "../redux/actions/loadingActions/loadingActions";
import { uploadUserService } from "../services/userServices";

const useUploadFile = () => {
  const dispatch = useDispatch();

  // Upload File
  const handleUploadFile = async (file, callback, destinationIndex = 0) => {
    const fileErrorMessage = validateFile(file);
    if (fileErrorMessage) return toastErrorMessage(fileErrorMessage);

    const objData = { file };
    const params = { destination: uploadTypeItems[destinationIndex] };

    try {
      dispatch(setLoadingTrueAction());
      const { status, data } = await uploadUserService(objData, params);
      if (status === 200) {
        !!callback && callback(data.result);
      }
    } catch ({ response }) {
      if (response && response.status)
        toastErrorMessage(response.data.resultMessage);
    } finally {
      dispatch(setLoadingFalseAction());
    }
  };

  return { handleUploadFile, validateFile };
};

export default useUploadFile;
