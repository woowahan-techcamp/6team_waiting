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

    static let BaseURL = "http://192.168.100.107:8080/"
    static var storeList: [Store] = []

    static func getStoreList(completion: @escaping ([Store]) -> Void) {

        guard let url = URL(string: BaseURL)
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

                if let name = item["restaurantsName"].string,
                    let address = item["restaurantsLocationInfo"]["restaurantsAddress"].string,
                    let lat = item["restaurantsLocationInfo"]["restaurantsLatitude"].string,
                    let long = item["restaurantsLocationInfo"]["restaurantsLongitude"].string,
                    let img = item["restaurantsImgUrl"].string {

                    if let imgURL = URL(string: img) {
                        let store = Store(storeName: name, storeAddress: address, storeLatitude: lat, storeLongitude: long, storeImgUrl: imgURL, searchRange: [:])

                        self.storeList.append(store)
                    }
                }
            }
            DispatchQueue.main.async {
                completion(self.storeList)
            }
        }
    }
}
