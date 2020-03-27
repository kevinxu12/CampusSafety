package edu.upenn.cis350.android;

import android.os.AsyncTask;
import android.util.Log;

import org.json.JSONArray;
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

public class HTTPGetRequest extends AsyncTask<String, JSONArray, JSONArray> {
    protected JSONArray doInBackground(String ... params) {
        try {
            // connect to the serverß
            URL url = new URL(params[0]);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setDoInput(true);
            conn.connect();

            int HttpResult = conn.getResponseCode();



            if (HttpResult == HttpURLConnection.HTTP_OK) {
                InputStream inputStream = new BufferedInputStream(conn.getInputStream());
                Scanner in = new Scanner(inputStream);
                String msg = in.nextLine();

                JSONArray jo = new JSONArray(msg);
                Log.v("Result of getting requests", jo.toString());
                return jo;
            }
        } catch (Exception e) {
            Log.v("Excecption while getting requests", e.toString());
            return null;
        }

        return null;
    }

}
