//
//  NaverMapUnitTests.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 7..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import XCTest
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
            guard let topLeftLatitude = locationInfo["leftLatitude"] as? String else { return false }
            guard let topLeftLongitude = locationInfo["topLongitude"] as? String else { return false }
            guard let bottomRightLongitude = locationInfo["lowLongitude"] as? String else { return false }
            guard let bottomRightLatitude = locationInfo["rightLatitude"] as? String else { return false }

            guard let topLeftLat = CLLocationDegrees(topLeftLatitude) else { return false }
            guard let topLeftLong = CLLocationDegrees(topLeftLongitude) else { return false }

            guard let bottomRightLat = CLLocationDegrees(bottomRightLatitude) else { return false }
            guard let bottomRightLong = CLLocationDegrees(bottomRightLongitude) else { return false }

            // lat : 위아래, 아래쪽이 
            // long : 양 옆, 오른쪽이 크다

            let long = CLLocationDegrees(point.longitude)
            let lat = CLLocationDegrees(point.latitude)

            let checkTop = lat > topLeftLat
            let checkBottom = lat < bottomRightLat

            let checkLeft = long > topLeftLong
            let checkRight = long < bottomRightLong

            if checkLeft && checkRight && checkTop && checkBottom {
                return true
            }
            return false
        }

        let jsonController = JsonController()
        let restaurantsList = jsonController.getItem()

        let filteredList = restaurantsList.filter { (value) in

            let locationInfo = value.searchRange
            let point = NGeoPoint(longitude: 127.11279430000002, latitude: 37.5168692)

            return isInRect(locationInfo: locationInfo, point: point)
        }

        print(filteredList)
    }

// 처음 코드
    func testRestaurantInArea2() {
        let jsonController = JsonController()
        let restaurantsList = jsonController.getItem()

        var resultList: [Store] = []
        for restaurant in restaurantsList {

            let locationInfo = restaurant.searchRange
            let point = NGeoPoint(longitude: 127.11729052734376, latitude: 37.50442938232422)

            guard let topLatitude = locationInfo["leftLatitude"] as? String else { return }
            guard let leftLongitude = locationInfo["topLongitude"] as? String else { return }

            guard let bottomLatitude = locationInfo["rightLatitude"] as? String else { return }
            guard let rightLongitude = locationInfo["lowLongitude"] as? String else { return }

            guard let topLat = CLLocationDegrees(topLatitude) else { return }
            guard let leftLong = CLLocationDegrees(leftLongitude) else { return }

            guard let bottomLat = CLLocationDegrees(bottomLatitude) else { return }
            guard let rightLong = CLLocationDegrees(rightLongitude) else { return }

            // lat : 위아래, 위쪽이 크다
            // long : 양 옆, 오른쪽이 크다

            let long = CLLocationDegrees(point.longitude)
            let lat = CLLocationDegrees(point.latitude)

            let checkTop = lat < topLat
            let checkBottom = lat > bottomLat

            let checkLeft = long > leftLong
            let checkRight = long < rightLong

            if checkLeft && checkRight && checkTop && checkBottom {
                resultList.append(restaurant)
            }
        }

        print(resultList)
    }
//    "leftLatitude":"37.51642938232422","topLongitude":"127.11729052734376","lowLongitude":"127.10329052734374","rightLatitude":"37.50442938232422"

    func testPerformanceExample() {
        // This is an example of a performance test case.
        self.measure {
            // Put the code you want to measure the time of here.
        }
    }
}
