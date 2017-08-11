//
//  ViewController.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 4..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit

class MapViewController: UIViewController {

    let naverMap = NaverMapHandler()
    let jsonController = JsonController()
    var mapView: NMapView?
    var myLocation: NGeoPoint?
    var circleArea: NMapCircleData?

    var storeList: [Store] = []

    override func viewDidLoad() {
        super.viewDidLoad()

        mapView = naverMap.initMap(frame: self.view.bounds)

        if let mapView = mapView {
            mapView.delegate = naverMap
            mapView.autoresizingMask = [.flexibleWidth, .flexibleHeight]

            view.addSubview(mapView)
        }

        switch naverMap.currentState {
        case .disabled:
            enableLocationUpdate()
            naverMap.currentState = .tracking
        default:
            disableLocationUpdate()
            naverMap.currentState = .disabled
        }
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)

        mapView?.viewDidAppear()

    }
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)

        mapView?.viewWillDisappear()
        disableLocationUpdate()
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
        let locationAccuracy = Float(location.horizontalAccuracy)

        if let location = myLocation {
            mapView?.mapOverlayManager.setMyLocation(location, locationAccuracy: locationAccuracy)
            mapView?.setMapCenter(location)
        }
        addCircleAroundMyPosition()

        addMarker()

        if let location = myLocation {
            mapView?.setMapCenter(location, atLevel: 9)
        }
    }
    // 현재 위치 로딩 실패시 호출
    func locationManager(_ locationManager: NMapLocationManager!, didFailWithError errorType: NMapLocationManagerErrorType) {
        var message: String = ""

        switch errorType {
        case .unknown: fallthrough
        case .canceled: fallthrough
        case .timeout:
            message = "일시적으로 내위치를 확인 할 수 없습니다."
        case .denied:
            message = "위치 정보를 확인 할 수 없습니다.\n사용자의 위치 정보를 확인하도록 허용하시려면 위치서비스를 켜십시오."
        case .unavailableArea:
            message = "현재 위치는 지도내에 표시할 수 없습니다."
        case .heading:
            message = "나침반 정보를 확인 할 수 없습니다."
        }

        if !message.isEmpty {
            let alert = UIAlertController(title:"NMapViewer", message: message, preferredStyle: .alert)
            alert.addAction(UIAlertAction(title:"OK", style:.default, handler: nil))
            present(alert, animated: true, completion: nil)
        }

    }
//    func onMapViewIsGPSTracking(_ mapView: NMapView!) -> Bool {
//        return NMapLocationManager.getSharedInstance().isTrackingEnabled()
//    }

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
                manager.startContinuousLocationInfo()

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
                        circleStyle.setFillColorWithRed(42/255, green: 192/255, blue: 187/255, alpha: 0.1)
                        circleStyle.strokeColor = UIColor(red: 42/255, green: 192/255, blue: 187/255, alpha: 1.0)
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
        let storeList = restaurantInCircle()

        if let mapOverlayManager = mapView?.mapOverlayManager {

            if let poiDataOverlay = mapOverlayManager.newPOIdataOverlay() {

                poiDataOverlay.initPOIdata(Int32(storeList.count))

                for store in storeList {

                    if let long = Double(store.storeLongitude),
                        let lat = Double(store.storeLatitude) {

                        let markerLocation = NGeoPoint(longitude: long, latitude: lat)
                        poiDataOverlay.addPOIitem(atLocation: markerLocation, title: store.storeName,
                                                  type: userPOIflagTypeDefault, with: nil)
                    }

                }
                poiDataOverlay.endPOIdata()
                poiDataOverlay.showAllPOIdata()
            }
        }
    }
    func restaurantInCircle() -> [Store] {
        let storeList = jsonController.getItem()

        var resultList: [Store] = []
        for store in storeList {
            if let long = Double(store.storeLongitude),
                let lat = Double(store.storeLatitude) {

                let markerLocation = NGeoPoint(longitude: long, latitude: lat)

                if let location = myLocation {
                    if isInCircle(point1: location, point2: markerLocation, distance: 1500) {
                        resultList.append(store)
                    }
                }
            }
        }
        return resultList
    }

    func isInCircle(point1: NGeoPoint, point2: NGeoPoint, distance: Double) -> Bool {
        if NMapView.distance(fromLocation: point1, toLocation: point2) < distance {
            return true
        }
        return false
    }
}
