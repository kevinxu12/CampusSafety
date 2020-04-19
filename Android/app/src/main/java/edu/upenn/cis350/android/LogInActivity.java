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

public class LogInActivity extends AppCompatActivity {

    private static final String TAG_POST = "POST";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
    }

    public void onLogInButtonClick(View view) {
        Log.v(TAG_POST, "Getting user");
        getUser();
    }

    public void onSignUpButtonClick(View view) {
        Intent i = new Intent(this, SignUpActivity.class);
        LogInActivity.this.startActivity(i);
    }

    private void getUser() {
        try {
            URL url = new URL("http://10.0.2.2:5000/api/applogin");
            JSONObject postData = new JSONObject();
            EditText emailInput = (EditText) findViewById(R.id.email);
            EditText passwordInput = (EditText) findViewById(R.id.password);
            TextView errorDisplay = (TextView) findViewById(R.id.error);

            String email = emailInput.getText().toString();
            String password = passwordInput.getText().toString();

            //encode the password
            password = URLEncoder.encode(password);

            postData.put("email", email);
            postData.put("password", password);
            HTTPPostRequest task = new HTTPPostRequest(postData);
            task.execute(url.toString());
            JSONObject value = task.get();
            String result = value.getString("result");
            if (result.equals("success")) {
                Log.v(TAG_POST, "login successful");
                errorDisplay.setText("");
                Intent i = new Intent(this, DashboardActivity.class);
                i.putExtra("email", email);
                LogInActivity.this.startActivity(i);
            } else if (result.equals("error")){
                Log.v(TAG_POST, "could not log in");
                errorDisplay.setText("Incorrect email or password. Please try again.");
            } else {
                errorDisplay.setText("Account does not exist.");
            }

        }
        catch (Exception e) {
            Log.v(TAG_POST, "Exception " + e.toString());
        }
    }
}