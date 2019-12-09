
package com.ichong.zzy.design.rn;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class RNDesignRnModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNDesignRnModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNDesignRn";
  }
}