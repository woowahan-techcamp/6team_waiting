//
//  NaverMapUnitTests.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 7..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import XCTest
import CoreLocation
@testable import ios_baemin_waiting

class NaverMapUnitTests: XCTestCase {
    override func setUp() {
        super.setUp()

    }
    override func tearDown() {

        super.tearDown()
    }

    // 네이버 지도 객체 테스트
    func testImplementNaverMap() {
        guard let filePath = Bundle.main.path(forResource: "Info", ofType: "plist") else { return }

        let info = NSDictionary(contentsOfFile: filePath)
        guard let APIKey = info?["NaverMapAPIKey"] as? String else { return }

        let mapView = NMapView(frame: CGRect(x: 0, y: 0, width: 375, height: 667))

        mapView.setClientId(APIKey)
    }

    func testLength() {

        let coor1 = CLLocation(latitude: 37.5666091, longitude: 126.978371)
        let coor2 = CLLocation(latitude: 37.5606091, longitude: 126.978371)

        let distance = coor1.distance(from: coor2)

        print(distance)

        let p1 = CLLocation(latitude: 37.51642938232422, longitude: 127.11729052734376)
        let p2 = CLLocation(latitude: 37.51642938232422, longitude: 127.10329052734374)

        let dis1 = p1.distance(from: p2)

        print(dis1)

        let p3 = CLLocation(latitude: 37.51642938232422, longitude: 127.11729052734376)
        let p4 = CLLocation(latitude: 37.50442938232422, longitude: 127.11729052734376)

        let dis2 = p3.distance(from: p4)

        print(dis2)

//        leftLatitude”:“37.51642938232422",“topLongitude”:“127.11729052734376",
//        “lowLongitude”:“127.10329052734374",“rightLatitude”:“37.50442938232422

    }
    func testPerformanceExample() {
        // This is an example of a performance test case.
        self.measure {
            // Put the code you want to measure the time of here.
        }
    }
}
