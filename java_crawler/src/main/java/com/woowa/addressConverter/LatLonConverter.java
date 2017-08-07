package com.woowa.addressConverter;

import com.google.code.geocoder.Geocoder;
import com.google.code.geocoder.GeocoderRequestBuilder;
import com.google.code.geocoder.model.*;

import java.io.IOException;

/**
 * Created by woowabrothers on 2017. 8. 7..
 */

public class LatLonConverter {
    Geocoder geoCoder = new Geocoder();

    public Float[] getLocation(String address) {
        String filteredAddress = "";

        String[] addressLength = address.split(" ");

        if (addressLength.length != 4) {
            for (int i=0; i<4; i++) {
                filteredAddress = filteredAddress + addressLength[i] + " ";
            }
        } else {
            filteredAddress = address;
        }


        Float[] coords = new Float[2];

        GeocoderRequest geocoderRequest = new GeocoderRequestBuilder().setAddress(filteredAddress).setLanguage("ko").getGeocoderRequest();
        GeocodeResponse geocodeResponse;

        try {

            geocodeResponse = geoCoder.geocode(geocoderRequest);

            if(geocodeResponse.getStatus() == GeocoderStatus.OK && !geocodeResponse.getResults().isEmpty()) {

                GeocoderResult geocoderResult = geocodeResponse.getResults().iterator().next();
                LatLng latitudeLongitude = geocoderResult.getGeometry().getLocation();

                coords[0] = latitudeLongitude.getLat().floatValue();
                coords[1] = latitudeLongitude.getLng().floatValue();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return coords;
    }
}
