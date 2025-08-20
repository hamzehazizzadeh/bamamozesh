exports.userRoleItems = ["ADMIN", "STUDENT"];
exports.uploadTypeItems = ["OTHERS", "AVATAR", "TICKETS", "DOCUMENTS", "PASS"];
exports.genderTypeItems = ["MALE", "FEMALE"];
exports.paymentGatewayItems = ["ZARINPAL"];
exports.sortItems = ["desc", "asc"];
exports.rolePermissions = {
  [this.userRoleItems[0]]: [],
  [this.userRoleItems[1]]: [],
};

//* Start Convert To Text
exports.convertPermissionToText = (type) => {
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

//* Start Convert To Number
exports.convertSortToNumber = (type) => {
  let result = "";
  switch (type) {
    case this.sortItems[0]:
      result = -1;
      break;
    case this.sortItems[1]:
      result = 1;
      break;

    default:
      break;
  }
  return result;
};
//* End Convert To Number

//* Start Convert To Folder
exports.convertUploadTypeToFolder = (type) => {
  let result = "others";
  switch (type) {
    case this.uploadTypeItems[0]:
      result = "others";
      break;
    case this.uploadTypeItems[1]:
      result = "avatars";
      break;
    case this.uploadTypeItems[2]:
      result = "tickets";
      break;
    case this.uploadTypeItems[3]:
      result = "documents";
      break;
    case this.uploadTypeItems[4]:
      result = "pass";
      break;

    default:
      break;
  }

  return `${result}/`;
};
//* End Convert To Folder
