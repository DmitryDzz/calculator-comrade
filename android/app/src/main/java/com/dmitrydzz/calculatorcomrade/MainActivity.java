package com.dmitrydzz.calculatorcomrade;

import android.annotation.SuppressLint;
import android.content.pm.ActivityInfo;
import android.content.res.Configuration;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.View;
import android.view.Window;

import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsControllerCompat;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        applyRequestedOrientation();
        applySystemBarAppearance();

        View decorView = getWindow().getDecorView();
        decorView.post(this::applySystemBarAppearance);
    }

    @Override
    public void onResume() {
        super.onResume();

        applySystemBarAppearance();
        applySystemBarAppearance();
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);

        if (hasFocus) {
            applySystemBarAppearance();
            applySystemBarAppearance();
        }
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);

        applyRequestedOrientation();
        applySystemBarAppearance();
    }

    @SuppressLint("ObsoleteSdkInt")
    private void applySystemBarAppearance() {
        Window window = getWindow();
        View decorView = window.getDecorView();

        window.setBackgroundDrawable(new ColorDrawable(Color.BLACK));
        decorView.setBackgroundColor(Color.BLACK);

        window.setStatusBarColor(Color.BLACK);
        window.setNavigationBarColor(Color.BLACK);

        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.Q) {
            window.setStatusBarContrastEnforced(false);
            window.setNavigationBarContrastEnforced(false);
        }

        WindowInsetsControllerCompat controller =
                WindowCompat.getInsetsController(window, decorView);

        controller.setAppearanceLightStatusBars(false);
        controller.setAppearanceLightNavigationBars(false);
    }

    private void applyRequestedOrientation() {
        Configuration configuration = getResources().getConfiguration();

        boolean isLargeScreen = configuration.smallestScreenWidthDp >= 600;

        if (isLargeScreen) {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_FULL_USER);
        } else {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        }
    }
}