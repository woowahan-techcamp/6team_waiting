//
//  LineCancleAlret.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 27..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import Foundation

class LineCancleAlert {

    var popUI: UIViewController
    var waitingTicket: WaitingTicket
    var alert: UIAlertController

    let title = "대기취소"
    let message = "현재 식당 대기가 취소됩니다."

    init() {
        popUI = UIViewController()
        waitingTicket = WaitingTicket()
        alert = UIAlertController()
    }

    convenience init(popUI: UIViewController, waitingTicket: WaitingTicket) {
        self.init()
        self.popUI = popUI
        self.waitingTicket = waitingTicket
        setAlert()
    }

    private func setAlert() {
        alert = UIAlertController(title: title, message: message, preferredStyle: .alert)

        let ok = UIAlertAction(title: "OK", style: .destructive) { (action:UIAlertAction!) in
            ServerRepository.postCancleLine(ticket: self.waitingTicket) { isSuccess in
                if isSuccess == 1 {
                    UserDefaults.standard.removeObject(forKey: "ticket")
                }
            }
        }
        let cancle = UIAlertAction(title: "CANCLE", style: .default, handler: nil)

        alert.addAction(ok)
        alert.addAction(cancle)
    }

    public func showAlert() {
        popUI.present(alert, animated: true, completion: nil)
    }
}
