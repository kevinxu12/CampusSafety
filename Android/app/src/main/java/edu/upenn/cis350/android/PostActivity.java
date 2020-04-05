package edu.upenn.cis350.android;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;

import org.json.JSONArray;
import org.json.JSONObject;

import java.net.URL;
import java.util.ArrayList;

public class PostActivity extends AppCompatActivity {
    private static final String TAG_POST = "POST";
    private static final String TAG_GET = "GET";
    RecyclerViewAdapter adapter;
    ArrayList<JSONObject> testList;
    // for testing

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_post);
        testList = new ArrayList<>();
        getRequests();


        RecyclerView recyclerView = findViewById(R.id.requests);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        adapter = new RecyclerViewAdapter(this,testList);
        recyclerView.setAdapter(adapter);
    }

    private void getRequests() {
        try {
        URL url = new URL("http://10.0.2.2:5000/api/getAllRequests");
        HTTPGetRequest task = new HTTPGetRequest();
        task.execute(url.toString());
        JSONArray requestArray = task.get();
        for(int i = 0 ; i < requestArray.length(); i ++) {
            JSONObject request = (JSONObject) requestArray.get(i);
            testList.add(request);
        }
        Log.v(TAG_GET, "value of get is " + requestArray.toString());
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
            EditText latitudeInput = (EditText) findViewById(R.id.latitude);
            EditText longitudeInput = (EditText) findViewById(R.id.longitude);

            String title = titleInput.getText().toString();
            String description = descriptionInput.getText().toString();
            String location = locationInput.getText().toString();
            String firstname = firstNameInput.getText().toString();
            String lastname = lastNameInput.getText().toString();
            double latitude = Double.parseDouble(latitudeInput.getText().toString());
            double longitude = Double.parseDouble(longitudeInput.getText().toString());


            postData.put("title", title);
            postData.put("description", description);
            postData.put("location", location);
            postData.put("firstname", firstname);
            postData.put("lastname", lastname);
            postData.put("latitude", latitude);
            postData.put("longitude", longitude);
            HTTPPostRequest task = new HTTPPostRequest(postData);
            task.execute(url.toString());
            JSONObject value = task.get();
            Log.v(TAG_POST, "value of post is " + value.toString());
        }
        catch (Exception e) {
            Log.v(TAG_POST, "erorr" + e.toString());
        }
    }


}
