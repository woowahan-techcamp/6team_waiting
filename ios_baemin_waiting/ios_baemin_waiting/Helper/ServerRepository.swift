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

                if let name = item["storeName"].string,
                    let id = item["storeId"].int,
                    let address = item["storeAddress"].string,
                    let lat = item["storeLatitude"].string,
                    let long = item["storeLongitude"].string,
                    let currentInLine = item["currentInLine"].int,
                    let img = item["storeImgUrl"].string {

                    if let imgURL = URL(string: img) {
                        let store = Store(storeName: name, storeId: id, storeAddress: address, storeLatitude: lat, storeLongitude: long, storeImgUrl: imgURL, currentInLine: currentInLine)

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
                return
            }

            // 항상 성공
            guard let value = response.result.value else { return }

            let swiftyJson = JSON(value)

            for (_, item): (String, JSON) in swiftyJson {

                if let name = item["storeName"].string,
                    let id = item["storeId"].int,
                    let address = item["storeAddress"].string,
                    let lat = item["storeLatitude"].string,
                    let long = item["storeLongitude"].string,
                    let currentInLine = item["currentInLine"].int,
                    let img = item["storeImgUrl"].string {

                    if let imgURL = URL(string: img) {
                        let store = Store(storeName: name, storeId: id, storeAddress: address, storeLatitude: lat, storeLongitude: long, storeImgUrl: imgURL, currentInLine: currentInLine)

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

            if let name = detailJson["storeName"].string,
                let id = detailJson["storeId"].int,
                let description = detailJson["storeDescription"].string,
                let tel = detailJson["storeTel"].string,
                let img = detailJson["storeImgUrl"].string,
                let currentInLine = detailJson["currentInLine"].int,
                let isOpened = detailJson["storeIsOpened"].int,
                let lat = detailJson["storeLatitude"].string,
                let long = detailJson["storeLongitude"].string {

                if let imgURL = URL(string: img) {

                    let isOpenBool = isOpened == 1 ? true : false

                    let store = Store(storeName: name, storeId: id, storeDescription: description, storeTel: tel, storeLatitude: lat,
                                      storeLongitude: long, storeImgUrl: imgURL, storeIsOpened: isOpenBool, currentInLine: currentInLine)

                    DispatchQueue.main.async {
                        completion(store)
                    }
                }
            }
        }
    }

    static func postWaitingTicketCreate(params ticket: WaitingTicket, completion: @escaping (Bool, Int) -> Void) {

        let isStaying = ticket.isStaying ? 1 : 0
        print(ticket.name)
        let parameter: Parameters = ["name": ticket.name, "phoneNumber": ticket.phoneNumber,
                                     "headCount": ticket.headCount, "isStaying": isStaying,
                                     "storeId": ticket.storeId]

        guard let url = URL(string: baseURL + "/addWaitingTicket")
            else {
                print("URL is nil")
                return
        }

        Alamofire.request(url, method: .post, parameters: parameter, encoding: JSONEncoding.default, headers: nil).responseJSON { response in

            guard response.result.isSuccess else {
                print("Response post WaitingTicket Error: \(response.result.error!)")
                return
            }

            guard let value = response.result.value else { return }

            let checkingJson = JSON(value)

            print(checkingJson)
            if let ticketNumber = checkingJson["ticketNumber"].int,
                let isSuccess = checkingJson["isSuccess"].int {

                    let isSuccessBool = isSuccess == 1 ? true : false

                    print(isSuccessBool)
                    DispatchQueue.main.async {
                        completion(isSuccessBool, ticketNumber)
                    }
                }
        }
    }
}
