//
//  ViewController.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 4..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit

class MapViewController: UIViewController {
    enum State {
        case disabled
        case tracking
    }

    var currentState: State = .disabled
    var mapView: NMapView?

    override func viewDidLoad() {
        super.viewDidLoad()

        setMap()

        switch currentState {
        case .disabled:
            enableLocationUpdate()
            updateState(to: .tracking)
        default:
            disableLocationUpdate()
            updateState(to: .disabled)
        }

    }
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)

        mapView?.viewWillAppear()
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

    func setMap() {
        guard let filePath = Bundle.main.path(forResource: "Info", ofType: "plist") else { return }

        let info = NSDictionary(contentsOfFile: filePath)
        guard let APIKey = info?["NaverMapAPIKey"] as? String else { return }

        mapView = NMapView(frame: self.view.bounds)

        if let mapView = mapView {

            mapView.setClientId(APIKey)
            mapView.delegate = self

            mapView.autoresizingMask = [.flexibleWidth, .flexibleHeight]

            view.addSubview(mapView)
        }
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

}

// MARK: NMapViewDelegate
// 지도 상태 변경 및 터치 이벤트 발생 시 호출되는 콜백 프로토콜

extension MapViewController: NMapViewDelegate {

    func onMapView(_ mapView: NMapView!, initHandler error: NMapError!) {
        if error == nil {
            mapView.setMapCenter(NGeoPoint(longitude:126.978371, latitude:37.5666091), atLevel:11)

            mapView.setMapEnlarged(true, mapHD: true)

            mapView.mapViewMode = .vector
        } else {
            print("onMapView:initHandler: \(error.description)")
        }
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
}

// MARK: - NMapLocationManagerDelegate
// 현재 위치 표시

extension MapViewController: NMapLocationManagerDelegate {
    // 현재 위치 변경시 호출
    func locationManager(_ locationManager: NMapLocationManager!, didUpdateTo location: CLLocation!) {
        let coordinate = location.coordinate

        let myLocation = NGeoPoint(longitude: coordinate.longitude, latitude: coordinate.latitude)
        let locationAccuracy = Float(location.horizontalAccuracy)

        mapView?.mapOverlayManager.setMyLocation(myLocation, locationAccuracy: locationAccuracy)
        mapView?.setMapCenter(myLocation)
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
    func onMapViewIsGPSTracking(_ mapView: NMapView!) -> Bool {
        return NMapLocationManager.getSharedInstance().isTrackingEnabled()
    }

    func enableLocationUpdate() {

        if let lm = NMapLocationManager.getSharedInstance() {

            if lm.locationServiceEnabled() == false {
                locationManager(lm, didFailWithError: .denied)
                return
            }

            if lm.isUpdateLocationStarted() == false {
                // set delegate
                lm.setDelegate(self)
                // start updating location
                lm.startContinuousLocationInfo()
            }
        }
    }
    func disableLocationUpdate() {

        if let lm = NMapLocationManager.getSharedInstance() {

            if lm.isUpdateLocationStarted() {
                // start updating location
                lm.stopUpdateLocationInfo()
                // set delegate
                lm.setDelegate(nil)
            }
        }

        mapView?.mapOverlayManager.clearMyLocationOverlay()
    }

    func updateState(to newState: State) {
        currentState = newState
    }
}
