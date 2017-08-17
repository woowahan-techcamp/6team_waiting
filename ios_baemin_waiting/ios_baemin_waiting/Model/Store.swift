//
//  Store.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 8..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import Foundation

struct Store {
    private var _storeName: String
    private var _storeAddress: String
    private var _storeLatitude: String
    private var _storeLongitude: String
    private var _storeImgUrl: URL
    private var _distanceToUser: Double

    private var _storeDescription: String
    private var _storeTel: String

    init(storeName: String, storeAddress: String, storeLatitude: String, storeLongitude: String, storeImgUrl: URL) {
        self._storeName = storeName
        self._storeAddress = storeAddress
        self._storeLatitude = storeLatitude
        self._storeLongitude = storeLongitude
        self._storeImgUrl = storeImgUrl
        self._distanceToUser = 0
        self._storeDescription = ""
        self._storeTel = ""
    }

    public var storeName: String {
        get { return self._storeName }
        set { self._storeName = newValue }
    }
    public var storeAddress: String {
        get { return self._storeAddress }
        set { self._storeAddress = newValue }
    }
    public var storeLatitude: String {
        get { return self._storeLatitude }
        set { self._storeLatitude = newValue }
    }
    public var storeLongitude: String {
        get { return self._storeLongitude }
        set { self._storeLongitude = newValue }
    }

    public var storeImgUrl: URL {
        get { return self._storeImgUrl }
        set { self._storeImgUrl = newValue }
    }
    public var storeDistance: Double {
        return self._distanceToUser
    }

    public var storeDescription: String {
        get { return self._storeDescription }
        set { self._storeDescription = newValue }
    }
    public var storeTel: String {
        get { return self._storeTel }
        set { self._storeTel = newValue }
    }

    public mutating func getDistanceFromUser(userLocation: CLLocation) {
        let storeLat = CLLocationDegrees(self.storeLatitude)
        let storeLong = CLLocationDegrees(self.storeLongitude)

        let storeLocation = CLLocation(latitude: storeLat!, longitude: storeLong!)

        let distance = userLocation.distance(from: storeLocation)

        self._distanceToUser = distance

    }
}
