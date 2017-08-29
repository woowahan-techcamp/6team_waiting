//
//  ServerRepository.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 10..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import Foundation
import Alamofire
import SwiftyJSON

class ServerRepository {

    static var storeList: [Store] = []
    static var detailStore: Store?

    static func postCurrentLocation(currentLocation: CLLocation, completion: @escaping (Bool, [Store]) -> Void) {
        self.storeList = []

        let lat = currentLocation.coordinate.latitude
        let long = currentLocation.coordinate.longitude

        let parameter: Parameters = [
            "latitude": lat,
            "longitude": long
        ]

        guard let url = URL(string: baseURL + "/storefilter")
            else {
                print("URL is nil")
                return
        }

        Alamofire.request(url, method: .post, parameters: parameter, encoding: JSONEncoding.default, headers: nil).responseJSON { response in

            guard response.result.isSuccess else {
                print("Response get store error: \(response.result.error!)")
                completion(false, [])
                return
            }

            // 항상 성공
            guard let value = response.result.value else { return }

            let swiftyJson = JSON(value)

            for (_, jsonItem): (String, JSON) in swiftyJson {
                updateStore(currentLocation: currentLocation, item: jsonItem, isMain: true)
            }

            DispatchQueue.main.async {
                completion(true, self.storeList)
            }

        }

    }

    static func getStoreDetail(detailStoreId: Int, completion: @escaping(Store) -> Void) {
        let searchUrl = "/detailStore?storeId="

        guard let url = URL(string: baseURL + searchUrl + String(detailStoreId)) else {
            print("URL is nil")
            return
        }

        var urlRequest = URLRequest(url: url)
        urlRequest.timeoutInterval = 10

        Alamofire.request(urlRequest).responseJSON { response in
            guard response.result.isSuccess else {
                print("Response get store error: \(response.result.error!)")
                return
            }

            // 항상 성공
            guard let value = response.result.value else { return }

            let detailJson = JSON(value)

            updateStore(currentLocation: nil, item: detailJson, isMain: false)

            if let detailStore = self.detailStore {
                DispatchQueue.main.async {
                    completion(detailStore)
                }
            }
        }
    }

    static func updateStore(currentLocation: CLLocation?, item: JSON, isMain: Bool) {

        guard let name = item["storeName"].string else {
            print("Update Store name 없음")
            return
        }
        guard let id = item["storeId"].int else {
            print("Update Store ID 없음")
            return
        }
        guard let lat = item["storeLatitude"].string else {
            print("Update Store 위도 없음")
            return
        }
        guard let long = item["storeLongitude"].string else {
            print("Update Store 경도 없음")
            return
        }

        // 필수적으로 들어가야 하는 부분
        let store = Store(storeName: name, storeId: id, storeLatitude: lat, storeLongitude: long)

        // 공통적으로 들어가는 부분
        if let currentInLine = item["currentInLine"].int {
            store.currentInLine = currentInLine
        } else {
            store.currentInLine = 0
        }

        if let isOpened = item["storeIsOpened"].int {
            store.getStoreStatus(isOpened: isOpened)
        } else {
            store.getStoreStatus(isOpened: 0)
        }
        if let img = item["storeImgUrl"].string {
            if let imgURL = URL(string: img) {
                // 모든 케이스 있음
                store.storeImgUrl = imgURL
            }
        }

        // 화면 별로 다른 부분
        if isMain {

            if let location = currentLocation {
                store.getDistanceFromUser(userLocation: location)
            }

            if let address = item["storeAddress"].string {
                store.storeAddress = address
                store.getShortAddress(address: address)
            }

            self.storeList.append(store)
        } else {
            // Detail

            if let description = item["storeDescription"].string {
                store.storeDescription = description
            }
            if let tel = item["storeTel"].string {
                store.storeTel = tel
            }

            self.detailStore = store
        }
    }

    /* 이건 뭐지??
    static func postDeviceToken(ticketNumber: Int, token: String) {

        let parameter: Parameters = [
            "ticketNumber": ticketNumber,
            "token": token
        ]

        guard let url = URL(string: baseURL + "/storefilter")
            else {
                print("URL is nil")
                return
        }

        Alamofire.request(url, method: .post, parameters: parameter, encoding: JSONEncoding.default, headers: nil).responseJSON { response in

            guard response.result.isSuccess else {
                print("Response get store error: \(response.result.error!)")
                return
            }

        }
    }
     */

}
    


