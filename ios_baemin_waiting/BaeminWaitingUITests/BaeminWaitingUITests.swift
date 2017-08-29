//
//  BaeminWaitingUITests.swift
//  BaeminWaitingUITests
//
//  Created by woowabrothers on 2017. 8. 29..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import XCTest

class BaeminWaitingUITests: XCTestCase {

    override func setUp() {
        super.setUp()

        // Put setup code here. This method is called before the invocation of each test method in the class.

        // In UI tests it is usually best to stop immediately when a failure occurs.
        continueAfterFailure = false
        // UI tests must launch the application that they test. Doing this in setup will make sure it happens for each test method.
        XCUIApplication().launch()

        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
    }

    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }

    func testMainSimulator() {

        for _ in 1...10 {
            let app = XCUIApplication()
            let button = app.buttons["새로고침"]
            button.tap()
            button.tap()

            let navigationBar = app.navigationBars["배민웨이팅"]
            navigationBar.buttons["map"].tap()
            navigationBar.buttons["list"].tap()
            navigationBar.buttons["ticket"].tap()
            app.alerts["티켓 없음"].buttons["OK"].tap()
        }
    }

}
