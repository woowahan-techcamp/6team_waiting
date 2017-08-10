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

    static func getStoreList(completion: @escaping (Store) -> Void) {

        guard let url = URL(string: "http://192.168.100.107:8080")
            else {
                print("URL is nil")
                return
        }

        Alamofire.request(url).responseJSON { response in
            guard response.result.isSuccess else {
                print("Response get store error: \(response.result.error!)")
                return
            }

            // 항상 성공
            guard let value = response.result.value else { return }

            let swiftyJson = JSON(value)

            for (_, item): (String, JSON) in swiftyJson {

                if let name = item["restaurantsName"].string,
                    let address = item["restaurantsLocationInfo"]["restaurantsAddress"].string,
                    let lat = item["restaurantsLocationInfo"]["restaurantsLatitude"].string,
                    let long = item["restaurantsLocationInfo"]["restaurantsLongitude"].string,
                    let img = item["restaurantsLocationInfo"]["restaurantsImgUrl"].string,
                    let imgUrl = URL(string: img) {

                    let store = Store(storeName: name, storeAddress: address, storeLatitude: lat, storeLongitude: long, storeImgUrl: imgUrl, searchRange: [:])

                    DispatchQueue.main.async {
                        completion(store)
                    }

                }
            }
        }
    }
}

//guard let name: String = object["restaurantsName"] as? String else { return [] }
//guard let searchRange = object["searchRange"] as? [String: Any] else { return [] }
//
//if let locationInfo = object["restaurantsLocationInfo"] as? [String : Any] {
//    guard let address: String = locationInfo["restaurantsAddress"] as? String else { return [] }
//

