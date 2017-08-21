//
//  ViewController.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 4..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit

class MapViewController: UIViewController {

    let naverMapHandler = NaverMapHandler()
    var mapView: NMapView?
    var myLocation: NGeoPoint?
    var circleArea: NMapCircleData?
    var currentPoiData: [NMapPOIitem] = []

    var storeList: [Store] = []

    override func viewDidLoad() {
        super.viewDidLoad()

        NotificationCenter.default.addObserver(self, selector: #selector(dataUpdated),
                                               name: NSNotification.Name(rawValue: "dataUpdate"), object: nil)

        mapView = naverMapHandler.initMap(frame: self.view.bounds)

        if let mapView = mapView {
            mapView.delegate = naverMapHandler
            mapView.autoresizingMask = [.flexibleWidth, .flexibleHeight]

            view.addSubview(mapView)
        }

        switch naverMapHandler.currentState {
        case .disabled:
            enableLocationUpdate()
            naverMapHandler.currentState = .tracking
        default:
            disableLocationUpdate()
            naverMapHandler.currentState = .disabled
        }
    }

    // NotificationCenter 메소드
    func dataUpdated(_ notification: NSNotification) {
        guard let storeListData = notification.userInfo?["storeData"] as? [Store] else {
            print("Error: Data not Passed")
            return
        }
        self.storeList = storeListData
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)

        mapView?.viewDidAppear()
    }
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)

        mapView?.viewWillDisappear()
    }
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)

        if let location = myLocation {
            mapView?.setMapCenter(location, atLevel: 9)
        }

        mapView?.viewWillAppear()
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}

extension MapViewController: NMapLocationManagerDelegate {
    // 현재 위치 변경시 호출
    func locationManager(_ locationManager: NMapLocationManager!, didUpdateTo location: CLLocation!) {
        let coordinate = location.coordinate

        myLocation = NGeoPoint(longitude: coordinate.longitude, latitude: coordinate.latitude)

        if let location = myLocation {
            mapView?.mapOverlayManager.setMyLocation(location, locationAccuracy: 0)
            mapView?.setMapCenter(location)
        }

        addCircleAroundMyPosition()
        addMarker()

        if let location = myLocation {
            mapView?.setMapCenter(location, atLevel: 9)
        }
//        disableLocationUpdate()
    }
    // 현재 위치 로딩 실패시 호출
    func locationManager(_ locationManager: NMapLocationManager!, didFailWithError errorType: NMapLocationManagerErrorType) {

        if errorType != .unknown && errorType != .canceled {
            NotificationCenter.default.post(name: NSNotification.Name(rawValue: "updateError"),
                                            object: nil, userInfo: ["error": errorType])
        }
    }

    func enableLocationUpdate() {

        if let manager = NMapLocationManager.getSharedInstance() {

            if manager.locationServiceEnabled() == false {
                locationManager(manager, didFailWithError: .denied)
                return
            }

            if manager.isUpdateLocationStarted() == false {
                // set delegate
                manager.setDelegate(self)
                // start updating location

// 한 번만 업데이트
                manager.startCurrentLocationInfo()

// 지속적인 추적용
//                manager.startContinuousLocationInfo()
            }
        }
    }
    func disableLocationUpdate() {

        if let manager = NMapLocationManager.getSharedInstance() {
            if manager.isUpdateLocationStarted() {
                // start updating location
                manager.stopUpdateLocationInfo()
                // set delegate
                manager.setDelegate(nil)
            }
        }
        mapView?.mapOverlayManager.clearMyLocationOverlay()
    }

}

extension MapViewController {

    func addCircleAroundMyPosition() {

        clearOverlays()

        if let mapOverlayManager = mapView?.mapOverlayManager {
            if let pathDataOverlay = mapOverlayManager.newPathDataOverlay(NMapPathData()) {

                if let circleData = NMapCircleData(capacity: 1) {

                    circleData.initCircleData()

                    if let location = myLocation {
                        circleData.addCirclePointLongitude(location.longitude, latitude: location.latitude, radius: 1500.0)
                    }
                    circleData.end()

                    circleArea = circleData

                    // set circle style
                    if let circleStyle = NMapCircleStyle() {

                        circleStyle.setLineType(.solid)
                        circleStyle.setFillColorWithRed(255/255, green: 173/255, blue: 39/255, alpha: 0.1)
                        circleStyle.strokeColor = baseOrange
                        circleStyle.strokeWidth = 1.0
                        circleData.circleStyle = circleStyle
                    }
                    circleArea = circleData
                    pathDataOverlay.add(circleData)
                }
            }
        }
    }
    func clearOverlays() {
        if let mapOverlayManager = mapView?.mapOverlayManager {
            mapOverlayManager.clearOverlays()
        }
    }
}

// MARK: 마커 추가하기
extension MapViewController {

    func addMarker() {
        let storeList = self.storeList

        if let mapOverlayManager = mapView?.mapOverlayManager {

            if let poiDataOverlay = mapOverlayManager.newPOIdataOverlay() {

                poiDataOverlay.initPOIdata(Int32(storeList.count))

                for (idx, store) in storeList.enumerated() {

                    if let long = Double(store.storeLongitude),
                        let lat = Double(store.storeLatitude) {

                        let markerLocation = NGeoPoint(longitude: long, latitude: lat)

                        if let location = myLocation {
                            if isInCircle(point1: location, point2: markerLocation, distance: 1500) {

                                poiDataOverlay.addPOIitem(atLocation: markerLocation, title: store.storeName,
                                                          type: userPOIflagTypeDefault, iconIndex: Int32(idx), with: nil)
                            }
                        }
                    }

                }
                if let data = poiDataOverlay.poiData() as? [NMapPOIitem] {
                    currentPoiData = data
                }
                poiDataOverlay.endPOIdata()
                poiDataOverlay.showAllPOIdata()
            }
        }
    }
    func isInCircle(point1: NGeoPoint, point2: NGeoPoint, distance: Double) -> Bool {
        if NMapView.distance(fromLocation: point1, toLocation: point2) < distance {
            return true
        }
        return false
    }

    func moveToMarker() {
        if let mapOverlayManager = mapView?.mapOverlayManager {
            if let poiDataOverlay = mapOverlayManager.findFocusedPOIdataOverlay() {
                poiDataOverlay.selectPOIitem(with: nil, moveToCenter: true)
            }
        }
    }
}
