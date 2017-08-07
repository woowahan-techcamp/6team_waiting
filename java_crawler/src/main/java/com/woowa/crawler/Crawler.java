package com.woowa.crawler;

import java.io.IOException;
import java.util.ArrayList;

public interface Crawler {
    ArrayList searchRestaurantByLocalName(String localName) throws IOException;
}
