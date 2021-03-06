export const CREATE_USER = "CREATE_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const AUTO_LOGIN = "AUTO_LOGIN";
export const RECOVERY_USER = "RECOVERY_USER";
export const PASSWORD_RESET = "PASSWORD_RESET";
export const CHANGE_USER_PASSWORD = "CHANGE_USER_PASSWORD";
export const GET_USER_INFO = "GET_USER_INFO";
export const GET_USER_TRANSACTIONS = "GET_USER_TRANSACTIONS";
export const CHARGE_USER_ACCOUNT = "CHARGE_USER_ACCOUNT";
export const GET_USER_STATS = "GET_USER_STATS"
export const GET_USER_LINEAL_STATS = "GET_USER_LINEAL_STATS"

// ERROR HANDLER
export const ERROR_HANDLER = "ERROR_HANDLER";

// >>>>>>>>>>><<<<<<<<<<<<<

export const createUser = (user) => {
    return {
        type: CREATE_USER,
        user
    };
};

export const loginUser = (user) => {
    return {
        type: LOGIN_USER,
        payload: user,
    };
};

export const logoutUser = () => {
    return {
        type: LOGOUT_USER,
        payload: null
    }
}

export const autoLogin = (user) => {
    return {
        type: AUTO_LOGIN,
        user
    };
};

export const recoveryUser = (user) => {
    return {
        type: RECOVERY_USER,
        user
    }
}

export const passwordReset = (user) => {
    return {
        type: PASSWORD_RESET,
        user
    }
}

export const changeUserPassword = (user) => {
    return {
        type: CHANGE_USER_PASSWORD,
        user
    }
}

export const errorHandler = (error) => {
    return {
        type: ERROR_HANDLER,
        error
    }
}

export const userInfo = (info) => {
    return {
        type: GET_USER_INFO,
        info
    }
};

export const getTransactions = (transactions) => {
    return {
        type: GET_USER_TRANSACTIONS,
        transactions
    }
};

export const newCharge = (charge) => {
    return {
      type: CHARGE_USER_ACCOUNT,
      charge,
    };
  };

  export const userStats = (stats) => {
    return {
        type: GET_USER_STATS,
        stats
    }
};

export const userLinealStats = (stats) => {
    return {
        type: GET_USER_LINEAL_STATS,
        stats
    }
};

