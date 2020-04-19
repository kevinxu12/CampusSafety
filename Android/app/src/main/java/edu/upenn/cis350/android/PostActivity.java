package edu.upenn.cis350.android;

import androidx.appcompat.app.AppCompatActivity;


import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.location.Geocoder;
import android.location.Address;
import org.json.JSONObject;

import java.net.URL;
import java.util.List;

public class PostActivity extends AppCompatActivity {
    private static final String TAG_POST = "POST";
    private static final String TAG_GET = "GET";
    String email = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_post);
        email = getIntent().getStringExtra("email");
    }


    public void onPostButtonClick(View view) {
        // the intent connects the two classes
        Log.v(TAG_POST, "Making new post request");
        createNewPost();

    }

    // fill this in
    private void createNewPost() {
        TextView errorDisplay = (TextView) findViewById(R.id.error);
        try {
            URL url = new URL("http://10.0.2.2:5000/api/postRequest");
            JSONObject postData = new JSONObject();
            EditText titleInput = (EditText) findViewById(R.id.title);
            EditText descriptionInput = (EditText) findViewById(R.id.description);
            EditText locationInput = (EditText) findViewById(R.id.location);
            EditText firstNameInput = (EditText) findViewById(R.id.firstname);
            EditText lastNameInput = (EditText) findViewById(R.id.lastname);
            //EditText latitudeInput = (EditText) findViewById(R.id.latitude);
            //EditText longitudeInput = (EditText) findViewById(R.id.longitude);
            TextView latlongText = (TextView) findViewById(R.id.latlongText);

            String title = titleInput.getText().toString();
            String description = descriptionInput.getText().toString();
            String location = locationInput.getText().toString();
            String firstname = firstNameInput.getText().toString();
            String lastname = lastNameInput.getText().toString();
            double latitude = 0;
            double longitude = 0;

            //creating the geocoding location
            Geocoder gc = new Geocoder(PostActivity.this);
            if(gc.isPresent()){
                try {
                    List<Address> list = gc.getFromLocationName(location, 1);
                    Address address = list.get(0);
                    latitude = address.getLatitude();
                    longitude = address.getLongitude();
                    String latlong = "Latitude: " + latitude + "\nLongitude: " + longitude;
                    latlongText.setText(latlong);
                } catch (Exception e){
                    Log.v(TAG_POST, "erorr" + e.toString());
                }

            }

            postData.put("title", title);
            postData.put("description", description);
            postData.put("email", email);
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
            errorDisplay.setText(e.toString());
            Log.v(TAG_POST, "erorr" + e.toString());
        }
    }


}
