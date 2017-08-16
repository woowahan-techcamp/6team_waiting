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

    static func getStoreList(query: String, completion: @escaping ([Store]) -> Void) {

        guard let url = URL(string: baseURL + query)
            else {
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

            let swiftyJson = JSON(value)

            for (_, item): (String, JSON) in swiftyJson {
//                {
//                    "storeName": "봉피양 방이점",
//                    "storeLatitude": "37.509968",
//                    "storeLongitude": "127.1262",
//                    "storeAddress": "서울특별시 송파구 방이동 205-8",
//                    "storeImgUrl": null,
//                    "storeId": 1,
//                    "storeIsOpened": 1
//                },
                if let name = item["storeName"].string,
                    let address = item["storeAddress"].string,
                    let lat = item["storeLatitude"].string,
                    let long = item["storeLongitude"].string,
                    let img = item["storeImgUrl"].string {

                    if let imgURL = URL(string: img) {
                        let store = Store(storeName: name, storeAddress: address, storeLatitude: lat, storeLongitude: long, storeImgUrl: imgURL, searchRange: [:])

                        self.storeList.append(store)
                    }
                }
            }

            NotificationCenter.default.post(name: NSNotification.Name(rawValue: "dataUpdate"),
                                            object: nil, userInfo: ["storeData": self.storeList])
            DispatchQueue.main.async {
                completion(self.storeList)
            }
        }
    }

    static func postCurrentLocation(currentLocation: CLLocation, completion: @escaping ([Store]) -> Void) {

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

        print(url)
        Alamofire.request(url, method: .post, parameters: parameter, encoding: JSONEncoding.default, headers: nil).responseJSON { response in

            print(response.result.debugDescription)

            guard response.result.isSuccess else {
                print("Response get store error: \(response.result.error!)")
                return
            }

            // 항상 성공
            guard let value = response.result.value else { return }


            let swiftyJson = JSON(value)

            for (_, item): (String, JSON) in swiftyJson {
//                {
//                    "storeName": "봉피양 방이점",
//                    "storeLatitude": "37.509968",
//                    "storeLongitude": "127.1262",
//                    "storeAddress": "서울특별시 송파구 방이동 205-8",
//                    "storeImgUrl": null,
//                    "storeId": 1,
//                    "storeIsOpened": 1
//                },
                if let name = item["storeName"].string,
                    let address = item["storeAddress"].string,
                    let lat = item["storeLatitude"].string,
                    let long = item["storeLongitude"].string,
                    let img = item["storeImgUrl"].string {

                    if let imgURL = URL(string: img) {
                        var store = Store(storeName: name, storeAddress: address, storeLatitude: lat, storeLongitude: long, storeImgUrl: imgURL, searchRange: [:])

                        store.getDistanceFromUser(userLocation: currentLocation)

                        self.storeList.append(store)
                    }
                }
            }

            NotificationCenter.default.post(name: NSNotification.Name(rawValue: "dataUpdate"),
                                            object: nil, userInfo: ["storeData": self.storeList])
            DispatchQueue.main.async {
                completion(self.storeList)
            }

        }


    }
}
