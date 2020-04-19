package edu.upenn.cis350.android;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import org.json.JSONObject;

import java.net.URL;

public class DashboardActivity extends AppCompatActivity {
    private static final String TAG = "MAIN";
    String email = "";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);
        email = getIntent().getStringExtra("email");
        Log.v(TAG, "email at dashboard is" + email);
    }

    public void onPostNavButtonClick(View view) {
        // the intent connects the two classes
        Log.v(TAG, "called post");
        Intent i = new Intent(this, PostActivity.class);
        i.putExtra("email", email);
        DashboardActivity.this.startActivity(i);
    }

    public void onMapButtonClick(View view) {
        Log.v(TAG, "called maps");
        Intent i = new Intent(this, MapsActivity.class);
        i.putExtra("email", email);
        DashboardActivity.this.startActivity(i);
    }

    public void onProfileButtonClick(View view) {
        Log.v(TAG, "called profile");
        Intent i = new Intent(this, ProfileActivity.class);
        DashboardActivity.this.startActivity(i);
    }

    public void onNotifButtonClick(View view){
        Log.v(TAG, "called maps");
        Intent i = new Intent(this, NotificationActivity.class);
        i.putExtra("email", email);
        DashboardActivity.this.startActivity(i);
    }

    public void onLogOutButtonClick(View view) {
        Log.v(TAG, "called logout");
        logOut();
        Intent i = new Intent(this, MainActivity.class);
        DashboardActivity.this.startActivity(i);
    }

    public void onFeedButtonClick(View view) {
        Log.v(TAG, "called feed");
        Intent i = new Intent(this, FeedActivity.class);
        DashboardActivity.this.startActivity(i);
    }

    private void logOut() {
        try {
            URL url = new URL("http://10.0.2.2:5000/api/applogout/");
            JSONObject postData = new JSONObject();

            HTTPPostRequest task = new HTTPPostRequest(postData);
            task.execute(url.toString());
            JSONObject value = task.get();
            String result = value.getString("result");
            if (result.equals("success")) {
                Intent i = new Intent(this, MainActivity.class);
                DashboardActivity.this.startActivity(i);
            }

        }
        catch (Exception e) {
            Log.v(TAG, "Exception " + e.toString());
        }
    }
}
