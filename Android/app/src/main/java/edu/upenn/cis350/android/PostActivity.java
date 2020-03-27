package edu.upenn.cis350.android;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;

import org.json.JSONArray;
import org.json.JSONObject;

import java.net.URL;

public class PostActivity extends AppCompatActivity {
    private static final String TAG_POST = "POST";
    private static final String TAG_GET = "GET";
    // for testing
    private String title = "Crime";
    private String description = "Bad";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_post);
    }
    public void onGetRequestClick(View view) {
        Log.v(TAG_GET, "Getting all requests");
        getRequests();
    }

    private void getRequests() {
        try {
        URL url = new URL("http://10.0.2.2:5000/api/getAllRequests");
        HTTPGetRequest task = new HTTPGetRequest();
        task.execute(url.toString());
        JSONArray value = task.get();
        Log.v(TAG_GET, "value of get is " + value.toString());
    }
    catch (Exception e) {

    }
    }

    public void onPostButtonClick(View view) {
        // the intent connects the two classes
        Log.v(TAG_POST, "Making new post request");
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
            Log.v(TAG_POST, "value of post is " + value.toString());
        }
        catch (Exception e) {

        }
    }


}
