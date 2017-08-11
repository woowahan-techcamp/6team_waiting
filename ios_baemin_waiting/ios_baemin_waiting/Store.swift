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
    private var _searchRange: [String: Any]

    init(storeName: String, storeAddress: String, storeLatitude: String, storeLongitude: String, storeImgUrl: URL, searchRange: [String: Any]) {
        self._storeName = storeName
        self._storeAddress = storeAddress
        self._storeLatitude = storeLatitude
        self._storeLongitude = storeLongitude
        self._storeImgUrl = storeImgUrl
        self._searchRange = searchRange
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

    public var searchRange: [String: Any] {
        get { return self._searchRange }
        set { self._searchRange = newValue }
    }

    public var storeImgUrl: URL {
        get { return self._storeImgUrl }
        set { self._storeImgUrl = newValue }
    }
}
