export const userRoleItems = ["ADMIN", "STUDENT"];
export const uploadTypeItems = [
  "OTHERS",
  "AVATAR",
  "TICKETS",
  "DOCUMENTS",
  "PASS",
];
export const genderTypeItems = ["MALE", "FEMALE"];
export const sortItems = ["asc", "desc"];
export const lastDaysItems = [7, 15, 30, 90, 180, 365];
export const paymentGatewayItems = ["ZARINPAL"];
export const notificationTypeItems = ["SUCCESS", "ERROR", "INFO", "WARNING"];
export const rolePermissions = {
  [userRoleItems[0]]: [],
  [userRoleItems[1]]: [],
};

//* Start Convert To Text
export const convertSortToText = (type) => {
  let result = "";
  switch (type) {
    case sortItems[0]:
      result = "صعودی";
      break;
    case sortItems[1]:
      result = "نزولی";
      break;

    default:
      result = type;
      break;
  }
  return result;
};
export const convertRoleToText = (type) => {
  let result = "";
  switch (type) {
    case userRoleItems[0]:
      result = "ادمین";
      break;
    case userRoleItems[1]:
      result = "داوطلب";
      break;

    default:
      result = type;
      break;
  }
  return result;
};
export const convertGenderToText = (type) => {
  let result = "";
  switch (type) {
    case genderTypeItems[0]:
      result = "ادمین";
      break;
    case genderTypeItems[1]:
      result = "داوطلب";
      break;

    default:
      result = type;
      break;
  }
  return result;
};
export const convertPermissionToText = (type) => {
  let result = "";
  switch (type) {
    case "":
      result = "";
      break;
    default:
      break;
  }
  return result;
};
//* End Convert To Text

//* Start Convert To Color
export const convertNotificationTypeToColor = (type) => {
  let result = "";
  switch (type) {
    case notificationTypeItems[0]:
      result = "success";
      break;
    case notificationTypeItems[1]:
      result = "danger";
      break;
    case notificationTypeItems[2]:
      result = "info";
      break;
    case notificationTypeItems[3]:
      result = "warning";
      break;

    default:
      result = type;
      break;
  }
  return result;
};
//* End Convert To Color

//* Start Convert To Path
export const convertRoleToPath = (type) => {
  let result = "";
  switch (type) {
    case userRoleItems[0]:
      result = "admin";
      break;
    case userRoleItems[1]:
      result = "student";
      break;

    default:
      result = type;
      break;
  }
  return result;
};
//* End Convert To Path

//* Start Convert To Logo
export const convertPaymentGatewayToLogo = (type) => {
  switch (type) {
    case paymentGatewayItems[0]:
      return "/assets/images/payment/zarinpal.jpg";
    default:
      return type;
  }
};
//* End Convert To Logo

//* Start Convert To Icon
export const convertNotificationTypeToIcon = (type) => {
  let result = "";
  switch (type) {
    case notificationTypeItems[0]:
      result = "ix:success";
      break;
    case notificationTypeItems[1]:
      result = "mdi:error-outline";
      break;
    case notificationTypeItems[2]:
      result = "material-symbols:info-outline-rounded";
      break;
    case notificationTypeItems[3]:
      result = "cuida:warning-outline";
      break;

    default:
      result = type;
      break;
  }
  return result;
};
//* End Convert To Icon
