package edu.upenn.cis350.android;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;

import org.json.JSONArray;
import org.json.JSONObject;

import java.net.URL;

public class PostActivity extends AppCompatActivity {
    private static final String TAG_POST = "POST";
    private static final String TAG_GET = "GET";
    // for testing
//    private String title = "Crime";
//    private String description = "Bad";
//    private String location = "Crime";
//    private String firstname = "kevin";
//    private String lastname = "xu";

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
            EditText titleInput = (EditText) findViewById(R.id.title);
            EditText descriptionInput = (EditText) findViewById(R.id.description);
            EditText locationInput = (EditText) findViewById(R.id.location);
            EditText firstNameInput = (EditText) findViewById(R.id.firstname);
            EditText lastNameInput = (EditText) findViewById(R.id.lastname);

            String title = titleInput.getText().toString();
            String description = descriptionInput.getText().toString();
            String location = locationInput.getText().toString();
            String firstname = firstNameInput.getText().toString();
            String lastname = lastNameInput.getText().toString();


            postData.put("title", title);
            postData.put("description", description);
            postData.put("location", location);
            postData.put("firstname", firstname);
            postData.put("lastname", lastname);
            HTTPPostRequest task = new HTTPPostRequest(postData);
            task.execute(url.toString());
            JSONObject value = task.get();
            Log.v(TAG_POST, "value of post is " + value.toString());
        }
        catch (Exception e) {

        }
    }


}
