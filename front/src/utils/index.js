import jwt from "jwt-decode";
import Cookies from "js-cookie";
import moment from "jalali-moment";
import { getShebaInfo, isShebaValid } from "@persian-tools/persian-tools";
import { isNumber } from "lodash";
import { hostname } from "../services/configServices/config";

//* Start Cookie
export const getCookies = (name) => {
  return Cookies.get(name);
};

export const removeCookies = (name, path = "/") => {
  return Cookies.remove(name, { path });
};

export const setCookies = (name, value, path = "/", expires = 7) => {
  return Cookies.set(name, value, { path, expires });
};
//* End Cookie

//* Start Number
const numberToWords = (num) => {
  const units = ["", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"];
  const teens = [
    "ده",
    "یازده",
    "دوازده",
    "سیزده",
    "چهارده",
    "پانزده",
    "شانزده",
    "هفده",
    "هجده",
    "نوزده",
  ];
  const tens = [
    "",
    "ده",
    "بیست",
    "سی",
    "چهل",
    "پنجاه",
    "شصت",
    "هفتاد",
    "هشتاد",
    "نود",
  ];
  const hundreds = [
    "",
    "صد",
    "دویست",
    "سیصد",
    "چهارصد",
    "پانصد",
    "ششصد",
    "هفتصد",
    "هشتصد",
    "نهصد",
  ];
  const thousands = ["", "هزار", "میلیون", "میلیارد", "تریلیون"];

  function convertHundreds(n) {
    if (n === 0) return "";
    else if (n < 10) return units[n];
    else if (n < 20) return teens[n - 10];
    else if (n < 100)
      return (
        tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " و " + units[n % 10] : "")
      );
    else
      return (
        hundreds[Math.floor(n / 100)] +
        (n % 100 !== 0 ? " و " + convertHundreds(n % 100) : "")
      );
  }

  function convertThousands(n, idx) {
    if (n === 0) return "";
    return convertHundreds(n) + " " + thousands[idx];
  }

  if (num === 0) return "صفر";

  let result = "";
  let idx = 0;

  while (num > 0) {
    if (num % 1000 !== 0) {
      const segment = convertThousands(num % 1000, idx);
      result = segment + (result ? " و " + result : "");
    }
    num = Math.floor(num / 1000);
    idx++;
  }

  return result.trim();
};

export const numberSeparate = (number) => {
  if (isNumber(number) || number)
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export const removeNumberSeparate = (value) => {
  return value.replace(/(?!^-)\D/g, "");
};
export const convertNumberToWords = (number) => {
  const result = numberToWords(number);

  if (result === "undefined") return null;

  return numberToWords(number);
};
export const generateRandomNumber = (min = 1000, max = 9000) => {
  return Math.floor(Math.random() * (max - min) + min);
};
//* End Number

//* Start JWT
export const decodeJWT = (token) => {
  if (!token) return;
  return jwt(token);
};
//* End JWT

//* Start Date
export const convertDate = (date, format = "YYYY/MM/DD", locale = "fa") => {
  if (!date || date === "0001-01-01T00:00:00") return "-";
  return moment(date).locale(locale).format(format);
};
export const calculateTotalHours = (
  startDate,
  endDate,
  hoursPerDay,
  callback
) => {
  if (!startDate || !endDate || !hoursPerDay) return;

  const dayPerMillisecond = 86_400_000;
  const day = (endDate - startDate) / dayPerMillisecond + 1;
  if (day <= 0) return;

  if (!!callback) callback(day * hoursPerDay);
};
//* End Date

//* Start Convert String
export const convertStringToBoolean = (value) => !!+value;
//* End Convert String

//* Start File
export const validateFile = (file) => {
  if (!file) return;

  const maxSize = 3;
  const allowedExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".docx",
    ".xlsx",
    ".csv",
    ".pdf",
    ".mp4",
    ".avi",
  ];
  const fileExtension = file.name.split(".").pop();
  if (!allowedExtensions.includes(`.${fileExtension.toLowerCase()}`))
    return "پسوند فایل مورد نظر مجاز نمی باشد";
  if (file.size > maxSize * 1024 * 1024)
    return `حجم فایل نمی تواند بیشتر از ${maxSize} مگابایت باشد`;
};
//* End File

//* Start Sheba
export const shebaInfo = (sheba) => {
  if (!sheba) return;
  const shebaNumber = `IR${sheba}`;
  let result = "";

  if (isShebaValid(shebaNumber))
    result = getShebaInfo(shebaNumber)?.persianName || "";

  return result;
};
//* End Sheba

//* Start File
export const convertDataURLtoFile = (dataURL, filename) => {
  var arr = dataURL.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
//* End File

//* Start Permission
export const convertPermission = (permissions) =>
  permissions.reduce((acc, key) => {
    acc[key] = true;
    return acc;
  }, {});
//* End Permission

//* Start Count Down
export const secondsCountDown = (elementId, countdownTime, callBack) => {
  let countdown = setInterval(() => {
    let element = document.getElementById(elementId);

    countdownTime--;

    if (element) element.innerHTML = countdownTime;
    else clearInterval(countdown);

    if (countdownTime <= 0) {
      clearInterval(countdown);
      if (!!callBack) callBack();
    }
  }, 1000);
};
//* End Count Down

//* Start Notification Sound
export const playNotificationSound = async () => {
  let soundName = "/assets/sound/notification.mp3";

  const audio = new Audio(soundName);

  try {
    await audio.play();
  } catch (error) {
    // error
  }
};
//* End Notification Sound

//* Start Password
export const changePasswordInputType = (inputId) => {
  let passwordInput = document.getElementById(inputId);
  const isPassword = passwordInput.type === "password";

  passwordInput.type = isPassword ? "text" : "password";
};
//* End Password

//* Start Picture
export const defaultPicture =
  "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QMtaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTJFNjkzRUQyNDUzMTFFNkI1QjdCNDM1MDYxNzVDMEQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTJFNjkzRUUyNDUzMTFFNkI1QjdCNDM1MDYxNzVDMEQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMkU2OTNFQjI0NTMxMUU2QjVCN0I0MzUwNjE3NUMwRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxMkU2OTNFQzI0NTMxMUU2QjVCN0I0MzUwNjE3NUMwRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEABALCwsMCxAMDBAXDw0PFxsU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";
export const showAvatar = (avatar) => {
  if (!!avatar) return hostname + avatar;
  return defaultPicture;
};
//* End Picture

//* Start Filter
export const addAllItemToFilters = (items, label = "همه") => [
  {
    label,
    value: "",
  },
  ...items,
];
//* End Filter

//* Start Hex Color
export const generateRandomHexColor = (length = 6) => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < length; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
//* End Hex Color
