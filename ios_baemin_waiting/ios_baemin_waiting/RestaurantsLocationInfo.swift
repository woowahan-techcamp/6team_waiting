//
//  RestaurantsLocationInfo.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 8..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import Foundation

struct RestaurantsLocationInfo {
    private var _restaurantsName: String
    private var _restaurantsAddress: String
    private var _restaurantsLatitude: String
    private var _restaurantsLongitude: String
    private var _searchRange: [String: Any]

    init(restaurantsName: String, restaurantsAddress: String, restaurantsLatitude: String, restaurantsLongitude: String, searchRange: [String: Any]) {
        self._restaurantsName = restaurantsName
        self._restaurantsAddress = restaurantsAddress
        self._restaurantsLatitude = restaurantsLatitude
        self._restaurantsLongitude = restaurantsLongitude
        self._searchRange = searchRange
    }

    public var restaurantName: String {
        get { return self._restaurantsName }
        set { self._restaurantsName = newValue }
    }

    public var restaurantsAddress: String {
        get { return self._restaurantsAddress }
        set { self._restaurantsAddress = newValue }
    }
    public var restaurantsLatitude: String {
        get { return self._restaurantsLatitude }
        set { self._restaurantsLatitude = newValue }
    }
    public var restaurantsLongitude: String {
        get { return self._restaurantsLongitude }
        set { self._restaurantsLongitude = newValue }
    }

    public var searchRange: [String: Any] {
        get { return self._searchRange }
        set { self._searchRange = newValue }
    }

}
