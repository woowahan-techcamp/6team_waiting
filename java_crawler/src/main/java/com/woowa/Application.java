package com.woowa;

import com.woowa.controller.Controller;
import com.woowa.crawler.DiningcodeCrawler;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

/**
 * Created by woowabrothers on 2017. 8. 2..
 */
public class Application {
    public static void main(String args[]) {
        Controller controller= new Controller("송파구", new DiningcodeCrawler());
        controller.crawling();
    }
}