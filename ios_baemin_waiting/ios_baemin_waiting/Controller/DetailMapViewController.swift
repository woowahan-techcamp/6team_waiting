//
//  DetailMapViewController.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 21..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit

class DetailMapViewController: UIViewController {

    var mapView: NMapView?

    var location: NGeoPoint?

    override func viewDidLoad() {
        super.viewDidLoad()

        mapView = initMap(frame: self.view.bounds)

        if let nMap = mapView {
            nMap.delegate = self
            nMap.autoresizingMask = [.flexibleWidth, .flexibleHeight]

            self.view.addSubview(nMap)

            if let storeLocation = location {
                nMap.setMapCenter(storeLocation)

                addMarker(location: storeLocation)

            }
        }

    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)

        mapView?.viewWillAppear()
    }
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)

        mapView?.viewWillDisappear()
    }
    func initMap(frame: CGRect) -> NMapView {
        guard let filePath = Bundle.main.path(forResource: "Info", ofType: "plist") else { return NMapView() }

        let info = NSDictionary(contentsOfFile: filePath)
        guard let APIKey = info?["NaverMapAPIKey"] as? String else { return NMapView() }

        let mapView = NMapView(frame: frame)

        mapView.setClientId(APIKey)

        return mapView
    }

    func addMarker(location: NGeoPoint) {

        if let mapOverlayManager = mapView?.mapOverlayManager {

            if let poiDataOverlay = mapOverlayManager.newPOIdataOverlay() {

                poiDataOverlay.initPOIdata(1)

                poiDataOverlay.addPOIitem(atLocation: location, title: nil,
                                          type: userPOIflagTypeDefault, iconIndex: 0, with: nil)

                poiDataOverlay.endPOIdata()
                poiDataOverlay.showAllPOIdata()
            }
        }
    }
}

// MARK: NMapViewDelegate
// 지도 상태 변경 및 터치 이벤트 발생 시 호출되는 콜백 프로토콜
extension DetailMapViewController: NMapViewDelegate {
    func onMapView(_ mapView: NMapView!, initHandler error: NMapError!) {
        if error == nil {
            mapView.setMapCenter(NGeoPoint(longitude: 126.978371, latitude: 37.5666091), atLevel: 9)
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
extension DetailMapViewController: NMapPOIdataOverlayDelegate {
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
