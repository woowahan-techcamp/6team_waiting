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
                        store.getShortAddress(address: address)

                        self.storeList.append(store)
                    }
                }
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

    static func postWaitingTicketCreate(params ticket: WaitingTicket, completion: @escaping (Bool, WaitingTicket) -> Void) {

        let checkTicket = ticket
        let isStaying = ticket.isStaying ? 1 : 0
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

            if let ticketNumber = checkingJson["ticketNumber"].int,
                let storeName = checkingJson["storeName"].string,
                let currentInLine = checkingJson["currentInLine"].int,
                let isSuccess = checkingJson["isSuccess"].int {

                    let isSuccessBool = isSuccess == 1 ? true : false
                    checkTicket.storeName = storeName
                    checkTicket.currentInLine = currentInLine
                    checkTicket.ticketNumber = ticketNumber

                    print(isSuccessBool)
                    DispatchQueue.main.async {
                        completion(isSuccessBool, checkTicket)
                    }
            }
        }
    }

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

    static func saveDeviceTokenToServer(ticketNumber: Int, token: String, completion: @escaping (Bool) -> Void) {

        let parameter: Parameters = [
            "ticketNumber": ticketNumber,
            "token": token
        ]

        guard let url = URL(string: baseURL + "/addToken")
            else {
                print("URL is nil")
                return
        }

        Alamofire.request(url, method: .post, parameters: parameter, encoding: JSONEncoding.default, headers: nil).responseJSON { response in
            guard response.result.isSuccess else {
                print("Post register TOKEN Error: \(response.result.error!)")
                completion(false)
                return
            }
            completion(true)
        }
    }

    static func postTicketValidCheck(ticketNumber: Int, completion: @escaping (Int) -> Void) {
        let parameter: Parameters = [
            "ticketNum": ticketNumber
        ]

        guard let url = URL(string: baseURL + "/validCheckTicket")
            else {
                print("URL is nil")
                return
        }

        Alamofire.request(url, method: .post, parameters: parameter, encoding: JSONEncoding.default, headers: nil).responseJSON { response in
            guard response.result.isSuccess else {
                print("Response get validTicket error: \(response.result.error!)")
                return
            }

            guard let value = response.result.value else { return }
            let statusTicketJson = JSON(value)

            if let statusTicket = statusTicketJson.int {
                completion(statusTicket)
            }
        }
    }

    static func postMylineCheck(ticket: WaitingTicket, completion: @escaping (WaitingTicket) -> Void) {
        let mylineTicket = ticket

        let parameter: Parameters = [
            "storeId": ticket.storeId,
            "ticketNumber": ticket.ticketNumber
        ]

        guard let url = URL(string: baseURL + "/mylineCheck")
            else {
                print("URL is nil")
                return
        }

        Alamofire.request(url, method: .post, parameters: parameter, encoding: JSONEncoding.default, headers: nil).responseJSON { response in
            guard response.result.isSuccess else {
                print("Response get myline error: \(response.result.error!)")
                return
            }

            guard let value = response.result.value else { return }
            let mylineJson = JSON(value)

            if let ticketNumber = mylineJson["ticketNumber"].int,
                let storeName = mylineJson["storeName"].string,
                let currentInLine = mylineJson["currentInLine"].int {

                mylineTicket.storeName = storeName
                mylineTicket.currentInLine = currentInLine
                mylineTicket.ticketNumber = ticketNumber


                completion(mylineTicket)

            }
        }
    }

}
