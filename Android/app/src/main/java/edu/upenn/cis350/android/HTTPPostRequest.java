package edu.upenn.cis350.android;

import android.os.AsyncTask;
import android.util.Log;

import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;
import java.util.Scanner;

public class HTTPPostRequest extends AsyncTask<String, JSONObject, JSONObject> {
    JSONObject postData;
    public HTTPPostRequest(JSONObject postData) {
        this.postData = postData;
    }
    protected JSONObject doInBackground(String ... params) {
        try {
            // connect to the serverß
            URL url = new URL(params[0]);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setDoInput(true);
            conn.setDoOutput(true);
            conn.setRequestProperty("Content-Type", "application/json");
            conn.connect();
            Log.v("postData", this.postData.toString());
            // Send the post body
            if(this.postData != null) {
                OutputStreamWriter writer = new OutputStreamWriter(conn.getOutputStream());
                writer.write(postData.toString());
                writer.flush();
            }

            int HttpResult = conn.getResponseCode();



            if (HttpResult == HttpURLConnection.HTTP_OK) {
                InputStream inputStream = new BufferedInputStream(conn.getInputStream());
                Scanner in = new Scanner(inputStream);
                String msg = in.nextLine();

                JSONObject jo = new JSONObject(msg);
                Log.v("result of posting a new request", jo.toString());
                return jo;
            }
        } catch (Exception e) {
            Log.v("posting a new request threw exception", e.toString());
            return null;
        }

        return null;
    }

}
