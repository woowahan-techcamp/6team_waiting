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

    func testRestaurantInArea() {

        func isInRect(locationInfo: [String: Any], point: NGeoPoint) -> Bool {
            guard let left = locationInfo["leftLatitude"] as? Double else { return false }
            guard let top = locationInfo["topLongitude"] as? Double else { return false }
            guard let bottom = locationInfo["lowLongitude"] as? Double else { return false }
            guard let right = locationInfo["rightLatitude"] as? Double else { return false }

            let checkLeft = point.latitude < left
            let checkRight = point.latitude > right
            let checkTop = point.longitude < top
            let checkBottom = point.longitude < bottom

            if checkLeft && checkRight && checkTop && checkBottom {
                return true
            }
            return false
        }

        let jsonController = JsonController()
        let restaurantsList = jsonController.getItem()

        let mappedList = restaurantsList.map { (value) -> RestaurantsLocationInfo? in

            var v: RestaurantsLocationInfo?

            let locationInfo = value.searchRange
            let point = NGeoPoint(longitude: 127.11729052734376, latitude: 37.50442938232422)

            if isInRect(locationInfo: locationInfo, point: point) {
                v = value
                return v!
            }
            return nil
        }

        let filteredList = mappedList.filter { $0 != nil }

        print(mappedList)
        print(filteredList)

// 처음 코드
//        var resultList: [RestaurantsLocationInfo] = []
//        for restaurant in restaurantsList {
//
//            let locationInfo = restaurant.searchRange
//            let point = NGeoPoint(longitude: 127.11729052734376, latitude: 37.50442938232422)
//
//            if isInRect(locationInfo: locationInfo, point: point) {
//                resultList.append(restaurant)
//            }
//        }

//    "leftLatitude":"37.51642938232422","topLongitude":"127.11729052734376","lowLongitude":"127.10329052734374","rightLatitude":"37.50442938232422"
    }
    func testPerformanceExample() {
        // This is an example of a performance test case.
        self.measure {
            // Put the code you want to measure the time of here.
        }
    }
}
