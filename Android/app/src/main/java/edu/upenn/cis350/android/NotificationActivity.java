package edu.upenn.cis350.android;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.util.Log;
import android.view.View;

import org.json.JSONArray;
import org.json.JSONObject;

import java.net.URL;
import java.util.ArrayList;

public class NotificationActivity extends AppCompatActivity {
    private static final String TAG_POST = "POST";
    private static final String TAG_GET = "GET";
    String email = "";
    RecyclerViewAdapter adapter;
    ArrayList<JSONObject> testList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_notification);
        email = getIntent().getStringExtra("email");

        testList = new ArrayList<>();
        getNotifications();

        RecyclerView recyclerView = findViewById(R.id.requests);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        adapter = new RecyclerViewAdapter(this,testList, false);
        recyclerView.setAdapter(adapter);


    }




    private void getNotifications(){
        try {
            URL url = new URL("http://10.0.2.2:5000/api/getAllNotifications");
            JSONObject postData = new JSONObject();
            postData.put("email", email);
            HTTPPostArrayRequest task = new HTTPPostArrayRequest(postData);
            task.execute(url.toString());
            JSONArray requestArray = task.get();
            Log.v(TAG_GET, "i is currently" + requestArray.length());
            for(int i = 0 ; i < requestArray.length(); i ++) {
                JSONObject request = (JSONObject) requestArray.get(i);
                testList.add(request);
            }
            Log.v(TAG_GET, "Notifications " + requestArray.toString());
        }
        catch (Exception e) {
            Log.v(TAG_POST, "Exception " + e.toString());
        }
    }

    /* Need to test refresh button works */
    public void onRefreshButtonClick(View view) {
        getNotifications();
        adapter = null;
        RecyclerView recyclerView = findViewById(R.id.requests);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        adapter = new RecyclerViewAdapter(this,testList, false);
        recyclerView.setAdapter(adapter);
    }
}
