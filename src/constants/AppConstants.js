let AppConstants = {
  AppName: "Ajivar",
  Notificaitons: {
    Error: 1,
    Success: 2,
    Warning: 3
  },
  AppVersion: 1.5,
  Error: {
    serverError:
      "The server is not reachable right now, sorry for inconvenience.",
    SignUpError: "The activation code is incorrect , please try again",
    internetConnectivity: "Please check your internet connection",
    botInterNetConnectivity:
      "Please check you internet connection. Close the app and restart."
  }
};

module.exports = AppConstants;
