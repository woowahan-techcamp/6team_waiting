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

    func testPerformanceExample() {
        // This is an example of a performance test case.
        self.measure {
            // Put the code you want to measure the time of here.
        }
    }
}
