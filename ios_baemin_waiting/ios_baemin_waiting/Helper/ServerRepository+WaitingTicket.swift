//
//  ServerRepository+WaitingTicket.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 30..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import Foundation
import Alamofire
import SwiftyJSON

extension ServerRepository {
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

            let ticket = updateTicket(item: mylineJson)

            completion(ticket)

        }
    }

    static func postCancleLine(ticket: WaitingTicket, completion: @escaping (Int) -> Void) {

        let parameter: Parameters = [
            "ticketNumber": ticket.ticketNumber,
            "status": "customerCancel"
        ]

        guard let url = URL(string: baseURL + "/deleteTicket")
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
            let deleteTicket = JSON(value)

            if let isSuccess = deleteTicket.int {
                completion(isSuccess)
            } else {
                completion(0)
            }
        }
    }

    static func postWaitingTicketCreate(params ticket: WaitingTicket, completion: @escaping (Bool, WaitingTicket) -> Void) {

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

            let ticket = updateTicket(item: checkingJson)

            if let isSuccess = checkingJson["isSuccess"].int {
                let isSuccessBool = isSuccess == 1 ? true : false
                completion(isSuccessBool, ticket)
            }
        }
    }

    static func updateTicket(item: JSON) -> WaitingTicket {
        guard let ticketNumber = item["ticketNumber"].int else {
            return WaitingTicket()
        }
        guard let storeName = item["storeName"].string else {
            return WaitingTicket()
        }
        guard let currentInLine = item["currentInLine"].int else {
            return WaitingTicket()
        }

        let ticket = WaitingTicket()
        ticket.storeName = storeName
        ticket.currentInLine = currentInLine
        ticket.ticketNumber = ticketNumber

        return ticket
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

}
