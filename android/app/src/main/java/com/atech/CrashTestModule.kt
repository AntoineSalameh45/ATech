package com.atech

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class CrashTestModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "CrashTestModule" // This is how you'll access it in JS

    @ReactMethod
    fun crashApp() {
        throw RuntimeException("Test Crash from React Native")
    }
}