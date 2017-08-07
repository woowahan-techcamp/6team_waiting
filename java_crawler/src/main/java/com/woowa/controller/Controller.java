package com.woowa.controller;

import com.woowa.addressConverter.LatLonConverter;
import com.woowa.crawler.Crawler;
import com.woowa.fileout.CSVFileOutput;
import com.woowa.fileout.FileOutput;
import com.woowa.fileout.JsonFileOutPut;
import com.woowa.model.LocationInfo;
import com.woowa.model.Restaurant;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.ArrayList;

public class Controller {
    private Logger log = LoggerFactory.getLogger(Controller.class);

    private String region;
    private Crawler crawler;

    public Controller(String region, Crawler crawler) {
        this.region = region;
        this.crawler = crawler;
    }

    public void crawling() {
        FileOutput csvFileOutput = new CSVFileOutput(region);
        FileOutput jsonFileOutPut = new JsonFileOutPut(region);
        LatLonConverter latLonConverter = new LatLonConverter();

        try {
            ArrayList<Restaurant> restaurantList = crawler.searchRestaurantByLocalName(region);

            for (int i=0; i<restaurantList.size(); i++) {
                LocationInfo addressInfo = restaurantList.get(i).getRestaurantsLocationInfo();
                Float[] latLon = latLonConverter.getLocation(addressInfo.getRestaurantsAddress());
                log.info(addressInfo.getRestaurantsAddress());
                log.debug("위도 : "+latLon[0].toString()+"");
                log.debug("경도 : "+latLon[1].toString()+"");
                addressInfo.setRestaurantsLatitude(latLon[0].toString());
                addressInfo.setRestaurantsLongitude(latLon[1].toString());
            }

            csvFileOutput.makeFile(restaurantList);
            jsonFileOutPut.makeFile(makeJsonObject(restaurantList, "restaurantItem").toString());

        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    private JSONObject makeJsonObject(ArrayList<Restaurant> restaurantList, String objectName) {
        JSONObject jsonObject =  new JSONObject();
        JSONObject locationObject = new JSONObject();


        jsonObject.put(objectName, restaurantList);
        return jsonObject;
    }
}
