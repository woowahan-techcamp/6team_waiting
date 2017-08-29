//
//  Store.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 8..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import Foundation

class Store {
    private var _storeName: String
    private var _storeId: Int
    private var _storeAddress: String
    private var _storeLatitude: String
    private var _storeLongitude: String
    private var _storeImgUrl: URL?
    private var _distanceToUser: Double
    private var _storeDescription: String
    private var _storeTel: String
    private var _storeIsOpened: Bool
    private var _currentInLine: Int
    private var _storeShortAddress: String

    init() {
        self._storeName = ""
        self._storeId = 0
        self._storeAddress = ""
        self._storeLatitude = ""
        self._storeLongitude = ""
        self._storeImgUrl = URL(string: "")
        self._distanceToUser = 0
        self._storeDescription = ""
        self._storeTel = ""
        self._storeIsOpened = true
        self._currentInLine = 0
        self._storeShortAddress = ""
    }
    convenience init(storeName: String, storeId: Int, storeAddress: String, storeLatitude: String, storeLongitude: String, storeImgUrl: URL, currentInLine: Int) {
        self.init()
        self._storeName = storeName
        self._storeId = storeId
        self._storeAddress = storeAddress
        self._storeLatitude = storeLatitude
        self._storeLongitude = storeLongitude
        self._storeImgUrl = storeImgUrl
        self._currentInLine = currentInLine
    }
    convenience init(storeName: String, storeId: Int, storeDescription: String, storeTel: String, storeLatitude: String,
                     storeLongitude: String, storeImgUrl: URL, currentInLine: Int) {
        self.init()
        self._storeName = storeName
        self._storeId = storeId
        self._storeDescription = storeDescription
        self._storeTel = storeTel
        self._storeLatitude = storeLatitude
        self._storeLongitude = storeLongitude
        self._storeImgUrl = storeImgUrl
        self._currentInLine = currentInLine
    }

    public var storeName: String {
        get { return self._storeName }
        set { self._storeName = newValue }
    }
    public var storeId: Int {
        get { return self._storeId }
        set { self._storeId = newValue }
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
    public var storeImgUrl: URL? {
        get {
            if self._storeImgUrl == nil {
                return URL(string: "")
            }
            return self._storeImgUrl!
        }
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
    public var storeIsOpened: Bool {
        get { return self._storeIsOpened }
        set { self._storeIsOpened = newValue }
    }
    public var currentInLine: Int {
        get { return self._currentInLine }
        set { self._currentInLine = newValue }
    }

    public var storeShortDistance: String {
        return self._storeShortAddress
    }

    public func getDistanceFromUser(userLocation: CLLocation) {
        let storeLat = CLLocationDegrees(self.storeLatitude)
        let storeLong = CLLocationDegrees(self.storeLongitude)

        let storeLocation = CLLocation(latitude: storeLat!, longitude: storeLong!)

        let distance = userLocation.distance(from: storeLocation)

        self._distanceToUser = distance

    }
    public func getShortAddress(address: String) {
        let addrArray = address.components(separatedBy: " ")

        var result = ""
        if addrArray.count >= 3 {
            var gu = addrArray[1]
            var dong = addrArray[2]

            if gu.hasSuffix("구") {
                gu.remove(at: gu.index(before: gu.endIndex))
            }
            result += "\(gu)/"

            if dong.hasSuffix("동") {
                dong.remove(at: dong.index(before: dong.endIndex))
            }

            result += "\(dong)"
        }

        self._storeShortAddress = result

    }
    public func getStoreStatus(isOpened: Int) {
        switch isOpened {
        case 1:
            self._storeIsOpened = true
        default:
            self._storeIsOpened = false
        }
    }
}
