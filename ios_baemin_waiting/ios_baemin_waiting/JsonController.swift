//
//  JsonController.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 8..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import Foundation

class JsonController {

    func readJson(fileName: String) -> [[String:Any]] {
        do {
            if let file = Bundle.main.url(forResource: fileName, withExtension: "json") {
                let data = try Data(contentsOf: file)
                let json = try JSONSerialization.jsonObject(with: data, options: JSONSerialization.ReadingOptions.mutableContainers)

                if let object = json as? [[String : Any]] {
                    return object
                } else {
                    print("JSON is invalid")
                }
            } else {
                print("no file")
            }
        } catch {
            print(error.localizedDescription)
        }

        return []
    }

    func getItem() -> [RestaurantsLocationInfo] {
        var restaurnatsLocationInfoList: [RestaurantsLocationInfo] = []

        let jsonObject = readJson(fileName: "송파구")
        var location: RestaurantsLocationInfo
        for object in jsonObject {
            guard let name: String = object["restaurantsName"] as? String else { return [] }
            guard let searchRange = object["searchRange"] as? [String: Any] else { return [] }

            if let locationInfo = object["restaurantsLocationInfo"] as? [String : Any] {
                guard let address: String = locationInfo["restaurantsAddress"] as? String else { return [] }
                guard let latitude: String = locationInfo["restaurantsLatitude"] as? String else { return [] }
                guard let longitude: String = locationInfo["restaurantsLongitude"] as? String else { return [] }

                location = RestaurantsLocationInfo(restaurantsName: name, restaurantsAddress: address,
                                                   restaurantsLatitude: latitude, restaurantsLongitude: longitude, searchRange: searchRange)

                restaurnatsLocationInfoList.append(location)
            } else {
                print("Wrong locationInfo")
            }
        }
        return restaurnatsLocationInfoList
    }
}
