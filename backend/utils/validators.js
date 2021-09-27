module.exports.validateStoreInput = (
  storeName,
  email,
  password,
  confirmPassword,
  phoneNo,
  location,
  town
) => {
  const errors = {};
  if (storeName.trim() === "") {
    errors.userName = "StoreName must not be empty";
  }
  if (town.trim() === "") {
    errors.town = "Town must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "StoreName must not be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }
  if (password === "") {
    errors.password = "password must not be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = " passwords must match";
  }
  if (phoneNo === "") {
    errors.phoneNo = "phoneNo must not be empty";
  }
  if (location.trim() === "") {
    errors.location = "location must not be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (email, password) => {
  const errors = {};
  if (password === "") {
    errors.password = "password must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "StoreName must not be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateMemberInput = (
  userName,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (userName.trim() === "") {
    errors.userName = "UserName must not be empty";
  }
  if (password === "") {
    errors.password = "password must not be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = " passwords must match";
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
