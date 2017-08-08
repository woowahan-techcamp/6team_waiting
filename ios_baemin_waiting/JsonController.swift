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
        var restaurantsLocationInfo: RestaurantsLocationInfo
        for object in jsonObject {
            let name: String = object["restaurantsName"] as! String
            if let locationInfo = object["restaurantsLocationInfo"] as? [String : Any] {
                let address: String = locationInfo["restaurantsAddress"] as! String
                let latitude: String = locationInfo["restaurantsLatitude"] as! String
                let longitude: String = locationInfo["restaurantsLongitude"] as! String

                restaurantsLocationInfo = RestaurantsLocationInfo(restaurantsName: name, restaurantsAddress: address, restaurantsLatitude: latitude, restaurantsLongitude: longitude)

                restaurnatsLocationInfoList.append(restaurantsLocationInfo)
            } else {
                print("Wrong locationInfo")
            }
        }
        return restaurnatsLocationInfoList
    }
}
