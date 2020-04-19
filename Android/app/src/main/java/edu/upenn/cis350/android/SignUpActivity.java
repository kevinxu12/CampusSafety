package edu.upenn.cis350.android;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import org.json.JSONObject;

import java.net.URL;
import java.net.URLEncoder;

public class SignUpActivity extends AppCompatActivity {

    private static final String TAG_POST = "POST";
    TextView requiredText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);

        requiredText = (TextView) findViewById(R.id.required);
    }

    public void onButtonClick(View view) {
        Log.v(TAG_POST, "Making new post request");
        createUser();
    }

    private void createUser() {
        try {
            URL url = new URL("http://10.0.2.2:5000/api/appsignup");
            JSONObject postData = new JSONObject();
            EditText firstNameInput = (EditText) findViewById(R.id.firstname);
            EditText lastNameInput = (EditText) findViewById(R.id.lastname);
            EditText emailInput = (EditText) findViewById(R.id.email);
            EditText passwordInput = (EditText) findViewById(R.id.password);
            EditText universityInput = (EditText) findViewById(R.id.universitysignup);
            EditText phoneInput = (EditText) findViewById(R.id.phonesignup);

            String firstName = firstNameInput.getText().toString();
            String lastName = lastNameInput.getText().toString();
            String email = emailInput.getText().toString();
            String password = passwordInput.getText().toString();
            String university = universityInput.getText().toString();
            String phone = phoneInput.getText().toString();

            if (firstName.equals("") || lastName.equals("") || email.equals("") || password.equals("")) {
                requiredText.setText("Please fill out all required fields.");
            } else {
                //encode the password
                password = URLEncoder.encode(password);

                postData.put("firstname", firstName);
                postData.put("lastname", lastName);
                postData.put("email", email);
                postData.put("password", password);
                postData.put("university", university);
                postData.put("phone", phone);
                HTTPPostRequest task = new HTTPPostRequest(postData);
                task.execute(url.toString());
                JSONObject value = task.get();
                Log.v(TAG_POST, "value of post is " + value.toString());
                Intent i = new Intent(this, DashboardActivity.class);
                i.putExtra("email", email);
                SignUpActivity.this.startActivity(i);
            }
        }
        catch (Exception e) {
            Log.v(TAG_POST, "Exception " + e.toString());
        }
    }

}