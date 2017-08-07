package com.woowa.crawler;

import com.woowa.model.LocationInfo;
import com.woowa.model.Restaurant;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.ArrayList;

/**
 * Created by woowabrothers on 2017. 8. 3..
 */
public class DiningcodeCrawler implements Crawler {

    private final String DININGCODE_URL = "http://www.diningcode.com/";
    private static Logger logger = LoggerFactory.getLogger(DiningcodeCrawler.class);

    public ArrayList searchRestaurantByLocalName(String localName) throws IOException {
        ArrayList<Restaurant> restaurantList = new ArrayList<Restaurant>();

        int page = 1;
        Document doc;
        Elements restaurantDetailUrlList;

        while (true) {
            try {
                if (page == 10) break;
                String url = DININGCODE_URL + "list.php?page=" + page + "&chunk=10&query=" + localName + "";

                logger.info("------"+page + "번째 페이지 크롤링입니다.------");
                logger.debug("page URL : "+url);

                doc = Jsoup.connect(url).get();
                restaurantDetailUrlList = doc.select(".dc-restaurant-name");

                if (restaurantDetailUrlList == null) break;

                for (int i = 0; i < restaurantDetailUrlList.size(); i++) {
                    try {
                        Elements restaurantTags = restaurantDetailUrlList.get(i).select("a");

                        restaurantList.add(getRestaurant(restaurantTags.attr("href")));
                    } catch (IOException e) {
                        continue;
                    }
                }
            } catch (IOException e) {

            } finally {
                page++;

            }
        }


        return restaurantList;
    }

    private Restaurant getRestaurant(String restaurantCode) throws IOException {
        String url = DININGCODE_URL + restaurantCode;
        Document doc = Jsoup.connect(url).get();

        logger.info("====================식당===============================");
        logger.info("식당 URL : "+url);

        String restaurantName = getRestaurantName(doc);
        String restaurantAddress = getRestaurantAddress(doc);
        String restaurantTel = getRestaurantTel(doc);
        String restaurantPictureUrl = getRestaurantPicture(doc);
        String restaurantDescription = getRestaurantDescription(doc);
        String restaurantWorkingTime = getRestaurantWorkingTime(doc);

        logging(restaurantName, restaurantAddress, restaurantTel, restaurantPictureUrl, restaurantDescription, restaurantWorkingTime );

        Restaurant restaurant = new Restaurant(restaurantName, restaurantTel);
        LocationInfo locationInfo = new LocationInfo(restaurantAddress);

        restaurant.setRestaurantsImgUrl(restaurantPictureUrl);
        restaurant.setRestaurantsDescription(restaurantDescription);
        restaurant.setRestaurantsRunningTime(restaurantWorkingTime);
        restaurant.setRestaurantsLocationInfo(locationInfo);

        return restaurant;
    }

    private String getRestaurantWorkingTime(Document doc) {
        Element restaurantRunningTimeElement;
        String restaurantRunningWeekDayRaw;
        String restaurantRunningTime;
        Elements restaurantRunningWeekDayElement = doc.select(".rest-time-left");
        restaurantRunningWeekDayRaw = restaurantRunningWeekDayElement.text();

        //영업시간이 없는 식당 예외
        if (doc.select(".time").size() != 0) {
            restaurantRunningTimeElement = doc.select(".time").get(0);
            restaurantRunningTime = restaurantRunningTimeElement.text();
        } else {
            restaurantRunningTime = "";
        }
        String restaurantRunningWeekDay = restaurantRunningWeekDayRaw.replaceAll(",", "/");
        return restaurantRunningWeekDay + restaurantRunningTime;
    }

    private String getRestaurantDescription(Document doc) {
        Element restaurantDescriptionElement = doc.select(".item-information-text").first();
        String restaurantDescriptionRaw = restaurantDescriptionElement.text();
        return restaurantDescriptionRaw.replaceAll(",", "/");
    }

    private String getRestaurantPicture(Document doc) {
        Elements restaurantPictureElement = doc.select("img[id=p0]");
        return restaurantPictureElement.attr("src");
    }

    private String getRestaurantTel(Document doc) {
        Element restaurantTelElement;
        restaurantTelElement = doc.select("#item-tel .item-information-text").first();

        return restaurantTelElement.text();
    }

    private String getRestaurantAddress(Document doc) {
        Element restaurantAddressElement;
        if (doc.select(".item-information-text").size() == 4) {
            restaurantAddressElement = doc.select(".item-information-text").get(2);
        } else {
            restaurantAddressElement = doc.select(".item-information-text").get(1);
        }
        return restaurantAddressElement.text();
    }

    private String getRestaurantName(Document doc) {
        Elements restaurantNameElement = doc.select(".item-rn-title");
        return restaurantNameElement.text();
    }

    private void logging(String restaurantName, String restaurantAddress, String restaurantTel, String restaurantPictureUrl, String restaurantDescription, String restaurantWorkingTime) {
        logger.info("이름 : "+restaurantName);
        logger.info("주소 : "+restaurantAddress);
        logger.info("전화번호 : "+restaurantTel);
        logger.info("이미지 : "+restaurantPictureUrl);
        logger.info("설명 : "+restaurantDescription);
        logger.info("open : "+restaurantWorkingTime);
    }
}
