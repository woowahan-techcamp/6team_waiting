package com.woowa.model;

/**
 * Created by woowabrothers on 2017. 8. 4..
 */
public class Restaurant {

    private String restaurantsName;
    private String restaurantsAddress;
    private String restaurantsTel;
    private String restaurantsImgUrl;
    private String restaurantsDescription;
    private String restaurantsRunningTime;

    public Restaurant(String restaurantsName,
                      String restaurantsAddress,
                      String restaurantsTel) {
        this.restaurantsName = restaurantsName;
        this.restaurantsAddress = restaurantsAddress;
        this.restaurantsTel = restaurantsTel;
    }

    public String getRestaurantsName() {
        return restaurantsName;
    }

    public void setRestaurantsName(String restaurantsName) {
        this.restaurantsName = restaurantsName;
    }

    public String getRestaurantsAddress() {
        return restaurantsAddress;
    }

    public void setRestaurantsAddress(String restaurantsAddress) {
        this.restaurantsAddress = restaurantsAddress;
    }

    public String getRestaurantsTel() {
        return restaurantsTel;
    }

    public void setRestaurantsTel(String restaurantsTel) {
        this.restaurantsTel = restaurantsTel;
    }

    public String getRestaurantsImgUrl() {
        return restaurantsImgUrl;
    }

    public void setRestaurantsImgUrl(String restaurantsImgUrl) {
        this.restaurantsImgUrl = restaurantsImgUrl;
    }

    public String getRestaurantsDescription() {
        return restaurantsDescription;
    }

    public void setRestaurantsDescription(String restaurantsDescription) {
        this.restaurantsDescription = restaurantsDescription;
    }

    public String getRestaurantsRunningTime() {
        return restaurantsRunningTime;
    }

    public void setRestaurantsRunningTime(String restaurantsRunningTime) {
        this.restaurantsRunningTime = restaurantsRunningTime;
    }

    public String[] toStringArray() {
        String[] strings = new String[]{restaurantsName, restaurantsAddress, restaurantsTel, restaurantsImgUrl, restaurantsDescription, restaurantsRunningTime};
        return strings;
    }
}
