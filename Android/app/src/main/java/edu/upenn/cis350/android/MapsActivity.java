package edu.upenn.cis350.android;

import androidx.fragment.app.FragmentActivity;

import android.os.Bundle;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import android.app.AlertDialog;
import android.widget.EditText;
import android.text.InputType;
import android.content.DialogInterface;
import android.widget.LinearLayout;
import android.util.Log;
import android.view.View;
import android.widget.TextView;
import android.graphics.Color;
import android.graphics.Typeface;
import android.view.Gravity;

import java.net.URL;
import org.json.JSONArray;
import org.json.JSONObject;
import java.util.ArrayList;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback {

    private GoogleMap mMap;
    ArrayList<JSONObject> testList;
    private static final String TAG_POST = "POST";
    private static final String TAG_GET = "GET";
    String email = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
        email = getIntent().getStringExtra("email");
    }

    //Adding a marker to the map
    public void addingMarkers(String t, String d, String f, String l, LatLng p, boolean pending){
        LatLng point = p;
        String title = t;
        String description = d;
        String first = f;
        String last = l;
        boolean pendingstatus = pending;

        String authorinfo = "By: " + first + " " + last;

        float color =  pendingstatus ? BitmapDescriptorFactory.HUE_RED : BitmapDescriptorFactory.HUE_GREEN;


        mMap.addMarker(new MarkerOptions()
                .position(point)
                .title(title)
                .snippet(authorinfo + "\n" + description)
                .icon(BitmapDescriptorFactory.defaultMarker(color)));

        mMap.setInfoWindowAdapter(new GoogleMap.InfoWindowAdapter() {

            @Override
            public View getInfoWindow(Marker arg0) {
                return null;
            }

            @Override
            public View getInfoContents(Marker marker) {

                LinearLayout info = new LinearLayout(MapsActivity.this);
                info.setOrientation(LinearLayout.VERTICAL);

                TextView title = new TextView(MapsActivity.this);
                title.setTextColor(Color.BLACK);
                title.setGravity(Gravity.CENTER);
                title.setTypeface(null, Typeface.BOLD);
                title.setText(marker.getTitle());

                TextView snippet = new TextView(MapsActivity.this);
                snippet.setTextColor(Color.GRAY);
                snippet.setText(marker.getSnippet());

                info.addView(title);
                info.addView(snippet);

                return info;
            }
        });

    }

    public void getAcceptedMarkers(){
        try {
            URL url = new URL("http://10.0.2.2:5000/api/getAllAlerts");
            HTTPGetRequest task = new HTTPGetRequest();
            task.execute(url.toString());
            JSONArray requestArray = task.get();
            Log.v(TAG_GET, "i is currently" + requestArray.length());
            for(int i = 0 ; i < requestArray.length(); i ++){
                JSONObject request = (JSONObject) requestArray.get(i);
                Log.v(TAG_GET, "length of request is " + request.length());
                if(request.length() != 9){
                    continue;
                } else {
                    String title = request.getString("title");
                    String description = request.getString("description");
                    String firstname = request.getString("firstname");
                    String lastname = request.getString("lastname");
                    String location = request.getString("location");
                    double latitude = request.getDouble("latitude");
                    double longitude = request.getDouble("longitude");

                    addingMarkers(title, description, firstname, lastname, new LatLng(latitude, longitude), false);
                }

            }
            Log.v(TAG_GET, "value of get is " + requestArray.toString());
        }
        catch (Exception e) {
            Log.v(TAG_GET, "exception is " + e);
        }

    }


    public void getPendingMarkers(){
        try {
            URL url = new URL("http://10.0.2.2:5000/api/getAllRequestsForUser");
            JSONObject postData = new JSONObject();
            postData.put("email", email);
            HTTPPostArrayRequest task = new HTTPPostArrayRequest(postData);
            task.execute(url.toString());
            JSONArray requestArray = task.get();
            Log.v(TAG_GET, "i is currently" + requestArray.length());
            for(int i = 0 ; i < requestArray.length(); i ++) {
                JSONObject request = (JSONObject) requestArray.get(i);

                String title = (String) request.get("title");
                String description = (String) request.get("description");
                String firstname = (String) request.get("firstname");
                String lastname = (String) request.get("lastname");
                String location = (String) request.get("location");
                double latitude = (double) request.get("latitude");
                double longitude = (double) request.get("longitude");

                addingMarkers(title, description, firstname, lastname, new LatLng(latitude, longitude), true);
            }
            Log.v(TAG_GET, "value of pending markers is  " + requestArray.toString());
        }
        catch (Exception e) {
            Log.v(TAG_GET, "exception is " + e);
        }

    }


    public void postingMarker(String title, String description, String location,
                              String firstname, String lastname, LatLng point) {
        try {
            URL url = new URL("http://10.0.2.2:5000/api/postRequest");
            JSONObject postData = new JSONObject();

            double latitude = point.latitude;
            double longitude = point.longitude;

            postData.put("title", title);
            postData.put("email", email);
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
        } catch (Exception e) {
            Log.v(TAG_POST, "error" + e.toString());
        }
    }

    public void infoForm(LatLng p){
        final LatLng point = p;
        AlertDialog.Builder builder = new AlertDialog.Builder(MapsActivity.this);
        LinearLayout layout = new LinearLayout(MapsActivity.this);
        layout.setOrientation(LinearLayout.VERTICAL);


        final EditText titleBox = new EditText(MapsActivity.this);
        titleBox.setHint("Title");
        layout.addView(titleBox);


        final EditText descriptionBox = new EditText(MapsActivity.this);
        descriptionBox.setHint("Description");
        layout.addView(descriptionBox);

        final EditText firstNBox = new EditText(MapsActivity.this);
        firstNBox.setHint("First Name");
        layout.addView(firstNBox);


        final EditText lastNBox = new EditText(MapsActivity.this);
        lastNBox.setHint("Last Name");
        layout.addView(lastNBox);

        builder.setView(layout); // Again this is a set method, not add

        // Set up the buttons
        builder.setPositiveButton("OK", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                String title = titleBox.getText().toString();
                String description = descriptionBox.getText().toString();
                String first = firstNBox.getText().toString();
                String last = lastNBox.getText().toString();

                postingMarker(title, description, "Penn", first, last, point);
                addingMarkers(title, description, first, last, point, true);

            }
        });
        builder.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.cancel();
            }
        });
        builder.show();
    }

    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     */
    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;

        // Add a marker in Philadelphia and move the camera
        LatLng philly = new LatLng(39.9522, -75.1932);
        //mMap.addMarker(new MarkerOptions().position(philly).title("Marker in Philadelphia"));
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(philly, 15));
        getPendingMarkers();
        getAcceptedMarkers();
        mMap.setOnMapLongClickListener(new GoogleMap.OnMapLongClickListener() {

            @Override
            public void onMapLongClick(final LatLng point) {

                infoForm(point);
            }
        });


    }

    public void onRefreshButtonClick(View view) {
        mMap.clear();
        getPendingMarkers();
        getAcceptedMarkers();
    }
}
