package edu.upenn.cis350.android;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONArray;
import org.json.JSONObject;

import java.net.URL;
import java.net.URLEncoder;

public class ProfileActivity extends AppCompatActivity {

    private static final String TAG_GET = "GET";
    private static final String TAG_POST = "POST";
    private TextView emailText;
    private TextView nameText;
    private TextView universityText;
    private TextView phoneText;
    private String email = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);

        Log.v(TAG_GET, "um");
        nameText = (TextView) findViewById(R.id.name);
        universityText = (TextView) findViewById(R.id.university);
        emailText = (TextView) findViewById(R.id.email);
        phoneText = (TextView) findViewById(R.id.phone);
        getProfile();

    }

    public void onButtonClick(View view) {
        Log.v(TAG_POST, "Deleting the account");
        deleteProfile();
    }

    private void deleteProfile() {
        try {
            URL url = new URL("http://10.0.2.2:5000/api/appdeleteprofile/");
            JSONObject postData = new JSONObject();

            postData.put("email", email);
            HTTPPostRequest task = new HTTPPostRequest(postData);
            task.execute(url.toString());
            JSONObject value = task.get();
            String result = value.getString("result");
            if (result.equals("success")) {
                Log.v(TAG_POST, "login successful");
                nameText.setText("Name");
                universityText.setText("University");
                emailText.setText("Email");
                phoneText.setText("Phone Number");
                Intent i = new Intent(this, MainActivity.class);
                ProfileActivity.this.startActivity(i);
            }

        }
        catch (Exception e) {
            Log.v(TAG_POST, "Exception " + e.toString());
        }
    }

    private void getProfile() {
        try {
            URL url = new URL("http://10.0.2.2:5000/api/appprofile/");
            HTTPGetRequest task = new HTTPGetRequest();
            task.execute(url.toString());
            JSONArray value = task.get();
            JSONObject user = value.getJSONObject(0);
            Log.v(TAG_GET, "user is" + user.toString());

            String name = user.getString("firstName") + " " +  user.getString("lastName");
            String university = "University: " + user.getString("university");
            email = "Email: " + user.getString("email");
            String phone = "Phone Number: " + user.getString("phone");
            nameText.setText(name);
            universityText.setText(university);
            emailText.setText(email);
            phoneText.setText(phone);
        }
        catch (Exception e) {
            Log.v(TAG_GET, "exception: " + e);
        }
    }
}