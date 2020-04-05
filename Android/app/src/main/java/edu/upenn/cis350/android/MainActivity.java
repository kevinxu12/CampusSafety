package edu.upenn.cis350.android;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Spinner;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "MAIN";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void onPostNavButtonClick(View view) {
        // the intent connects the two classes
        Log.v(TAG, "called post");
        Intent i = new Intent(this, PostActivity.class);
        MainActivity.this.startActivity(i);
    }

    public void onMapButtonClick(View view) {
        Log.v(TAG, "called maps");
        Intent i = new Intent(this, MapsActivity.class);
        MainActivity.this.startActivity(i);
    }

    public void onLogInButtonClick(View view) {
        // the intent connects the two classes
        Log.v(TAG, "called login");
        Intent i = new Intent(this, LogInActivity.class);
        MainActivity.this.startActivity(i);
    }

    public void onSignUpButtonClick(View view) {
        // the intent connects the two classes
        Log.v(TAG, "called signup");
        Intent i = new Intent(this, SignUpActivity.class);
        MainActivity.this.startActivity(i);
    }
}
