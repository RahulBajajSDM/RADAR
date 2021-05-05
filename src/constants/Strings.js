/*
 * @file: i18n.js
 * @description: App i18n Localization
 * */
import AppCosntants from "./AppConstants";
("use strict");

let Strings = {
  Ooz: {
    OozChallengePick: "Pick a challenge for today, ",
    OozChallengeRatingText: "Please rate yourself",
    popUpOozChallenge: "Today's Ooz Challenges"
  },
  Common: {
    EmptyEmailMsg: "Please enter an email address.",
    ValidEmailAddress: "Please enter a valid email address.",
    EnterPassword: "Please enter a password.",
    EnterAccessCode: "Please enter a access code.",
    MinPersonRide: "Please enter number of persons to continue ride.",
    MaxPersonRide: "Minimum 1 and maximum 20 person can travelle in a ride",
    VaildDigit: "No of persons must be between 1-20"
  },
  Error: {
    SourceNotSelected:
      "Pickup location is not specified please select pickup point first"
  },
  PlaceHolder: {
    Pickup: "Enter pick-up location",
    Destination: "Where to?"
  },
  Login: {
    Heading: "Welcome",
    LoginMsg: "Sign in to the account",
    UserName: "Email Address",
    Password: "Password",
    ForgotPassword: "Forgot Password?",
    NewUser: "New User?",
    Signup: " Sign Up",
    EnterAccessCode: "Enter Access Code"
  },
  Signup: {},
  ForgotPassword: {},
  RideInfo: {
    Now: "Now",
    BookRide: "Book Ride"
  },
  RideRequest: {
    RequestSubmitted: "Request Submitted",
    Accept: "As soon as driver accepts your",
    Notificaion: "request you will get the notification.",
    Ok: "Ok",
    RideCompleted1: "Your Ride has been successfully",
    RideCompleted2: "Completed"
  },
  RideWait: {
    Now: "Now",
    CancelRide: "Cancel Ride",
    ChatWithAdmin: "Chat with admin",
    WaitingTime: "Waiting Time",
    GoToHome: "Go to Home",
    NoShuttleAvailable: "No Shuttle is available"
  },
  CancelRide: {
    AreYouSureYouWantTo: "Are you sure you want to",
    CancelTheRide: "cancel the ride?",
    No: "No",
    Yes: "Yes",
    Logout: "Logout from CIDR?"
  },
  Permissions: {
    Locations:
      "Location access permission is denied for " +
      AppCosntants.AppName +
      ",Please enable it from the settings",
    Camera:
      "Camera access permission is denied for " +
      AppCosntants.AppName +
      ",Please enable it from the settings",
    Gallery:
      "Gallery access permission is denied for " +
      AppCosntants.AppName +
      ",Please enable it from the settings"
  },
  RideAccepted: {
    ArivalTime: "Arival Time"
  },
  signIn: {
    subHeading: "Sign into your account"
  },

  signUp: {
    signUpButton: "New User? - Sign up now"
  },

  Institution: {
    InstitutionCode: "Enter Organization Code"
  },

  IntroScreen: {
    signUp: "Sign Up",
    signIn: "Sign Up"
  },
  IntroScreen1: {
    HeaderText: "Welcome to Ajivar",
    SubHeadingText1: "A guided journey to a peaceful life",
    SubHeadingText2: "using an AI-Powered Life Coach",
    SignInbuttonFirstName: "Already have an account?",
    SignInbuttonSignInName: "Sign In"
  },
  IntroScreen2: {
    HeaderText: "Personalized",
    SubHeadingText1: "Individualized suggestions and ",
    SubHeadingText2: "recommendations based on Mindfulness"
  },
  IntroScreen3: {
    HeaderText: "Grow",
    SubHeadingText1: "Learn and practice techniques that",
    SubHeadingText2: "help keep you focused and relaxed",
    ImageName: "Self-awareness"
  },
  IntroScreen4: {
    HeaderText: "Courage to Change",
    SubHeadingText1: "Challenge yourself and improve your",
    SubHeadingText2: "self-esteem with Ooz Challenges",
    ImageName: "Resiliency"
  },
  IntroScreen5: {
    HeaderText: "Text1",
    SubHeadingText1: "lepsum data",
    SubHeadingText2: "lepsum Data",
    ImageName: "lepsum Data"
  },
  SideMenu: {
    VersionCode: "VersionCode : ",
    NameResources: "Name Resources",
    Screen1: "Screen1",
    Screen2: "Screen2",
    Logout: "Log out",
    Home: "Home",
    Resources: "RADAR",
    Settings: {
      AlertActivity: "Alert Activity",
      EditMyProfile: "Edit my profile",
      ChangeMyPassword: "Change My Password",
      Logout: "Log out"
    },
    Faq: "FAQ",
    privacyPolicy: "Privacy Policy",
    TermsofService: "Terms of Service"
  },
  Activation: "Activation",
  EmailVerification: {
    ConfimationCode: "Confirmation code was sent to registered email",
    ResendCode: "You will be able to resend Code in 120 sec"
  },
  Profile: {
    MyCurrent: "My Current",
    ChangeAJ: "Change my AJ Guide",
    Select: "Select this guide",
    Current: "Current"
  },
  Journal: {
    NewNote: "New Note",
    Save: "Save",
    titleErrorMessage: "Please add the title",
    entryErrorMessage: "Please add the entry"
  },
  Bot: {
    AcceptGuide: "Accept this Guide",
    ChangeAnyTime: "You can change your guide at any time in your resources",
    OozChallenge: "Here is the Ooz Challenge for you"
  },
  Dashboard: {
    MyActivity: "My Activity"
  }
};

module.exports = Strings;
