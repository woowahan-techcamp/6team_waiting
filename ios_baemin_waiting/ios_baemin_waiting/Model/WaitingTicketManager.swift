//
//  WaitingTicketManager.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 29..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import Foundation

class WaitingTicketManager {

    static func regist(ticket: WaitingTicket) {
        var registTicket = ticket

        ServerRepository.postWaitingTicketCreate(params: registTicket) { isSuccess, checkTicket in
            if isSuccess {
                registTicket = checkTicket

                let ticket = NSKeyedArchiver.archivedData(withRootObject: registTicket)
                UserDefaults.standard.set(ticket, forKey: "ticket")

                NotificationCenter.default.post(name: NSNotification.Name(rawValue: "registTicketNoti"), object: nil, userInfo: ["isSuccess": isSuccess, "registTicket": registTicket])
            }
        }
    }

    static func checkValidTicket() {
        if UserDefaults.standard.object(forKey: "ticket") == nil {
            NotificationCenter.default.post(name: NSNotification.Name(rawValue: "validTicket"),
                                            object: nil, userInfo: nil)
        } else {
            var userTicket = UserDefaults.standard.getTicket(keyName: "ticket")

            ServerRepository.postTicketValidCheck(ticketNumber: (userTicket?.ticketNumber)!) { statusTicket in
                let valid = statusTicket >= 10 ? false : true

                if !valid {
                    UserDefaults.standard.removeObject(forKey: "ticket")
                    NotificationCenter.default.post(name: NSNotification.Name(rawValue: "validTicket"),
                                                    object: nil, userInfo: nil)
                } else {
                    ServerRepository.postMylineCheck(ticket: userTicket!) { mylineCheck in
                        userTicket = mylineCheck
                        NotificationCenter.default.post(name: NSNotification.Name(rawValue: "validTicket"),
                                                        object: nil, userInfo: ["ticket": userTicket!])
                    }
                }
            }

        }
    }
}
