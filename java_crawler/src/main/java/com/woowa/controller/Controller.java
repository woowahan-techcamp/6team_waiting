package com.woowa.controller;

import com.woowa.crawler.Crawler;
import com.woowa.fileout.CSVFileOutput;
import com.woowa.fileout.FileOutput;
import com.woowa.fileout.JsonFileOutPut;
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

        try {
            ArrayList<Restaurant> restaurantList = crawler.searchRestaurantByLocalName(region);

            csvFileOutput.makeFile(restaurantList);
            jsonFileOutPut.makeFile(makeJsonObject(restaurantList).toString());

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private JSONObject makeJsonObject(ArrayList<Restaurant> restaurantList) {
        JSONObject jsonObject =  new JSONObject();
        JSONArray jsonArray = new JSONArray();

        jsonArray.put(restaurantList);
        jsonObject.put("item", jsonArray);
        return jsonObject;
    }
}
