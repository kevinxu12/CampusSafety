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

public class FeedActivity extends AppCompatActivity {
    private static final String TAG_POST = "POST";
    private static final String TAG_GET = "GET";
    RecyclerViewAdapter adapter;
    ArrayList<JSONObject> testList;
    // for testing

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_feed);
        testList = new ArrayList<>();
        getAlerts();


        RecyclerView recyclerView = findViewById(R.id.requests);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        adapter = new RecyclerViewAdapter(this,testList);
        recyclerView.setAdapter(adapter);
    }

    private void getAlerts() {
        try {
            URL url = new URL("http://10.0.2.2:5000/api/getAllAlerts");
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

    /* Need to test refresh button works */
    public void onRefreshButtonClick(View view) {
        getAlerts();
        RecyclerView recyclerView = findViewById(R.id.requests);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        adapter = new RecyclerViewAdapter(this,testList);
        recyclerView.setAdapter(adapter);
    }


}
