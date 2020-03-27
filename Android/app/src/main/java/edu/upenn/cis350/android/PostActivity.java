package edu.upenn.cis350.android;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;

import org.json.JSONObject;

import java.net.URL;

public class PostActivity extends AppCompatActivity {
    private static final String TAG = "POST";
    // for testing
    private String title = "Crime";
    private String description = "Bad";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_post);
    }

    public void onPostButtonClick(View view) {
        // the intent connects the two classes
        Log.v(TAG, "called post. Making backend changes");
        createNewPost();

    }

    // fill this in
    private void createNewPost() {
        try {
            URL url = new URL("http://10.0.2.2:5000/api/postRequest");
            JSONObject postData = new JSONObject();
            postData.put("title", title);
            HTTPPostRequest task = new HTTPPostRequest(postData);
            task.execute(url.toString());
            JSONObject value = task.get();
            Log.v(TAG, "value of the result" + value.toString());
        }
        catch (Exception e) {

        }
    }


}
