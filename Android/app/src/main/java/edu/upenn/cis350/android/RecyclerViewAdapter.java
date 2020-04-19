package edu.upenn.cis350.android;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import org.json.JSONObject;

import java.util.List;
// Tutorial for recycler view adapter based off
// https://stackoverflow.com/questions/40584424/simple-android-recyclerview-example
public class RecyclerViewAdapter extends RecyclerView.Adapter<RecyclerViewAdapter.ViewHolder> {

    private List<JSONObject> mData;
    private LayoutInflater mInflater;
    private boolean feed;

    // data is passed into the constructor
    RecyclerViewAdapter(Context context, List<JSONObject> data, boolean feed) {
        this.mInflater = LayoutInflater.from(context);
        this.mData = data;
        this.feed = feed;
    }

    // inflates the row layout from xml when needed
    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = mInflater.inflate(R.layout.recyclerview_row, parent, false);
        return new ViewHolder(view);
    }


    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        JSONObject post = mData.get(position);
        try {
            if(feed){
                holder.location.setText("Location: " + post.getString("latitude") + post.getString("longitude"));
                holder.description.setText("Description: " + post.getString( "description"));
                holder.username.setText("Author: " + post.getString("firstname") + post.getString("lastname"));
            } else {
                holder.description.setText("Request Status: " + post.getString( "description"));
                holder.username.setText("Author: " + post.getString("firstname") + post.getString("lastname"));
            }

        }
        catch(Exception e) {

        }
    }


    // total number of rows
    @Override
    public int getItemCount() {
        return mData.size();
    }


    // stores and recycles views as they are scrolled off screen
    public class ViewHolder extends RecyclerView.ViewHolder {
        TextView location;
        TextView description;
        TextView username;

        ViewHolder(View itemView) {
            super(itemView);
            location = itemView.findViewById(R.id.location);
            description = itemView.findViewById(R.id.description);
            username = itemView.findViewById(R.id.username);
        }

    }

}