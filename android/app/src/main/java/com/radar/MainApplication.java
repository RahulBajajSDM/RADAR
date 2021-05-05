package com.smartdata.radar;


import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
import com.marianhello.bgloc.react.BackgroundGeolocationPackage;
import com.RNTextInputMask.RNTextInputMaskPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage;
import io.invertase.firebase.crashlytics.ReactNativeFirebaseCrashlyticsPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
// react-native-webview
//import com.reactnativecommunity.webview.RNCWebVieReactApplicationwPackage;
import java.util.List;
import java.util.Arrays;
// @react-native-community/async-storage
// import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// react-native-splash-screen
import org.devio.rn.splashscreen.SplashScreenReactPackage;
// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;

import com.showlocationservicesdialogbox.LocationServicesDialogBoxPackage;
import de.patwoz.rn.bluetoothstatemanager.RNBluetoothStateManagerPackage;

public class MainApplication extends NavigationApplication {


              @Override
    protected ReactGateway createReactGateway() {
            ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                        return "index";
                    }
        };
            return new ReactGateway(this, isDebug(), host);
        }

            @Override
    public boolean isDebug() {
            return BuildConfig.DEBUG;
        }

            protected List<ReactPackage> getPackages() {
            // Add additional packages you require here
                    // No need to add RnnPackage and MainReactPackage
                            return Arrays.<ReactPackage>asList(
                                    new AsyncStoragePackage(),
                                    new SplashScreenReactPackage(),
                                    new VectorIconsPackage(),
                                    new RNCWebViewPackage(),
                                    new NetInfoPackage(),
                                    new RNTextInputMaskPackage(),
                                    new BackgroundGeolocationPackage(),
                                    new ReactNativeFirebaseAppPackage(),
                                    new ReactNativeFirebaseCrashlyticsPackage(),
                                    new ReactNativeFirebaseMessagingPackage(),
                                    new ReactNativePushNotificationPackage(),
                                    new LocationServicesDialogBoxPackage(),
                                    new RNBluetoothStateManagerPackage()
                                    // eg. new VectorIconsPackage()
                            );
        }

            @Override
    public List<ReactPackage> createAdditionalReactPackages() {
            return getPackages();
        }

//  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
//    @Override
//    public boolean getUseDeveloperSupport() {
//      return BuildConfig.DEBUG;
//    }
//
//    @Override
//    protected List<ReactPackage> getPackages() {
//      @SuppressWarnings("UnnecessaryLocalVariable")
//      List<ReactPackage> packages = new PackageList(this).getPackages();
//      // Packages that cannot be autolinked yet can be added manually here, for example:
//      // packages.add(new MyReactNativePackage());
//      return packages;
//    }
//
//    @Override
//    protected String getJSMainModuleName() {
//      return "index";
//    }
//  };
//
//  @Override
//  public ReactNativeHost getReactNativeHost() {
//    return mReactNativeHost;
//  }
//
//  @Override
//  public void onCreate() {
//    super.onCreate();
//    SoLoader.init(this, /* native exopackage */ false);
//  }
}
