package edu.upenn.cis350.android;

class Post {
    private String username;
    private String title;
    private String description;
    Post (String u, String t, String d) {
        username = u;
        title = t;
        description = d;

    }

    public String getTitle() {
        return title;
    }

    public String getUsername() {
        return username;
    }

    public String getDescription() {
    return description;
    }
}