package com.woowa.model;

/**
 * Created by woowabrothers on 2017. 8. 7..
 */
public class LocationInfo {
    private String restaurantsAddress;
    private String restaurantsLatitude;
    private String restaurantsLongitude;

    public LocationInfo(String restaurantsAddress) {
        this.restaurantsAddress = restaurantsAddress;
    }

    public String getRestaurantsAddress() {
        return restaurantsAddress;
    }

    public void setRestaurantsAddress(String restaurantsAddress) {
        this.restaurantsAddress = restaurantsAddress;
    }

    public String getRestaurantsLatitude() { return restaurantsLatitude; }

    public void setRestaurantsLatitude(String restaurantsLatitude) { this.restaurantsLatitude = restaurantsLatitude; }

    public String getRestaurantsLongitude() { return restaurantsLongitude; }

    public void setRestaurantsLongitude(String restaurantsLongitude) { this.restaurantsLongitude = restaurantsLongitude; }
}
