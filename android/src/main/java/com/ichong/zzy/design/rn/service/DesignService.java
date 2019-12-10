package com.ichong.zzy.design.rn.service;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import androidx.annotation.Nullable;
import com.ichong.module.downloadmodule.Download;

/**
 * Created by zzy on 2019-12-10.
 * Date : 2019-12-10 16:55
 */
public class DesignService extends Service {
    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {

        if (intent != null && "com.ichong.zzy.design.service".equals(intent.getAction())) {
            String serviceTaskType = intent.getStringExtra("type");
            switch (serviceTaskType) {
                case "ad_download":
                    Download.getInstanse(getApplicationContext()).addTask(intent.getStringExtra("image"), intent.getStringExtra("localImage"), null);
                    Download.getInstanse(getApplicationContext()).start();
                    break;
            }
        }
        return super.onStartCommand(intent, flags, startId);
    }
}
