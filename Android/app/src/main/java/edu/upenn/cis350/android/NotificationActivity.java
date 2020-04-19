package edu.upenn.cis350.android;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONObject;

import java.net.URL;

public class NotificationActivity extends AppCompatActivity {
    private static final String TAG_POST = "POST";
    private static final String TAG_GET = "GET";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_notification);
        getNotifications();
    }




    private void getNotifications(){
        try {
            URL url = new URL("http://10.0.2.2:5000/api/getAllNotifications");
            HTTPGetRequest task = new HTTPGetRequest();
            task.execute(url.toString());
            JSONArray requestArray = task.get();
            for(int i = 0 ; i < requestArray.length(); i ++) {
                JSONObject request = (JSONObject) requestArray.get(i);
            }
            Log.v(TAG_GET, "Notifications " + requestArray.toString());
        }
        catch (Exception e) {
            Log.v(TAG_POST, "Exception " + e.toString());
        }
    }
}
