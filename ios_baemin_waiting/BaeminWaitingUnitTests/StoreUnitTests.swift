//
//  StoreUnitTests.swift
//  ios_baemin_waiting
//
//  Created by 홍창남 on 2017. 8. 16..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import XCTest
@testable import ios_baemin_waiting

class StoreUnitTests: XCTestCase {
    var store: Store?
    override func setUp() {
        super.setUp()


    }
    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }

    func testStoreToUser() {

        store = Store(storeName: "", storeAddress: "", storeLatitude: "37.50442938232422", storeLongitude: "127.11729052734376", storeImgUrl: URL(string: "")!, searchRange: [:])
//        let distance = store?.getDistanceFromUser(userLocation: CLLocation)

        guard let userLat = CLLocationDegrees("37.518778141797853") else { return }
        guard let userLong = CLLocationDegrees("127.11176685839408") else { return }

        let userLocation = CLLocation(latitude: userLat, longitude: userLong)

        let storeLat = CLLocationDegrees((store?.storeLatitude)!)
        let storeLong = CLLocationDegrees((store?.storeLongitude)!)

        let storeLocation = CLLocation(latitude: storeLat!, longitude: storeLong!)

        let distance = userLocation.distance(from: storeLocation)

        print(distance)

    }

    func testPerformanceExample() {
        // This is an example of a performance test case.
        self.measure {
            // Put the code you want to measure the time of here.
        }
    }
}
