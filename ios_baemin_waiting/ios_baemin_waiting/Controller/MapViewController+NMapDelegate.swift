//
//  MapViewController+NMapDelegate.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 22..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import Foundation

// MARK: NMapViewDelegate
// 지도 상태 변경 및 터치 이벤트 발생 시 호출되는 콜백 프로토콜

extension MapViewController: NMapViewDelegate {

    func initMap(frame: CGRect) -> NMapView {
        guard let filePath = Bundle.main.path(forResource: "Info", ofType: "plist") else { return NMapView() }

        let info = NSDictionary(contentsOfFile: filePath)
        guard let APIKey = info?["NaverMapAPIKey"] as? String else { return NMapView() }

        let mapView = NMapView(frame: frame)

        mapView.setClientId(APIKey)

        return mapView
    }

    func onMapView(_ mapView: NMapView!, initHandler error: NMapError!) {
        if error == nil {
            mapView.setMapCenter(NGeoPoint(longitude: 126.978371, latitude: 37.5666091), atLevel: 9)
            mapView.setMapEnlarged(true, mapHD: true)
            mapView.mapViewMode = .vector
        } else {
            print("onMapView:initHandler: \(error.description)")
        }
    }
    func onMapView(_ mapView: NMapView!, handleSingleTapGesture recogniser: UIGestureRecognizer!) {
        mapCollectionView.isHidden = true
    }
    func onMapView(_ mapView: NMapView!, didChangeMapCenter location: NGeoPoint) {
        mapCollectionView.isHidden = true
    }
}

// MARK: NMapPOIdataOverlayDelegate
// 지도 위에 표시되는 오버레이 아이템 클래스이며 NMapPOIdataOverlay 클래스에서 표시하는 기본 객체로 사용됩니다.
// 지도에 표시되는 마커 이미지는 NMapPOIdataOverlayDelegate 프로토콜을 통해서 전달합니다.

extension MapViewController: NMapPOIdataOverlayDelegate {
    // 마커에 해당하는 이미지를 반환
    // 마커 선택 시 표시되는 이미지는 selected 값이 YES인 경우 반환
    func onMapOverlay(_ poiDataOverlay: NMapPOIdataOverlay!, imageForOverlayItem poiItem: NMapPOIitem!, selected: Bool) -> UIImage! {
        return NMapViewResources.imageWithType(poiItem.poiFlagType, selected: selected)
    }

    // 마커의 기준 위치를 설정한다.
    // 범위는 0.0 1.0 이며 마커의 왼쪽 하단이 원점이다.
    func onMapOverlay(_ poiDataOverlay: NMapPOIdataOverlay!, anchorPointWithType poiFlagType: NMapPOIflagType) -> CGPoint {
        return NMapViewResources.anchorPoint(withType: poiFlagType)
    }

    // 마커 선택 시 표시되는 말풍선의 상대 위치를 설정한다.
    func onMapOverlay(_ poiDataOverlay: NMapPOIdataOverlay!, calloutOffsetWithType poiFlagType: NMapPOIflagType) -> CGPoint {
        return CGPoint(x: 0, y: 0)
    }

    // 마커 선택 시 표시되는 말풍선의 내용을 이미지로 반환
    func onMapOverlay(_ poiDataOverlay: NMapPOIdataOverlay!, imageForCalloutOverlayItem poiItem: NMapPOIitem!,
                      constraintSize: CGSize, selected: Bool, imageForCalloutRightAccessory: UIImage!,
                      calloutPosition: UnsafeMutablePointer<CGPoint>!, calloutHit calloutHitRect: UnsafeMutablePointer<CGRect>!) -> UIImage! {
        return nil
    }

    func onMapOverlay(_ poiDataOverlay: NMapPOIdataOverlay!, viewForCalloutOverlayItem poiItem: NMapPOIitem!, calloutPosition: UnsafeMutablePointer<CGPoint>!) -> UIView! {

        // CollectionView 선택하기
        let indexPath = IndexPath(item: Int(poiItem.iconIndex), section: 0)
        mapCollectionView.selectItem(at: indexPath, animated: false, scrollPosition: .centeredHorizontally)

        // 마커가 중앙에 오도록하기
        mapView?.setMapCenter(poiItem.location, atLevel: 9)

        mapCollectionView.isHidden = false

        return nil
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

                                // 마커의 인덱스와 위치 정보만 획득
                                let marker = NMapPOIitem()
                                marker.location = markerLocation
                                markers.append(marker)

                                poiDataOverlay.addPOIitem(atLocation: markerLocation, title: store.storeName,
                                                          type: userPOIflagTypeDefault, iconIndex: Int32(idx), with: nil)
                            }
                        }
                    }

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
