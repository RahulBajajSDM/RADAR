import Fabric from "react-native-fabric";

var { Crashlytics } = Fabric;

Crashlytics.setUserName("Ajivar");

Crashlytics.setUserEmail("sanwal.suraj12@gmail.com");

Crashlytics.setUserIdentifier("1234");

Crashlytics.setBool("has_posted", true);

Crashlytics.setString("organization", "Ajivar");

// Forces a native crash for testing
Crashlytics.crash();

// Due to differences in primitive types between iOS and Android I've exposed a setNumber function vs. setInt, setFloat, setDouble, setLong, etc
Crashlytics.setNumber("post_count", 5);

// Record a non-fatal JS error only on Android
Crashlytics.logException("");

// Record a non-fatal JS error only on iOS
Crashlytics.recordError("something went wrong!");
