
package com.ichong.zzy.design.rn;

import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.view.LayoutInflater;
import android.view.View;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.NonNull;
import com.facebook.drawee.view.DraweeView;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.ichong.zzy.design.rn.service.DesignService;
import com.ichong.zzy.design.rn.util.MD5Utils;

import java.io.File;
import java.lang.ref.WeakReference;
import java.util.Timer;
import java.util.TimerTask;

public class RNSplashScreenModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private static WeakReference<Activity> mActivity;
    private static MyDialog mSplashDialog;
    static int time = 3;
    static Timer timer = new Timer();
    static TextView textView;

    public RNSplashScreenModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNSplashScreen";
    }

    @ReactMethod
    public void show() {
        RNSplashScreenModule.show(this.reactContext.getCurrentActivity());
    }

    @ReactMethod
    public void hide() {
        RNSplashScreenModule.hide(this.reactContext.getCurrentActivity());
    }

    @ReactMethod
    public void showAd(String image, int time, Callback callback) {
        RNSplashScreenModule.showAd(this.reactContext.getCurrentActivity(), image, time, callback);
    }

    public static void show(final Activity activity) {
        if (activity == null) return;
        mActivity = new WeakReference<Activity>(activity);
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (!activity.isFinishing()) {

                    View view = LayoutInflater.from(activity).inflate(R.layout.loading, null, false);
                    ImageView imageView = view.findViewById(R.id.bg);
                    int loadingImage = activity.getResources().getIdentifier("loading", "mipmap", activity.getPackageName());
                    imageView.setImageResource(loadingImage);

                    mSplashDialog = new MyDialog(
                        activity,
                        R.style.SplashScreen_Fullscreen);
                    mSplashDialog.setContentView(view);
                    mSplashDialog.setCancelable(false);

                    if (!mSplashDialog.isShowing()) {
                        mSplashDialog.show();
                    }
                }
            }
        });
    }

    public static void hide(Activity activity) {
        if (activity == null) {
            if (mActivity == null) {
                return;
            }
            activity = mActivity.get();
        }
        if (activity == null) return;

        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (mSplashDialog != null && mSplashDialog.isShowing()) {
                    mSplashDialog.dismiss();
                    mSplashDialog = null;
                }
            }
        });
    }

    static Handler handler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
            time--;
            if (time <= 0) {
                timerTask.cancel();
                time = msg.what;
                hide(mActivity.get());
            }
        }
    };

    static TimerTask timerTask;

    static boolean isClick = false;

    public static void showAd(Activity activity, final String image, final int t, final Callback callback) {

        time = t;
        if (activity == null) {
            if (mActivity == null) {
                return;
            }
            activity = mActivity.get();
        }
        if (activity == null) return;

        String adFileStr = Environment.getExternalStorageDirectory().getPath() + "/Android/data/" + activity.getPackageName() + "/cache/images/"
            + MD5Utils.string2MD5(image);

        final File adFile = new File(adFileStr);
        if (adFile.exists()) {

            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    if (mSplashDialog != null) {
                        DraweeView imageView = mSplashDialog.findViewById(R.id.ad_image);

//                    DraweeController controller = Fresco.newDraweeControllerBuilder()
//                        .setUri(Uri.parse(adFile.toString()))
//                        .setAutoPlayAnimations(true)
//                        .build();
//
//                    imageView.setController(controller);
                        imageView.setImageURI(Uri.fromFile(adFile));
                        textView = mSplashDialog.findViewById(R.id.text);
                        textView.setVisibility(View.VISIBLE);

                        textView.setOnClickListener(new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                timerTask.cancel();
                                time = t;
                                mSplashDialog.dismiss();
                            }
                        });

                        imageView.setOnClickListener(new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                if(!isClick) {
                                    callback.invoke();
                                    isClick = true;
                                }
                            }
                        });

                        timerTask = new TimerTask() {
                            @Override
                            public void run() {
                                handler.sendEmptyMessage(t);
                            }
                        };
                        timer.schedule(timerTask, 1000, 1000);
                    }
                }
            });
        } else {
            // 下载
            Intent service = new Intent(activity, DesignService.class);
            service.setAction("com.ichong.zzy.design.service");
            service.putExtra("type", "ad_download");
            service.putExtra("image", image);
            service.putExtra("localImage", adFileStr);
            activity.startService(service);
            hide(activity);
        }

    }
}

class MyDialog extends Dialog {

    public MyDialog(@NonNull Context context, int themeResId) {
        super(context, themeResId);
    }

    private void fullScreenImmersive(View view) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            int uiOptions = View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                | View.SYSTEM_UI_FLAG_FULLSCREEN;
            view.setSystemUiVisibility(uiOptions);
        }
    }

    @Override
    public void show() {
        this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE, WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE);
        super.show();
        fullScreenImmersive(getWindow().getDecorView());
        this.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE);
    }
}
